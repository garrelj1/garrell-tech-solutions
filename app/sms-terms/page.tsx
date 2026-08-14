import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'SMS Terms & Conditions',
  description: 'Terms governing Garrell Tech Solutions’ SMS inquiry notification program.',
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
        <PageTitle>SMS Terms &amp; Conditions</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Effective date: August 4, 2026
        </p>
      </div>
      <div className="prose dark:prose-invert max-w-none py-12">
        <h2>Program description</h2>
        <p>
          Garrell Tech Solutions&apos; inquiry notification SMS service sends a text message to an
          enrolled business owner each time a visitor submits the contact form on their website.
        </p>

        <h2>Eligibility</h2>
        <p>
          This program is available to business owners or managers who have opted in during
          onboarding, by service agreement, verbal consent, or a signed paper form.
        </p>

        <h2>Message frequency</h2>
        <p>
          Message frequency varies with how many inquiries a subscriber&apos;s website receives —
          one message per inquiry, not a fixed number per month. Some periods may include no
          messages at all.
        </p>

        <h2>Cost</h2>
        <p>Message and data rates may apply.</p>

        <h2>No sharing for marketing</h2>
        <p>
          No mobile information will be shared with third parties or affiliates for marketing or
          promotional purposes. Information sharing to subcontractors for support services (e.g.,
          customer service) is permitted. All other categories exclude text messaging originator
          opt-in data and consent from being shared with any third parties.
        </p>

        <h2>Privacy</h2>
        <p>
          How we handle enrolled phone numbers is described in our{' '}
          <a href="/sms-privacy">SMS Privacy Policy</a>.
        </p>

        <h2>Opting out</h2>
        <p>
          Reply <strong>STOP</strong> at any time to opt out of this program.
        </p>

        <h2>Help</h2>
        <p>
          Reply <strong>HELP</strong> for help, or contact us at{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>

        <h2>Carrier liability</h2>
        <p>Carriers are not liable for delayed or undelivered messages.</p>

        <h2>Changes to these terms</h2>
        <p>
          We may update these terms from time to time. Changes take effect when posted on this page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms:{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>
      </div>
    </div>
  )
}
