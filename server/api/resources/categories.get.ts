import { Client } from "@notionhq/client";
import { defineEventHandler, createError } from "h3";

export default defineEventHandler(async (event) => {
    const { notionToken, notionDataSourceId } = useRuntimeConfig(event)
    if (!notionToken || !notionDataSourceId) {
        throw createError({ statusCode: 500, statusMessage: 'Missing NOTION_TOKEN / NOTION_DATASOURCE_ID' })
    }

    const notion = new Client({ 
        auth: notionToken,
        notionVersion: '2025-09-03'
    })

    const ds = await notion.dataSources.retrieve({ 
        data_source_id: notionDataSourceId 
    })

    const prop = (ds as any).properties?.['Category']
    const options = prop?.multi_select?.options ?? []

    const categories = options.map((o: any) => o.name)
    return { categories }
})