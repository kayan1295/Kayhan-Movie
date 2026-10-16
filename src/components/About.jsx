
import React, { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10K+", label: "Movies & Series", icon: "bi-film" },
  { value: "2M+", label: "Happy Members", icon: "bi-people" },
  { value: "190+", label: "Countries", icon: "bi-globe2" },
  { value: "4K", label: "Ultra HD Quality", icon: "bi-badge-4k" },
];

const features = [
  {
    icon: "bi-play-circle-fill",
    title: "Watch Anywhere",
    description:
      "Enjoy your favorite movies and series on your phone, tablet, laptop, TV and more.",
  },
  {
    icon: "bi-stars",
    title: "Curated For You",
    description:
      "Discover hand-picked movies and personalized recommendations based on your taste.",
  },
  {
    icon: "bi-lightning-charge-fill",
    title: "Fast & Smooth",
    description:
      "A fast, clean and seamless streaming experience designed for movie lovers.",
  },
  {
    icon: "bi-shield-check",
    title: "Safe & Secure",
    description:
      "Your account and personal information are protected with modern security standards.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "The Beginning",
    text: "MOVIEX started with one simple idea: make discovering great movies easier and more enjoyable.",
  },
  {
    year: "2023",
    title: "Growing Together",
    text: "Thousands of movie lovers joined our community and helped shape the experience.",
  },
  {
    year: "2024",
    title: "A Bigger Universe",
    text: "We expanded our catalog, improved recommendations and introduced a smoother streaming experience.",
  },
  {
    year: "2025",
    title: "Made For Everyone",
    text: "MOVIEX evolved into a cinematic platform built for audiences around the world.",
  },
];

