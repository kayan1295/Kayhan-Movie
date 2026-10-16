import { useEffect, useRef, useState } from "react";

import header1 from "../assets/h1.webp";
import header2 from "../assets/h2.webp";
import header3 from "../assets/h3.webp";
import header4 from "../assets/h4.webp";
import Logo from "../assets/logo.png";
import { Link } from "react-router";

const movies = [
  {
    image: header1,
    title: "The Best Streaming Experience",
    description:
      "Discover thousands of movies and unforgettable stories. Your next favorite movie is waiting for you.",
    tag: "Unlimited Entertainment",
    category: "Featured",
  },
  {
    image: header2,
    title: "Your Movies. Your World.",
    description:
      "Stream the latest blockbusters and timeless classics in stunning quality, whenever you want.",
    tag: "Premium Cinema",
    category: "Trending",
  },
  {
    image: header3,
    title: "Feel Every Moment",
    description:
      "Experience cinematic stories with incredible visuals, immersive sound and endless entertainment.",
    tag: "4K Ultra HD",
    category: "Featured",
  },
  {
    image: header4,
    title: "Entertainment Without Limits",
    description:
      "From action-packed adventures to unforgettable dramas, there is always something new to watch.",
    tag: "Watch Anywhere",
    category: "New Release",
  },
];

