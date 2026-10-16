import React, { useEffect, useRef, useState } from "react";

const contactInfo = [
  {
    icon: "bi-envelope-fill",
    title: "Email Us",
    value: "support@moviex.com",
    description: "We usually reply within 24 hours.",
  },
  {
    icon: "bi-headset",
    title: "Support Center",
    value: "24/7 Support",
    description: "We're here whenever you need us.",
  },
  {
    icon: "bi-geo-alt-fill",
    title: "Our Office",
    value: "Los Angeles, CA",
    description: "The city where stories come alive.",
  },
];

const faqs = [
  {
    question: "How quickly will I get a response?",
    answer:
      "Our support team usually responds within 24 hours. During busy periods, it may take a little longer.",
  },
  {
    question: "Can I report a problem with a movie?",
    answer:
      "Absolutely. Select the appropriate subject in the form and describe the issue. Our team will take care of it.",
  },
  {
    question: "Can I suggest a movie or series?",
    answer:
      "Yes! We love hearing from our community. Send us your recommendation and we'll pass it to our content team.",
  },
];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(element);
        }
      },
      {
        threshold: 0.12,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function ContactInfoCard({ item, index }) {
  return (
    <Reveal delay={index * 120}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:bg-red-500/[0.04] hover:shadow-[0_20px_60px_rgba(239,68,68,0.1)]">
        {/* Glow */}
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

        <div className="relative z-10 flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-lg text-red-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-red-500/20">
            <i className={`bi ${item.icon}`} />
          </div>

          <div>
            <h3 className="font-bold text-white">{item.title}</h3>

            <p className="mt-1 text-sm font-medium text-red-400">
              {item.value}
            </p>

            <p className="mt-2 text-xs leading-5 text-gray-500">
              {item.description}
            </p>
          </div>
        </div>

        {/* Bottom line */}
        <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-red-600 to-transparent transition-all duration-500 group-hover:w-full" />
      </div>
    </Reveal>
  );
}

export default function Contact() {
  const [activeFaq, setActiveFaq] = useState(null);
  const [focused, setFocused] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Demo submit
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);

      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 3500);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative flex min-h-[70vh] items-center overflow-hidden">
        {/* Background */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/contact-bg.webp')",
          }}
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/75 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />

        {/* Red glow */}
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[150px] animate-pulse" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:px-8">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Get In Touch
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              Let's Start a
              <span className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
                Conversation.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              Have a question, suggestion or just want to say hello? We'd love
              to hear from you. Send us a message and our team will get back to
              you.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-8 flex items-center gap-3 text-sm text-gray-500">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-green-500/20 bg-green-500/10 text-green-400">
                <i className="bi bi-check-circle-fill" />
              </span>

              <span>
                Our support team is{" "}
                <span className="font-semibold text-green-400">online</span>
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          CONTACT INFO
      ====================================================== */}

      <section className="relative py-20">
        <div className="mx-auto grid max-w-7xl gap-5 px-6 md:grid-cols-3 lg:px-8">
          {contactInfo.map((item, index) => (
            <ContactInfoCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* =====================================================
          CONTACT FORM
      ====================================================== */}

      <section className="relative py-16 lg:py-24">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-[140px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          {/* Left content */}
          <div>
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                Contact Us
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 text-4xl font-black leading-tight sm:text-5xl">
                We're here to
                <span className="block text-red-500">listen.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-md leading-7 text-gray-500">
                Whether you've discovered a bug, have an idea for MOVIEX, need
                help with your account or simply want to share some feedback,
                don't hesitate to reach out.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <i className="bi bi-clock-fill" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Response Time</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.025] p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                    <i className="bi bi-shield-check" />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">Private & Secure</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Your information stays protected
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={150}>
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035] p-6 shadow-2xl backdrop-blur-2xl sm:p-8 lg:p-10">
              {/* Top glow */}
              <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500 to-transparent" />

              {/* Success */}
              {submitted && (
                <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#080808]/95 p-8 text-center backdrop-blur-xl">
                  <div className="animate-[fadeIn_.5s_ease-out]">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-3xl text-green-400 shadow-[0_0_50px_rgba(34,197,94,0.15)]">
                      <i className="bi bi-check-lg" />
                    </div>

                    <h3 className="mt-6 text-2xl font-black">Message Sent!</h3>

                    <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500">
                      Thanks for reaching out. We've received your message and
                      will get back to you soon.
                    </p>
                  </div>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black">Send us a message</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Fill out the form and we'll get back to you.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Name */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-gray-400">
                      Your Name
                    </label>

                    <div
                      className={`relative rounded-xl border transition-all duration-300 ${
                        focused === "name"
                          ? "border-red-500/60 bg-red-500/[0.04] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <i className="bi bi-person absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />

                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        onFocus={() => setFocused("name")}
                        onBlur={() => setFocused("")}
                        placeholder="John Doe"
                        required
                        className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-gray-400">
                      Email Address
                    </label>

                    <div
                      className={`relative rounded-xl border transition-all duration-300 ${
                        focused === "email"
                          ? "border-red-500/60 bg-red-500/[0.04] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                          : "border-white/10 bg-black/20"
                      }`}
                    >
                      <i className="bi bi-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />

                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused("")}
                        placeholder="you@example.com"
                        required
                        className="w-full bg-transparent py-3.5 pl-11 pr-4 text-sm text-white outline-none placeholder:text-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="mb-2 block text-xs font-semibold text-gray-400">
                    Subject
                  </label>

                  <div
                    className={`relative rounded-xl border transition-all duration-300 ${
                      focused === "subject"
                        ? "border-red-500/60 bg-red-500/[0.04] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <i className="bi bi-chat-left-text absolute left-4 top-4 text-gray-600" />

                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      onFocus={() => setFocused("subject")}
                      onBlur={() => setFocused("")}
                      required
                      className="w-full appearance-none bg-transparent py-3.5 pl-11 pr-4 text-sm text-white outline-none"
                    >
                      <option value="" disabled className="bg-[#111]">
                        Select a subject
                      </option>

                      <option value="support" className="bg-[#111]">
                        Technical Support
                      </option>

                      <option value="account" className="bg-[#111]">
                        Account & Billing
                      </option>

                      <option value="movie" className="bg-[#111]">
                        Movie / Series Issue
                      </option>

                      <option value="feedback" className="bg-[#111]">
                        Feedback & Suggestions
                      </option>

                      <option value="other" className="bg-[#111]">
                        Other
                      </option>
                    </select>

                    <i className="bi bi-chevron-down pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-600" />
                  </div>
                </div>

                {/* Message */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label className="text-xs font-semibold text-gray-400">
                      Your Message
                    </label>

                    <span className="text-[10px] text-gray-700">
                      {form.message.length}/500
                    </span>
                  </div>

                  <div
                    className={`rounded-xl border transition-all duration-300 ${
                      focused === "message"
                        ? "border-red-500/60 bg-red-500/[0.04] shadow-[0_0_25px_rgba(239,68,68,0.08)]"
                        : "border-white/10 bg-black/20"
                    }`}
                  >
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => {
                        if (e.target.value.length <= 500) {
                          handleChange(e);
                        }
                      }}
                      onFocus={() => setFocused("message")}
                      onBlur={() => setFocused("")}
                      placeholder="Tell us how we can help..."
                      required
                      rows="6"
                      className="w-full resize-none bg-transparent p-4 text-sm leading-6 text-white outline-none placeholder:text-gray-700"
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-red-600 px-6 py-4 font-bold text-white shadow-[0_0_35px_rgba(239,68,68,0.2)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_55px_rgba(239,68,68,0.35)]"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Send Message
                    <i className="bi bi-send-fill transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </button>

                <p className="flex items-center justify-center gap-2 text-center text-[11px] text-gray-700">
                  <i className="bi bi-lock-fill" />
                  Your information is encrypted and secure.
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ====================================================== */}

      <section className="relative border-t border-white/5 bg-white/[0.015] py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="mb-14 text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                FAQ
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Before you ask...
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 text-gray-500">
                Here are some answers to common questions.
              </p>
            </Reveal>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;

              return (
                <Reveal key={faq.question} delay={index * 100}>
                  <div
                    className={`overflow-hidden rounded-2xl border transition-all duration-500 ${
                      isOpen
                        ? "border-red-500/30 bg-red-500/[0.04]"
                        : "border-white/10 bg-white/[0.025]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
                    >
                      <span className="font-semibold text-gray-200">
                        {faq.question}
                      </span>

                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 ${
                          isOpen
                            ? "rotate-45 border-red-500/30 bg-red-500/10 text-red-500"
                            : "border-white/10 bg-white/5 text-gray-500"
                        }`}
                      >
                        <i className="bi bi-plus" />
                      </span>
                    </button>

                    <div
                      className={`grid transition-all duration-500 ${
                        isOpen
                          ? "grid-rows-[1fr] opacity-100"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="border-t border-white/5 px-5 py-5 text-sm leading-7 text-gray-500">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          CTA
      ====================================================== */}

      <section className="px-6 pb-24 pt-10 lg:px-8 lg:pb-32">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/40 via-[#0d0808] to-black p-10 text-center shadow-[0_30px_100px_rgba(239,68,68,0.08)] sm:p-16">
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/15 blur-[120px]" />

            <div className="relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-2xl text-red-500">
                <i className="bi bi-chat-heart-fill" />
              </div>

              <h2 className="mt-7 text-4xl font-black sm:text-5xl">
                Your feedback
                <span className="block text-red-500">makes MOVIEX better.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-gray-500">
                Every message, suggestion and idea helps us build a better
                experience for movie lovers everywhere.
              </p>

              <button
                onClick={() =>
                  window.scrollTo({
                    top: 500,
                    behavior: "smooth",
                  })
                }
                className="group mt-8 inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-7 py-4 font-bold backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/30 hover:bg-red-500/10"
              >
                Talk To Us
                <i className="bi bi-arrow-up-right transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>
    </main>
  );
}
