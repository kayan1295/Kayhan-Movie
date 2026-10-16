import { useEffect, useRef, useState } from "react";

const plans = {
  monthly: [
    {
      name: "Free",
      price: "0",
      suffix: "forever",
      description: "For trying out the experience.",
      icon: "bi-gift",
      features: ["Selected movies", "HD quality", "1 device", "Ads included"],
      button: "Get Started",
    },
    {
      name: "Basic",
      price: "7.99",
      suffix: "/ month",
      description: "Everything you need for casual watching.",
      icon: "bi-play-circle",
      features: ["Full movie library", "HD quality", "1 device", "5 downloads"],
      button: "Start Free Trial",
    },
    {
      name: "Standard",
      price: "12.99",
      suffix: "/ month",
      description: "The perfect plan for movie lovers.",
      icon: "bi-film",
      popular: true,
      features: [
        "Full movie & series library",
        "Full HD quality",
        "2 devices",
        "20 downloads",
        "Ad-free",
      ],
      button: "Start Free Trial",
    },
    {
      name: "Premium",
      price: "19.99",
      suffix: "/ month",
      description: "The ultimate cinematic experience.",
      icon: "bi-stars",
      features: [
        "Everything in Standard",
        "4K + HDR",
        "4 devices",
        "Unlimited downloads",
        "Dolby Atmos",
        "No ads",
      ],
      button: "Start Free Trial",
    },
  ],

  yearly: [
    {
      name: "Free",
      price: "0",
      suffix: "forever",
      description: "For trying out the experience.",
      icon: "bi-gift",
      features: ["Selected movies", "HD quality", "1 device", "Ads included"],
      button: "Get Started",
    },
    {
      name: "Basic",
      price: "59.99",
      suffix: "/ year",
      oldPrice: "95.88",
      save: "37% OFF",
      description: "Everything you need for casual watching.",
      icon: "bi-play-circle",
      features: ["Full movie library", "HD quality", "1 device", "5 downloads"],
      button: "Start Free Trial",
    },
    {
      name: "Standard",
      price: "99.99",
      suffix: "/ year",
      oldPrice: "155.88",
      save: "36% OFF",
      description: "The perfect plan for movie lovers.",
      icon: "bi-film",
      popular: true,
      features: [
        "Full movie & series library",
        "Full HD quality",
        "2 devices",
        "20 downloads",
        "Ad-free",
      ],
      button: "Start Free Trial",
    },
    {
      name: "Premium",
      price: "149.99",
      suffix: "/ year",
      oldPrice: "239.88",
      save: "37% OFF",
      description: "The ultimate cinematic experience.",
      icon: "bi-stars",
      features: [
        "Everything in Standard",
        "4K + HDR",
        "4 devices",
        "Unlimited downloads",
        "Dolby Atmos",
        "No ads",
      ],
      button: "Start Free Trial",
    },
  ],
};

