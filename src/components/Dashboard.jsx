import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import header1 from "../assets/h1.webp";
import header2 from "../assets/h2.webp";
import header3 from "../assets/h3.webp";
import header4 from "../assets/h4.webp";
import main1 from "../assets/movie1.webp";
import main2 from "../assets/movie2.jpg";
import main3 from "../assets/movie3.jpeg";
import main4 from "../assets/movie4.jpg";
import Logo from "../assets/logo.png";

/* =========================================================
   DATA
========================================================= */

const movies = [
  {
    title: "The Last Horizon",
    image: header1,
    progress: 72,
    time: "38 min left",
  },
  {
    title: "Shadow Protocol",
    image: header2,
    progress: 45,
    time: "52 min left",
  },
  {
    title: "Dark Memories",
    image: header3,
    progress: 28,
    time: "1h 12 min left",
  },
];

const myList = [
  {
    title: "Night Runner",
    image: main1,
    rating: "8.7",
    year: "2025",
  },
  {
    title: "Lost Empire",
    image: main2,
    rating: "9.1",
    year: "2025",
  },
  {
    title: "Final Mission",
    image: main3,
    rating: "8.4",
    year: "2024",
  },
  {
    title: "The Unknown",
    image: main4,
    rating: "8.9",
    year: "2025",
  },
];

const recommendations = [
  {
    title: "Crimson Night",
    image: header1,
    rating: "9.0",
    genre: "Thriller",
  },
  {
    title: "Beyond The Sky",
    image: header2,
    rating: "8.6",
    genre: "Sci-Fi",
  },
  {
    title: "Silent Code",
    image: header3,
    rating: "8.8",
    genre: "Action",
  },
  {
    title: "Broken Lines",
    image: header4,
    rating: "8.3",
    genre: "Drama",
  },
];

const menuItems = [
  {
    id: "overview",
    name: "Overview",
    icon: "bi-grid-1x2-fill",
    path: "/dashboard",
  },
  {
    id: "watching",
    name: "Continue Watching",
    icon: "bi-play-circle-fill",
    path: "/dashboard/watching",
  },
  {
    id: "mylist",
    name: "My List",
    icon: "bi-bookmark-fill",
    path: "/dashboard/my-list",
  },
  {
    id: "history",
    name: "Watch History",
    icon: "bi-clock-history",
    path: "/dashboard/history",
  },
  {
    id: "favorites",
    name: "Favorites",
    icon: "bi-heart-fill",
    path: "/dashboard/favorites",
  },
];

const settingsItems = [
  {
    id: "subscription",
    name: "Subscription",
    icon: "bi-credit-card-fill",
    path: "/dashboard/subscription",
  },
  {
    id: "devices",
    name: "Devices",
    icon: "bi-phone-fill",
    path: "/dashboard/devices",
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: "bi-bell-fill",
    path: "/dashboard/notifications",
  },
  {
    id: "settings",
    name: "Settings",
    icon: "bi-gear-fill",
    path: "/dashboard/settings",
  },
];

const allMenuItems = [...menuItems, ...settingsItems];

/* =========================================================
   HELPERS
========================================================= */

const getActiveFromPath = (pathname) => {
  if (pathname === "/dashboard") {
    return "overview";
  }

  const found = allMenuItems.find((item) => item.path === pathname);

  return found?.id || "overview";
};

/* =========================================================
   REVEAL
========================================================= */

