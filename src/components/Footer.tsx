import { Link } from "react-router-dom";
import { Truck, Phone, Mail, MapPin, ArrowRight, Package, Zap, Route, AlertTriangle, Timer, MapPinned } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-deep text-white overflow-hidden">
      {/* CTA Strip */}
      <div className="relative bg-gradient-to-r from-sky-blue to-sky-blue-light overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
        <div className="container-main py-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-bold text-white mb-2">
              {t("footer.cta.title")}
            </h3>
            <p className="text-white/80 font-normal max-w-md">
              {t("footer.cta.desc")}
            </p>
          </div>
          <Link
            to="/kontakt"
            className="group flex items-center gap-3 px-8 py-4 bg-white text-navy-deep font-semibold text-base rounded-full hover:bg-white/90 transition-all duration-300 shadow-xl active:scale-95"
          >
            {t("footer.cta.button")}
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>

      {/* Main footer */}
      <div className="container-main py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {/* Brand & Mission */}
          <div className="space-y-8">
            <Link to="/" className="flex items-center gap-3 group transition-transform duration-300 hover:scale-[1.05]">
              <img
                src="/lm-express-logo-horizontal.svg"
                alt="LM Express - Kurier & Expressdienst"
                width="250"
                height="64"
                className="h-16 w-auto object-contain drop-shadow-lg filter brightness-110"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed font-normal">
              {t("footer.brandDesc")}
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-sky-blue mb-6 uppercase">
              {t("footer.services")}
            </h4>
            <ul className="grid grid-cols-1 gap-3">
              {[
                { icon: Zap, label: t("footer.servicesList.s1") },
                { icon: Route, label: t("footer.servicesList.s2") },
                { icon: Package, label: t("footer.servicesList.s3") },
                { icon: AlertTriangle, label: t("footer.servicesList.s4") },
                { icon: Timer, label: t("footer.servicesList.s5") },
                { icon: Truck, label: t("footer.servicesList.s6") },
                { icon: MapPinned, label: t("footer.servicesList.s7") },
              ].map(({ icon: Icon, label }) => (
                <li key={label}>
                  <Link to="/leistungen" className="text-white/50 hover:text-white transition-colors text-sm font-medium flex items-center gap-3 group">
                    <Icon className="w-4 h-4 text-sky-blue" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-sm font-semibold tracking-wide text-sky-blue mb-6 uppercase">
              {t("footer.contact")}
            </h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-sky-blue" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-white/50 mb-1">{t("footer.labels.mobile")}</span>
                  <a href="tel:+491793210359" className="text-sm font-semibold hover:text-sky-blue transition-colors">
                    +49 179 3210359
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-sky-blue" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-white/50 mb-1">{t("footer.labels.email")}</span>
                  <a href="mailto:lm2024express@gmail.com" className="text-sm font-semibold hover:text-sky-blue transition-colors">
                    lm2024express@gmail.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-sky-blue" />
                </div>
                <div>
                  <span className="block text-xs font-medium text-white/50 mb-1">{t("footer.labels.address")}</span>
                  <a
                    href="https://maps.google.com/?q=Hauptstraße+26,+94339+Leiblfing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-white/70 hover:text-sky-blue transition-colors"
                  >
                    Hauptstraße 26<br />94339 Leiblfing
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 py-8">
        <div className="container-main flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-medium tracking-wide text-white/30">
          <p>© {currentYear} LM Express. {t("footer.rights")}</p>
          <div className="flex items-center gap-6">
            <Link to="/impressum" className="hover:text-white transition-colors">{t("footer.impressum")}</Link>
            <Link to="/datenschutz" className="hover:text-white transition-colors">{t("footer.privacy")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
