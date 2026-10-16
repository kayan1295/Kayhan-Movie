import { useState } from "react";

function Questions() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const questions = [
    {
      id: 1,
      title: "Gaming Consoles",
      answer:
        "Discover everything you need to know about gaming consoles and explore our collection.",
    },
    {
      id: 2,
      title: "Movies & Entertainment",
      answer:
        "Explore a huge collection of movies and entertainment content for every taste.",
    },
    {
      id: 3,
      title: "Subscription Plans",
      answer:
        "Choose the subscription plan that works best for you and enjoy unlimited access.",
    },
    {
      id: 4,
      title: "Account & Security",
      answer:
        "Learn how to manage your account, update your information and keep your account secure.",
    },
    {
      id: 5,
      title: "Payment Methods",
      answer:
        "We support multiple secure payment methods to make your experience easier.",
    },
    {
      id: 6,
      title: "Technical Support",
      answer:
        "If you experience any technical issue, our support team is always ready to help.",
    },
  ];

  function openQuestion(id) {
    setActiveQuestion((prev) => (prev === id ? null : id));
  }

  return (
    <section className="relative mx-auto w-full max-w-4xl px-4 py-16 md:px-8 lg:px-12">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -top-20 right-0 h-72 w-72 rounded-full bg-red-600/10 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-60 w-60 rounded-full bg-red-900/10 blur-[100px]" />

      {/* Header */}
      <div className="relative mb-8 text-center">
        <span className="mb-3 inline-block rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500">
          FAQ
        </span>

        <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
          Frequently Asked <span className="text-red-600">Questions</span>
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-gray-400 md:text-base">
          Explore our frequently asked questions and find everything you need to
          know about our platform.
        </p>

        <button className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:-translate-y-1 hover:bg-red-700 hover:shadow-red-600/40">
          Ask a Question
        </button>
      </div>

      {/* Questions */}
      <div className="relative space-y-4">
        {questions.map((item) => {
          const isOpen = activeQuestion === item.id;

          return (
            <div
              key={item.id}
              className={`relative overflow-hidden rounded-2xl border bg-white/[0.03] p-5 backdrop-blur-xl transition-all duration-500 md:p-6 ${
                isOpen
                  ? "border-red-600/50 shadow-xl shadow-red-900/20"
                  : "border-slate-800 hover:border-red-600/30"
              }`}
            >
              {/* Red top line */}
              <div
                className={`absolute left-0 top-0 h-[2px] bg-gradient-to-r from-red-600 to-transparent transition-all duration-500 ${
                  isOpen ? "w-full" : "w-0"
                }`}
              />

              {/* Question Header */}
              <button
                onClick={() => openQuestion(item.id)}
                className="flex w-full items-center gap-4 text-left"
              >
                {/* Number */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-sm font-bold text-red-500">
                  {String(item.id).padStart(2, "0")}
                </div>

                {/* Title */}
                <span className="flex-1 text-base font-semibold text-white transition-colors duration-300 md:text-lg">
                  {item.title}
                </span>

                {/* Plus */}
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${
                    isOpen
                      ? "rotate-45 border-red-600 bg-red-600 text-white shadow-lg shadow-red-600/30"
                      : "border-slate-700 bg-slate-900 text-gray-400 hover:border-red-600 hover:text-red-500"
                  }`}
                >
                  <i className="bi bi-plus text-xl" />
                </span>
              </button>

              {/* Answer */}
              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isOpen
                    ? "mt-5 grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-slate-800 pt-5">
                    <p className="text-sm leading-7 text-gray-400 md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Questions;
