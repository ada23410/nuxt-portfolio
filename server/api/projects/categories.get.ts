import { Client } from '@notionhq/client'
import { defineEventHandler, createError, getQuery } from 'h3'

export default defineEventHandler(async (event) => {
  const { notionToken, notionDataSourceId } = useRuntimeConfig(event)
  if (!notionToken || !notionDataSourceId) {
    throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_TOKEN / NOTION_DATASOURCE_ID' })
  }

  const notion = new Client({ auth: notionToken, notionVersion: '2025-09-03' })
  const q = getQuery(event)

  // 預設只取「實際被 Project 使用過」的分類
  const usedOnly = q.usedOnly !== 'false'     // default: true
  const withCounts = q.withCounts === 'true'  // default: false

  // 若只想拿資料庫 schema 上的所有選項
  if (!usedOnly && !withCounts) {
    const ds = await notion.dataSources.retrieve({ data_source_id: notionDataSourceId })
    const options = (ds as any).properties?.['Category']?.multi_select?.options ?? []
    return { categories: options.map((o: any) => o.name) }
  }

  // 走訪所有「Project + Published」的頁面，彙整實際使用之分類
  const set = new Set<string>()
  const counts: Record<string, number> = {}

  let start_cursor: string | undefined
  do {
    const res = await notion.dataSources.query({
      data_source_id: notionDataSourceId,
      page_size: 100,
      start_cursor,
      filter: {
        and: [
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Type',   select: { equals: 'Project' } }
        ]
      },
      sorts: [{ property: 'Date', direction: 'descending' }]
    })

    for (const page of res.results as any[]) {
      const ms = page.properties?.['Category']?.multi_select ?? []
      for (const t of ms) {
        const name = t?.name
        if (!name) continue
        set.add(name)
        if (withCounts) counts[name] = (counts[name] ?? 0) + 1
      }
    }

    start_cursor = res.has_more ? (res.next_cursor as string | undefined) : undefined
  } while (start_cursor)

  const categories = Array.from(set).sort()
  return withCounts ? { categories, counts } : { categories }
})
