import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'SMS Privacy Policy',
  description:
    'How Garrell Tech Solutions handles phone numbers collected for its SMS lead-alert notification program.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
})

export default function Page() {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pt-6 pb-8 md:space-y-5">
        <PageTitle>SMS Privacy Policy</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Effective date: August 4, 2026
        </p>
      </div>
      <div className="prose dark:prose-invert max-w-none py-12">
        <p>
          This policy covers only Garrell Tech Solutions&apos; SMS lead-alert notification program,
          described below. It does not cover other data practices on this site — for general privacy
          questions, contact us at <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>
          .
        </p>

        <h2>What we collect</h2>
        <p>
          When a business owner enrolls in our lead-alert SMS service, we collect the mobile phone
          number (and name) they provide for that purpose.
        </p>

        <h2>How we use it</h2>
        <p>
          We use this number solely to send SMS lead-alert notifications for that owner&apos;s
          website — one message each time a visitor submits the contact form on their site. We do
          not use it for any other purpose.
        </p>

        <h2>No sharing for marketing</h2>
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. Information sharing to subcontractors for support services (e.g.,
          customer service) is permitted. All other categories exclude text messaging originator
          opt-in data and consent from being shared with any third parties.
        </p>

        <h2>Opting out</h2>
        <p>
          Reply <strong>STOP</strong> at any time to a lead-alert text to opt out of the program.
          Reply <strong>HELP</strong> for help, or contact us at{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>

        <h2>Data retention and security</h2>
        <p>
          We retain enrolled phone numbers only for as long as an owner remains enrolled in the
          service, and take reasonable measures to protect them from unauthorized access.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy:{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>
      </div>
    </div>
  )
}
