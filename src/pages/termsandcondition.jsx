import { useEffect, useState } from "react";

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
  { id: "agreement", label: "Agreement to terms" },
  { id: "changes", label: "Changes to terms" },
  { id: "no-refunds", label: "No refunds" },
  { id: "accounts", label: "Accounts & membership" },
  { id: "representations", label: "User representations" },
  { id: "refund-policy", label: "No refunds policy" },
  { id: "services", label: "Services" },
  { id: "content", label: "Content & IP" },
  { id: "user-content", label: "User generated content" },
  { id: "social-forum", label: "Social forum" },
  { id: "sms", label: "SMS messaging" },
  { id: "health", label: "Health disclaimer" },
  { id: "conduct", label: "Community standards" },
  { id: "jurisdiction", label: "Jurisdiction" },
];

const CONDITIONS = [
  "Heart disease",
  "High blood pressure",
  "Family history of high blood pressure or heart disease",
  "Chest pain caused by previous exercise",
  "Dizziness or loss of consciousness caused by previous exercise",
  "Bone or joint problems",
  "Diabetes, high cholesterol, obesity",
  "Arthritis",
  "Smoking/alcohol consumption",
  "Sedentary lifestyle",
  "Lactating (up to 6 months)",
  "Kidney disease",
  "Irritable bowel syndrome",
];

const CONTENT_WARRANTIES = [
  "The transmission, creation, distribution, and public display of your content, and any use, downloading or copying of it, will not infringe or violate any proprietary rights, including but not limited to any third party copyright, patent, trademark, trade secret or moral right.",
  "You are the creator and owner of, or have the necessary licenses, rights, consents, releases and permissions to use and authorize us, the Website/Mobile App and other users of the Website/Mobile App to use your content in any prescribed manner through the Website/Mobile Application and these Terms of Use.",
  "You have the written consent and/or permission to use the name or likeness of any identifiable person in your content, for your content to be included and used in any way subject to the Website/Mobile Application and these Terms of Use.",
  "Your content is not false, inaccurate or misleading.",
  "Your content is not an unsolicited or unauthorized advertisement, promotional material, pyramid scheme, chain letter, spam, mass mailing or other form of solicitation.",
  "Your content is not obscene, vulgar, profane, filthy, abusive, harassing, libelous, or objectionable (in our viewpoint).",
  "Your content will not ridicule or be offensive in nature to anyone.",
  "Your content does not violate any applicable laws, regulations or rules.",
  "Your content will not violate the privacy or publicity rights of any third party.",
  "Your content does not contain material that solicits personal information from persons under the age of 18, or exploits persons under the age of 18 in a sexual or violent manner.",
  "Your content does not violate any laws relating to child pornography or otherwise intended to protect the health or welfare of minors.",
  "Your content does not contain offensive comments related to race, nationality, gender, sexual orientation or physical disability.",
  "Your content does not otherwise violate, or link to material that violates, these Terms of Use or any applicable law or regulation.",
];

