import { Client } from '@notionhq/client'
import { defineEventHandler, getQuery, createError } from 'h3'

/** 依你的欄位：優先用 Hero Image，其次用封面 */
function heroUrl(page: any, p: any) {
    const f = p['Hero Image']?.files?.[0]
    return f?.file?.url
        ?? f?.external?.url
        ?? page.cover?.file?.url
        ?? page.cover?.external?.url
        ?? null
}

export default defineEventHandler(async (event) => {
    const { notionToken, notionDataSourceId } = useRuntimeConfig(event)
    if (!notionToken || !notionDataSourceId) {
        throw createError({ statusCode: 500, statusMessage: 'Missing NOTION envs' })
    }

    const notion = new Client({ auth: notionToken, notionVersion: '2025-09-03' })

    const q = getQuery(event)
    const limit = Math.min(Number(q.limit ?? 8), 50)
    const start_cursor = typeof q.start_cursor === 'string' ? q.start_cursor : undefined
    const tag = typeof q.tag === 'string' ? q.tag : undefined

    // 你的 Status 是「select」型別
    const and: any[] = [{ property: 'Status', select: { equals: 'Published' } }]
    if (tag) {
        and.push({ property: 'Category', multi_select: { contains: tag } })
    }

    const res = await notion.dataSources.query({
        data_source_id: notionDataSourceId,
        page_size: limit,
        start_cursor,
        filter: { and },
        sorts: [{ property: 'Date', direction: 'descending' }]
    })

    const items = res.results.map((page: any) => {
        const p = page.properties
        return {
            id: page.id,
            slug: p.Slug?.rich_text?.[0]?.plain_text ?? page.id,
            title: p.Title?.title?.[0]?.plain_text ?? '',
            published_at: p.Date?.date?.start ?? '',
            description: p.Excerpt?.rich_text?.[0]?.plain_text ?? '',
            image_url: heroUrl(page, p),
            author: p.Author?.rich_text?.[0]?.plain_text ?? '', // 你的 Author 是 rich_text
            tags: (p.Category?.multi_select ?? []).map((t: any) => t.name)
        }
    })

    return {
        items,
        has_more: res.has_more,
        next_cursor: (res as any).next_cursor ?? null
    }
})