function useReveal() {
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
      { threshold: 0.15 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function Reveal({ children, className = "", delay = 0 }) {
  const [ref, visible] = useReveal();

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-14 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({ stat, index }) {
  return (
    <Reveal delay={index * 100}>
      <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-red-500/40 hover:bg-red-500/[0.05] hover:shadow-[0_20px_60px_rgba(239,68,68,0.12)]">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 group-hover:bg-red-600/25" />

        <div className="relative z-10">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-xl text-red-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-red-500/20">
            <i className={`bi ${stat.icon}`} />
          </div>

          <h3 className="text-3xl font-black tracking-tight text-white">
            {stat.value}
          </h3>

          <p className="mt-2 text-sm text-gray-400">{stat.label}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function About() {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!heroRef.current) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 12;

      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* =========================================================
          HERO
      ========================================================== */}

      <section
        ref={heroRef}
        className="relative flex min-h-[85vh] items-center overflow-hidden"
      >
        {/* Background image */}
        <div
          className="absolute inset-0 scale-110 bg-cover bg-center transition-transform duration-700"
          style={{
            transform:
              "translate3d(var(--mouse-x, 0px), var(--mouse-y, 0px), 0) scale(1.08)",
            backgroundImage:
              "url('/images/about-bg.webp')",
          }}
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-black/20" />

        {/* Red glow */}
        <div className="absolute -right-40 top-20 h-[500px] w-[500px] rounded-full bg-red-600/20 blur-[140px] animate-pulse" />

        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 lg:px-8">
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-red-400 backdrop-blur-md">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              About MOVIEX
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
              Where Every
              <span className="block bg-gradient-to-r from-red-500 via-red-400 to-white bg-clip-text text-transparent">
                Story Comes Alive.
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className="mt-7 max-w-2xl text-base leading-7 text-gray-300 sm:text-lg">
              MOVIEX is built for people who believe movies are more than
              entertainment. They're stories, emotions, memories and worlds
              waiting to be discovered.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-4">
              <button className="group relative overflow-hidden rounded-xl bg-red-600 px-6 py-3.5 font-bold text-white shadow-[0_0_35px_rgba(239,68,68,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_50px_rgba(239,68,68,0.4)]">
                <span className="relative z-10 flex items-center gap-2">
                  Explore Movies
                  <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
                </span>

                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              </button>

              <button className="rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 hover:bg-red-500/10">
                Our Story
              </button>
            </div>
          </Reveal>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-gray-500 md:flex">
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll to explore
            </span>

            <div className="flex h-9 w-6 justify-center rounded-full border border-white/20 p-1">
              <span className="h-2 w-1 animate-bounce rounded-full bg-red-500" />
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STATS
      ========================================================== */}

      <section className="relative py-20">
        <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {stats.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR STORY
      ========================================================== */}

      <section className="relative py-24 lg:py-32">
        <div className="absolute left-0 top-1/3 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-2 lg:px-8">
          <Reveal>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-red-600/10 blur-2xl" />

              <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
                <img
                  src="/images/about-story.webp"
                  alt="MOVIEX Story"
                  className="h-[500px] w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-600 text-xl shadow-[0_0_30px_rgba(239,68,68,0.35)]">
                      <i className="bi bi-camera-reels-fill" />
                    </div>

                    <div>
                      <p className="font-bold text-white">Our Story</p>
                      <p className="text-sm text-gray-400">
                        Built by movie lovers
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating card */}
              <div className="absolute -bottom-7 -right-4 hidden rounded-2xl border border-white/10 bg-black/80 p-5 shadow-2xl backdrop-blur-xl sm:block">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500">
                    <i className="bi bi-heart-fill" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">Made with</p>
                    <p className="font-bold text-white">Love for Cinema</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal delay={100}>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                Our Story
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                More than a
                <span className="block text-red-500">streaming platform.</span>
              </h2>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-6 leading-7 text-gray-400">
                We created MOVIEX because finding something great to watch
                shouldn't feel complicated. We wanted a place where beautiful
                design, powerful discovery and a love for cinema come together.
              </p>
            </Reveal>

            <Reveal delay={400}>
              <p className="mt-4 leading-7 text-gray-400">
                From timeless classics to the newest releases, our goal is to
                help you discover stories that stay with you long after the
                credits roll.
              </p>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <i className="bi bi-film text-xl text-red-500" />
                  <p className="mt-3 font-bold">Great Stories</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Stories worth remembering.
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <i className="bi bi-magic text-xl text-red-500" />
                  <p className="mt-3 font-bold">Beautiful Experience</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Designed around you.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURES
      ========================================================== */}

      <section className="relative border-y border-white/5 bg-white/[0.015] py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                Why MOVIEX
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Built for the way
                <span className="text-red-500"> you watch.</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-5 leading-7 text-gray-400">
                Everything you need for a smoother, smarter and more enjoyable
                movie experience.
              </p>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 120}>
                <div className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-red-500/30 hover:shadow-[0_20px_60px_rgba(239,68,68,0.1)]">
                  <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-500/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

                  <div className="relative z-10">
                    <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-2xl text-red-500 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 group-hover:bg-red-500/20">
                      <i className={`bi ${feature.icon}`} />
                    </div>

                    <h3 className="text-lg font-bold">{feature.title}</h3>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {feature.description}
                    </p>

                    <div className="mt-6 h-px w-8 bg-red-500 transition-all duration-500 group-hover:w-full" />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================== */}

      <section className="relative py-24 lg:py-32">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="mb-16 text-center">
            <Reveal>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-red-500">
                The Journey
              </span>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="mt-4 text-4xl font-black sm:text-5xl">
                Our journey so far
              </h2>
            </Reveal>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-red-500 via-red-500/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

            <div className="space-y-14">
              {timeline.map((item, index) => (
                <Reveal key={item.year} delay={index * 120}>
                  <div
                    className={`relative grid items-center gap-8 md:grid-cols-2 ${
                      index % 2 === 0 ? "" : "md:text-right"
                    }`}
                  >
                    <div
                      className={`pl-14 md:pl-0 ${
                        index % 2 === 0
                          ? "md:pr-16"
                          : "md:order-2 md:pl-16"
                      }`}
                    >
                      <span className="text-sm font-black tracking-[0.2em] text-red-500">
                        {item.year}
                      </span>

                      <h3 className="mt-2 text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-gray-500">
                        {item.text}
                      </p>
                    </div>

                    {/* Center point */}
                    <div className="absolute left-5 top-1/2 flex h-4 w-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.7)] md:left-1/2">
                      <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    </div>

                    <div
                      className={`hidden h-px bg-gradient-to-r from-red-500/40 to-transparent md:block ${
                        index % 2 === 0
                          ? "md:order-2"
                          : "md:order-1 md:rotate-180"
                      }`}
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================== */}

      <section className="relative px-6 pb-24 lg:px-8 lg:pb-32">
        <Reveal>
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/50 via-[#0d0808] to-black p-10 text-center shadow-[0_30px_100px_rgba(239,68,68,0.1)] sm:p-16">
            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/20 blur-[120px]" />

            {/* Animated lines */}
            <div className="absolute left-0 right-0 top-0 h-px overflow-hidden">
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-[slide_3s_linear_infinite]" />
            </div>

            <div className="relative z-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-2xl text-red-500 shadow-[0_0_40px_rgba(239,68,68,0.15)]">
                <i className="bi bi-play-fill" />
              </div>

              <h2 className="mt-7 text-4xl font-black sm:text-5xl">
                Ready for your next
                <span className="block text-red-500">great story?</span>
              </h2>

              <p className="mx-auto mt-5 max-w-xl text-gray-400">
                Join MOVIEX and discover a world of movies and series made for
                every kind of movie lover.
              </p>

              <button className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-red-600 px-7 py-4 font-bold shadow-[0_0_40px_rgba(239,68,68,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_60px_rgba(239,68,68,0.4)]">
                Start Watching
                <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </Reveal>
      </section>

      <style>{`
        @keyframes slide {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(420%);
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