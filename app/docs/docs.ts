import { allDocs, type Doc } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

/** Docs that should be published. Drafts are excluded from every route. */
export const publishedDocs = allDocs.filter((doc) => !doc.draft)

export function getDoc(slug: string): Doc | undefined {
  return publishedDocs.find((doc) => doc.slug === slug)
}

export function docPath(slug: string) {
  return `/docs/${slug}`
}

export function docMarkdownPath(slug: string) {
  return `/docs/${slug}.md`
}

export function docUrl(slug: string) {
  return `${siteMetadata.siteUrl}${docPath(slug)}`
}

export function docMarkdownUrl(slug: string) {
  return `${siteMetadata.siteUrl}${docMarkdownPath(slug)}`
}

export function docUpdated(doc: Doc) {
  return (doc.lastmod || doc.date).split('T')[0]
}

/**
 * The payload served at /docs/<slug>.md.
 *
 * The frontmatter is regenerated rather than passed through so that a retrieval
 * client gets the canonical URL, publisher, and update date alongside the body,
 * without depending on whatever keys the source file happens to carry.
 */
export function renderDocMarkdown(doc: Doc): string {
  const frontmatter: [string, string][] = [
    ['title', doc.title],
    ['description', doc.summary || ''],
    ['publisher', siteMetadata.headerTitle],
    ['source', docUrl(doc.slug)],
    ['markdown_source', docMarkdownUrl(doc.slug)],
    ['updated', docUpdated(doc)],
  ]

  const yaml = frontmatter
    .filter(([, value]) => value)
    // JSON string escaping is valid YAML double-quoted scalar syntax, so this
    // stays correct for titles and summaries containing colons or quotes.
    .map(([key, value]) => `${key}: ${JSON.stringify(value)}`)
    .join('\n')

  return `---\n${yaml}\n---\n\n# ${doc.title}\n\n${doc.body.raw.trim()}\n`
}
