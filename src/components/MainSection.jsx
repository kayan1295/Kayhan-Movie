import { useEffect, useRef, useState } from "react";

import main1 from "../assets/movie1.webp";
import main2 from "../assets/movie2.jpg";
import main3 from "../assets/movie3.jpeg";
import main4 from "../assets/movie4.jpg";
import main5 from "../assets/movie5.jpeg";
import main6 from "../assets/movie6.jpeg";
import main7 from "../assets/movie7.webp";
import main8 from "../assets/movie8.jpeg";

/* =========================================================
   MOVIES
========================================================= */

const moviePool = [
  {
    image: main1,
    title: "The Dark Knight",
    year: "2008",
    rating: "9.0",
    genre: "Action",
  },
  {
    image: main2,
    title: "Inception",
    year: "2010",
    rating: "8.8",
    genre: "Sci-Fi",
  },
  {
    image: main3,
    title: "Interstellar",
    year: "2014",
    rating: "8.7",
    genre: "Adventure",
  },
  {
    image: main4,
    title: "The Matrix",
    year: "1999",
    rating: "8.7",
    genre: "Sci-Fi",
  },
  {
    image: main5,
    title: "Avengers",
    year: "2012",
    rating: "8.0",
    genre: "Action",
  },
  {
    image: main6,
    title: "Gladiator",
    year: "2000",
    rating: "8.5",
    genre: "Drama",
  },
  {
    image: main7,
    title: "John Wick",
    year: "2014",
    rating: "7.4",
    genre: "Action",
  },
  {
    image: main8,
    title: "Spider-Man",
    year: "2021",
    rating: "8.2",
    genre: "Fantasy",
  },
];

/* =========================================================
   SECTIONS
========================================================= */

const movieSections = [
  {
    id: "trending",
    label: "Trending Now",
    title: "Trending",
    highlight: "Now",
    description: "The movies everyone is watching right now.",
    icon: "bi-fire",
    movies: [
      moviePool[0],
      moviePool[4],
      moviePool[6],
      moviePool[7],
      moviePool[1],
      moviePool[2],
      moviePool[3],
      moviePool[5],
    ],
  },

  {
    id: "new",
    label: "Fresh Releases",
    title: "New",
    highlight: "Movies",
    description: "Discover the latest movies and fresh cinematic releases.",
    icon: "bi-stars",
    movies: [
      moviePool[7],
      moviePool[4],
      moviePool[1],
      moviePool[6],
      moviePool[2],
      moviePool[0],
      moviePool[5],
      moviePool[3],
    ],
  },

  {
    id: "series",
    label: "World Of Television",
    title: "TV",
    highlight: "Series",
    description: "Binge-worthy series and unforgettable stories.",
    icon: "bi-tv",
    movies: [
      moviePool[2],
      moviePool[3],
      moviePool[7],
      moviePool[1],
      moviePool[5],
      moviePool[6],
      moviePool[4],
      moviePool[0],
    ],
  },

  {
    id: "action",
    label: "Adrenaline Rush",
    title: "Action &",
    highlight: "Adventure",
    description: "Explosive action, impossible missions and epic adventures.",
    icon: "bi-lightning-charge",
    movies: [
      moviePool[0],
      moviePool[6],
      moviePool[4],
      moviePool[3],
      moviePool[2],
      moviePool[7],
      moviePool[1],
      moviePool[5],
    ],
  },

  {
    id: "drama",
    label: "Stories That Stay",
    title: "Drama &",
    highlight: "Emotion",
    description: "Powerful stories that stay with you long after the credits.",
    icon: "bi-heart",
    movies: [
      moviePool[5],
      moviePool[2],
      moviePool[1],
      moviePool[3],
      moviePool[0],
      moviePool[7],
      moviePool[4],
      moviePool[6],
    ],
  },

  {
    id: "thriller",
    label: "Dark Stories",
    title: "Thriller &",
    highlight: "Horror",
    description:
      "Dark mysteries, psychological thrillers and terrifying stories.",
    icon: "bi-mask",
    movies: [
      moviePool[3],
      moviePool[6],
      moviePool[0],
      moviePool[1],
      moviePool[5],
      moviePool[2],
      moviePool[7],
      moviePool[4],
    ],
  },
];