const Header = () => {
  const [current, setCurrent] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const movie = movies[current];

  /*
   * Initial page animation
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  /*
   * Autoplay
   */
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % movies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  /*
   * Navigation
   */
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? movies.length - 1 : prev - 1));
  };

  /*
   * Touch / Swipe
   */
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Movies", path: "/movies" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative h-[720px] w-full overflow-hidden bg-black lg:h-[850px]"
    >
      {/* =====================================================
          BACKGROUND IMAGE
      ====================================================== */}

      <div className="absolute inset-0">
        {movies.map((item, index) => (
          <div
            key={item.image}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              current === index ? "z-10 opacity-100" : "z-0 opacity-0"
            }`}
          >
            <img
              src={item.image}
              alt={item.title}
              className={`h-full object-cover object-center transition-transform duration-[7000ms] ease-out ${
                current === index ? "scale-110" : "scale-100"
              }`}
            />
          </div>
        ))}

        {/* Dark cinematic overlay */}

        <div className="absolute inset-0 z-20 bg-gradient-to-r from-black via-black/60 to-black/20" />

        <div className="absolute inset-0 z-20 bg-gradient-to-t from-black via-black/10 to-black/60" />

        {/* Red cinematic glow */}

        <div className="pointer-events-none absolute -right-40 top-20 z-20 h-[500px] w-[500px] rounded-full bg-red-600/[0.12] blur-[150px]" />

        <div className="pointer-events-none absolute -left-40 bottom-0 z-20 h-[400px] w-[400px] rounded-full bg-red-900/[0.10] blur-[150px]" />
      </div>

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav
        className={`relative z-50 mx-auto flex w-full max-w-[1500px] items-center justify-between px-5 py-5 transition-all duration-1000 md:px-8 lg:px-12 ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0"
        }`}
      >
        {/* Logo */}

        <div className="flex items-center gap-3">
          <div className="relative flex gap-5 items-center">
            <div className="absolute inset-0 rounded-full bg-red-600/30 blur-xl" />

            <img
              src={Logo}
              alt="Kayhan Movie"
              className="relative h-10 w-10 object-contain md:h-12 md:w-12"
            />
            <div className="flex flex-col">
              <span className="text-xl text-white">Kayhan</span>
              <span className="text-xl text-red-600">Movie</span>
            </div>
          </div>

          <div className="hidden flex-col leading-none sm:flex">
            <span className="text-lg font-black uppercase tracking-wide text-white">
              Kayhan
            </span>

            <span className="mt-1 text-sm font-bold uppercase tracking-[0.25em] text-red-500">
              Movie
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}

        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex">
          {navItems.map((item, index) => (
            <Link key={item} to={item.path}>
              <a
                href="#"
                className={`group relative text-xs font-bold uppercase tracking-[0.15em] transition-colors duration-300 ${
                  index === 0 ? "text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                {item.name}

                <span
                  className={`absolute -bottom-2 left-0 h-[2px] bg-red-600 transition-all duration-300 ${
                    index === 0 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            </Link>
          ))}
        </ul>



        {/* Mobile Menu  */}

        {/*  */}

        {/* Auth buttons */}

        <div className="flex items-center gap-2 md:gap-3">
          <button className="group relative hidden h-10 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] px-5 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-red-500/50 hover:bg-red-600/10 hover:text-red-400 sm:block">
            <Link to={"/login"} className="relative z-10">
              Login
            </Link>

            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-500/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </button>
        </div>
      </nav>

      {/* =====================================================
          HERO CONTENT
      ====================================================== */}

      <div className="relative z-40 mx-auto flex h-[calc(100%-90px)] w-full max-w-[1500px] items-center px-5 md:px-8 lg:px-12">
        <div className="max-w-3xl">
          {/* Category */}

          <div
            key={`tag-${current}`}
            className={`mb-5 flex items-center gap-3 transition-all delay-100 duration-700 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="h-[2px] w-8 bg-red-600" />

            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-500">
              {movie.category}
            </span>

            <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-[9px] font-bold uppercase tracking-wider text-gray-300 backdrop-blur-md">
              {movie.tag}
            </span>
          </div>

          {/* Title */}

          <h1
            key={`title-${current}`}
            className={`max-w-3xl text-5xl font-black leading-[0.95] tracking-tight text-white transition-all delay-200 duration-1000 sm:text-6xl md:text-7xl lg:text-[86px] ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0"
            }`}
          >
            {movie.title}
          </h1>

          {/* Description */}

          <p
            key={`description-${current}`}
            className={`mt-6 max-w-xl text-sm leading-7 text-gray-300 transition-all delay-300 duration-1000 md:text-base ${
              isLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            {movie.description}
          </p>

          {/* Buttons */}

          <div
            className={`mt-8 flex flex-wrap items-center gap-3 transition-all delay-500 duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            {/* Watch */}

            <button className="group/watch relative flex h-12 items-center gap-3 overflow-hidden rounded-xl bg-red-600 px-6 text-xs font-black uppercase tracking-wider text-white shadow-[0_10px_35px_rgba(239,68,68,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-red-500 hover:shadow-[0_15px_45px_rgba(239,68,68,0.4)]">
              <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/15">
                <i className="bi bi-play-fill text-sm" />
              </span>

              <span className="relative z-10">Watch Movie</span>

              <span className="absolute inset-y-0 -left-16 w-12 rotate-12 bg-white/20 blur-md transition-all duration-700 group-hover/watch:left-[120%]" />
            </button>

            {/* Explore */}

            <button className="group flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.05] px-6 text-xs font-black uppercase tracking-wider text-white backdrop-blur-xl transition-all duration-300 hover:border-white/20 hover:bg-white/10">
              <i className="bi bi-grid-3x3-gap text-sm text-red-500" />
              Explore Movies
              <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Trust / Info */}

          <div
            className={`mt-8 flex flex-wrap items-center gap-5 text-[10px] uppercase tracking-wider text-gray-500 transition-all delay-700 duration-1000 ${
              isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
          >
            <span className="flex items-center gap-2">
              <i className="bi bi-check-circle-fill text-red-600" />
              No commitment
            </span>

            <span className="flex items-center gap-2">
              <i className="bi bi-badge-4k-fill text-red-600" />
              4K available
            </span>

            <span className="flex items-center gap-2">
              <i className="bi bi-play-circle-fill text-red-600" />
              Unlimited streaming
            </span>
          </div>
        </div>
      </div>

      {/* =====================================================
          SLIDER CONTROLS
      ====================================================== */}

      <div className="absolute bottom-8 left-0 right-0 z-50 mx-auto flex w-full max-w-[1500px] items-end justify-between px-5 md:px-8 lg:px-12">
        {/* Progress / Counter */}

        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black text-white">
              {String(current + 1).padStart(2, "0")}
            </span>

            <span className="text-xs text-gray-600">/</span>

            <span className="text-xs font-bold text-gray-600">
              {String(movies.length).padStart(2, "0")}
            </span>
          </div>

          <div className="hidden h-[2px] w-32 overflow-hidden bg-white/10 sm:block">
            <div
              className="h-full bg-red-600 transition-all duration-[6000ms] ease-linear"
              style={{
                width: `${((current + 1) / movies.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Arrows + Dots */}

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:border-red-500/50 hover:bg-red-600 hover:shadow-lg hover:shadow-red-600/30"
          >
            <i className="bi bi-arrow-left text-sm transition-transform duration-300 group-hover:-translate-x-0.5" />
          </button>

          {/* Dots */}

          <div className="hidden items-center gap-2 sm:flex">
            {movies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${
                  current === index
                    ? "w-10 bg-red-600"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              >
                {current === index && (
                  <span className="absolute inset-0 origin-left animate-[progress_6s_linear] bg-red-400" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-red-500 hover:shadow-red-600/40"
          >
            <i className="bi bi-arrow-right text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* =====================================================
          NEXT MOVIE PREVIEW
      ====================================================== */}

      <div className="absolute bottom-24 right-8 z-40 hidden w-52 overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-2xl backdrop-blur-xl xl:block">
        <div className="relative h-28">
          <img
            src={movies[(current + 1) % movies.length].image}
            alt="Next movie"
            className="h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

          <div className="absolute bottom-3 left-3 right-3">
            <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-gray-400">
              Next
            </span>

            <p className="mt-1 truncate text-xs font-bold text-white">
              {movies[(current + 1) % movies.length].title}
            </p>
          </div>
        </div>
      </div>

      {/* =====================================================
          BOTTOM FADE
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 h-32 bg-gradient-to-t from-black to-transparent" />

      {/* Custom Animation */}

      <style>
        {`
          @keyframes progress {
            from {
              transform: scaleX(0);
            }

            to {
              transform: scaleX(1);
            }
          }
        `}
      </style>
    </header>
  );
};

export default Header;
