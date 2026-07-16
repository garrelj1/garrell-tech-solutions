import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Federal Software Delivery, Cloud to Tactical Edge',
  description:
    'Garrell Tech Solutions is a small-business federal software consultancy: custom application development, cloud migration, and legacy modernization for federal primes and agencies. Proven on FBI CJIS, N-DEx, and Army/USMC programs.',
})

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Garrell Tech Solutions LLC',
  url: 'https://garrellts.com',
  logo: 'https://garrellts.com/static/images/gts-logo-full-color.png',
  foundingDate: '2024-11',
  description:
    'Custom software development and cloud engineering for federal primes and agencies, from cloud back-end to tactical edge.',
  email: 'jeremy@garrellts.com',
  telephone: '+1-201-400-7782',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Coral Springs',
    addressRegion: 'FL',
    postalCode: '33065',
    addressCountry: 'US',
  },
  founder: {
    '@type': 'Person',
    name: 'Jeremy Garrell',
  },
  sameAs: ['https://www.linkedin.com/company/107989162/'],
}

const PRIMARY = 'text-primary-800 dark:text-primary-300'
const PRIMARY_BORDER = 'border-primary-800/30 dark:border-primary-300/30'

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return (
    <div className="mb-5">
      <h2
        id={id}
        className={`text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm ${PRIMARY}`}
      >
        {children}
      </h2>
      <div className="bg-gold mt-2 h-px w-12" />
    </div>
  )
}

function MintPanel({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-mint border-gold dark:border-gold rounded-lg border-t-4 p-5 sm:p-6 dark:bg-gray-900">
      {children}
    </div>
  )
}

function StatBlock({ value, suffix, label }: { value: string; suffix?: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-primary-800 text-3xl font-bold sm:text-4xl">
        {value}
        {suffix && <span className="text-gold">{suffix}</span>}
      </div>
      <div className="text-primary-800/70 mt-1 text-xs sm:text-sm">{label}</div>
    </div>
  )
}

function DifferentiatorItem({ lead, body }: { lead: string; body: string }) {
  return (
    <li className="border-gold/70 border-l-2 pl-4">
      <span className="font-semibold text-gray-900 dark:text-gray-100">{lead}</span>{' '}
      <span className="text-gray-700 dark:text-gray-300">{body}</span>
    </li>
  )
}

function EngagementItem({ title, meta, body }: { title: string; meta?: string; body: string }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 dark:text-gray-100">
        {title}
        {meta && <span className="font-normal text-gray-500 dark:text-gray-400"> — {meta}</span>}
      </h4>
      <p className="mt-1 text-gray-600 dark:text-gray-400">{body}</p>
    </div>
  )
}

function CompanyDataRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 py-2 sm:flex-row sm:gap-6">
      <dt className="w-full text-xs font-semibold tracking-wide text-gray-500 uppercase sm:w-40 sm:shrink-0 dark:text-gray-400">
        {label}
      </dt>
      <dd className="text-gray-900 dark:text-gray-100">{value}</dd>
    </div>
  )
}

function IconBase({ children }: { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 shrink-0"
      aria-hidden="true"
    >
      {children}
    </svg>
  )
}

const ShieldIcon = () => (
  <IconBase>
    <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" />
  </IconBase>
)

const InstitutionIcon = () => (
  <IconBase>
    <path d="M4 10l8-6 8 6M5 10v10h14V10M9 20v-6h6v6" />
  </IconBase>
)

const StarIcon = () => (
  <IconBase>
    <path d="M12 3l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3z" />
  </IconBase>
)

const AnchorIcon = () => (
  <IconBase>
    <circle cx="12" cy="4.5" r="1.75" />
    <line x1="12" y1="6.5" x2="12" y2="21" />
    <line x1="8.5" y1="10" x2="15.5" y2="10" />
    <path d="M5 14a7 7 0 0 0 14 0" />
  </IconBase>
)

