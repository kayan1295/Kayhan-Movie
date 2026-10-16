function MobileNavbar() {
  return (
    <>
      <ul className="md:hidden fixed top-200 text-white text-3xl bg-white/[0.05] backdrop-blur-xl border border-white/10 w-100 ml-4 rounded-full justify-between px-10 flex h-15 items-center gap-5">
        <li className="hover:rotate-12 hover:scale-125 hover:text-red-600 transition-all">
          <a href="">
            <i class="bi bi-house"></i>
          </a>
        </li>
        <li className="hover:rotate-12 hover:scale-125 hover:text-red-600 transition-all">
          <a href="">
            <i class="bi bi-film"></i>
          </a>
        </li>
        <li className="hover:rotate-12 hover:scale-125 hover:text-red-600 transition-all">
          <a href="">
            <i class="bi bi-headset"></i>
          </a>
        </li>
        <li className="hover:rotate-12 hover:scale-125 hover:text-red-600 transition-all">
          <a href="">
            <i class="bi bi-info-circle"></i>
          </a>
        </li>
      </ul>
    </>
  );
}

export default MobileNavbar;
