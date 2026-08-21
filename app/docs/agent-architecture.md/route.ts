import { getDoc, renderDocMarkdown } from '../docs'

export const dynamic = 'force-static'

const SLUG = 'agent-architecture'

export async function GET() {
  const doc = getDoc(SLUG)

  if (!doc) {
    return new Response('Not found\n', {
      status: 404,
      headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    })
  }

  return new Response(renderDocMarkdown(doc), {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  })
}
