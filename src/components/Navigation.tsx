import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, Globe, ArrowRight, Home, Package, Info, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LANGUAGES = [
  { code: "de", label: "DE" },
  { code: "en", label: "EN" },
  { code: "tr", label: "TR" },
] as const;

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const currentLang = LANGUAGES.find((l) => l.code === i18n.language)?.label ?? i18n.language.toUpperCase();

  const setLanguage = (code: string) => {
    i18n.changeLanguage(code);
  };

  const isLightPage = location.pathname === "/datenschutz" || location.pathname === "/impressum";
  const headerActive = scrolled || isLightPage;

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/leistungen", label: t("nav.services"), icon: Package },
    { href: "/ueber-uns", label: t("nav.about"), icon: Info },
    { href: "/kontakt", label: t("nav.contact"), icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[padding,box-shadow] duration-500 ${headerActive
          ? "glass-morphism py-3 shadow-sm"
          : "bg-transparent py-5 max-lg:glass-morphism max-lg:py-3 max-lg:shadow-sm"
          }`}
      >
        <div className="container-main flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group transition-transform duration-300 hover:scale-105 flex-shrink-0">
            <img
              src="/lm-express-logo.png"
              alt="LM Express - Kurier & Expressdienst"
              width="512"
              height="379"
              className="h-16 w-auto object-contain drop-shadow-lg transition-all duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-[background-color] duration-300 flex items-center gap-2 ${location.pathname === link.href
                    ? "bg-navy-deep text-white"
                    : headerActive
                      ? "text-navy-deep hover:bg-navy-deep/5"
                      : "text-white hover:bg-white/10"
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center justify-center h-11 px-4 rounded-full transition-[background-color] duration-300 border ${headerActive
                    ? "border-navy-deep/20 text-navy-deep hover:bg-navy-deep/5"
                    : "border-white/20 text-white hover:bg-white/10"
                    }`}
                  aria-label={t("nav.selectLanguage")}
                >
                  <Globe className="w-4 h-4 mr-2" />
                  <span className="text-sm font-bold uppercase">{currentLang}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {LANGUAGES.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={i18n.language === lang.code ? "font-bold text-sky-blue" : ""}
                  >
                    {lang.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild className="button-modern bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky group h-11 px-7">
              <Link to="/angebot">
                {t("services.button_quote")}
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2.5 rounded-xl transition-colors duration-300 bg-navy-deep text-white shadow-sm`}
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-all duration-500 ease-in-out ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="absolute inset-0 bg-navy-deep/60 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div
          className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out p-8 flex flex-col ${mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          <div className="flex items-center justify-between mb-12">
            <span className="font-bold text-xl text-navy-deep">{t("nav.menu")}</span>
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center justify-center px-3 py-2 rounded-lg bg-navy-deep/5 hover:bg-navy-deep/10 transition-colors text-navy-deep gap-2"
                    aria-label={t("nav.selectLanguage")}
                  >
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-bold uppercase">{currentLang}</span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {LANGUAGES.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => setLanguage(lang.code)}
                      className={i18n.language === lang.code ? "font-bold text-sky-blue" : ""}
                    >
                      {lang.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 bg-navy-deep/5 rounded-lg hover:bg-navy-deep/10 transition-colors"
                title={t("nav.closeMenu")}
                aria-label={t("nav.closeMenu")}
              >
                <X size={20} className="text-navy-deep" />
              </button>
            </div>
          </div>

          <nav className="flex flex-col gap-4">
            {navLinks.map((link, idx) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-xl font-semibold py-2 transition-all duration-300 flex items-center gap-3 ${location.pathname === link.href ? "text-sky-blue translate-x-2" : "text-navy-deep hover:text-sky-blue"
                  }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-10 border-t border-navy-deep/10 space-y-6">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-navy-deep/50">{t("nav.contact")}</span>
              <a href="tel:+491793210359" className="flex items-center gap-3 text-lg font-bold text-navy-deep">
                <div className="w-10 h-10 rounded-full bg-sky-blue/10 flex items-center justify-center">
                  <Phone size={18} className="text-sky-blue" />
                </div>
                +49 179 3210359
              </a>
            </div>

            <Button asChild className="w-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white h-14 rounded-full text-base font-semibold group" onClick={() => setMobileOpen(false)}>
              <Link to="/angebot">
                {t("services.button_quote")}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
