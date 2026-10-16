import Logo from "../assets/logo.png";

const Footer = () => {
  const footerLinks = {
    Explore: ["Home", "Movies", "TV Series", "Trending", "New Releases"],
    Categories: ["Action", "Drama", "Comedy", "Horror", "Sci-Fi"],
    Support: ["Help Center", "Contact Us", "FAQ", "Privacy Policy", "Terms"],
  };

  return (
    <footer className="relative mt-20 overflow-hidden border-t border-white/10 bg-[#050505] text-white">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-80 w-80 rounded-full bg-red-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-red-700/10 blur-[140px]" />

      {/* Top Red Line */}
      <div className="absolute left-0 top-0 h-px w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10">
        {/* Main Footer Content */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            {/* Logo */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl">
                <img src={Logo} alt="" />
              </div>

              <div>
                <h2 className="text-xl font-black tracking-tight">
                  Kayhan<span className="text-red-500">Movie</span>
                </h2>
                <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                  Stream your world
                </p>
              </div>
            </div>

            <p className="text-sm leading-7 text-zinc-400">
              Discover thousands of movies and TV series. Stream your favorite
              stories anytime, anywhere, with an experience made for movie
              lovers.
            </p>

            {/* Socials */}
            <div className="mt-7 flex gap-3">
              {[
                ["bi-facebook", "Facebook"],
                ["bi-instagram", "Instagram"],
                ["bi-twitter-x", "Twitter"],
                ["bi-youtube", "YouTube"],
                ["bi-telegram", "Telegram"],
              ].map(([icon, label]) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="
                    group flex h-10 w-10 items-center justify-center
                    rounded-xl border border-white/10 bg-white/[0.03]
                    text-zinc-400 transition-all duration-300
                    hover:-translate-y-1 hover:border-red-500/40
                    hover:bg-red-500/10 hover:text-red-400
                    hover:shadow-[0_8px_25px_rgba(239,68,68,0.15)]
                  "
                >
                  <i
                    className={`bi ${icon} text-[17px] transition-transform duration-300 group-hover:scale-110`}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-sm font-bold uppercase tracking-[0.15em] text-white">
                {title}
              </h3>

              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="
                        group inline-flex items-center gap-2
                        text-sm text-zinc-500 transition-all duration-300
                        hover:translate-x-1 hover:text-red-400
                      "
                    >
                      <span className="h-px w-0 bg-red-500 transition-all duration-300 group-hover:w-3" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="
            relative mt-14 overflow-hidden rounded-2xl
            border border-red-500/10 bg-gradient-to-r
            from-red-950/30 via-white/[0.02] to-transparent
            p-6 sm:p-8
          "
        >
          {/* Glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-red-500/10 blur-[70px]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <i className="bi bi-envelope-paper text-red-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
                  Stay Updated
                </span>
              </div>

              <h3 className="text-xl font-bold sm:text-2xl">
                Never miss a new release.
              </h3>

              <p className="mt-1 text-sm text-zinc-500">
                Get the latest movies, series and exclusive updates.
              </p>
            </div>

            {/* Email */}
            <div className="flex w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-black/40 p-1.5 focus-within:border-red-500/40 focus-within:shadow-[0_0_25px_rgba(239,68,68,0.1)]">
              <input
                type="email"
                placeholder="Enter your email..."
                className="
                  min-w-0 flex-1 bg-transparent px-4 text-sm
                  text-white outline-none placeholder:text-zinc-600
                "
              />

              <button
                className="
                  group flex shrink-0 items-center gap-2
                  rounded-lg bg-red-600 px-4 py-2.5
                  text-sm font-semibold text-white
                  transition-all duration-300
                  hover:bg-red-500
                  hover:shadow-[0_0_25px_rgba(239,68,68,0.35)]
                "
              >
                Subscribe
                <i className="bi bi-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col gap-5 border-t border-white/[0.06] pt-7 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} MOVIEX. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-5 text-xs text-zinc-600">
            <a href="#" className="transition-colors hover:text-zinc-300">
              Privacy
            </a>

            <a href="#" className="transition-colors hover:text-zinc-300">
              Terms
            </a>

            <a href="#" className="transition-colors hover:text-zinc-300">
              Cookies
            </a>

            <span className="hidden h-3 w-px bg-white/10 sm:block" />

            <span className="flex items-center gap-1.5">
              Made with
              <i className="bi bi-heart-fill text-red-500" />
              for movie lovers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
