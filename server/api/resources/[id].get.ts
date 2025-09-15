// server/api/resources/[id].get.ts
import { defineEventHandler, createError } from 'h3'
import {
  createNotionClient,
  isUUID,
  fetchAllBlocks,
  heroUrl,
  toPlain,
  blocksToNodes,
  findPageIdBySlug,
} from '../../utils/notion'

export default defineEventHandler(async (event) => {
  const { notionDataSourceId } = useRuntimeConfig(event)
  if (!notionDataSourceId) {
    throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_DATASOURCE_ID' })
  }

  const notion = createNotionClient(event)
  const idOrSlug = String(event.context.params!.id)

  // 1) 先拿 pageId：UUID 直接用；不然用 slug + Type=Resource 查
  let pageId = idOrSlug
  if (!isUUID(idOrSlug)) {
    const found = await findPageIdBySlug(notion, notionDataSourceId, idOrSlug, 'Resource')
    if (!found) {
      throw createError({ statusCode: 404, statusMessage: `Resource not found: ${idOrSlug}` })
    }
    pageId = found
  }

  // 2) 取 page 與 blocks
  const page = await notion.pages.retrieve({ page_id: pageId })
  const rawBlocks = await fetchAllBlocks(notion, pageId)

  // 3) 組 post（頁首資料）
  const p: any = (page as any).properties ?? {}
  const post = {
    id: page.id,
    title: p.Title?.title?.[0]?.plain_text ?? 'Untitled',
    published_at: p.Date?.date?.start ?? '',
    author: p.Author?.rich_text?.[0]?.plain_text ?? '',
    tags: (p.Category?.multi_select ?? []).map((t: any) => t.name),
    description: p.Excerpt?.rich_text?.[0]?.plain_text ?? '',
    cover: heroUrl(page, p),
  }

  // 4) 轉前端可用的 nodes（也保留 raw blocks 供 fallback）
  const nodes = blocksToNodes(rawBlocks)

  return { post, blocks: rawBlocks, nodes }
})