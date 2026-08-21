import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { docMarkdownPath, docMarkdownUrl, docUpdated, docUrl, getDoc, publishedDocs } from '../docs'

export async function generateStaticParams() {
  return publishedDocs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata | undefined> {
  const { slug } = await props.params
  const doc = getDoc(slug)

  if (!doc) {
    return
  }

  return {
    title: doc.title,
    description: doc.summary,
    alternates: {
      canonical: docUrl(doc.slug),
      // Advertises the raw markdown twin to crawlers and retrieval agents.
      types: {
        'text/markdown': docMarkdownUrl(doc.slug),
      },
    },
    openGraph: {
      title: doc.title,
      description: doc.summary,
      siteName: siteMetadata.title,
      locale: 'en_US',
      type: 'article',
      url: docUrl(doc.slug),
      images: [siteMetadata.socialBanner],
    },
    twitter: {
      card: 'summary_large_image',
      title: doc.title,
      description: doc.summary,
      images: [siteMetadata.socialBanner],
    },
  }
}

export default async function Page(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params
  const doc = getDoc(slug)

  if (!doc) {
    return notFound()
  }

  const updated = docUpdated(doc)
  const rawHref = `${process.env.BASE_PATH || ''}${docMarkdownPath(doc.slug)}`

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: doc.title,
    description: doc.summary,
    datePublished: doc.date,
    dateModified: doc.lastmod || doc.date,
    url: docUrl(doc.slug),
    inLanguage: siteMetadata.locale,
    author: { '@type': 'Organization', name: siteMetadata.headerTitle },
    publisher: { '@type': 'Organization', name: siteMetadata.headerTitle },
    encoding: {
      '@type': 'MediaObject',
      encodingFormat: 'text/markdown',
      contentUrl: docMarkdownUrl(doc.slug),
    },
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <PageTitle>{doc.title}</PageTitle>
        {doc.summary && (
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">{doc.summary}</p>
        )}
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated{' '}
          <time dateTime={updated} suppressHydrationWarning>
            {updated}
          </time>{' '}
          &middot;{' '}
          <a
            href={rawHref}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            Raw markdown
          </a>
        </p>
      </div>
      <div className="prose dark:prose-invert max-w-none py-12">
        <div dangerouslySetInnerHTML={{ __html: doc.body.html }} />
      </div>
      <div className="pt-6 text-sm text-gray-500 dark:text-gray-400">
        <p>
          Machine-readable copy of this document:{' '}
          <a
            href={rawHref}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          >
            {docMarkdownUrl(doc.slug)}
          </a>
        </p>
      </div>
    </div>
  )
}
