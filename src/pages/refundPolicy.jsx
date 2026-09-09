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
  { id: "cancellation", label: "No cancellation policy" },
  { id: "refunds", label: "No refund policy" },
  { id: "exception", label: "Exception" },
  { id: "decision", label: "Our decision" },
  { id: "finality", label: "Finality of decision" },
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

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-[#0D0D0B] font-[Space_Grotesk,sans-serif] text-[#F1F1EA]">
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
            Refund &amp; Cancellation Policy
          </h1>
          <p className="mt-3 text-sm text-[#6E7066]">Effective date: 01-01-2024</p>
        </div>
      </div>

      {/* Body: sticky nav (desktop) + content — short doc, no scroll-spy needed */}
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
            <div className="border-l-[3px] border-[#E63A2E] bg-[#111110] px-5 py-4">
              <p className="text-sm font-semibold uppercase tracking-[0.02em] text-[#F1F1EA] sm:text-[15px]">
                Once a purchase or subscription is confirmed, it cannot be cancelled for any reason.
              </p>
            </div>

            <section id="cancellation" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="cancellation-heading">No cancellation policy</SectionHeading>
              <P>
                Once a purchase or subscription is confirmed, it cannot be cancelled for any reason.
              </P>
            </section>

            <section id="refunds" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="refunds-heading">No refund policy</SectionHeading>
              <P>
                A no-refund policy applies to all services provided by VMax Health Tech (&ldquo;we&rdquo; or
                &ldquo;us&rdquo;). We maintain a strict no-refunds policy for all services offered by us to
                you and anybody you may represent.
              </P>
              <P>
                Refunds will not be granted under any circumstances, including but not limited to the full
                utilization of health and fitness consultation services. If you have purchased a
                programme/plan, you will not be eligible for a refund from VMax Health Tech for any reason.
              </P>
            </section>

            <section id="exception" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="exception-heading">Exception</SectionHeading>
              <P>
                A refund will be issued only if you have made a duplicate payment for your Member Account
                with VMax Health Tech. Refunds will be processed using the same payment method, unless
                specified otherwise by us. Any transaction charges incurred in such cases will be borne by
                you.
              </P>
            </section>

            <section id="decision" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="decision-heading">Our decision</SectionHeading>
              <P>Refunds will be processed within 5–7 business days after the request is reviewed and approved.</P>
            </section>

            <section id="finality" className="mt-12 scroll-mt-24 border-b border-[#26261F] pb-16 md:scroll-mt-28">
              <SectionHeading id="finality-heading">Finality of decision</SectionHeading>
              <P>Our decision is final and binding.</P>
              <P>Thank you for your understanding.</P>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}