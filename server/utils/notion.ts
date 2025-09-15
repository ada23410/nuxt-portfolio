// server/utils/notion.ts
import { Client } from '@notionhq/client'
import type { H3Event } from 'h3'

/** 建立 Notion Client（使用新版 dataSources 需指定 notionVersion） */
export function createNotionClient(event: H3Event) {
  const { notionToken } = useRuntimeConfig(event)
  if (!notionToken) throw new Error('Missing NOTION_TOKEN')
  return new Client({
    auth: notionToken,
    notionVersion: '2025-09-03',
  })
}

/** UUID 檢查：支援有無 dash 的兩種形式 */
export const isUUID = (s: string) =>
  /^[0-9a-fA-F]{32}$/.test(s.replace(/-/g, '')) ||
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(s)

/** rich_text[] -> 純文字 */
export const toPlain = (rt?: any[]) => (rt ?? []).map(t => t?.plain_text ?? '').join('')

/** 取 files 欄位第一個檔案 URL（file/external 皆可） */
export function firstFileUrl(filesProp: any): string | null {
  const files = filesProp?.files ?? []
  if (!files.length) return null
  return files[0]?.file?.url ?? files[0]?.external?.url ?? null
}

/** Hero：優先 Hero Image -> 退回 page cover */
export function heroUrl(page: any, props: any): string | null {
  const hero = firstFileUrl(props?.['Hero Image'])
  if (hero) return hero
  return page?.cover?.file?.url ?? page?.cover?.external?.url ?? null
}

/** 把 Notion blocks 全部撈完（自動翻頁） */
export async function fetchAllBlocks(notion: Client, pageId: string) {
  let cursor: string | undefined
  const out: any[] = []
  do {
    const r = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100,
      start_cursor: cursor,
    })
    out.push(...r.results)
    cursor = r.has_more ? (r.next_cursor ?? undefined) : undefined
  } while (cursor)
  return out
}

/** blocks -> 前端 nodes：支援 paragraph/h1~h3/quote/divider/image/bulleted list */
export function blocksToNodes(input: any[]) {
  const out: any[] = []
  let ulBuf: { type: 'li'; text: string }[] | null = null
  const flushUl = () => {
    if (ulBuf?.length) out.push({ type: 'ul', children: ulBuf })
    ulBuf = null
  }

  for (const b of input ?? []) {
    const t = b?.type
    switch (t) {
      case 'paragraph': {
        flushUl()
        const text = toPlain(b.paragraph?.rich_text)
        if (text) out.push({ type: 'p', text })
        break
      }
      case 'heading_1':
      case 'heading_2':
      case 'heading_3': {
        flushUl()
        const text = toPlain(b[t]?.rich_text)
        if (!text) break
        out.push({ type: t === 'heading_1' ? 'h1' : t === 'heading_2' ? 'h2' : 'h3', text })
        break
      }
      case 'quote': {
        flushUl()
        const text = toPlain(b.quote?.rich_text)
        if (text) out.push({ type: 'quote', text })
        break
      }
      case 'bulleted_list_item': {
        const text = toPlain(b.bulleted_list_item?.rich_text)
        if (!text) break
        if (!ulBuf) ulBuf = []
        ulBuf.push({ type: 'li', text })
        break
      }
      case 'divider': {
        flushUl()
        out.push({ type: 'divider' })
        break
      }
      case 'image': {
        flushUl()
        const src = b.image?.file?.url || b.image?.external?.url
        const caption = toPlain(b.image?.caption)
        if (src) out.push({ type: 'img', src, caption })
        break
      }
      default: {
        flushUl()
        // 其他型別先忽略
        break
      }
    }
  }
  flushUl()
  return out
}

/** 把 page 映射為列表卡片需要的結構（Resource/Project 共用） */
export function mapPageToCard(page: any) {
    const p = page.properties ?? {}

    // Project 專用右側視覺
    const sideType  = p['Project: Side Type']?.select?.name ?? 'none'
    const sideImage = firstFileUrl(p['Project: Side Image'])

    return {
        id: page.id,
        slug: p.Slug?.rich_text?.[0]?.plain_text ?? page.id,
        title: p.Title?.title?.[0]?.plain_text ?? '',
        published_at: p.Date?.date?.start ?? '',
        description: p.Excerpt?.rich_text?.[0]?.plain_text ?? '',
        image_url: heroUrl(page, p),
        tags: (p.Category?.multi_select ?? []).map((t: any) => t.name),

        side_type: String(sideType).toLowerCase(), // 'image'|'circle'|'pills'|'triangle'|'none'
        side_image: sideImage,
    }
}

/** 依 slug + Type 在 data source 查單篇，回傳 pageId（找不到回 null） */
export async function findPageIdBySlug(
    notion: Client,
    dataSourceId: string,
    slug: string,
    expectedType?: 'Resource' | 'Project'
    ): Promise<string | null> {
    const and: any[] = [{ property: 'Slug', rich_text: { equals: slug } }]
    if (expectedType) and.push({ property: 'Type', select: { equals: expectedType } })

    const res = await notion.dataSources.query({
        data_source_id: dataSourceId,
        page_size: 1,
        filter: { and },
    })
    return res.results[0]?.id ?? null
}