/* =========================================================
   MOVIE CARD
========================================================= */

const MovieCard = ({ movie, index, active }) => {
  return (
    <article className="movie-card group relative min-w-[220px] snap-start sm:min-w-[240px] md:min-w-[260px] lg:min-w-[275px]">
      <div
        className={`relative h-[370px] overflow-hidden rounded-2xl border bg-gray-950 transition-all duration-500 ${
          active
            ? "border-red-600/40 shadow-2xl shadow-red-950/30"
            : "border-white/10"
        } group-hover:-translate-y-2 group-hover:border-red-500/50 group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.65)]`}
      >
        {/* IMAGE */}

        <img
          src={movie.image}
          alt={movie.title}
          className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />

        {/* DARK OVERLAY */}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/5" />

        {/* RED GLOW */}

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.22),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* TOP BADGE */}

        <div className="absolute left-4 top-4">
          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] font-semibold text-white backdrop-blur-md">
            {movie.genre}
          </span>
        </div>

        {/* PLAY */}

        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-all duration-500 group-hover:opacity-100">
          <button className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_50px_rgba(239,68,68,0.55)] transition-all duration-500 hover:scale-110 hover:bg-red-500">
            <i className="bi bi-play-fill ml-1 text-3xl" />
          </button>
        </div>

        {/* MOVIE INFO */}

        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-md bg-red-600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-red-600/20">
              <i className="bi bi-star-fill text-[9px]" />
              {movie.rating}
            </span>

            <span className="text-[10px] text-gray-300">{movie.year}</span>

            <span className="text-[10px] text-gray-600">•</span>

            <span className="text-[10px] text-gray-400">{movie.genre}</span>
          </div>

          <h3 className="text-lg font-bold text-white">{movie.title}</h3>

          {/* WATCH */}

          <button className="group/watch relative mt-3 flex items-center gap-2 overflow-hidden rounded-lg border border-transparent px-3 py-2 text-xs font-semibold text-red-400 transition-all duration-300 hover:border-red-500/70 hover:bg-red-500/10 hover:text-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.18)]">
            <span className="pointer-events-none absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover/watch:opacity-100">
              <span className="absolute -inset-[1px] rounded-lg bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-80 blur-[1px] animate-[spin_2s_linear_infinite]" />
            </span>

            <span className="relative z-10">Watch now</span>

            <i className="bi bi-arrow-right relative z-10 transition-transform duration-300 group-hover/watch:translate-x-1" />
          </button>
        </div>

        {/* ACTIVE LINE */}

        <div
          className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-600 to-red-400 transition-all duration-500 ${
            active ? "w-full" : "w-0"
          }`}
        />
      </div>
    </article>
  );
};

/* =========================================================
   MOVIE SECTION
========================================================= */

const MovieSection = ({ section, sectionIndex }) => {
  const sliderRef = useRef(null);

  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visible, setVisible] = useState(false);

  /* =========================
     SCROLL REVEAL
  ========================= */

  useEffect(() => {
    const element = sliderRef.current;

    if (!element) return;

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

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  /* =========================
     CARD WIDTH
  ========================= */

  const getCardWidth = () => {
    if (!sliderRef.current) return 0;

    const card = sliderRef.current.querySelector(".movie-card");

    if (!card) return 0;

    const gap = 20;

    return card.offsetWidth + gap;
  };

  /* =========================
     GO TO SLIDE
  ========================= */

  const goToSlide = (index) => {
    if (!sliderRef.current) return;

    const width = getCardWidth();

    sliderRef.current.scrollTo({
      left: width * index,
      behavior: "smooth",
    });

    setActive(index);
  };

  /* =========================
     NEXT
  ========================= */

  const nextSlide = () => {
    const next = active >= section.movies.length - 1 ? 0 : active + 1;

    goToSlide(next);
  };

  /* =========================
     PREVIOUS
  ========================= */

  const prevSlide = () => {
    const prev = active <= 0 ? section.movies.length - 1 : active - 1;

    goToSlide(prev);
  };

  /* =========================
     AUTOPLAY
  ========================= */

  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setActive((current) => {
        const next = current >= section.movies.length - 1 ? 0 : current + 1;

        requestAnimationFrame(() => {
          if (!sliderRef.current) return;

          const width = getCardWidth();

          sliderRef.current.scrollTo({
            left: width * next,
            behavior: "smooth",
          });
        });

        return next;
      });
    }, 5500);

    return () => clearInterval(timer);
  }, [isPaused, section.movies.length]);

  /* =========================
     SCROLL
  ========================= */

  const handleScroll = () => {
    if (!sliderRef.current) return;

    const width = getCardWidth();

    if (!width) return;

    const index = Math.round(sliderRef.current.scrollLeft / width);

    setActive(Math.min(index, section.movies.length - 1));
  };

  return (
    <section
      className={`relative overflow-hidden py-14 transition-all duration-1000 md:py-16 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
      }`}
      style={{
        transitionDelay: `${sectionIndex * 100}ms`,
      }}
    >
      {/* SECTION GLOW */}

      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-red-600/[0.05] blur-[120px]" />

      {/* HEADER */}

      <div className="mb-8 flex items-end justify-between gap-5">
        <div>
          {/* LABEL */}

          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-600/10 text-red-500">
              <i className={`bi ${section.icon} text-xs`} />
            </span>

            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-red-500">
              {section.label}
            </span>
          </div>

          {/* TITLE */}

          <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">
            {section.title}{" "}
            <span className="text-red-600">{section.highlight}</span>
          </h2>

          <p className="mt-2 max-w-xl text-xs leading-6 text-gray-500 md:text-sm">
            {section.description}
          </p>
        </div>

        {/* DESKTOP ARROWS */}

        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={prevSlide}
            className="group flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-gray-400 backdrop-blur-xl transition-all duration-300 hover:border-red-600/50 hover:bg-red-600 hover:text-white hover:shadow-lg hover:shadow-red-600/20"
          >
            <i className="bi bi-arrow-left transition-transform duration-300 group-hover:-translate-x-1" />
          </button>

          <button
            onClick={nextSlide}
            className="group flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-lg shadow-red-600/20 transition-all duration-300 hover:bg-red-500 hover:shadow-red-600/40"
          >
            <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* SLIDER */}

      <div
        ref={sliderRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative flex gap-5 overflow-x-auto scroll-smooth pb-5 snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {section.movies.map((movie, index) => (
          <MovieCard
            key={`${section.id}-${movie.title}-${index}`}
            movie={movie}
            index={index}
            active={active === index}
          />
        ))}
      </div>

      {/* MOBILE CONTROLS */}

      <div className="mt-3 flex items-center justify-between md:hidden">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
        >
          <i className="bi bi-arrow-left" />
        </button>

        <div className="text-xs text-gray-500">
          <span className="font-bold text-white">
            {String(active + 1).padStart(2, "0")}
          </span>

          <span className="mx-2">/</span>

          {String(section.movies.length).padStart(2, "0")}
        </div>

        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white"
        >
          <i className="bi bi-arrow-right" />
        </button>
      </div>

      {/* PROGRESS */}

      <div className="mt-5 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
          <div
            className="h-full rounded-full bg-red-600 transition-all duration-500"
            style={{
              width: `${((active + 1) / section.movies.length) * 100}%`,
            }}
          />
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wider text-gray-700">
          {isPaused ? "Paused" : "Auto Play"}
        </span>
      </div>
    </section>
  );
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

const MovieSections = () => {
  return (
    <main className="relative overflow-hidden bg-black px-4 md:px-8 lg:px-12">
      {/* GLOBAL BACKGROUND */}

      <div className="pointer-events-none absolute left-1/2 top-[20%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/[0.025] blur-[180px]" />

      <div className="relative mx-auto max-w-7xl">
        {movieSections.map((section, index) => (
          <MovieSection
            key={section.id}
            section={section}
            sectionIndex={index}
          />
        ))}
      </div>
    </main>
  );
};

export default MovieSections;
