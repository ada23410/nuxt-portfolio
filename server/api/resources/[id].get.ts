import { defineEventHandler, createError } from 'h3'
import { createNotionClient, isUUID, fetchAllBlocks, heroUrl, toPlain, blocksToNodes } from '../../utils/notion'

export default defineEventHandler(async (event) => {
    const { notionDataSourceId } = useRuntimeConfig(event)
    if (!notionDataSourceId) throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_DATASOURCE_ID' })

    const notion = createNotionClient(event)
    const idOrSlug = String(event.context.params!.id)

    // 找 pageId：UUID 直接拿；否則用 slug + Type=Resource 查
    let pageId = idOrSlug
    if (!isUUID(idOrSlug)) {
        const q = await notion.dataSources.query({
        data_source_id: notionDataSourceId,
        page_size: 1,
        filter: {
            and: [
            { property: 'Status', select: { equals: 'Published' } },
            { property: 'Type',   select: { equals: 'Resource' } },
            { property: 'Slug',   rich_text: { equals: idOrSlug } }
            ]
        }
        })
        if (!q.results.length) throw createError({ statusCode: 404, statusMessage: `Resource not found: ${idOrSlug}` })
        pageId = q.results[0].id
    }

    const page: any = await notion.pages.retrieve({ page_id: pageId })
    const blocksRaw = await fetchAllBlocks(notion, pageId)

    const p = page.properties ?? {}
    const post = {
        id: page.id,
        title: p.Title?.title?.[0]?.plain_text || 'Untitled',
        published_at: p.Date?.date?.start || '',
        author: p.Author?.rich_text?.[0]?.plain_text || '',
        tags: (p.Category?.multi_select ?? []).map((t: any) => t.name),
        description: p.Excerpt?.rich_text?.[0]?.plain_text || '',
        cover: heroUrl(page, p)
    }

    const blocks = blocksToNodes(blocksRaw)
    return { post, blocks }
})