function Reveal({ children, delay = 0, className = "" }) {
  const [visible, setVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-1000 ease-out ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   ANIMATED NUMBER
========================================================= */

function AnimatedNumber({ value }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const stringValue = String(value);

    const numericValue = parseFloat(stringValue.replace(/[^\d.]/g, ""));

    if (!numericValue) return;

    let current = 0;

    const increment = Math.max(numericValue / 40, numericValue >= 10 ? 1 : 0.1);

    const timer = setInterval(() => {
      current += increment;

      if (current >= numericValue) {
        current = numericValue;
        clearInterval(timer);
      }

      setCount(Number(current.toFixed(1)));
    }, 25);

    return () => clearInterval(timer);
  }, [value]);

  const stringValue = String(value);

  const suffix = stringValue.includes("h")
    ? "h"
    : stringValue.includes("K")
      ? "K"
      : "";

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

/* =========================================================
   SIDEBAR
========================================================= */

function Sidebar({ active, mobileOpen, setMobileOpen }) {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    navigate(item.path);
    setMobileOpen(false);
  };

  const handleLogout = () => {
    setMobileOpen(false);
    navigate("/");
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[270px] flex-col border-r border-white/[0.07] bg-[#080808]/95 backdrop-blur-2xl transition-transform duration-500 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-white/[0.07] px-7">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="group flex items-center gap-3"
          >

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl">
                <img src={Logo} alt="" />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  Kayhan<span className="text-red-500">Movie</span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  USER Dashboard
                </p>
              </div>
            </div>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-white/5 hover:text-white lg:hidden"
          >
            <i className="bi bi-x-lg" />
          </button>
        </div>

        {/* User */}
        <div className="border-b border-white/[0.07] p-5">
          <div className="group flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 transition-all duration-300 hover:border-red-500/20 hover:bg-red-500/[0.03]">
            <div className="relative">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-red-500 to-red-800 text-sm font-black shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                KT
              </div>

              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0b0b0b] bg-green-500" />
            </div>

            <div className="min-w-0">
              <p className="truncate text-sm font-bold">Kayhan Takhtrawan</p>

              <p className="truncate text-[11px] text-gray-600">
                Premium Member
              </p>
            </div>

            <i className="bi bi-three-dots ml-auto text-gray-600" />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-700">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item)}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-red-500/10 text-red-400"
                      : "text-gray-500 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                  )}

                  <i
                    className={`bi ${item.icon} text-base transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-red-500" : ""
                    }`}
                  />

                  <span>{item.name}</span>

                  {item.id === "mylist" && (
                    <span className="ml-auto rounded-full bg-red-500/10 px-2 py-0.5 text-[9px] text-red-400">
                      12
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="mb-3 mt-8 px-3 text-[9px] font-bold uppercase tracking-[0.25em] text-gray-700">
            Account
          </p>

          <div className="space-y-1">
            {settingsItems.map((item) => {
              const isActive = active === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavigation(item)}
                  className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition-all duration-300 ${
                    isActive
                      ? "bg-red-500/10 text-red-400"
                      : "text-gray-500 hover:bg-white/[0.035] hover:text-white"
                  }`}
                >
                  {isActive && (
                    <span className="absolute bottom-2 left-0 top-2 w-[2px] rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
                  )}

                  <i
                    className={`bi ${item.icon} text-base transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-red-500" : ""
                    }`}
                  />

                  <span>{item.name}</span>

                  {item.id === "notifications" && (
                    <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1.5 text-[9px] font-bold text-white">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/[0.07] p-4">
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            className="group flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-500 transition-all hover:bg-white/[0.035] hover:text-white"
          >
            <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-1" />
            Back to MOVIEX
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            className="group mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition-all hover:bg-red-500/[0.04] hover:text-red-400"
          >
            <i className="bi bi-box-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({ icon, title, value, description, trend, delay }) {
  return (
    <Reveal delay={delay}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-red-500/25 hover:bg-red-500/[0.025] hover:shadow-[0_20px_50px_rgba(239,68,68,0.08)]">
        <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-red-500/10 blur-3xl opacity-0 transition-all duration-500 group-hover:opacity-100" />

        <div className="relative z-10">
          <div className="flex items-start justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
              <i className={`bi ${icon}`} />
            </div>

            {trend && (
              <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-[9px] font-semibold text-green-400">
                <i className="bi bi-arrow-up" />
                {trend}
              </span>
            )}
          </div>

          <p className="mt-5 text-xs text-gray-600">{title}</p>

          <p className="mt-1 text-2xl font-black">
            <AnimatedNumber value={value} />
          </p>

          <p className="mt-1 text-[10px] text-gray-700">{description}</p>
        </div>
      </div>
    </Reveal>
  );
}

/* =========================================================
   CONTINUE CARD
========================================================= */

function ContinueCard({ movie, index }) {
  const navigate = useNavigate();

  return (
    <Reveal delay={index * 100}>
      <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025] transition-all duration-500 hover:-translate-y-1 hover:border-red-500/25">
        <div className="relative h-48 overflow-hidden sm:h-56">
          <img
            src={movie.image}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <button
            type="button"
            onClick={() => navigate("/dashboard/watching")}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-lg shadow-[0_0_35px_rgba(239,68,68,0.4)] opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
          >
            <i className="bi bi-play-fill" />
          </button>

          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-bold">{movie.title}</p>

            <p className="mt-1 text-[10px] text-gray-400">{movie.time}</p>
          </div>
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[10px] text-gray-600">
              {movie.progress}% completed
            </span>

            <i className="bi bi-three-dots text-xs text-gray-600" />
          </div>

          <div className="h-1 overflow-hidden rounded-full bg-white/5">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-400 transition-all duration-1000 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.6)]"
              style={{
                width: `${movie.progress}%`,
              }}
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* =========================================================
   MOVIE SMALL CARD
========================================================= */

function MovieSmallCard({ movie, index }) {
  const navigate = useNavigate();

  return (
    <Reveal delay={index * 100}>
      <div className="group flex gap-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all duration-300 hover:border-red-500/20 hover:bg-white/[0.035]">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-lg">
          <img
            src={movie.image}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-black/20" />

          <button
            type="button"
            onClick={() => navigate("/dashboard/watching")}
            className="absolute left-1/2 top-1/2 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-xs opacity-0 transition-all group-hover:opacity-100"
          >
            <i className="bi bi-play-fill" />
          </button>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h4 className="truncate text-sm font-bold">{movie.title}</h4>

              <p className="mt-1 text-[10px] text-gray-600">
                {movie.year} • Movie
              </p>
            </div>

            <span className="flex shrink-0 items-center gap-1 text-[10px] text-yellow-500">
              <i className="bi bi-star-fill" />
              {movie.rating}
            </span>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/watching")}
            className="mt-5 text-[10px] font-semibold text-red-400 transition-colors hover:text-red-300"
          >
            View details
            <i className="bi bi-arrow-right ml-1" />
          </button>
        </div>
      </div>
    </Reveal>
  );
}

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ eyebrow, title, action, onAction }) {
  return (
    <Reveal>
      <div className="mb-5 flex items-end justify-between">
        <div>
          {eyebrow && (
            <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-500">
              {eyebrow}
            </p>
          )}

          <h2 className="mt-2 text-2xl font-black">{title}</h2>
        </div>

        {action && (
          <button
            type="button"
            onClick={onAction}
            className="text-xs font-semibold text-gray-600 transition-colors hover:text-red-400"
          >
            {action}
            <i className="bi bi-arrow-right ml-2" />
          </button>
        )}
      </div>
    </Reveal>
  );
}

/* =========================================================
   OVERVIEW
========================================================= */

function Overview({ navigate }) {
  return (
    <>
      {/* Hero */}
      <Reveal>
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-950/40 via-[#100909] to-black p-7 sm:p-9">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/15 blur-[100px]" />

          <div className="absolute right-0 top-0 hidden h-full w-1/2 opacity-20 lg:block">
            <div
              className="h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/images/h4.webp')",
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#100909] via-[#100909]/60 to-transparent" />
          </div>

          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />
              Premium Member
            </span>

            <h1 className="mt-5 text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              Your cinematic world
              <span className="block text-red-500">starts here.</span>
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-gray-500">
              Pick up where you left off, discover something new, or explore
              your personal movie collection.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => navigate("/dashboard/watching")}
                className="group rounded-xl bg-red-600 px-5 py-3 text-xs font-bold shadow-[0_0_30px_rgba(239,68,68,0.2)] transition-all hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_0_45px_rgba(239,68,68,0.35)]"
              >
                <i className="bi bi-play-fill mr-2 transition-transform group-hover:scale-125" />
                Continue Watching
              </button>

              <Link
                to="/movies"
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-xs font-semibold text-gray-300 transition-all hover:border-red-500/20 hover:bg-red-500/10 hover:text-white"
              >
                <i className="bi bi-compass mr-2" />
                Explore Movies
              </Link>
            </div>
          </div>
        </section>
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        <StatCard
          icon="bi-play-circle-fill"
          title="Movies Watched"
          value="127"
          description="All time"
          trend="12%"
          delay={0}
        />

        <StatCard
          icon="bi-clock-fill"
          title="Watch Time"
          value="84h"
          description="This month"
          trend="8%"
          delay={100}
        />

        <StatCard
          icon="bi-heart-fill"
          title="Favorites"
          value="42"
          description="Saved movies"
          trend="5%"
          delay={200}
        />

        <StatCard
          icon="bi-stars"
          title="Your Rating"
          value="8.7"
          description="Average rating"
          delay={300}
        />
      </div>

      {/* Continue Watching */}
      <section className="mt-12">
        <SectionTitle
          eyebrow="Pick up where you left off"
          title="Continue Watching"
          action="View all"
          onAction={() => navigate("/dashboard/watching")}
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {movies.map((movie, index) => (
            <ContinueCard key={movie.title} movie={movie} index={index} />
          ))}
        </div>
      </section>

      {/* Activity + List */}
      <div className="mt-12 grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">
        <Reveal>
          <section className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-500">
                  Your activity
                </p>

                <h2 className="mt-2 text-xl font-black">Watch Activity</h2>
              </div>

              <button
                type="button"
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] text-gray-500 hover:text-white"
              >
                This Week
                <i className="bi bi-chevron-down ml-2" />
              </button>
            </div>

            <div className="mt-8 flex h-48 items-end justify-between gap-2 sm:gap-4">
              {[35, 58, 42, 78, 52, 91, 67].map((height, index) => (
                <div
                  key={index}
                  className="group flex h-full flex-1 flex-col items-center justify-end gap-2"
                >
                  <div className="relative w-full max-w-[42px]">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-red-950 to-red-500/70 transition-all duration-700 group-hover:from-red-900 group-hover:to-red-400 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]"
                      style={{
                        height: `${height * 1.55}px`,
                      }}
                    />

                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] text-gray-700 opacity-0 transition-opacity group-hover:opacity-100">
                      {Math.floor(height / 4)}h
                    </span>
                  </div>

                  <span className="text-[9px] text-gray-700">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][index]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <section>
          <SectionTitle
            eyebrow="Saved for later"
            title="My List"
            action="View all"
            onAction={() => navigate("/dashboard/my-list")}
          />

          <div className="space-y-2">
            {myList.map((movie, index) => (
              <MovieSmallCard key={movie.title} movie={movie} index={index} />
            ))}
          </div>
        </section>
      </div>

      {/* Recommendations */}
      <section className="mt-12">
        <SectionTitle
          eyebrow="Based on your taste"
          title="Recommended For You"
          action="See more"
          onAction={() => navigate("/movies")}
        />

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-5">
          {recommendations.map((movie, index) => (
            <Reveal key={movie.title} delay={index * 100}>
              <div className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                <div className="relative aspect-[2/3] overflow-hidden">
                  <img
                    src={movie.image}
                    alt={movie.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg border border-white/10 bg-black/60 px-2 py-1 text-[9px] text-yellow-400 backdrop-blur-md">
                    <i className="bi bi-star-fill" />
                    {movie.rating}
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate("/dashboard/watching")}
                    className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-red-600 text-lg shadow-[0_0_35px_rgba(239,68,68,0.35)] opacity-0 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100"
                  >
                    <i className="bi bi-play-fill" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="truncate text-sm font-bold">{movie.title}</p>

                    <p className="mt-1 text-[9px] text-gray-400">
                      {movie.genre}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subscription */}
      <section className="mt-12">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-red-500/15 bg-gradient-to-r from-red-950/30 via-[#100909] to-black p-6 sm:p-8">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-red-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-500">
                  <i className="bi bi-gem" />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-black">Premium Plan</h3>

                    <span className="rounded-full bg-green-500/10 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-green-400">
                      Active
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-gray-600">
                    Your next billing date is November 12, 2026
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/subscription")}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-gray-400 transition-all hover:border-red-500/20 hover:text-white"
                >
                  Manage Plan
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard/subscription")}
                  className="rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold transition-all hover:bg-red-500 hover:shadow-[0_0_25px_rgba(239,68,68,0.25)]"
                >
                  Upgrade
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

/* =========================================================
   GENERIC PAGE
========================================================= */

function DashboardPage({ title, eyebrow, description, icon, children }) {
  return (
    <div>
      <Reveal>
        <section className="relative mb-8 overflow-hidden rounded-3xl border border-red-500/15 bg-gradient-to-br from-red-950/30 via-[#100909] to-black p-7 sm:p-9">
          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-red-600/10 blur-[100px]" />

          <div className="relative z-10">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 text-2xl text-red-500">
                <i className={`bi ${icon}`} />
              </div>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-red-500">
                  {eyebrow}
                </p>

                <h1 className="mt-2 text-3xl font-black sm:text-4xl">
                  {title}
                </h1>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {children}
    </div>
  );
}

/* =========================================================
   WATCHING PAGE
========================================================= */

function WatchingPage() {
  return (
    <DashboardPage
      eyebrow="Your movies"
      title="Continue Watching"
      icon="bi-play-circle-fill"
      description="Continue your unfinished movies and series exactly where you left off."
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {movies.map((movie, index) => (
          <ContinueCard key={movie.title} movie={movie} index={index} />
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   MY LIST PAGE
========================================================= */

function MyListPage() {
  return (
    <DashboardPage
      eyebrow="Your collection"
      title="My List"
      icon="bi-bookmark-heart-fill"
      description="Movies and series you saved to watch later."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {myList.map((movie, index) => (
          <MovieSmallCard key={movie.title} movie={movie} index={index} />
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   HISTORY PAGE
========================================================= */

function HistoryPage() {
  const history = [...movies, ...myList.slice(0, 2)];

  return (
    <DashboardPage
      eyebrow="Your activity"
      title="Watch History"
      icon="bi-clock-history"
      description="A complete timeline of movies and shows you have watched."
    >
      <div className="space-y-3">
        {history.map((movie, index) => (
          <Reveal key={`${movie.title}-${index}`} delay={index * 80}>
            <div className="group flex items-center gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-4 transition-all hover:border-red-500/20 hover:bg-red-500/[0.02]">
              <div className="relative h-20 w-14 shrink-0 overflow-hidden rounded-xl">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate font-bold">{movie.title}</h3>

                <p className="mt-1 text-xs text-gray-600">
                  Watched recently • Movie
                </p>
              </div>

              <button
                type="button"
                className="hidden rounded-xl border border-white/10 px-4 py-2 text-xs text-gray-500 transition hover:border-red-500/20 hover:text-white sm:block"
              >
                Watch Again
              </button>

              <i className="bi bi-chevron-right text-gray-700 sm:hidden" />
            </div>
          </Reveal>
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   FAVORITES PAGE
========================================================= */

function FavoritesPage() {
  return (
    <DashboardPage
      eyebrow="Your favorites"
      title="Favorites"
      icon="bi-heart-fill"
      description="All the movies and series you marked as favorites."
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {recommendations.map((movie, index) => (
          <Reveal key={movie.title} delay={index * 100}>
            <div className="group overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.025]">
              <div className="relative aspect-[2/3] overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

                <button
                  type="button"
                  className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-red-600 text-sm shadow-lg"
                >
                  <i className="bi bi-heart-fill" />
                </button>

                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="truncate text-sm font-bold">{movie.title}</h3>

                  <p className="mt-1 text-[10px] text-gray-500">
                    {movie.genre} • {movie.rating}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   SUBSCRIPTION PAGE
========================================================= */

function SubscriptionPage() {
  return (
    <DashboardPage
      eyebrow="Membership"
      title="Subscription"
      icon="bi-credit-card-fill"
      description="Manage your MOVIEX membership, billing and premium benefits."
    >
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/40 via-[#120909] to-black p-7 sm:p-10">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-red-500/10 blur-[100px]" />

          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <span className="rounded-full bg-green-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-green-400">
                Active
              </span>

              <h2 className="mt-5 text-3xl font-black">Premium</h2>

              <p className="mt-2 text-gray-500">$14.99 / month</p>

              <p className="mt-4 text-xs text-gray-600">
                Next billing date: November 12, 2026
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                ["4K", "Ultra HD"],
                ["5", "Devices"],
                ["∞", "Movies"],
                ["AD", "Free"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center"
                >
                  <p className="text-xl font-black text-red-500">{value}</p>

                  <p className="mt-1 text-[9px] text-gray-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-8 flex flex-wrap gap-3 border-t border-white/5 pt-6">
            <button
              type="button"
              className="rounded-xl bg-red-600 px-5 py-3 text-xs font-bold transition hover:bg-red-500"
            >
              Upgrade Plan
            </button>

            <button
              type="button"
              className="rounded-xl border border-white/10 px-5 py-3 text-xs text-gray-500 transition hover:border-white/20 hover:text-white"
            >
              Manage Billing
            </button>
          </div>
        </div>
      </Reveal>
    </DashboardPage>
  );
}

/* =========================================================
   DEVICES PAGE
========================================================= */

function DevicesPage() {
  const devices = [
    {
      name: "MacBook Pro",
      type: "Laptop",
      icon: "bi-laptop",
      location: "Current device",
      active: true,
    },
    {
      name: "iPhone 15 Pro",
      type: "Mobile",
      icon: "bi-phone",
      location: "Mobile",
      active: true,
    },
    {
      name: "Samsung Smart TV",
      type: "Smart TV",
      icon: "bi-tv",
      location: "Home",
      active: false,
    },
  ];

  return (
    <DashboardPage
      eyebrow="Connected devices"
      title="Devices"
      icon="bi-phone-fill"
      description="Manage the devices currently connected to your MOVIEX account."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {devices.map((device, index) => (
          <Reveal key={device.name} delay={index * 100}>
            <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-all hover:-translate-y-1 hover:border-red-500/20">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 text-xl text-red-500">
                  <i className={`bi ${device.icon}`} />
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-[9px] ${
                    device.active
                      ? "bg-green-500/10 text-green-400"
                      : "bg-white/5 text-gray-600"
                  }`}
                >
                  {device.active ? "Active now" : "Inactive"}
                </span>
              </div>

              <h3 className="mt-5 font-bold">{device.name}</h3>

              <p className="mt-1 text-xs text-gray-600">
                {device.type} • {device.location}
              </p>

              <button
                type="button"
                className="mt-5 text-xs font-semibold text-red-400 transition hover:text-red-300"
              >
                Remove device
              </button>
            </div>
          </Reveal>
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   NOTIFICATIONS PAGE
========================================================= */

function NotificationsPage() {
  const notifications = [
    {
      title: "New movie added",
      text: "Crimson Night is now available to watch.",
      time: "10 min ago",
      icon: "bi-plus-circle",
    },
    {
      title: "Subscription reminder",
      text: "Your Premium membership will renew soon.",
      time: "2 hours ago",
      icon: "bi-credit-card",
    },
    {
      title: "New recommendation",
      text: "We found something you might love.",
      time: "Yesterday",
      icon: "bi-stars",
    },
    {
      title: "Welcome back",
      text: "Your personalized dashboard is ready.",
      time: "2 days ago",
      icon: "bi-hand-wave",
    },
  ];

  return (
    <DashboardPage
      eyebrow="Stay updated"
      title="Notifications"
      icon="bi-bell-fill"
      description="Everything important about your account and movie activity."
    >
      <div className="space-y-3">
        {notifications.map((item, index) => (
          <Reveal key={item.title} delay={index * 100}>
            <div className="flex gap-4 rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-red-500/20">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500">
                <i className={`bi ${item.icon}`} />
              </div>

              <div className="flex-1">
                <div className="flex justify-between gap-3">
                  <h3 className="font-bold">{item.title}</h3>

                  <span className="text-[9px] text-gray-700">{item.time}</span>
                </div>

                <p className="mt-2 text-xs leading-5 text-gray-500">
                  {item.text}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   SETTINGS PAGE
========================================================= */

function SettingsPage() {
  const [autoplay, setAutoplay] = useState(true);
  const [quality, setQuality] = useState("Auto");

  return (
    <DashboardPage
      eyebrow="Account preferences"
      title="Settings"
      icon="bi-gear-fill"
      description="Customize your MOVIEX experience and account preferences."
    >
      <div className="space-y-5">
        <Reveal>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
            <h3 className="font-black">Playback</h3>

            <div className="mt-5 divide-y divide-white/5">
              <div className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="text-sm font-semibold">Autoplay</p>

                  <p className="mt-1 text-xs text-gray-600">
                    Automatically play the next episode.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAutoplay((prev) => !prev)}
                  className={`relative h-6 w-11 rounded-full transition ${
                    autoplay ? "bg-red-600" : "bg-white/10"
                  }`}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
                      autoplay ? "left-6" : "left-1"
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 py-5">
                <div>
                  <p className="text-sm font-semibold">Video Quality</p>

                  <p className="mt-1 text-xs text-gray-600">
                    Choose your preferred streaming quality.
                  </p>
                </div>

                <select
                  value={quality}
                  onChange={(e) => setQuality(e.target.value)}
                  className="rounded-xl border border-white/10 bg-black px-3 py-2 text-xs text-gray-400 outline-none"
                >
                  <option>Auto</option>
                  <option>1080p</option>
                  <option>720p</option>
                  <option>480p</option>
                </select>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-6">
            <h3 className="font-black">Account</h3>

            <div className="mt-5 space-y-3">
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:border-red-500/20"
              >
                <span>
                  <span className="block text-sm font-semibold">
                    Change Password
                  </span>

                  <span className="mt-1 block text-[10px] text-gray-600">
                    Update your account password
                  </span>
                </span>

                <i className="bi bi-chevron-right text-gray-700" />
              </button>

              <button
                type="button"
                className="flex w-full items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] p-4 text-left transition hover:border-red-500/20"
              >
                <span>
                  <span className="block text-sm font-semibold">
                    Edit Profile
                  </span>

                  <span className="mt-1 block text-[10px] text-gray-600">
                    Update your personal information
                  </span>
                </span>

                <i className="bi bi-chevron-right text-gray-700" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </DashboardPage>
  );
}

/* =========================================================
   MAIN DASHBOARD
========================================================= */

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const active = getActiveFromPath(location.pathname);

  /* Close menus whenever route changes */
  useEffect(() => {
    setMobileOpen(false);
    setShowNotifications(false);
    setShowProfile(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [location.pathname]);

  const renderContent = () => {
    switch (active) {
      case "watching":
        return <WatchingPage />;

      case "mylist":
        return <MyListPage />;

      case "history":
        return <HistoryPage />;

      case "favorites":
        return <FavoritesPage />;

      case "subscription":
        return <SubscriptionPage />;

      case "devices":
        return <DevicesPage />;

      case "notifications":
        return <NotificationsPage />;

      case "settings":
        return <SettingsPage />;

      case "overview":
      default:
        return <Overview navigate={navigate} />;
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white">
      {/* Global Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-60 top-40 h-[500px] w-[500px] rounded-full bg-red-600/[0.06] blur-[140px]" />

        <div className="absolute -right-60 top-[60%] h-[500px] w-[500px] rounded-full bg-red-600/[0.04] blur-[140px]" />
      </div>

      {/* Sidebar */}
      <Sidebar
        active={active}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main */}
      <div className="relative min-h-screen lg:pl-[270px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#050505]/80 backdrop-blur-2xl">
          <div className="flex h-20 items-center justify-between px-5 sm:px-7 lg:px-10">
            <div className="flex items-center gap-4">
              {/* Mobile menu */}
              <button
                type="button"
                onClick={() => setMobileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-400 transition-all hover:border-red-500/20 hover:text-white lg:hidden"
              >
                <i className="bi bi-list text-xl" />
              </button>

              <div>
                <p className="hidden text-[10px] uppercase tracking-[0.25em] text-gray-600 sm:block">
                  Welcome back
                </p>

                <h2 className="text-lg font-black sm:text-xl">
                  Hello Kayhan 👋
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search */}
              <button
                type="button"
                onClick={() => navigate("/movies")}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-gray-500 transition-all hover:border-red-500/20 hover:text-white"
              >
                <i className="bi bi-search" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowNotifications((prev) => !prev)}
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.025] text-gray-500 transition-all hover:border-red-500/20 hover:text-white"
                >
                  <i className="bi bi-bell" />

                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </button>

                {showNotifications && (
                  <div className="absolute right-0 top-14 w-80 overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-4 shadow-2xl backdrop-blur-xl">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">Notifications</h3>

                      <span className="rounded-full bg-red-500/10 px-2 py-1 text-[9px] text-red-400">
                        3 new
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      {[
                        "New movie added to your list.",
                        "Your subscription renews soon.",
                        "New recommendation available.",
                      ].map((item, index) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setShowNotifications(false);
                            navigate("/dashboard/notifications");
                          }}
                          className="flex w-full gap-3 rounded-xl bg-white/[0.025] p-3 text-left transition hover:bg-white/[0.05]"
                        >
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-500/10 text-red-500">
                            <i
                              className={`bi ${
                                index === 0
                                  ? "bi-plus-circle"
                                  : index === 1
                                    ? "bi-credit-card"
                                    : "bi-stars"
                              }`}
                            />
                          </div>

                          <p className="text-xs leading-5 text-gray-400">
                            {item}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowProfile((prev) => !prev)}
                  className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.025] p-1.5 pr-3 transition-all hover:border-red-500/20"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-red-500 to-red-800 text-[10px] font-black">
                    KT
                  </div>

                  <i className="bi bi-chevron-down hidden text-[9px] text-gray-600 sm:block" />
                </button>

                {showProfile && (
                  <div className="absolute right-0 top-14 w-48 rounded-2xl border border-white/10 bg-[#0c0c0c]/95 p-2 shadow-2xl backdrop-blur-xl">
                    <button
                      type="button"
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/dashboard/settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-gray-500 transition hover:bg-white/5 hover:text-white"
                    >
                      <i className="bi bi-person" />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowProfile(false);
                        navigate("/dashboard/settings");
                      }}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-gray-500 transition hover:bg-white/5 hover:text-white"
                    >
                      <i className="bi bi-gear" />
                      Settings
                    </button>

                    <div className="my-1 h-px bg-white/5" />

                    <button
                      type="button"
                      onClick={() => navigate("/")}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-xs text-red-400 transition hover:bg-red-500/5"
                    >
                      <i className="bi bi-box-arrow-right" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="mx-auto max-w-[1600px] px-5 py-8 sm:px-7 lg:px-10 lg:py-10">
          {renderContent()}

          {/* Footer */}
          <footer className="mt-16 border-t border-white/[0.05] py-7">
            <div className="flex flex-col items-center justify-between gap-4 text-[10px] text-gray-700 sm:flex-row">
              <p>© {new Date().getFullYear()} MOVIEX. All rights reserved.</p>

              <div className="flex items-center gap-5">
                <Link
                  to="/privacy"
                  className="transition-colors hover:text-gray-400"
                >
                  Privacy
                </Link>

                <Link
                  to="/terms"
                  className="transition-colors hover:text-gray-400"
                >
                  Terms
                </Link>

                <Link
                  to="/contact"
                  className="transition-colors hover:text-gray-400"
                >
                  Help Center
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-4 left-4 right-4 z-40 flex items-center justify-around rounded-2xl border border-white/10 bg-[#0b0b0b]/90 p-2 shadow-2xl backdrop-blur-xl lg:hidden">
        {[
          {
            id: "overview",
            icon: "bi-grid-1x2-fill",
            path: "/dashboard",
          },
          {
            id: "watching",
            icon: "bi-play-circle-fill",
            path: "/dashboard/watching",
          },
          {
            id: "mylist",
            icon: "bi-bookmark-heart-fill",
            path: "/dashboard/my-list",
          },
          {
            id: "history",
            icon: "bi-clock-history",
            path: "/dashboard/history",
          },
          {
            id: "settings",
            icon: "bi-gear-fill",
            path: "/dashboard/settings",
          },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => navigate(item.path)}
            className={`flex h-11 w-12 items-center justify-center rounded-xl text-lg transition-all duration-300 ${
              active === item.id
                ? "bg-red-500/10 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.1)]"
                : "text-gray-600 hover:text-gray-300"
            }`}
          >
            <i className={`bi ${item.icon}`} />
          </button>
        ))}
      </div>

      {/* Reduced Motion */}
      <style>
        {`
          @media (prefers-reduced-motion: reduce) {
            *,
            *::before,
            *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              scroll-behavior: auto !important;
              transition-duration: 0.01ms !important;
            }
          }
        `}
      </style>
    </main>
  );
}
