// server/api/projects/[id].get.ts
import { Client } from '@notionhq/client'
import { defineEventHandler, createError } from 'h3'

const isUUID = (s: string) =>
  /^[0-9a-fA-F]{32}$/.test(s.replace(/-/g, '')) ||
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s)

const rtText = (rt?: any[]) => (rt ?? []).map(t => t?.plain_text ?? '').join('')

function heroUrl(page: any, p: any) {
  const f = (p['Hero Image']?.files ?? [])[0]
  return (
    f?.file?.url ||
    f?.external?.url ||
    page.cover?.file?.url ||
    page.cover?.external?.url ||
    null
  )
}

async function fetchAllBlocks(notion: Client, pageId: string) {
  const out: any[] = []
  let cursor: string | undefined
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

export default defineEventHandler(async (event) => {
  const { notionToken, notionDataSourceId } = useRuntimeConfig(event)
  if (!notionToken || !notionDataSourceId) {
    throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_TOKEN / NOTION_DATASOURCE_ID' })
  }

  const notion = new Client({ auth: notionToken, notionVersion: '2025-09-03' })
  const idOrSlug = String(event.context.params!.id)

  // 1) 解析 pageId（UUID 直接用；否則用 Slug + Type=Project 去查）
  let pageId = idOrSlug
  if (!isUUID(idOrSlug)) {
    const res = await notion.dataSources.query({
      data_source_id: notionDataSourceId,
      page_size: 1,
      filter: {
        and: [
          { property: 'Type',   select: { equals: 'Project' } },
          { property: 'Status', select: { equals: 'Published' } },
          { property: 'Slug',   rich_text: { equals: idOrSlug } }
        ]
      }
    })
    if (!res.results.length) {
      throw createError({ statusCode: 404, statusMessage: `Project not found: ${idOrSlug}` })
    }
    pageId = res.results[0].id
  }

  // 2) 取 page 與 blocks
  const page = await notion.pages.retrieve({ page_id: pageId })
  const rawBlocks = await fetchAllBlocks(notion, pageId)

  // 3) 正規化 blocks（保留常見型別）
  const blocks = rawBlocks.map((b: any) => {
    const pl = (x?: any[]) => (x ?? []).map((t: any) => t.plain_text).join('')
    switch (b.type) {
      case 'paragraph':         return { id: b.id, type: 'p',    text: pl(b.paragraph.rich_text) }
      case 'heading_1':         return { id: b.id, type: 'h1',   text: pl(b.heading_1.rich_text) }
      case 'heading_2':         return { id: b.id, type: 'h2',   text: pl(b.heading_2.rich_text) }
      case 'heading_3':         return { id: b.id, type: 'h3',   text: pl(b.heading_3.rich_text) }
      case 'quote':             return { id: b.id, type: 'quote',text: pl(b.quote.rich_text) }
      case 'divider':           return { id: b.id, type: 'divider' }
      case 'image': {
        const src = b.image?.file?.url || b.image?.external?.url
        const caption = pl(b.image?.caption)
        return { id: b.id, type: 'img', src, caption }
      }
      case 'bulleted_list_item': return { id: b.id, type: 'li', variant: 'bullet',  text: pl(b.bulleted_list_item.rich_text) }
      case 'numbered_list_item': return { id: b.id, type: 'li', variant: 'number',  text: pl(b.numbered_list_item.rich_text) }
      default:                  return { id: b.id, type: b.type }
    }
  })

  // 4) 組 post
  const p: any = (page as any).properties ?? {}
  const post = {
    id: page.id,
    title: p.Title?.title?.[0]?.plain_text || 'Untitled',
    published_at: p.Date?.date?.start || '',
    author: p.Author?.rich_text?.[0]?.plain_text || '',
    tags: (p.Category?.multi_select ?? []).map((t: any) => t.name),
    description: p.Excerpt?.rich_text?.[0]?.plain_text || '',
    cover: heroUrl(page, p),
    side_type: (p['Side Type']?.select?.name ?? 'none').toLowerCase(),
    side_image_url: (() => {
      const f = (p['Side Image']?.files ?? [])[0]
      return f?.file?.url || f?.external?.url || null
    })()
  }

  return { post, blocks }
})
