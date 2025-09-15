// server/utils/notion.ts
import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'

export function createNotionClient(event: H3Event) {
    const { notionToken } = useRuntimeConfig(event)
    return new Client({ 
        auth: notionToken, 
        notionVersion: '2025-09-03' 
    })
}

export const isUUID = (s: string) =>
  /^[0-9a-fA-F]{32}$/.test(s.replace(/-/g, '')) ||
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s)

export const toPlain = (rt?: any[]) => (rt ?? []).map(t => t.plain_text ?? '').join('')

export function heroUrl(page: any, props: any) {
    const files = props['Hero Image']?.files ?? []
    const first = files[0]
    if (first?.file?.url) return first.file.url
    if (first?.external?.url) return first.external.url
    if (page?.cover?.file?.url) return page.cover.file.url
    if (page?.cover?.external?.url) return page.cover.external.url
    return null
}

export async function fetchAllBlocks(notion: Client, pageId: string) {
    let cursor: string | undefined
    const out: any[] = []
    do {
        const r = await notion.blocks.children.list({
        block_id: pageId,
        page_size: 100,
        start_cursor: cursor
        })
        out.push(...r.results)
        cursor = r.has_more ? (r.next_cursor ?? undefined) : undefined
    } while (cursor)
    return out
}

/** 列表卡片用的映射（Resource/Project 通用；Project 會多回 side 欄位） */
export function mapPageToCard(page: any) {
    const p = page.properties ?? {}
    return {
        id: page.id,
        slug: p.Slug?.rich_text?.[0]?.plain_text || page.id,
        title: p.Title?.title?.[0]?.plain_text || '',
        published_at: p.Date?.date?.start || '',
        description: p.Excerpt?.rich_text?.[0]?.plain_text || '',
        image_url: heroUrl(page, p),
        author: p.Author?.rich_text?.[0]?.plain_text || '',
        tags: (p.Category?.multi_select ?? []).map((t: any) => t.name),
        type: p.Type?.select?.name || '',

        // Project 專用（Resource 會是 undefined）
        sideType: p['Side Type']?.select?.name || undefined,
        sideImage:
        p['Side Image']?.files?.[0]?.file?.url ||
        p['Side Image']?.files?.[0]?.external?.url ||
        undefined
    }
}

/** 將 Notion block 轉成前端 nodes（支援段落/標題/引言/分隔線/圖片/項目清單） */
export function blocksToNodes(blocks: any[]) {
    const rt = (x?: any[]) => (x ?? []).map(t => t.plain_text ?? '').join('')
    const nodes: any[] = []
    let ul: any[] | null = null
    const flush = () => { if (ul?.length) nodes.push({ type: 'ul', children: ul }); ul = null }

    for (const b of blocks) {
        switch (b.type) {
        case 'paragraph': { flush(); const text = rt(b.paragraph?.rich_text); if (text) nodes.push({ type: 'p', text }); break }
        case 'heading_1':
        case 'heading_2':
        case 'heading_3': {
            flush()
            const text = rt(b[b.type]?.rich_text)
            if (text) nodes.push({ type: ({ heading_1: 'h1', heading_2: 'h2', heading_3: 'h3' } as any)[b.type], text })
            break
        }
        case 'quote': { flush(); const text = rt(b.quote?.rich_text); if (text) nodes.push({ type: 'quote', text }); break }
        case 'bulleted_list_item': { const text = rt(b.bulleted_list_item?.rich_text); if (text){ ul ??= []; ul.push({ type: 'li', text }) } break }
        case 'divider': { flush(); nodes.push({ type: 'divider' }); break }
        case 'image': {
            flush()
            const src = b.image?.file?.url || b.image?.external?.url
            const caption = rt(b.image?.caption)
            if (src) nodes.push({ type: 'img', src, caption })
            break
        }
        default: { flush(); break }
        }
    }
    flush()
    return nodes
}