const CONDUCT_RULES = [
  "Retrieve data or other content from the Website/Mobile Application to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.",
  "Make any unauthorized use of the Website/Mobile Application, including collecting usernames and/or email addresses of users by electronic or other means for the purpose of sending unsolicited email, or creating user accounts by automated means or under falsified information.",
  "Use a buying agent or purchasing agent to make purchases on the Website/Mobile Application.",
  "Use the Website/Mobile Application to advertise or offer to sell goods and services.",
  "Circumvent, disable, or otherwise interfere with security-related features of the Website/Mobile Application, including features that prevent or restrict the use or copying of any content or enforce limitations on the use of the Website/Mobile Application and/or its content.",
  "Engage in unauthorized framing of or linking to the Website/Mobile Application.",
  "Trick, defraud, or mislead us or other users, especially in any attempt to learn sensitive account information such as user passwords.",
  "Make improper use of our support services or submit false reports of abuse or misconduct.",
  "Engage in any automated use of the system, such as using scripts to send comments or messages, or using data mining, robots, or similar data gathering and extraction tools.",
  "Interfere with, disrupt, or create an undue burden on the Website/Mobile Application or the networks or services connected to it.",
  "Attempt to impersonate another user or person, or use the username of another user.",
  "Sell or otherwise transfer your profile.",
  "Use any information obtained from the Website/Mobile Application to harass, abuse, or harm another person.",
  "\u201cStalk\u201d or otherwise harass another user or employee of the Services.",
  "Access or attempt to access another user\u2019s account without their consent.",
  "Use the Website/Mobile Application as part of any effort to compete with us, or otherwise use it and/or its content for any revenue-generating endeavour or commercial enterprise.",
  "Decipher, decompile, disassemble, or reverse engineer any of the software comprising or making up any part of the Website/Mobile Application.",
  "Attempt to bypass any measures of the Website/Mobile Application designed to prevent or restrict access to it, or any portion of it.",
  "Harass, annoy, intimidate, or threaten any of our employees or agents engaged in providing any portion of the Website/Mobile Application to you.",
  "Delete the copyright or other proprietary rights notice from any content.",
  "Copy or adapt the Website/Mobile Application software, including but not limited to Flash, PHP, HTML, JavaScript, React or any other code.",
  "Upload or transmit (or attempt to upload or transmit) viruses, Trojan horses, or other material \u2014 including excessive use of capital letters and spamming \u2014 that interferes with any party\u2019s uninterrupted use and enjoyment of the Website/Mobile Application, or that modifies, impairs, disrupts, alters, or interferes with its use, features, functions, operation, or maintenance.",
  "Upload or transmit (or attempt to upload or transmit) any material that acts as a passive or active information collection or transmission mechanism, including clear graphics interchange formats (\u201cgifs\u201d), 1\u00d71 pixels, web bugs, cookies, or similar devices (\u201cspyware\u201d or \u201cpassive collection mechanisms\u201d).",
  "Except as may result from standard search engine or internet browser usage, use, launch, develop, or distribute any automated system \u2014 including any spider, robot, cheat utility, scraper, or offline reader \u2014 that accesses the Website/Mobile Application, or use or launch any unauthorized script or other software.",
  "Disparage, tarnish, or otherwise harm, in our opinion, us and/or the Website/Mobile Application.",
  "Use the Website/Mobile Application in a manner inconsistent with any applicable laws or regulations.",
];

function useScrollSpy(ids) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: 0 }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}

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

