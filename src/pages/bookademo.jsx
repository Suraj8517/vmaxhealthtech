import React, { useState } from "react";

const GRAIN_BG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'>
      <filter id='n'>
        <feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/>
        <feColorMatrix type='saturate' values='0'/>
      </filter>
      <rect width='100%' height='100%' filter='url(#n)'/>
    </svg>`
  );

const INITIAL = { name: "", email: "", phone: "", company: "", message: "" };

const CONTACTS = [
  {
    label: "Let's chat",
    text: "Available 24 x 7",
    href: "https://wa.me/message/2RPL7GJHHEVDH1",
    external: true,
  },
  {
    label: "Call us",
    text: "+91 78715 00851",
    href: "tel:+917871500851",
    note: "Monday to Saturday, 10:00 AM to 7:00 PM",
  },
  {
    label: "Customer queries",
    text: "support@vmaxfit.com",
    href: "mailto:support@vmaxfit.com?subject=Request%20from%20Website",
  },
  {
    label: "Business queries",
    text: "Business@vmax.fit",
    href: "mailto:Business@vmax.fit?subject=Enquire%20from%20website",
  },
];

function validate(v) {
  const e = {};
  if (!v.name.trim()) e.name = "Enter your name.";
  if (!v.email.trim()) e.email = "Enter your email.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "Enter a valid email address.";
  if (v.phone.trim() && !/^[+()\-\s\d]{7,18}$/.test(v.phone))
    e.phone = "Enter a valid phone number.";
  if (!v.message.trim()) e.message = "Tell us how we can help.";
  return e;
}

function SectionBackdrop() {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(60% 50% at 8% 15%, rgba(239,68,68,0.10), transparent 60%), radial-gradient(50% 40% at 100% 30%, rgba(220,38,38,0.08), transparent 60%), linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.03) 48%, transparent 56%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{ backgroundImage: `url("${GRAIN_BG}")`, backgroundSize: "140px 140px" }}
      />
    </>
  );
}

function CornerMark({ className = "" }) {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className={className}>
      <path d="M1 6V1H6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M16 1H21V6" stroke="currentColor" strokeWidth="1.2" />
      <path d="M21 16V21H16" stroke="currentColor" strokeWidth="1.2" />
      <path d="M6 21H1V16" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function Field({ id, label, optional, error, children }) {
  return (
    <div className="group relative">
      <div className="flex items-baseline justify-between">
        <label htmlFor={id} className="text-[13px] font-light text-white/60">
          {label}
        </label>
        {optional && <span className="text-[11px] font-light text-white/30">Optional</span>}
      </div>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs font-light text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "mt-2 w-full border-0 border-b border-white/15 bg-transparent pb-3 pt-1 text-[20px] font-light tracking-tight text-white placeholder-white/20 outline-none transition-colors duration-300 focus:border-red-500 focus-visible:border-red-500";

export default function ContactForm({ onSubmit }) {
  const [values, setValues] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | failed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      // Replace with your API call, e.g. fetch("/api/contact", { method: "POST", ... })
      if (onSubmit) await onSubmit(values);
      else await new Promise((r) => setTimeout(r, 800));
      setStatus("sent");
      setValues(INITIAL);
    } catch {
      setStatus("failed");
    }
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#0A0A08] px-6 py-24 sm:px-12 md:px-20 md:py-32">
      <SectionBackdrop />

      <div className="relative mx-auto grid max-w-6xl gap-16 md:grid-cols-[1fr_1.2fr] md:gap-24">
        {/* Left: heading, mirrors the team section */}
        <div>
          <div className="flex items-start gap-3">
            <h2 className="text-[15vw] font-light leading-[0.95] tracking-tight text-white sm:text-[74px] md:text-[86px]">
              Get in
              <br />
              touch
            </h2>
            <CornerMark className="mt-2 hidden shrink-0 text-white/40 sm:block" />
          </div>
          <p className="mt-8 max-w-xs text-[15px] font-light leading-relaxed text-white/60 sm:text-base">
            Share a few details and we will get back to you within two working days.
          </p>

          <ul className="mt-12 max-w-sm">
            {CONTACTS.map((c) => (
              <li key={c.label} className="border-t border-white/10 py-5 last:border-b">
                <span className="text-[13px] font-light text-white/50">{c.label}</span>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="mt-1 block break-words text-[20px] font-light tracking-tight text-white transition-colors duration-300 hover:text-red-400 focus-visible:text-red-400 focus-visible:outline-none"
                >
                  {c.text}
                </a>
                {c.note && (
                  <span className="mt-1 block text-[12px] font-light text-white/40">{c.note}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right: form */}
        <div>
          {status === "sent" ? (
            <div role="status" className="border-t border-white/10 pt-8">
              <h3 className="text-3xl font-light tracking-tight text-white">Message sent</h3>
              <p className="mt-4 max-w-sm text-[15px] font-light leading-relaxed text-white/60">
                Thanks for reaching out. We will reply to the email you provided.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-8 border-b border-white/30 pb-1 text-sm font-light text-white transition-colors hover:border-red-500 focus-visible:outline-none focus-visible:border-red-500"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-9">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-9 sm:grid-cols-2 sm:gap-10">
                <Field id="email" label="Email" error={errors.email}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={values.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field id="company" label="Company" >
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  value={values.company}
                  onChange={handleChange}
                  placeholder="Where you work"
                  className={inputClass}
                />
              </Field>

              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {status === "failed" && (
                <p role="alert" className="text-sm font-light text-red-400">
                  Your message did not send. Check your connection and try again.
                </p>
              )}

              <div className="flex items-center justify-between gap-6 border-t border-white/10 pt-8">
                <p className="max-w-[200px] text-[11px] font-light leading-relaxed text-white/40">
                  We only use your details to reply to this message.
                </p>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="shrink-0 rounded-[2px] bg-red-500 px-8 py-3.5 text-sm font-light tracking-tight text-white shadow-[0_20px_50px_-20px_rgba(239,68,68,0.8)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-red-300 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
                >
                  {status === "sending" ? "Sending…" : "Send message"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}