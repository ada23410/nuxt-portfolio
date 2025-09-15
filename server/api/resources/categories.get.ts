import { defineEventHandler, createError } from 'h3'
import { createNotionClient } from '../../utils/notion'

export default defineEventHandler(async (event) => {
    const { notionDataSourceId } = useRuntimeConfig(event)
    if (!notionDataSourceId) {
        throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_DATASOURCE_ID' })
    }

    const notion = createNotionClient(event)

    // 只蒐集「Status=Published」且「Type=Resource」的分類
    const and: any[] = [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'Type',   select: { equals: 'Resource' } }
    ]

    const used = new Set<string>()
    let start_cursor: string | undefined

    do {
        const r = await notion.dataSources.query({
        data_source_id: notionDataSourceId,
        page_size: 100,
        start_cursor,
        filter: { and },
        // 有需要可以加排序，但對蒐集分類來說非必要
        })

        for (const page of r.results as any[]) {
        const p = page.properties ?? {}
        const opts = p.Category?.multi_select ?? []
        for (const o of opts) {
            if (o?.name) used.add(o.name)
        }
        }

        start_cursor = r.has_more ? (r.next_cursor ?? undefined) : undefined
    } while (start_cursor)

    // 排序一下，體驗好看些
    const categories = Array.from(used).sort((a, b) => a.localeCompare(b))
    return { categories }
})