export default function TermsAndConditions() {
  const ids = SECTIONS.map((s) => s.id);
  const activeId = useScrollSpy(ids);

  return (
    <main className="min-h-screen bg-[#0e0e0c] font-[Space_Grotesk,sans-serif] text-[#F1F1EA]">
      {/* Page header */}
      <div className="border-b border-[#26261F] px-5 pt-24 pb-10 sm:px-8 sm:pt-28 md:px-8 md:pt-36 md:pb-14">
        <div className="mx-auto max-w-[1180px]">
          <a
            href="/"
            className="inline-block text-xs font-semibold uppercase tracking-[0.08em] text-[#6E7066] no-underline transition-colors duration-150 hover:text-[#E63A2E]"
          >
           Back to home
          </a>
          
          <h1 className="mt-3 text-[clamp(32px,7vw,56px)] font-bold uppercase leading-[0.98] tracking-[-0.02em]">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-[#6E7066]">Last updated: 1 Jan 2024</p>
        </div>
      </div>

      {/* Body: sticky TOC (desktop) + content */}
      <div className="mx-auto max-w-[1180px] px-5 py-10 sm:px-8 sm:py-14 md:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[200px_1fr] md:gap-16">
          {/* Table of contents */}
          <nav aria-label="Table of contents" className="hidden md:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <span className="text-xs font-semibold uppercase tracking-[0.08em] text-[#6E7066]">
                On this page
              </span>
              <ul className="mt-4 space-y-1 border-l border-[#26261F]">
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 text-sm no-underline transition-colors duration-150 ${
                        activeId === s.id
                          ? "border-[#E63A2E] text-[#F1F1EA]"
                          : "border-transparent text-[#6E7066] hover:text-[#F1F1EA]"
                      }`}
                    >
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Mobile TOC — collapsible so long content doesn't dominate small screens */}
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
            <P>
              This document is an electronic record as per the Information Technology Act, 2000, and is in
              accordance with the provisions of Rule 4 of the Information Technology (Reasonable Security
              Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, which require
              publishing the Rules and Regulations, Privacy Policy and Terms and Conditions for access or
              usage of the platform through the VMax Health Tech mobile application (the &ldquo;Mobile
              Application&rdquo;) and website &ndash; www.vmaxhealthtech.com (the &ldquo;Website&rdquo;) &ndash;
              and our related websites, applications, services, products, devices and content (together with
              the Mobile Application and Website, collectively the &ldquo;Services&rdquo;).
            </P>

            <section id="agreement" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="agreement-heading">Agreement to terms</SectionHeading>
              <P>
                These terms and conditions (&ldquo;Terms&rdquo;, &ldquo;Agreement&rdquo;) are an agreement
                between VMax Health Tech and you (&ldquo;User&rdquo;, &ldquo;you&rdquo; or
                &ldquo;your&rdquo;), whether personally or on behalf of an entity/person, with respect to your
                access to and use of our websites or the VMax Health Tech mobile application, or any other
                media form, channel, mobile website or mobile application related, linked, or otherwise
                connected thereto (collectively, the &ldquo;website and mobile application&rdquo;). This
                Agreement sets forth the general terms and conditions of your use of VMax Health Tech, its
                mobile application, and any of its products or services (collectively, &ldquo;Mobile
                Application&rdquo; or &ldquo;Services&rdquo;). You acknowledge and agree that our Subsidiaries
                and Affiliates will be entitled to provide the Services to you under the terms of this
                Agreement. By accessing the Website and/or Mobile Application, you agree that you have read,
                understood, and agree to be bound by all of these Terms and Conditions.
              </P>
              <div className="mt-6 border-l-[3px] border-[#E63A2E] bg-[#111110] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.02em] text-[#F1F1EA] sm:text-[15px]">
                  If you do not agree with all or any of these Terms and Conditions, you are expressly
                  prohibited from using the Website and Mobile Application, and you must discontinue their
                  use immediately.
                </p>
              </div>
            </section>

            <section id="changes" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="changes-heading">Changes to terms &amp; conditions</SectionHeading>
              <P>
                Supplemental terms and conditions or documents that may be posted on the Website/Mobile
                Application from time to time are hereby expressly incorporated herein by reference. We
                reserve the right, in our sole discretion, to make changes or modifications to these Terms
                and Conditions at any time and for any reason. We will alert you to changes by updating the
                &ldquo;Last updated&rdquo; date above, and you waive any right to receive specific notice of
                each change. It is your responsibility to periodically review these Terms and Conditions to
                stay informed. Continued use of the Website/Mobile Application, or any of the Services, after
                a revised version becomes effective constitutes acceptance of the changes.
              </P>
              <P>
                The information provided on the Website/Mobile Application is not intended for distribution
                to or use by any person or entity in any jurisdiction or country where such distribution or
                use would be contrary to law or regulation, or which would subject us to any registration
                requirement within that jurisdiction or country. Persons who choose to access the
                Website/Mobile Application from other locations do so on their own initiative and are solely
                responsible for compliance with local laws, to the extent local laws apply.
              </P>
            </section>

            <section id="no-refunds" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="no-refunds-heading">No refunds</SectionHeading>
              <P>
                In the event that this Agreement expires or is terminated, no portion of any payments of any
                kind whatsoever previously provided hereunder shall be owed, repayable, or refunded to the
                user.
              </P>
            </section>

            <section id="accounts" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="accounts-heading">Accounts and membership</SectionHeading>
              <P>
                If you create an account in the Mobile Application, you are responsible for maintaining the
                security of your account and are fully responsible for all activities that occur under it,
                and for any other actions taken in connection with it. We may monitor and review new accounts
                before you may sign in and use our Services. Providing false contact information of any kind
                may result in the termination of your account. You must immediately notify us of any
                unauthorized use of your account or any other breach of security. We will not be liable for
                any acts or omissions by you, including any resulting damages. We may suspend, disable, or
                delete your account (or any part of it) if we determine that you have violated any provision
                of this Agreement, or that your conduct or content would tend to damage our reputation and
                goodwill. If we delete your account for these reasons, you may not re-register for our
                Services, and we may block your email address and IP address to prevent further registration.
              </P>
            </section>

            <section id="representations" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="representations-heading">User representations</SectionHeading>
              <P>
                By using the Website/Mobile Application, you represent and warrant that all information you
                submit will be true, accurate, current, and complete, and that you will maintain the accuracy
                of that information and update it promptly as necessary. You also represent and warrant that
                you have the legal capacity to comply with these Terms and Conditions and are not considered
                a minor in the jurisdiction in which you reside. You agree that you will not use the
                Website/Mobile Application for any illegal or unauthorized purpose, and that your use will
                not violate any applicable law or regulation.
              </P>
              <P>
                If you provide any information that is untrue, inaccurate, not current, or incomplete, we
                have the right to suspend or terminate your account and refuse any and all current or future
                use of the Website/Mobile Application (or any portion of it), including other services being
                provided to you.
              </P>
            </section>

            <section id="refund-policy" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="refund-policy-heading">No refunds policy</SectionHeading>
              <P>
                In the event that this Agreement expires or is terminated, no portion of any payments of any
                kind whatsoever previously provided hereunder shall be owed, repayable, or refunded to the
                user.
              </P>
              <P>
                We want to provide transparency regarding our refund policy. VMax Health Tech does not offer
                refunds for online health and fitness consultation services. Once an offer has been accepted
                and payment made, all transactions are final, and we do not entertain requests for refunds.
              </P>
              <P>
                Refunds will not be granted under any circumstances, including but not limited to full
                utilization of the health and fitness consultation services. If you have purchased a VMax
                Health Tech programme or plan, you will not be eligible for a refund for any reason
                whatsoever. A refund is only made in the event that you have paid twice for your Member
                Account; such refunds are made directly by the same method through which the payment was
                made, unless we specify otherwise.
              </P>
              <P>
                We reserve the right to update or modify this No Refund Policy at any time without prior
                notice. Please review this policy periodically for changes.
              </P>
            </section>

            <section id="services" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="services-heading">Services</SectionHeading>
              <P>
                We reserve the right to decide, keep, or modify the pricing of our products and services. We
                also reserve the right to offer pricing that may differ from person to person depending on
                various factors, including but not limited to individual needs, services offered, the
                experience of the persons offering services, geographical location, and market conditions.
              </P>
              <P>
                We reserve the right to correct any errors or mistakes in pricing, even if we have already
                requested or received payment, and to refuse any order placed through the Website/Mobile
                Application.
              </P>
            </section>

            <section id="content" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="content-heading">Content &amp; intellectual property</SectionHeading>
              <P>
                The content of the VMax Health Tech Website, App, and Social Media &ndash; including without
                limitation text, copy, audio, video, photographs, illustrations, graphics, and other visuals
                &ndash; is for informational purposes only and does not constitute or substitute professional
                medical advice, diagnosis, treatment, or recommendations of any kind. Any input you provide
                will be considered the property of VMax Health Tech Private Ltd and may be used for coaching,
                marketing, and promotional purposes.
              </P>
            </section>

            <section id="user-content" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="user-content-heading">User generated content</SectionHeading>
              <P>
                A &ldquo;Social Forum&rdquo; is any area, website, or feature offered as part of the
                Services, including but not limited to posts, blogs, groups, email, or instant messaging
                features that allow you to post, submit, display, perform, share, and/or view User Content
                with other members. Unless otherwise stated in our Privacy Policy, all communications in a
                social forum are public, not private.
              </P>
              <P>
                You are solely responsible for any User Content you upload, post, transmit, display, share,
                or exchange through any social forum, and for the consequences of posting it.
              </P>
              <P>
                The Website/Mobile Application may invite you to discuss or participate in online
                discussions, chats, and other activities, and may let you create, post, display, submit,
                perform, publish, distribute, or transmit text, writing, video, audio, photos, graphics,
                comments, recommendations, personal information, or other materials (collectively,
                &ldquo;content&rdquo;). Any content you submit may be treated as non-confidential and
                non-proprietary, and may be accessed by other users of the Website/Mobile Application and
                through third-party websites. By creating or providing content, you represent and warrant
                that:
              </P>
              <BulletList items={CONTENT_WARRANTIES} />
              <P>
                Any use of the Website/Mobile Application in violation of the foregoing violates these Terms
                and may, among other things, result in the termination or suspension of your right to use it.
              </P>
            </section>

            <section id="social-forum" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="social-forum-heading">Social forum</SectionHeading>
              <P>
                As a user of our Services, you may become part of various online or offline groups and share
                content, information, data, pictures, or videos with other users, as well as with a coach or
                employee who may be an employee or contractor of VMax Health Tech, personnel from an
                unaffiliated third-party service provider, or personnel designated by VMax Health Tech. We
                have no obligation to review content prior to posting, or to delete User Content you may find
                objectionable or offensive. VMax Health Tech disclaims any perceived, implied, or actual duty
                to monitor social forums, and specifically disclaims any responsibility or liability for
                information provided there.
              </P>
            </section>

            <section id="sms" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="sms-heading">SMS messaging</SectionHeading>
              <P>
                I agree to receive SMS messages regarding login OTP verification. Message and data rates may
                apply, and frequency may vary. I understand that I can opt out at any time.
              </P>
            </section>

            <section id="health" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="health-heading">Health disclaimer</SectionHeading>
              <P>
                You should always seek the advice of qualified healthcare professionals with any questions or
                concerns you may have regarding your individual needs and any medical conditions. You agree
                that you will not, under any circumstances, disregard professional medical advice or delay in
                seeking it in reliance on any content provided on or through the Website, App, or Social
                Media. Reliance on any such content is solely at your own risk.
              </P>
              <P>
                Results may vary based on each member&rsquo;s physical health, diet, exercise, and adherence
                to VMax Health Tech programmes. We approach fat reduction and overall well-being with that in
                mind &ndash; VMax Health Tech and its representatives make no guarantee of results.
              </P>
              <P>
                If you have not been physically active for more than one year, or have a medical history that
                may put you at risk &ndash; including, without limitation, one or more of the conditions below
                &ndash; you are required to seek approval from a qualified healthcare practitioner before
                using the Services, and your results may vary:
              </P>
              <BulletList items={CONDITIONS} />
              <P>
                The list above is indicative, not exhaustive. Please consult your doctor for guidance specific
                to you. You should discontinue any diet or exercise that causes pain or severe discomfort, and
                should consult a medical expert before returning to exercise in such cases. We reserve the
                right to deny you access to the Services for any reason, including if we determine, in our
                sole discretion, that you have certain medical conditions.
              </P>
              <P>
                Content provided on or through this Website/App regarding drug or dietary supplements, or
                products for sale on the Marketplace, has not been evaluated or approved by any regulatory
                authority, including the Drug Controller of India.
              </P>
              <P>
                VMax Health Tech provides a marketplace connecting dietitians and health coaches with joining
                members/clients, and is not responsible for legal issues arising between the two parties.
                Neither VMax Health Tech nor its representatives or coaches are responsible for the results or
                medical consequences of any consultation.
              </P>
              <P>
                You hereby release AbsolU Healthcare Pvt. Ltd., its coaches, consultants, officers, agents,
                and employees from any responsibility or liability for any injury, damage, or disorder
                (physical, metabolic, or otherwise) arising out of or connected with your participation in any
                activities with us.
              </P>
              <P>
                VMax Health Tech provides a &ldquo;pause&rdquo; facility on limited plans; this is explained on
                enquiry when a plan is sold and is not available on all plans or services. You may pause your
                plan in the following events, subject to mutual agreement between you and VMax Health Tech:
              </P>
              <BulletList
                items={[
                  "Pregnancy: up to 1 year",
                  "Natural calamity: up to 2 months",
                  "Death of a family member (blood relations only): up to 2 months",
                ]}
              />
            </section>

            <section id="conduct" className="mt-12 scroll-mt-24 md:scroll-mt-28">
              <SectionHeading id="conduct-heading">Community standards and conduct guidelines</SectionHeading>
              <P>
                You may not access or use the Services for any purpose other than that for which we make them
                available. The Services may not be used in connection with any commercial endeavour except
                those specifically endorsed or approved by us. As a user of the Services, you agree not to:
              </P>
              <BulletList items={CONDUCT_RULES} />
              <P>
                Your privilege to use the Services &ndash; including your ability to contribute to
                discussions on the social forum, or to communicate with coaches and/or other users on VMax
                Health Tech and its subsidiaries &ndash; depends on your compliance with the community
                standards and conduct guidelines above. We may revoke your privileges to use all or part of
                the Services, and/or take other appropriate measures, if violations are brought to our
                attention. If you fail to adhere to these guidelines, or any part of these Terms and
                Conditions, we may terminate, in our sole discretion, your use of or participation in any
                public forum or the Services. Any violation of this section may subject you to civil and/or
                criminal liability.
              </P>
              <div className="mt-6 border-l-[3px] border-[#E63A2E] bg-[#111110] px-5 py-4">
                <p className="text-sm font-semibold uppercase tracking-[0.02em] text-[#F1F1EA] sm:text-[15px]">
                  You agree and understand that you may be held legally responsible for damages suffered by
                  other members or third parties as a result of remarks, information, feedback, or other
                  content you post or make available on the Services &ndash; including on any forum &ndash;
                  that is deemed defamatory or otherwise legally actionable. VMax Health Tech is not legally
                  responsible, nor can it be held liable, for damages of any kind arising out of or in
                  connection with any such content.
                </p>
              </div>
            </section>

            <section id="jurisdiction" className="mt-12 scroll-mt-24 border-b border-[#26261F] pb-16 md:scroll-mt-28">
              <SectionHeading id="jurisdiction-heading">Jurisdiction</SectionHeading>
              <P>Any dispute is subject to the sole jurisdiction of Coimbatore, Tamil Nadu, India.</P>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}