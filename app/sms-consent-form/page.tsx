import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'SMS Opt-In Methods (Reference)',
  description:
    'Reference copy of the verbal script and paper form used to enroll business owners in the SMS lead-alert notification program.',
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
        <PageTitle>SMS Opt-In Methods (Reference)</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Effective date: August 5, 2026
        </p>
      </div>
      <div className="py-12">
        <div className="prose dark:prose-invert max-w-none">
          <p>
            Garrell Tech Solutions enrolls business owners in its SMS lead-alert notification
            program two ways: a verbal opt-in read during onboarding, or a signed paper form
            completed in person. Neither is a public web form — this page exists only so reviewers
            can see the exact consent language used. Signed originals and records of verbal consent
            are retained by Garrell Tech Solutions as private internal business records and are
            never published here.
          </p>

          <h2>Verbal opt-in script</h2>
          <p>Read by phone or in person during onboarding, before enrollment:</p>
        </div>

        <div className="mt-4 max-w-2xl rounded-lg border-2 border-gray-300 p-6 text-gray-800 italic dark:border-gray-600 dark:text-gray-200">
          <p>
            &ldquo;Before I add your number, I need your OK to text you. Here&apos;s what that
            means:
          </p>
          <p className="mt-4">
            This is <strong>Garrell Tech Solutions</strong>&apos; lead-alert service for your
            website. Once you&apos;re set up, we&apos;ll send a text to this number every time a
            visitor submits the contact form on your website — one message per lead, with the
            visitor&apos;s name, phone number, and requested pickup window. That&apos;s not a fixed
            number per month; it&apos;s driven by how many leads your site gets, so it could be
            several a week or none.
          </p>
          <p className="mt-4">
            Standard message and data rates may apply. Reply HELP at any time for help, or STOP to
            opt out and stop receiving these alerts. Our Privacy Policy is at
            garrellts.com/sms-privacy and our Terms of Service are at garrellts.com/sms-terms.{' '}
            <strong>Your mobile number will not be shared or sold.</strong>
          </p>
          <p className="mt-4">
            This is optional — if you&apos;d rather not, that&apos;s completely fine, your website
            and email lead alerts work exactly the same either way.
          </p>
          <p className="mt-4">
            Do you consent to receive these text alerts at this number — yes or no?&rdquo;
          </p>
        </div>

        <div className="prose dark:prose-invert mt-4 max-w-none">
          <p>
            On a <strong>yes</strong>: &ldquo;Great — you&apos;re enrolled. You&apos;ll get your
            first alert the next time a visitor submits your form. Reply STOP anytime to opt
            out.&rdquo; On a <strong>no</strong> or unclear answer, the number is not added — the
            business keeps the service, just without SMS alerts.
          </p>

          <h2>Paper form — blank template</h2>
          <p>Completed and signed in person during onboarding:</p>
        </div>

        <ConsentFormCard />

        <div className="prose dark:prose-invert mt-8 max-w-none">
          <h2>Paper form — sample (fake data, for illustration only)</h2>
          <p>
            <em>
              &ldquo;Suds &amp; Bubbles Laundromat&rdquo; and &ldquo;Jamie Sample&rdquo; are
              fabricated — not a real client. This shows what a completed, signed form looks like
              without publishing any real customer&apos;s data.
            </em>
          </p>
        </div>

        <ConsentFormCard sample />

        <p className="prose dark:prose-invert mt-8 max-w-none">
          Printed copies used in the field carry a QR code linking back to this page. Questions:{' '}
          <a href={`mailto:${siteMetadata.email}`}>{siteMetadata.email}</a>.
        </p>
      </div>
    </div>
  )
}

function ConsentFormCard({ sample = false }: { sample?: boolean }) {
  return (
    <div className="mt-4 max-w-xl rounded-lg border-2 border-gray-300 p-8 dark:border-gray-600">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        Garrell Tech Solutions — SMS Lead Alert Enrollment{sample ? ' (SAMPLE)' : ''}
      </h3>

      <div className="space-y-4 text-gray-800 dark:text-gray-200">
        <p>
          Business name:{' '}
          {sample ? (
            'Suds & Bubbles Laundromat'
          ) : (
            <span className="inline-block w-64 border-b border-gray-400" />
          )}
        </p>
        <p>
          Owner/manager name:{' '}
          {sample ? (
            'Jamie Sample'
          ) : (
            <span className="inline-block w-64 border-b border-gray-400" />
          )}
        </p>
        <p>
          Mobile phone number:{' '}
          {sample ? (
            '(555) 010-0100'
          ) : (
            <span className="inline-block w-64 border-b border-gray-400" />
          )}
        </p>

        <p>
          <strong>What this is:</strong> Garrell Tech Solutions will text this number every time a
          visitor submits the contact form on your website — one message per lead (name, phone,
          requested pickup window). Frequency depends on your site&apos;s lead volume, not a fixed
          count.
        </p>

        <p>
          Message and data rates may apply. Reply <strong>HELP</strong> for help,{' '}
          <strong>STOP</strong> to opt out at any time.{' '}
          <strong>Your mobile number will not be shared or sold.</strong>
        </p>

        <p>This is optional — declining does not affect your website or email lead alerts.</p>

        <p>
          Privacy Policy: <a href="https://garrellts.com/sms-privacy">garrellts.com/sms-privacy</a>
          <br />
          Terms of Service: <a href="https://garrellts.com/sms-terms">garrellts.com/sms-terms</a>
        </p>

        <p>
          <span className="inline-block border border-gray-500 px-2 py-0.5 text-sm">
            {sample ? 'x' : <>&nbsp;&nbsp;</>}
          </span>{' '}
          I consent to receive these SMS alerts at the number above.
        </p>

        <p className="flex gap-8">
          <span>
            Signature:{' '}
            {sample ? (
              'Jamie Sample'
            ) : (
              <span className="inline-block w-48 border-b border-gray-400" />
            )}
          </span>
          <span>
            Date:{' '}
            {sample ? (
              '2026-08-05'
            ) : (
              <span className="inline-block w-32 border-b border-gray-400" />
            )}
          </span>
        </p>
      </div>
    </div>
  )
}
