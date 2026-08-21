import { allBlogs } from 'contentlayer/generated'
import { sortPosts } from 'pliny/utils/contentlayer'
import siteMetadata from '@/data/siteMetadata'
import { docMarkdownUrl, publishedDocs } from '../docs/docs'

export const dynamic = 'force-static'

/**
 * https://llmstxt.org convention: a single plain-text index that points a
 * retrieval agent at the markdown copies of this site's content.
 */
export async function GET() {
  const docs = publishedDocs
    .map((doc) => `- [${doc.title}](${docMarkdownUrl(doc.slug)}): ${doc.summary || ''}`.trim())
    .join('\n')

  const posts = sortPosts(allBlogs.filter((post) => !post.draft))
    .map((post) =>
      `- [${post.title}](${siteMetadata.siteUrl}/${post.path}): ${post.summary || ''}`.trim()
    )
    .join('\n')

  const body = `# ${siteMetadata.headerTitle}

> ${siteMetadata.description}. Custom software, systems architecture, and automation work by ${siteMetadata.author}.

## Standards and architecture documents

${docs}

## Blog

${posts}

## Pages

- [About](${siteMetadata.siteUrl}/about): Who Garrell Tech Solutions is and what it builds.
- [Projects](${siteMetadata.siteUrl}/projects): Selected work.
- [Contact](mailto:${siteMetadata.email}): Email ${siteMetadata.author}.
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
