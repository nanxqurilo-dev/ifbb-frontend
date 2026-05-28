import React, { useEffect, useState, useCallback } from "react";
import Logo from "../assets/Logo.png";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { RiCloseFill, RiMenu3Line } from "react-icons/ri";
import { FiChevronDown, FiLogOut, FiArrowRight } from "react-icons/fi";
import { useAuth } from "../Auth/AuthContext";

const Navbar = () => {
  const [isOpen, setIsOpen]             = useState(false);
  const [mounted, setMounted]           = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverItem, setHoverItem]       = useState(null);
  const [scrolled, setScrolled]         = useState(false);
  const location                        = useLocation();
  const { isAuthenticated, logout, loading } = useAuth();

  const navigation = [
    { name: "Home",         href: "/" },
    { name: "About",        href: "/about" },
    {
      name: "Courses",
      href: "#",
      submenu: isAuthenticated
        ? [
            { name: "All Courses",      href: "/course" },
            { name: "Purchase Courses", href: "/purchasecourse" },
          ]
        : [{ name: "All Courses", href: "/course" }],
    },
    { name: "Gallery",      href: "/gallery" },
    { name: "Certificates", href: "/certificates" },
    { name: "News",         href: "/news" },
    { name: "Contact US",   href: "/contact" },
  ];

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 12);
    const onKey = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setHoverItem(null);
        setOpenDropdown(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setHoverItem(null);
    setOpenDropdown(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLogout = useCallback(() => {
    logout();
    setIsOpen(false);
  }, [logout]);

  const isSubmenuActive = (submenu) =>
    submenu?.some((s) => location.pathname === s.href);

  /* ─── Loading Skeleton ─── */
  if (loading) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b border-slate-200/60 bg-white/95 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 animate-pulse rounded bg-slate-200" />
              <div className="hidden flex-col gap-2 sm:flex">
                <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                <div className="h-2.5 w-16 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
            <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
      </nav>
    );
  }

  return (
    <>
      <style>{`
        @keyframes nb-slideDown {
          from { opacity: 0; transform: translateY(-100%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes nb-shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .nb-mounted {
          animation: nb-slideDown 0.45s cubic-bezier(0.16,1,0.3,1) both;
        }
        .nb-logo-text {
          background: linear-gradient(90deg,#2563eb,#7c3aed,#db2777,#2563eb);
          background-size: 300% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: nb-shimmer 4s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .nb-mounted, .nb-logo-text { animation: none !important; }
        }
      `}</style>

      {/* ═══════════════════ NAV SHELL ═══════════════════ */}
      <nav
        className={[
          " relative pt-30 pb-30 flex items-center justify-center z-40 w-full transition-all duration-300",
          "border-b",
          scrolled
            ? "border-slate-200/80 bg-white/[0.98] shadow-md shadow-slate-900/[0.06] backdrop-blur-2xl"
            : "border-slate-100/60 bg-white/95 backdrop-blur-xl",
          mounted ? "nb-mounted" : "opacity-0",
        ].join(" ")}
        aria-label="Primary Navigation"
      >
        <div className="mx-auto max-w-8xl px-9 ">
          <div className="flex h-6 items-center justify-between  lg:h-[68px]">

            {/* ──────── LOGO ──────── */}
            <Link
              to="/"
              aria-label="IFBB Academy – Go home"
              className="group flex flex-shrink-0 items-center gap-3"
            >
              <div className="relative flex h-80 w-full flex-shrink-0 items-center  transition-all duration-300">
                <img
                  src={Logo}
                  alt="IFBB Academy"
                  className="h-60 w-60 object-contain"
                />
              </div>
              {/* <div className="hidden flex-col leading-none sm:flex">
                <span className="nb-logo-text text-[1.05rem] font-black tracking-tight">
                  IFBB
                </span>
                <span className="mt-[3px] text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-slate-400">
                  Learn &amp; Grow
                </span>
              </div> */}
            </Link>

            {/* ──────── DESKTOP NAV ──────── */}
            {/*
              KEY FIX for dropdown staying open:
              The <li> wraps BOTH the trigger button AND the dropdown panel.
              The dropdown panel uses `pt-2` (padding-top) instead of `mt-2` (margin-top)
              so there is NO gap between button and panel — the hover zone is unbroken.
              Mouse moving from button → panel never exits the <li>, so hoverItem stays set.
            */}
            <ul className="hidden items-center gap-0.5 md:flex lg:gap-1">
              {navigation.map((item) =>
                item.submenu ? (
                  <li
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setHoverItem(item.name)}
                    onMouseLeave={() => setHoverItem(null)}
                  >
                    {/* Trigger button */}
                    <button
                      aria-haspopup="true"
                      aria-expanded={hoverItem === item.name}
                      className={[
                        "relative flex select-none items-center gap-1 rounded px-3 py-2 text-[0.8rem] font-semibold outline-none transition-all duration-200",
                        isSubmenuActive(item.submenu)
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                      ].join(" ")}
                    >
                      {item.name}
                      <FiChevronDown
                        className={[
                          "h-[14px] w-[14px] flex-shrink-0 transition-transform duration-300",
                          hoverItem === item.name ? "rotate-180 text-blue-600" : "",
                        ].join(" ")}
                      />
                      {/* Active indicator — sits right at the nav bottom border */}
                      {isSubmenuActive(item.submenu) && (
                        <span className="absolute bottom-[-9px] left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                      )}
                    </button>

                    {/*
                      Dropdown panel.
                      Uses `pt-2` so the transparent top-padding bridges the gap
                      between the button and the visible card — hover stays active.
                    */}
                    <div
                      className={[
                        "absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 pt-2 transition-all duration-200",
                        hoverItem === item.name
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0",
                      ].join(" ")}
                    >
                      <div className="overflow-hidden rounded border border-slate-200/70 bg-white shadow-xl shadow-slate-900/10">
                        <div className="h-[3px] bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500" />
                        <div className="p-1.5">
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              className={[
                                "group/dd flex items-center gap-2.5 rounded px-3.5 py-3 text-[0.8rem] font-semibold transition-all duration-150",
                                location.pathname === sub.href
                                  ? "bg-blue-50 text-blue-600"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                              ].join(" ")}
                            >
                              <span className="h-1.5 w-1.5 flex-shrink-0 scale-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-500 transition-transform duration-200 group-hover/dd:scale-100" />
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.name} className="relative">
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      className={({ isActive }) =>
                        [
                          "relative block rounded px-3 py-2 text-[0.8rem] font-semibold outline-none transition-all duration-200",
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                        ].join(" ")
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {item.name}
                          {/* Active indicator — sits right at the nav bottom border */}
                          {isActive && (
                            <span className="absolute bottom-[-9px] left-1/2 h-[3px] w-5 -translate-x-1/2 rounded-full bg-blue-600" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            {/* ──────── DESKTOP CTA ──────── */}
            <div className="hidden flex-shrink-0 items-center md:flex">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="group flex items-center gap-2 rounded border border-red-200 bg-red-50 px-4 py-2 text-[0.8rem] font-semibold text-red-600 outline-none transition-all duration-200 hover:border-red-500 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-95"
                >
                  <FiLogOut className="h-[15px] w-[15px] flex-shrink-0" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="group relative flex items-center gap-2 overflow-hidden rounded bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 px-5 py-2.5 text-[0.8rem] font-bold text-white shadow-md shadow-blue-500/25 outline-none transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-blue-500/35 active:scale-95"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Join Now</span>
                  <FiArrowRight className="relative h-[14px] w-[14px] flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
                </Link>
              )}
            </div>

            {/* ──────── MOBILE TOGGLE ──────── */}
            <button
              onClick={() => setIsOpen((p) => !p)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              className={[
                "flex absolute left-8 h-9 w-9 flex-shrink-0 items-center justify-center rounded border outline-none transition-all duration-200 active:scale-90 md:hidden",
                isOpen
                  ? "border-blue-200 bg-blue-50 text-blue-600"
                  : "border-slate-200 bg-slate-50 text-slate-600 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600",
              ].join(" ")}
            >
              {isOpen
                ? <RiCloseFill className="h-5 w-5" />
                : <RiMenu3Line className="h-5 w-5" />
              }
            </button>

          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            MOBILE MENU
            Backdrop starts BELOW the navbar so logo &
            toggle are never blurred or covered.
        ════════════════════════════════════════════════ */}

        {/* Backdrop — starts after nav height (h-16 = 64px) */}
        <div
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
          className={[
            " inset-x-0 bottom-0 top-16 z-40 bg-slate-900/40 transition-all duration-300 md:hidden",
            isOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0",
          ].join(" ")}
        />

        {/* Slide-down panel */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className={[
            "absolute inset-x-3 top-[calc(100%+6px)] z-50 overflow-hidden rounded border border-slate-200/80 bg-white shadow-2xl shadow-slate-900/[0.12] transition-all duration-300 md:hidden",
            isOpen
              ? "pointer-events-auto translate-y-0 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0",
          ].join(" ")}
        >
          <div className="max-h-[calc(100svh-90px)] overflow-y-auto p-3">

            {/* Nav list */}
            <ul className="space-y-0.5">
              {navigation.map((item) =>
                item.submenu ? (
                  <li key={item.name}>
                    <button
                      onClick={() =>
                        setOpenDropdown((p) => (p === item.name ? null : item.name))
                      }
                      aria-expanded={openDropdown === item.name}
                      className={[
                        "flex w-full items-center justify-between rounded px-4 py-3 text-sm font-semibold transition-all duration-200",
                        isSubmenuActive(item.submenu)
                          ? "bg-blue-50 text-blue-600"
                          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                      ].join(" ")}
                    >
                      {item.name}
                      <FiChevronDown
                        className={[
                          "h-4 w-4 flex-shrink-0 transition-transform duration-300",
                          openDropdown === item.name
                            ? "rotate-180 text-blue-600"
                            : "text-slate-400",
                        ].join(" ")}
                      />
                    </button>

                    <div
                      className={[
                        "overflow-hidden transition-all duration-300 ease-in-out",
                        openDropdown === item.name ? "max-h-60 pb-1 pt-1" : "max-h-0",
                      ].join(" ")}
                    >
                      <div className="ml-2 space-y-0.5 rounded border border-blue-100/60 bg-blue-50/40 p-1.5">
                        {item.submenu.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            onClick={() => {
                              setIsOpen(false);
                              setOpenDropdown(null);
                            }}
                            className={[
                              "flex items-center gap-2.5 rounded px-3.5 py-2.5 text-sm font-semibold transition-all duration-150",
                              location.pathname === sub.href
                                ? "bg-white text-blue-600 shadow-sm"
                                : "text-slate-600 hover:bg-white hover:text-slate-900 hover:shadow-sm",
                            ].join(" ")}
                          >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gradient-to-br from-blue-500 to-violet-500" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                ) : (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      end={item.href === "/"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        [
                          "block rounded px-4 py-3 text-sm font-semibold transition-all duration-200",
                          isActive
                            ? "bg-blue-50 text-blue-600"
                            : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
                        ].join(" ")
                      }
                    >
                      {item.name}
                    </NavLink>
                  </li>
                )
              )}
            </ul>

            {/* Divider */}
            <div className="my-3 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

            {/* Mobile CTA */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded border border-red-200 bg-red-50 py-3 text-sm font-bold text-red-600 transition-all duration-200 hover:bg-red-500 hover:text-white hover:shadow-lg hover:shadow-red-500/20 active:scale-[0.98]"
              >
                <FiLogOut className="h-4 w-4 flex-shrink-0" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 py-3 text-sm font-bold text-white shadow-md shadow-blue-500/25 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/35 active:scale-[0.98]"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Join Now</span>
                <FiArrowRight className="relative h-4 w-4 flex-shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
            )}

            {/* Footer */}
            <p className="mt-3 text-center text-[10px] font-medium text-slate-400">
              &copy; {new Date().getFullYear()} IFBB Academy &middot; All rights reserved
            </p>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;