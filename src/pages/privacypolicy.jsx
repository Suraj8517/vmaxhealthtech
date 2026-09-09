/**
 * NOTE ON INTEGRATION
 * Swap the plain <a href="/"> "Back to home" link for <NavLink to="/">
 * from react-router-dom in a routed app, same as Navbar/Footer.
 *
 * This page sits below the fixed Navbar, so it reserves top padding
 * matching the Navbar's height steps (h-14 / sm:h-16 / md:h-[68px]).
 *
 * "Space Grotesk" is loaded once globally alongside Navbar/Footer — no
 * font injection happens here.
 */

const SECTIONS = [
  { id: "intro", label: "Introduction" },
  { id: "user-information", label: "User information" },
  { id: "sharing", label: "Sharing & disclosure" },
  { id: "health-data", label: "Health data & cookies" },
  { id: "updates", label: "Policy updates" },
];

const OPT_OUT_METHODS = [
  "Following the unsubscribe instructions in any email you receive",
  "Making a specific request during a call",
  "Contacting us directly",
];

function SectionHeading({ id, children }) {
  return (
    <h2
      id={id}
      className="scroll-mt-24 text-xl font-bold uppercase tracking-[-0.01em] text-[#F1F1EA] sm:text-2xl md:scroll-mt-28"
    >
      {children}
    </h2>
  );
}

function P({ children }) {
  return <p className="mt-4 text-[15px] leading-relaxed text-[#B9BAB2] sm:text-base">{children}</p>;
}

function BulletList({ items }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-[#B9BAB2] sm:text-base">
          <span aria-hidden="true" className="mt-[9px] h-1 w-1 flex-shrink-0 rounded-full bg-[#E63A2E]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#0A0A08] font-[Space_Grotesk,sans-serif] text-[#F1F1EA]">
      {/* Page header */}
      <div className="border-b border-[#26261F] px-5 pt-24 pb-10 sm:px-8 sm:pt-28 md:px-8 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-[1180px]">
          <a
            href="/"
            className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E7066] no-underline transition-colors duration-150 hover:text-[#E63A2E]"
          >
            Back to home
          </a>
        
          <h1 className="mt-3 text-[clamp(30px,6.5vw,52px)] font-bold uppercase leading-[0.98] tracking-[-0.02em]">
            Privacy Policy
          </h1>
          <p className="mt-3 max-w-[60ch] text-sm leading-relaxed text-[#6E7066]">
            VMax Health Tech, incorporated under the Companies Act, 2024, with its registered office at No.
            1B, Rangammal Colony, Idikarai, Coimbatore, Tamil Nadu, India, 641022.
          </p>
        </div>
      </div>

      {/* Body: sticky nav (desktop) + content */}
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          {/* Section nav */}
          <nav aria-label="Table of contents" className="hidden md:block">
            <div className="sticky top-28">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6E7066]">
                On this page
              </span>
              <ul className="mt-4 space-y-1 border-l border-[#26261F]">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm text-[#6E7066] no-underline transition-colors duration-150 hover:border-[#E63A2E] hover:text-[#F1F1EA]"
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Mobile section list */}
          <details className="rounded-none border border-[#26261F] px-4 py-3 md:hidden">
            <summary className="cursor-pointer text-xs font-semibold uppercase tracking-[0.08em] text-[#F1F1EA]">
              Jump to a section
            </summary>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {SECTIONS.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-[13px] text-[#6E7066] no-underline hover:text-[#E63A2E]">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </details>

          {/* Content */}
          <div className="min-w-0 max-w-[70ch]">
            <section id="intro" className="scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="intro-heading">Introduction</SectionHeading>
              <P>
                VMax Health Tech is referred to as &ldquo;VMax,&rdquo; &ldquo;We,&rdquo; and &ldquo;Us.&rdquo;
                The agreement between you and us is entirely governed by these terms and any applicable
                policies, and it supersedes all other agreements.
              </P>
              <P>
                We are dedicated to maintaining the privacy and security of your personal information. Your
                privacy is important to us, and preserving your trust is our top priority.
              </P>
              <P>
                This Privacy Policy describes our privacy practices for all websites, products, and services
                linked to it. It does not apply to affiliates and partners that have their own privacy
                policies &ndash; in those cases, we advise reading the privacy statement on the relevant
                website. Capitalized terms not otherwise defined here have the meanings set out in the Terms
                of Use.
              </P>
            </section>

            <section id="user-information" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="user-information-heading">User information</SectionHeading>
              <P>
                As part of the registration process and when you interact with the App, we ask for specific
                details. Through the App Services, we collect this data in various formats and from various
                sources, including account registration forms, contact forms, and customer support
                interactions.
              </P>
              <P>
                Using various technologies, we gather data about how you navigate our website and/or
                application. This includes information on the actions you take while using our services,
                such as the services you request, payment methods, and transaction details. We do not
                collect data from external sources.
              </P>
            </section>

            <section id="sharing" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="sharing-heading">Sharing &amp; disclosure of data with third parties</SectionHeading>
              <P>
                As required by law, we may be obligated to disclose your personal information &ndash;
                including transactional and financial data &ndash; to relevant authorities. If we believe
                disclosure is necessary to protect our rights or the rights of others, or to comply with a
                judicial proceeding, court order, or other legal process served on our website or app, we
                will share information in response to lawful requests from law enforcement agencies.
              </P>
              <P>
                We reserve the right to share personally identifiable information collected through our
                website or application with other counterparties and partners who are not acting as our
                suppliers or business partners.
              </P>
              <P>
                Except as stated in this Privacy Policy, we will not share your personal information without
                your explicit authorization. We do not sell or lease personal data. We may use your
                information for marketing purposes, but only with your express consent. You have full control
                over receiving marketing communications from us, and can opt out at any time by:
              </P>
              <BulletList items={OPT_OUT_METHODS} />
            </section>

            <section id="health-data" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="health-data-heading">Health data and cookies</SectionHeading>
              <P>
                We value the privacy and security of our users. Our App requests access to health-related
                permissions, specifically the ability to read steps, activity, calorie, and sleep information.
                This data is collected solely to enhance the user experience and provide health and
                fitness-related features.
              </P>
              <P>
                Our App uses these health-related permissions to track daily steps, activity, calorie intake,
                and sleep patterns. This data is processed locally on the user&rsquo;s device and is not
                shared with any third parties.
              </P>
              <P>
                Our App does not share health-related data with third-party services, advertisers, or
                external entities, and we do not engage in the sale or exchange of user data. However, clients
                agree to receive promotional calls, consultation calls, and SMS messages on the number
                provided. These calls and messages may be sent via a third-party platform.
              </P>
              <P>
                To better understand user engagement, analyze the App Services, and ensure trust and
                security, we employ data collection tools like &ldquo;cookies&rdquo; &ndash; small files
                stored on your device that help us deliver App Services. Some App features may only be
                available when cookies are enabled. You can decline our cookies if your device settings
                allow, but doing so may limit your access to certain features.
              </P>
            </section>

            <section id="updates" className="mt-12 scroll-mt-24 border-b border-[#26261F] pb-16 md:scroll-mt-28">
              <SectionHeading id="updates-heading">Policy updates</SectionHeading>
              <P>
                We reserve the right to modify this Privacy Policy at any time. Any amendments will become
                effective immediately upon publication of the updated Privacy Policy. We strongly encourage
                you to review this page regularly to stay informed about our privacy practices.
              </P>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}