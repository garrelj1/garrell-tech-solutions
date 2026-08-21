import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { docMarkdownUrl, docUpdated, docUrl, publishedDocs } from './docs/docs'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  // Both the HTML page and its raw markdown twin are listed, so crawlers that
  // prefer markdown can find it without guessing the URL.
  const docRoutes = publishedDocs.flatMap((doc) => [
    { url: docUrl(doc.slug), lastModified: docUpdated(doc) },
    { url: docMarkdownUrl(doc.slug), lastModified: docUpdated(doc) },
  ])

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...docRoutes, ...blogRoutes]
}
