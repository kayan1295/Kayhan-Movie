
import { useEffect, useRef, useState } from "react";

function IconSection() {
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const devices = [
    {
      title: "Smartphone",
      icon: "bi-phone-fill",
      description:
        "Enjoy your favorite movies and shows anytime, anywhere with a seamless mobile streaming experience.",
    },
    {
      title: "Tablet",
      icon: "bi-tablet-fill",
      description:
        "Experience your favorite content on a larger screen with crystal-clear quality and smooth playback.",
    },
    {
      title: "Smart TV",
      icon: "bi-tv-fill",
      description:
        "Turn your living room into a cinema and enjoy an immersive streaming experience on your Smart TV.",
    },
    {
      title: "Laptop",
      icon: "bi-laptop-fill",
      description:
        "Stream your favorite movies and series directly from your laptop with a fast and reliable experience.",
    },
    {
      title: "Gaming Consoles",
      icon: "bi-controller",
      description:
        "Enjoy entertainment directly from your gaming console and experience streaming like never before.",
    },
    {
      title: "VR Headsets",
      icon: "bi-headset-vr",
      description:
        "Step into an immersive world and experience your favorite entertainment in a whole new dimension.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);

            setVisibleCards((prev) => {
              if (prev.includes(index)) return prev;
              return [...prev, index];
            });
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    const cards = sectionRef.current?.querySelectorAll(".device-card");

    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl overflow-hidden px-4 py-20 md:px-8 lg:px-12"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-red-600/10 blur-[140px]" />

      <div className="pointer-events-none absolute -right-40 bottom-10 h-96 w-96 rounded-full bg-red-800/10 blur-[140px]" />

      {/* Header */}
      <div className="relative mb-12 text-center">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-red-500">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
          Watch Anywhere
        </span>

        <h2 className="mx-auto max-w-4xl text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl">
          We provide you a{" "}
          <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">
            streaming experience
          </span>{" "}
          across various devices.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
          Enjoy your favorite movies and shows wherever you are. Our platform
          works seamlessly across all your favorite devices.
        </p>
      </div>

      {/* Devices Grid */}
      <div className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {devices.map((device, index) => {
          const isVisible = visibleCards.includes(index);

          return (
            <div
              key={device.title}
              data-index={index}
              className={`device-card group relative overflow-hidden rounded-2xl border border-slate-800/80 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-700 ease-out hover:-translate-y-2 hover:border-red-600/50 hover:bg-red-600/[0.04] hover:shadow-2xl hover:shadow-red-950/30 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Top Glow */}
              <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-600/70 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Background Hover Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-32 w-32 rounded-full bg-red-600/10 blur-3xl transition-all duration-500 group-hover:scale-150 group-hover:bg-red-600/20" />

              {/* Icon */}
              <div className="relative mb-6 flex items-center justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-600/20 to-red-950/20 text-2xl text-red-500 shadow-lg shadow-red-950/20 transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/50 group-hover:bg-red-600 group-hover:text-white group-hover:shadow-red-600/30">
                  <i className={`bi ${device.icon}`} />
                </div>

                {/* Number */}
                <span className="text-sm font-bold tracking-widest text-slate-700 transition-colors duration-300 group-hover:text-red-600/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Content */}
              <div className="relative">
                <h3 className="text-xl font-bold text-white transition-colors duration-300 group-hover:text-red-500">
                  {device.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {device.description}
                </p>
              </div>

              {/* Bottom Arrow */}
              <div className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-600 transition-all duration-300 group-hover:gap-3 group-hover:text-red-500">
                Explore
                <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default IconSection;