const PhoneIcon = () => (
  <IconBase>
    <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5c0-.6.4-1 1-1h3.4c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1L6.6 10.8z" />
  </IconBase>
)

const HealthIcon = () => (
  <IconBase>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 8v8M8 12h8" />
  </IconBase>
)

function SupportedBadge({ icon, name }: { icon: React.ReactNode; name: string }) {
  return (
    <div
      className={`flex shrink-0 items-center gap-2 rounded-md border px-4 py-3 ${PRIMARY} ${PRIMARY_BORDER}`}
    >
      {icon}
      <span className="text-sm font-medium whitespace-nowrap text-gray-700 dark:text-gray-300">
        {name}
      </span>
    </div>
  )
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="xl:w-6xl">
        {/* Hero */}
        <section
          aria-labelledby="hero-heading"
          className="flex flex-col gap-4 pt-6 pb-8 sm:flex-row sm:items-end sm:justify-between sm:pt-8 sm:pb-10"
        >
          <div>
            <p
              className={`text-xs font-semibold tracking-[0.25em] uppercase sm:text-sm ${PRIMARY}`}
            >
              Custom Software · Strategic Growth
            </p>
            <h1
              id="hero-heading"
              className="mt-3 text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl dark:text-gray-100"
            >
              Garrell Tech Solutions LLC
            </h1>
          </div>
          <div className={`rounded-lg border p-4 text-sm ${PRIMARY_BORDER}`}>
            <a
              href="mailto:jeremy@garrellts.com"
              className={`block font-semibold hover:underline ${PRIMARY}`}
            >
              jeremy@garrellts.com
            </a>
            <a
              href="tel:+12014007782"
              className="mt-1 block text-gray-600 hover:underline dark:text-gray-400"
            >
              (201) 400-7782
            </a>
            <a
              href="https://calendly.com/jeremy-garrell/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold mt-2 inline-block text-xs font-semibold tracking-wide uppercase hover:underline"
            >
              Book a 30-min call →
            </a>
          </div>
        </section>

        {/* Supported agencies and enterprise systems */}
        <section aria-label="Supported agencies and enterprise systems">
          <p className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Supported Agencies and Enterprise Systems
          </p>
          <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
            <SupportedBadge icon={<ShieldIcon />} name="Federal Bureau of Investigation" />
            <SupportedBadge icon={<InstitutionIcon />} name="U.S. Department of Justice" />
            <SupportedBadge icon={<StarIcon />} name="U.S. Army" />
            <SupportedBadge icon={<AnchorIcon />} name="U.S. Marine Corps" />
            <SupportedBadge icon={<PhoneIcon />} name="Callpurity" />
            <SupportedBadge icon={<HealthIcon />} name="Pro Health Partners" />
          </div>
        </section>

        {/* Key stats band */}
        <section
          aria-label="Key figures"
          className="bg-mint -mx-4 px-4 py-6 sm:mx-0 sm:rounded-lg sm:px-10"
        >
          <p className="text-primary-800/70 mb-4 text-center text-xs font-semibold tracking-[0.2em] uppercase sm:text-sm">
            Principal&rsquo;s Track Record
          </p>
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-5 sm:gap-4">
            <StatBlock value="10" suffix="+" label="Years of federal software delivery" />
            <StatBlock value="3" label="Federal customers — FBI · Army · USMC" />
            <StatBlock value="3" label="Legacy systems modernized" />
            <StatBlock value="150" suffix="+" label="Businesses served on Callpurity SaaS" />
            <StatBlock value="1M" suffix="+" label="Records managed across 50 states" />
          </div>
        </section>

        {/* Company overview */}
        <section aria-labelledby="overview-heading" className="py-8">
          <SectionHeading id="overview-heading">Company Overview</SectionHeading>
          <p className="max-w-3xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            Founded in November 2024, Garrell Tech Solutions LLC is built around a decade of
            hands-on delivery its principal has logged across defense and federal law-enforcement
            programs. The firm modernizes legacy systems and retires costly licenses (on-prem ETL →
            AWS GovCloud; Micro Focus IDOL → OpenSearch), delivers as a single vendor from cloud
            back-end to embedded tactical edge, and applies product-owner discipline that turns
            stakeholder needs into shipped software. Proven on the FBI CJIS mission in 2022–2024 and
            brought back to it in 2025.
          </p>
        </section>

        {/* Core competencies */}
        <section aria-labelledby="competencies-heading" className="py-8">
          <SectionHeading id="competencies-heading">Core Competencies</SectionHeading>
          <ul className="grid gap-x-8 gap-y-3 text-gray-700 sm:grid-cols-2 dark:text-gray-300">
            <li>Custom application development (web & mobile)</li>
            <li>Cloud engineering & migration (AWS / GovCloud)</li>
            <li>Legacy modernization & on-prem-to-cloud migration</li>
            <li>Microservices & high-throughput data pipelines</li>
            <li>Enterprise search (OpenSearch / Elasticsearch)</li>
            <li>Android, embedded & tactical-edge software</li>
            <li>DevSecOps & CI/CD automation</li>
            <li>Product ownership & technical team leadership</li>
          </ul>
        </section>

        {/* Differentiators */}
        <section aria-labelledby="differentiators-heading" className="py-8">
          <SectionHeading id="differentiators-heading">Differentiators</SectionHeading>
          <MintPanel>
            <ul className="grid gap-4 sm:grid-cols-2">
              <DifferentiatorItem
                lead="Lower delivery risk —"
                body="proven on the FBI CJIS mission (2022–2024) and brought back to it in 2025."
              />
              <DifferentiatorItem
                lead="One vendor, cloud to edge —"
                body="AWS / GovCloud back-end through embedded tactical software; fewer integration seams."
              />
              <DifferentiatorItem
                lead="Modernization that cuts cost —"
                body="retires legacy systems & licenses (on-prem ETL → GovCloud; IDOL → OpenSearch)."
              />
              <DifferentiatorItem
                lead="Senior talent, small-business rates —"
                body="principal-level delivery without integrator overhead."
              />
              <DifferentiatorItem
                lead="Product-owner discipline —"
                body="turns stakeholder needs into shipped products, cutting requirements-translation overhead."
              />
            </ul>
          </MintPanel>
        </section>

        {/* Program experience */}
        <section aria-labelledby="experience-heading" className="py-8">
          <SectionHeading id="experience-heading">Past Performance</SectionHeading>

          <h3 className="text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Company Engagements
          </h3>
          <div className="mt-3 space-y-4">
            <EngagementItem
              title="FBI CJIS — Contract Software Engineer"
              meta="via Fusion Technology · Jul 2025 – Present"
              body="Application-development and cloud engineering services to the FBI Criminal Justice Information Services Division, delivered through Fusion Technology."
            />
            <EngagementItem
              title="Callpurity — B2B SaaS Platform"
              meta="Fractional CTO, contractor engagement via GTS · Current"
              body="Serving as contractor CTO, leading a 7-person team (four engineers, a designer, two contractors) building a B2B SaaS platform serving 150+ business customers and hundreds of users, with 1M+ phone numbers under management across all 50 states."
            />
          </div>

          <h3 className="mt-6 text-sm font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
            Principal&rsquo;s Federal Program Experience
          </h3>
          <div className="mt-3 space-y-4">
            <EngagementItem
              title="FBI N-DEx Modernization"
              meta="via ManTech / Fusion Technology, 2022–2024"
              body="Supported modernization of the FBI's National Data Exchange (N-DEx): built AWS microservices for a high-throughput data-ingest pipeline, migrated an on-prem ETL pipeline to AWS GovCloud, and moved enterprise search from Micro Focus IDOL to OpenSearch."
            />
            <EngagementItem
              title="U.S. Army & USMC, Picatinny Arsenal"
              meta="via Parsons & Decilog"
              body="Led Android modernization of a mortar fire-control system; delivered fire-control application suites and single-board-computer Linux BSP support for new hardware."
            />
            <EngagementItem
              title="U.S. Army RF Systems"
              meta="via Booz Allen Hamilton"
              body="Developed Android software to interface with and visualize data from an RF detection system."
            />
          </div>
          <p className="mt-4 text-sm text-gray-500 italic dark:text-gray-400">
            Principal&rsquo;s program experience delivered under prior prime contractors, not
            contracts held by Garrell Tech Solutions LLC.
          </p>
        </section>

        {/* Core technologies */}
        <section aria-labelledby="tech-heading" className="py-8">
          <SectionHeading id="tech-heading">Core Technologies</SectionHeading>
          <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Languages
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                Java, Python, TypeScript, JavaScript, Rust, C, SQL
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                AWS
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                EC2, S3, RDS, Lambda, SAM, CloudFormation
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Platforms & Frameworks
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                Spring, Android/AOSP, RESTful services, OpenSearch, Linux
              </dd>
            </div>
            <div>
              <dt className="text-xs font-semibold tracking-wide text-gray-500 uppercase dark:text-gray-400">
                Tooling
              </dt>
              <dd className="mt-1 text-gray-700 dark:text-gray-300">
                Git, Jira, Bitbucket, Bamboo, Maven, Gradle
              </dd>
            </div>
          </dl>
        </section>

        {/* Company data */}
        <section aria-labelledby="company-data-heading" className="py-8">
          <SectionHeading id="company-data-heading">Company Data</SectionHeading>
          <MintPanel>
            <dl className="divide-y divide-gray-900/10 dark:divide-gray-100/10">
              <CompanyDataRow label="Legal Entity" value="Garrell Tech Solutions LLC" />
              <CompanyDataRow label="Founded" value="November 2024" />
              <CompanyDataRow label="UEI" value="GG32V7Y6B1A2" />
              <CompanyDataRow label="CAGE / NCAGE" value="20E53" />
              <CompanyDataRow
                label="NAICS Codes"
                value={
                  <ul className="space-y-1">
                    <li>541511 · Custom Computer Programming</li>
                    <li>541512 · Computer Systems Design</li>
                    <li>541519 · Other Computer Related Services</li>
                  </ul>
                }
              />
              <CompanyDataRow label="Certifications" value="Small Business (SB)" />
              <CompanyDataRow label="Delivery Model" value="Remote — nationwide, all 50 states" />
            </dl>
          </MintPanel>
        </section>

        {/* Contact */}
        <section aria-labelledby="contact-heading" className="py-8">
          <SectionHeading id="contact-heading">Contact</SectionHeading>
          <div className="bg-primary-800 dark:bg-primary-900 max-w-md rounded-lg p-6 text-white">
            <p className="text-lg font-semibold">Jeremy Garrell</p>
            <p className="text-white/70">Founder & Principal Engineer</p>
            <dl className="mt-3 space-y-1.5">
              <div className="flex gap-2">
                <dt className="text-white/70">Email</dt>
                <dd>
                  <a href="mailto:jeremy@garrellts.com" className="hover:text-gold hover:underline">
                    jeremy@garrellts.com
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-white/70">Phone</dt>
                <dd>
                  <a href="tel:+12014007782" className="hover:text-gold hover:underline">
                    (201) 400-7782
                  </a>
                </dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-white/70">Location</dt>
                <dd>Coral Springs, FL 33065</dd>
              </div>
              <div className="flex gap-2">
                <dt className="text-white/70">Web</dt>
                <dd>
                  <a href="https://garrellts.com" className="hover:text-gold hover:underline">
                    garrellts.com
                  </a>
                </dd>
              </div>
            </dl>
            <a
              href="https://calendly.com/jeremy-garrell/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gold text-primary-900 hover:bg-gold/90 mt-5 inline-block rounded-md px-5 py-2.5 text-center text-sm font-semibold transition-colors duration-200"
            >
              Book a 30-Minute Call
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
