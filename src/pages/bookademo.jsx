import React, { useState } from "react";
import SectionBackdrop from "../components/contact/sectionBackDrop";
import CornerMark from "../components/Helper/cornerMarker";

const SHEET_URL = import.meta.env.VITE_SHEET_URL || "";

const INITIAL = { name: "", email: "", phone: "", company: "", message: "", website: "" };

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

/* ───────────── validation (mirrors the Apps Script rules) ───────────── */

const NAME_RE = /^\p{L}[\p{L}\p{M} .'-]{1,59}$/u;
const EMAIL_RE =
  /^[A-Za-z0-9][A-Za-z0-9._%+-]{0,63}@[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*\.[A-Za-z]{2,24}$/;
const PHONE_RE = /^\+?[0-9]{7,15}$/;
const COMPANY_RE = /^[\p{L}\p{N}][\p{L}\p{M}\p{N} .,&'()/-]{0,99}$/u;

const CONTROL = /[\u0000-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const CONTROL_KEEP_NL = /[\u0000-\u0009\u000B-\u001F\u007F-\u009F\u200B-\u200F\u202A-\u202E\u2066-\u2069\uFEFF]/g;
const MESSAGE_BAD = /[^\p{L}\p{M}\p{N} \n.,!?'"():;/&@#%+_-]/gu;

const sanitizers = {
  name: (v) =>
    v
      .replace(/[’‘]/g, "'")
      .replace(/[^\p{L}\p{M} .'-]/gu, "")
      .replace(/^[^\p{L}]+/u, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 60),
  email: (v) =>
    v
      .replace(/[^A-Za-z0-9._%+@-]/g, "")
      .replace(/^[^A-Za-z0-9]+/, "")
      .slice(0, 254),
  phone: (v) => v.replace(/[^+()\-\s\d]/g, "").slice(0, 22),
  company: (v) =>
    v
      .replace(/[’‘]/g, "'")
      .replace(/[^\p{L}\p{M}\p{N} .,&'()/-]/gu, "")
      .replace(/^[^\p{L}\p{N}]+/u, "")
      .replace(/\s{2,}/g, " ")
      .slice(0, 100),
  message: (v) =>
    v
      .replace(/[’‘]/g, "'")
      .replace(/[“”]/g, '"')
      .replace(CONTROL_KEEP_NL, "")
      .replace(MESSAGE_BAD, "")
      .replace(/\n{3,}/g, "\n\n")
      .slice(0, 1000),
  website: (v) => v, // honeypot: leave as-is
};

const cleanPhone = (v) => v.replace(CONTROL, "").replace(/[\s()-]/g, "");

function validate(v) {
  const e = {};
  const name = v.name.trim();
  const email = v.email.trim();
  const phone = cleanPhone(v.phone);
  const company = v.company.trim();
  const message = v.message.trim();

  if (!name) e.name = "Enter your name.";
  else if (!NAME_RE.test(name)) e.name = "Use letters only (spaces, . ' - allowed).";

  if (!email) e.email = "Enter your email.";
  else if (!EMAIL_RE.test(email)) e.email = "Enter a valid email address.";

  // Server requires a phone number, so it is required here too.
  if (!phone) e.phone = "Enter your phone number.";
  else if (!PHONE_RE.test(phone)) e.phone = "Enter 7–15 digits, with an optional leading +.";

  if (company && !COMPANY_RE.test(company)) e.company = "Enter a valid company name.";

  if (!message) e.message = "Tell us how we can help.";
  else if (message.length < 5) e.message = "Please write at least 5 characters.";

  return e;
}

/* ───────────── UI ───────────── */

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
    const clean = sanitizers[name] ? sanitizers[name](value) : "";
    setValues((v) => ({ ...v, [name]: clean }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;

    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    // Honeypot tripped: pretend success, send nothing
    if (values.website) {
      setStatus("sent");
      setValues(INITIAL);
      return;
    }

    // Only the five expected fields, trimmed and cleaned, are sent
    const payload = {
      name: values.name.replace(/\s+/g, " ").trim(),
      email: values.email.trim().toLowerCase(),
      phone: cleanPhone(values.phone),
      company: values.company.replace(/\s+/g, " ").trim(),
      message: values.message.trim(),
      website: "",
    };

    setStatus("sending");
    try {
      if (SHEET_URL) {
        await fetch(SHEET_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload),
        });
      }
      if (onSubmit) await onSubmit(payload);
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
            <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-9 lg:pt-14">
              <Field id="name" label="Name" error={errors.name}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  maxLength={60}
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
                    maxLength={254}
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
                    maxLength={22}
                    value={values.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field id="company" label="Company" optional error={errors.company}>
                <input
                  id="company"
                  name="company"
                  type="text"
                  autoComplete="organization"
                  maxLength={100}
                  value={values.company}
                  onChange={handleChange}
                  placeholder="Where you work"
                  aria-invalid={!!errors.company}
                  aria-describedby={errors.company ? "company-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <Field id="message" label="Message" error={errors.message}>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  maxLength={1000}
                  value={values.message}
                  onChange={handleChange}
                  placeholder="What would you like to talk about?"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                  className={`${inputClass} resize-none`}
                />
              </Field>

              {/* Honeypot: hidden from people, bots tend to fill it */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={values.website}
                onChange={handleChange}
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
              />

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