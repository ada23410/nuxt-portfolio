import { defineEventHandler, createError, getQuery } from 'h3'
import { createNotionClient, mapPageToCard } from '../../utils/notion'

export default defineEventHandler(async (event) => {
    const { notionDataSourceId } = useRuntimeConfig(event)
    if (!notionDataSourceId) throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_DATASOURCE_ID' })

    const notion = createNotionClient(event)
    const q = getQuery(event)
    const limit = Math.min(Number(q.limit ?? 10), 50)
    const tag = (q.tag as string) || undefined

    const and: any[] = [
        { property: 'Status', select: { equals: 'Published' } },
        { property: 'Type',   select: { equals: 'Project' } }
    ]
    if (tag) and.push({ property: 'Category', multi_select: { contains: tag } })

    const res = await notion.dataSources.query({
        data_source_id: notionDataSourceId,
        page_size: limit,
        filter: { and },
        sorts: [{ property: 'Date', direction: 'descending' }]
    })

    const items = res.results.map(mapPageToCard)
    return { items }
})