const PricingPlan = () => {
  const sectionRef = useRef(null);
  const [billing, setBilling] = useState("monthly");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
      },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const currentPlans = plans[billing];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-4 py-24 md:px-8"
    >
      {/* Background Glow */}

      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-600/[0.06] blur-[160px]" />

      <div className="pointer-events-none absolute -left-40 top-40 h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-red-900/10 blur-[130px]" />

      <div className="relative mx-auto max-w-6xl">
        {/* ================= HEADER ================= */}

        <div
          className={`mx-auto max-w-2xl text-center transition-all duration-1000 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"
          }`}
        >
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-red-600" />

            <span className="text-[10px] font-bold uppercase tracking-[0.35em] text-red-500">
              Membership
            </span>

            <span className="h-px w-8 bg-red-600" />
          </div>

          <h2 className="text-4xl font-black tracking-tight text-white md:text-5xl">
            Choose Your
            <span className="text-red-600"> Experience</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-gray-500">
            Simple plans. Premium entertainment. Choose the experience that fits
            you.
          </p>
        </div>

        {/* ================= TOGGLE ================= */}

        <div
          className={`mt-10 flex justify-center transition-all delay-200 duration-700 ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative flex rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl">
            <div
              className={`absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-full bg-red-600 shadow-[0_0_25px_rgba(239,68,68,0.3)] transition-all duration-500 ${
                billing === "monthly" ? "left-1" : "left-[calc(50%+1px)]"
              }`}
            />

            <button
              onClick={() => setBilling("monthly")}
              className={`relative z-10 min-w-[115px] rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                billing === "monthly"
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Monthly
            </button>

            <button
              onClick={() => setBilling("yearly")}
              className={`relative z-10 flex min-w-[125px] items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-300 ${
                billing === "yearly"
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              Yearly
              <span
                className={`rounded-full px-2 py-0.5 text-[8px] font-black ${
                  billing === "yearly"
                    ? "bg-white/20 text-white"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                SAVE
              </span>
            </button>
          </div>
        </div>

        {/* ================= CARDS ================= */}

        <div className="mt-14 grid items-stretch gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {currentPlans.map((plan, index) => (
            <div
              key={`${billing}-${plan.name}`}
              style={{
                transitionDelay: visible ? `${index * 120}ms` : "0ms",
              }}
              className={`relative flex transition-all duration-700 ${
                visible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-20 opacity-0"
              }`}
            >
              {/* Popular Glow */}

              {plan.popular && (
                <div className="absolute -inset-[1px] rounded-[22px] bg-gradient-to-b from-red-500/60 via-red-600/20 to-transparent opacity-80 blur-[2px]" />
              )}

              {/* CARD */}

              <div
                className={`group relative flex w-full flex-col rounded-[22px] border bg-[#090909] p-5 transition-all duration-500 hover:-translate-y-2 ${
                  plan.popular
                    ? "border-red-500/50 shadow-[0_20px_60px_rgba(127,29,29,0.25)]"
                    : "border-white/[0.08] hover:border-red-500/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                }`}
              >
                {/* Popular Badge */}

                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="flex items-center gap-1.5 rounded-full border border-red-500/30 bg-[#0d0505] px-3 py-1.5 text-[9px] font-black uppercase tracking-wider text-red-400 shadow-lg shadow-red-900/20">
                      <i className="bi bi-fire" />
                      Most Popular
                    </span>
                  </div>
                )}

                {/* ICON */}

                <div className="mb-5">
                  <div
                    className={`flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-500 group-hover:scale-110 ${
                      plan.popular
                        ? "border-red-500/30 bg-red-600/10 text-red-500 group-hover:bg-red-600 group-hover:text-white"
                        : "border-white/10 bg-white/[0.03] text-gray-500 group-hover:border-red-500/30 group-hover:bg-red-600/10 group-hover:text-red-500"
                    }`}
                  >
                    <i className={`bi ${plan.icon} text-lg`} />
                  </div>
                </div>

                {/* NAME */}

                <h3 className="text-xl font-bold text-white">{plan.name}</h3>

                <p className="mt-2 min-h-[42px] text-[11px] leading-5 text-gray-600">
                  {plan.description}
                </p>

                {/* PRICE */}

                <div className="mt-6 border-b border-white/[0.07] pb-6">
                  <div className="flex items-end">
                    <span
                      key={plan.price}
                      className="animate-[priceIn_0.4s_ease-out] text-3xl font-black tracking-tight text-white"
                    >
                      ${plan.price}
                    </span>

                    <span className="mb-1 ml-1 text-[10px] text-gray-600">
                      {plan.suffix}
                    </span>
                  </div>

                  {plan.oldPrice && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-[10px] text-gray-700 line-through">
                        ${plan.oldPrice}
                      </span>

                      <span className="rounded-full bg-green-500/10 px-2 py-0.5 text-[8px] font-bold text-green-400">
                        {plan.save}
                      </span>
                    </div>
                  )}
                </div>

                {/* FEATURES */}

                <div className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-2.5 text-[11px] text-gray-400"
                    >
                      <span
                        className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                          plan.popular
                            ? "bg-red-600/15 text-red-500"
                            : "bg-white/[0.05] text-gray-600"
                        }`}
                      >
                        <i className="bi bi-check2 text-[9px]" />
                      </span>

                      <span className="leading-4">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* BUTTON */}

                <button
                  className={`group/button relative mt-7 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border py-3 text-[11px] font-bold transition-all duration-300 ${
                    plan.popular
                      ? "border-red-500 bg-red-600 text-white shadow-lg shadow-red-600/20 hover:bg-red-500 hover:shadow-red-600/40"
                      : "border-white/10 bg-white/[0.03] text-gray-300 hover:border-red-500/40 hover:bg-red-600/10 hover:text-red-400"
                  }`}
                >
                  <span className="relative z-10">{plan.button}</span>

                  <i className="bi bi-arrow-right relative z-10 transition-transform duration-300 group-hover/button:translate-x-1" />

                  {/* Shine */}

                  <span className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover/button:left-[120%]" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ================= BOTTOM TRIAL ================= */}

        <div
          className={`mt-10 flex flex-col items-center justify-center gap-3 text-center transition-all delay-700 duration-700 sm:flex-row ${
            visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2 text-[11px] text-gray-600">
            <i className="bi bi-shield-check text-red-600" />

            <span>Start with a 7-day free trial</span>
          </div>

          <span className="hidden text-gray-800 sm:block">•</span>

          <span className="text-[11px] text-gray-600">Cancel anytime</span>
        </div>
      </div>

      {/* Custom Animations */}

      <style>
        {`
          @keyframes priceIn {
            from {
              opacity: 0;
              transform: translateY(8px);
            }

            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </section>
  );
};

export default PricingPlan;
