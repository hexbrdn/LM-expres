import { Link, useLocation } from "react-router-dom";
import { Package, Zap, CheckCircle2, ArrowRight, ShieldCheck, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Leistungen() {
  const { t } = useTranslation();
  const location = useLocation();

  const services = [
    {
      icon: "/icons/service-express.png",
      image: "/services/express.jpg",
      key: "express",
      id: "expressfahrten",
      title: t("services.items.express.title"),
      subtitle: t("services.items.express.subtitle"),
      desc: t("services.items.express.desc"),
      features: [
        t("services.items.express.f1"),
        t("services.items.express.f2"),
        t("services.items.express.f3"),
        t("services.items.express.f4"),
        t("services.items.express.f5"),
      ],
    },
    {
      icon: "/icons/service-sonderfahrten.png",
      image: "/services/sonderfahrten.jpg",
      key: "sonderfahrten",
      id: "direkt-sonderfahrten",
      title: t("services.items.sonderfahrten.title"),
      subtitle: t("services.items.sonderfahrten.subtitle"),
      desc: t("services.items.sonderfahrten.desc"),
      features: [
        t("services.items.sonderfahrten.f1"),
        t("services.items.sonderfahrten.f2"),
        t("services.items.sonderfahrten.f3"),
        t("services.items.sonderfahrten.f4"),
        t("services.items.sonderfahrten.f5"),
      ],
    },
    {
      icon: "/icons/service-paket.png",
      image: "/services/paket.jpg",
      key: "paket",
      id: "paket-dokumente",
      title: t("services.items.paket.title"),
      subtitle: t("services.items.paket.subtitle"),
      desc: t("services.items.paket.desc"),
      features: [
        t("services.items.paket.f1"),
        t("services.items.paket.f2"),
        t("services.items.paket.f3"),
        t("services.items.paket.f4"),
        t("services.items.paket.f5"),
      ],
    },
    {
      icon: "/icons/service-adr.png",
      image: "/services/adr.jpg",
      key: "adr",
      id: "adr-gefahrgut",
      title: t("services.items.adr.title"),
      subtitle: t("services.items.adr.subtitle"),
      desc: t("services.items.adr.desc"),
      features: [
        t("services.items.adr.f1"),
        t("services.items.adr.f2"),
        t("services.items.adr.f3"),
        t("services.items.adr.f4"),
        t("services.items.adr.f5"),
      ],
    },
    {
      icon: "/icons/service-zeitkritisch.png",
      image: "/services/zeitkritisch.jpg",
      key: "zeitkritisch",
      id: "zeitkritische-spezialtransporte",
      title: t("services.items.zeitkritisch.title"),
      subtitle: t("services.items.zeitkritisch.subtitle"),
      desc: t("services.items.zeitkritisch.desc"),
      features: [
        t("services.items.zeitkritisch.f1"),
        t("services.items.zeitkritisch.f2"),
        t("services.items.zeitkritisch.f3"),
        t("services.items.zeitkritisch.f4"),
        t("services.items.zeitkritisch.f5"),
      ],
    },
    {
      icon: "/icons/service-transport35.png",
      image: "/services/transport35.jpg",
      key: "transport35",
      id: "transport-bis-35t",
      title: t("services.items.transport35.title"),
      subtitle: t("services.items.transport35.subtitle"),
      desc: t("services.items.transport35.desc"),
      features: [
        t("services.items.transport35.f1"),
        t("services.items.transport35.f2"),
        t("services.items.transport35.f3"),
        t("services.items.transport35.f4"),
        t("services.items.transport35.f5"),
      ],
    },
    {
      icon: "/icons/service-deutschlandweit.png",
      image: "/services/deutschlandweit.jpg",
      key: "deutschlandweit",
      id: "deutschlandweite-zustellung",
      title: t("services.items.deutschlandweit.title"),
      subtitle: t("services.items.deutschlandweit.subtitle"),
      desc: t("services.items.deutschlandweit.desc"),
      features: [
        t("services.items.deutschlandweit.f1"),
        t("services.items.deutschlandweit.f2"),
        t("services.items.deutschlandweit.f3"),
        t("services.items.deutschlandweit.f4"),
        t("services.items.deutschlandweit.f5"),
      ],
    },
  ];

  const steps = [
    { icon: Package, title: t("services.process.s1.title"), desc: t("services.process.s1.desc") },
    { icon: Zap, title: t("services.process.s2.title"), desc: t("services.process.s2.desc") },
    { icon: Clock, title: t("services.process.s3.title"), desc: t("services.process.s3.desc") },
    { icon: ShieldCheck, title: t("services.process.s4.title"), desc: t("services.process.s4.desc") },
  ];

  // Scroll to section on mount if hash is present
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <main className="bg-surface-light">
      {/*  HERO SECTION  */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-navy-deep via-navy-mid to-navy-deep overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-blue/10 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky-blue/5 rounded-full blur-[100px] -translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="container-main relative z-10 text-center py-32">
          <span className="inline-block text-sky-blue text-sm font-semibold tracking-wide mb-6 uppercase">
            {t("services.hero.label")}
          </span>
          <h1 className="display-heading text-white mb-8 max-w-4xl mx-auto">
            {t("services.hero.title")}
          </h1>
          <p className="text-white/70 text-xl font-normal leading-relaxed max-w-3xl mx-auto mb-12">
            {t("services.hero.desc")}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button asChild className="h-14 px-10 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold">
              <Link to="/angebot">
                {t("services.hero.button1")} <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-10 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 text-base font-semibold">
              <Link to="/kontakt">
                {t("services.hero.button2")}
              </Link>
            </Button>
          </div>
        </div>

        {/* Wave Shape at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-24">
          <svg className="w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
            <path
              d="M0,50L48,53.3C96,57,192,63,288,60C384,57,480,43,576,40C672,37,768,43,864,46.7C960,50,1056,50,1152,46.7C1248,43,1344,37,1392,33.3L1440,30L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
              fill="white"
              fillOpacity="1"
            />
          </svg>
        </div>
      </section>

      {/*  SERVICES LIST  */}
      <section className="section-padding overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 gap-20">
            {services.map(({ icon, image, key, id, title, subtitle, desc, features }, idx) => (
              <div
                key={id}
                id={id}
                className={`group flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center scroll-mt-24`}
              >
                {/* Visual Side */}
                <div className="w-full lg:w-1/2 relative">
                  <div className="absolute -inset-4 bg-sky-blue/5 rounded-[3rem] -rotate-2 transition-transform group-hover:rotate-0 duration-500" />
                  <div className="relative bg-white p-8 lg:p-12 rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden">
                    <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl">
                      <img
                        src={image}
                        alt={`${title} - ${subtitle} - LM Express`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="absolute bottom-6 right-6 w-24 h-24 rounded-full bg-navy-deep flex items-center justify-center shadow-sky ring-4 ring-white">
                      <img src={icon} alt="" aria-hidden="true" className="w-[80%] h-[80%] object-contain" />
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-blue/10 text-sky-blue text-xs font-semibold tracking-wide mb-6">
                    {subtitle}
                  </div>
                  <h2 className="section-heading text-navy-deep text-3xl lg:text-4xl mb-6 group-hover:text-sky-blue transition-colors">
                    {title}
                  </h2>
                  <p className="text-navy-deep/60 text-base leading-relaxed mb-8 font-normal">
                    {desc}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 mb-10">
                    {features.map((f) => (
                      <li key={f} className="flex items-center gap-3 text-sm font-medium text-navy-deep/70">
                        <CheckCircle2 className="w-5 h-5 text-sky-blue flex-shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="button-modern h-14 px-8 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold group/btn">
                    <Link to={`/angebot?service=${key}`}>
                      {t("services.button_quote")}
                      <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  PROCESS SECTION  */}
      <section className="section-padding bg-white relative">
        <div className="container-main">
          <div className="text-center mb-20">
            <span className="text-sky-blue text-sm font-semibold tracking-wide mb-4 block uppercase">{t("services.process.label")}</span>
            <h2 className="section-heading text-navy-deep">{t("services.process.title")}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">
            {/* Connector line desktop */}
            <div className="hidden lg:block absolute top-[25%] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-sky-blue/20 to-transparent" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-blue/10 to-sky-blue/5 border border-sky-blue/20 flex items-center justify-center mb-6 group-hover:from-sky-blue group-hover:to-sky-blue-light transition-all duration-500 hover:-translate-y-2 shadow-sm group-hover:shadow-sky">
                  <step.icon className="w-9 h-9 text-sky-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-xl text-navy-deep mb-3">
                  {idx + 1}. {step.title}
                </h3>
                <p className="text-navy-deep/60 text-sm font-normal leading-relaxed max-w-[220px]">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA  */}
      <section className="section-padding bg-gradient-to-br from-navy-deep to-navy-mid overflow-hidden relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-blue/10 rounded-full blur-[150px]" />
        </div>
        <div className="container-main text-center relative z-10">
          <h2 className="section-heading text-white mb-6">
            {t("services.cta.title")}
          </h2>
          <p className="text-white/70 text-lg font-normal max-w-2xl mx-auto mb-12">
            {t("services.cta.desc")}
          </p>
          <Button asChild className="h-14 px-10 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold">
            <Link to="/kontakt">
              {t("services.cta.button")} <ArrowRight className="ml-3 w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
