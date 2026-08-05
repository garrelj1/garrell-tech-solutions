import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'SMS Consent Form (Reference Copy)',
  description:
    'Reference copy of the paper form used to enroll business owners in the SMS lead-alert notification program.',
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
        <PageTitle>SMS Consent Form (Reference Copy)</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Effective date: August 5, 2026
        </p>
      </div>
      <div className="py-12">
        <p className="prose dark:prose-invert max-w-none">
          This is a reference copy of the paper form used to enroll a business owner in the SMS
          lead-alert notification program during in-person onboarding. Completed, signed originals
          are retained by Garrell Tech Solutions as private records and are never published — this
          blank copy exists only so reviewers can see the consent language used.
        </p>
        <div className="mt-8 max-w-xl rounded-lg border-2 border-gray-300 p-8 dark:border-gray-600">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
            Garrell Tech Solutions — SMS Lead Alert Enrollment
          </h2>

          <div className="space-y-4 text-gray-800 dark:text-gray-200">
            <p>
              Business name: <span className="inline-block w-64 border-b border-gray-400" />
            </p>
            <p>
              Owner/manager name: <span className="inline-block w-64 border-b border-gray-400" />
            </p>
            <p>
              Mobile phone number: <span className="inline-block w-64 border-b border-gray-400" />
            </p>

            <p>
              <strong>What this is:</strong> Garrell Tech Solutions will text this number every time
              a visitor submits the contact form on your website — one message per lead (name,
              phone, requested pickup window). Frequency depends on your site&apos;s lead volume,
              not a fixed count.
            </p>

            <p>
              Message and data rates may apply. Reply <strong>HELP</strong> for help,{' '}
              <strong>STOP</strong> to opt out at any time.
            </p>

            <p>
              Privacy Policy:{' '}
              <a href="https://garrellts.com/sms-privacy">garrellts.com/sms-privacy</a>
              <br />
              Terms of Service:{' '}
              <a href="https://garrellts.com/sms-terms">garrellts.com/sms-terms</a>
            </p>

            <p>
              <span className="inline-block border border-gray-500 px-2 py-0.5 text-sm">
                &nbsp;&nbsp;
              </span>{' '}
              I consent to receive these SMS alerts at the number above.
            </p>

            <p className="flex gap-8">
              <span>
                Signature: <span className="inline-block w-48 border-b border-gray-400" />
              </span>
              <span>
                Date: <span className="inline-block w-32 border-b border-gray-400" />
              </span>
            </p>
          </div>
        </div>
        <p className="prose dark:prose-invert mt-8 max-w-none">
          Printed copies used in the field carry a QR code linking back to this page so a signer can
          review the Privacy Policy and Terms of Service before signing. Questions:{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>
      </div>
    </div>
  )
}
