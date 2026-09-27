import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  Package,
  Zap,
  Route,
  AlertTriangle,
  Timer,
  MapPinned,
  CheckCircle2,
  Clock,
  Shield,
  TrendingUp,
  Phone,
  Globe2,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  const { t, i18n } = useTranslation();
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const [typedText, setTypedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const words = useMemo(
    () => t("home.hero.words", { returnObjects: true }) as string[],
    [t]
  );

  // Typewriter effect
  useEffect(() => {
    const currentWord = words[wordIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.slice(0, typedText.length + 1));
        } else {
          // Pause before deleting
          timeoutRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        // Deleting
        if (typedText.length > 0) {
          setTypedText(currentWord.slice(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [typedText, isDeleting, wordIndex, words]);

  // Reset typewriter on language change
  useEffect(() => {
    setTypedText("");
    setWordIndex(0);
    setIsDeleting(false);
  }, [i18n.language]);

  const services = [
    {
      icon: Zap,
      key: "express",
      id: "expressfahrten",
      title: t("home.services.express.title"),
      desc: t("home.services.express.desc"),
    },
    {
      icon: Route,
      key: "sonderfahrten",
      id: "direkt-sonderfahrten",
      title: t("home.services.sonderfahrten.title"),
      desc: t("home.services.sonderfahrten.desc"),
    },
    {
      icon: Package,
      key: "paket",
      id: "paket-dokumente",
      title: t("home.services.paket.title"),
      desc: t("home.services.paket.desc"),
    },
    {
      icon: AlertTriangle,
      key: "adr",
      id: "adr-gefahrgut",
      title: t("home.services.adr.title"),
      desc: t("home.services.adr.desc"),
    },
    {
      icon: Timer,
      key: "zeitkritisch",
      id: "zeitkritische-spezialtransporte",
      title: t("home.services.zeitkritisch.title"),
      desc: t("home.services.zeitkritisch.desc"),
    },
    {
      icon: Truck,
      key: "transport35",
      id: "transport-bis-35t",
      title: t("home.services.transport35.title"),
      desc: t("home.services.transport35.desc"),
    },
    {
      icon: MapPinned,
      key: "deutschlandweit",
      id: "deutschlandweite-zustellung",
      title: t("home.services.deutschlandweit.title"),
      desc: t("home.services.deutschlandweit.desc"),
    },
  ];

  const trustStats = [
    { value: "500+", label: t("home.hero.customers"), icon: Globe2 },
    { value: "98%", label: t("home.hero.reliability"), icon: CheckCircle2 },
    { value: "24/7", label: t("home.hero.availability"), icon: Clock },
    { value: "15+", label: t("home.hero.years"), icon: TrendingUp },
  ];

  const whyUs = [
    {
      icon: Clock,
      key: "reliable",
      title: t("home.whyUs.items.reliable.title"),
      desc: t("home.whyUs.items.reliable.desc"),
    },
    {
      icon: Shield,
      key: "insured",
      title: t("home.whyUs.items.insured.title"),
      desc: t("home.whyUs.items.insured.desc"),
    },
    {
      icon: TrendingUp,
      key: "scalable",
      title: t("home.whyUs.items.scalable.title"),
      desc: t("home.whyUs.items.scalable.desc"),
    },
    {
      icon: CheckCircle2,
      key: "compliant",
      title: t("home.whyUs.items.compliant.title"),
      desc: t("home.whyUs.items.compliant.desc"),
    },
  ];

  // Center detection for logos
  useEffect(() => {
    const container = logoContainerRef.current;
    if (!container) return;

    const updateCenterLogos = () => {
      const containerRect = container.getBoundingClientRect();
      const centerX = containerRect.left + containerRect.width / 2;
      const logos = container.querySelectorAll('.logo-item');

      logos.forEach((logo) => {
        const logoRect = logo.getBoundingClientRect();
        const logoCenter = logoRect.left + logoRect.width / 2;
        const distanceFromCenter = Math.abs(centerX - logoCenter);

        // If logo is within 150px of center, make it colorful
        if (distanceFromCenter < 150) {
          logo.classList.add('in-center');
        } else {
          logo.classList.remove('in-center');
        }
      });
    };

    // Update on animation frame for smooth detection
    let animationFrameId: number;
    const animate = () => {
      updateCenterLogos();
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="bg-white">
      {/*  HERO SECTION - Modern Corporate Style  */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/hero-poster.png"
            className="w-full h-full object-cover"
          >
            <source src="/background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/70 to-transparent" />
        </div>

        <div className="container-main relative z-10 grid lg:grid-cols-2 gap-20 items-center py-32 lg:py-40">
          {/* Left: Content */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-blue"></span>
              </span>
              <span className="text-white text-sm font-semibold">
                {t("home.hero.partner")}
              </span>
            </div>

            <h1 className="display-heading text-white mb-6 leading-[1.05]" key={i18n.language}>
              {t("home.hero.title")}<br />
              <span className="text-sky-blue inline-flex items-baseline">
                <span>{typedText}</span>
                <span className="inline-block w-1 h-[1em] bg-sky-blue ml-1 animate-pulse"></span>
              </span>
            </h1>

            <p className="text-white/70 text-xl leading-relaxed mb-10 font-normal">
              {t("home.hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild className="button-modern h-14 px-8 bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold shadow-xl">
                <Link to="/kontakt">
                  {t("home.hero.cta")} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-14 px-8 rounded-full text-white border-2 border-white/30 bg-white/5 backdrop-blur-md hover:bg-white/10 text-base font-semibold">
                <a href="tel:+491793210359">
                  <Phone className="mr-2 w-5 h-5" />
                  +49 179 3210359
                </a>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <Globe2 className="w-7 h-7 text-sky-blue" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">500+</div>
                  <div className="text-sm text-white/60">{t("home.hero.customers")}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-sky-blue" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">98%</div>
                  <div className="text-sm text-white/60">{t("home.hero.reliability")}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Empty for image visibility */}
          <div className="relative hidden lg:block">
            {/* Intentionally empty to show background image */}
          </div>
        </div>

        {/* Wave Shape at Bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0 h-32 z-[5]">
          <svg className="w-full h-full block" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
              fillOpacity="1"
              stroke="none"
            />
          </svg>
        </div>
      </section>

      {/*  SERVICES SECTION - Clean Minimal Cards  */}
      <section className="section-padding bg-gradient-soft relative overflow-hidden -mt-1">
        <div className="container-main relative">
          <div className="text-center mb-20">
            <span className="inline-block text-sky-blue text-sm font-semibold tracking-wide mb-4 uppercase">
              {t("home.services.label")}
            </span>
            <h2 className="section-heading text-navy-deep mb-6">
              {t("home.services.title")}
            </h2>
            <p className="text-navy-deep/60 text-lg font-normal max-w-2xl mx-auto">
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map(({ icon: Icon, key, id, title, desc }) => (
              <Link
                key={key}
                to={`/leistungen#${id}`}
                className="group card-modern hover:border-sky-blue/30"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-blue to-sky-blue-light shadow-sky flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-bold text-xl text-navy-deep mb-3 group-hover:text-sky-blue transition-colors">
                  {title}
                </h3>
                <p className="text-navy-deep/60 text-sm leading-relaxed font-normal mb-6">
                  {desc}
                </p>
                <div className="flex items-center text-sm font-semibold text-sky-blue">
                  {t("home.services.moreInfo")} <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Button asChild className="h-14 px-10 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold">
              <Link to="/leistungen">
                {t("home.services.viewAll")} <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/*  WHY CHOOSE US - Soft Background  */}
      <section className="section-padding bg-navy-surface relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-blue/5 rounded-full blur-[120px]" />

        <div className="container-main relative">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-xl">
              <span className="text-sky-blue text-sm font-semibold tracking-wide mb-4 block uppercase">
                {t("home.whyUs.label")}
              </span>
              <h2 className="section-heading text-navy-deep mb-6">
                {t("home.whyUs.title")}
              </h2>
              <p className="text-navy-deep/60 text-lg leading-relaxed mb-10 font-normal">
                {t("home.whyUs.desc")}
              </p>

              <div className="flex gap-12 mb-10">
                <div>
                  <div className="text-4xl font-bold text-navy-deep mb-2">15+</div>
                  <div className="text-sm text-navy-deep/60">{t("home.hero.years")}</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-navy-deep mb-2">100%</div>
                  <div className="text-sm text-navy-deep/60">{t("home.hero.reliability")}</div>
                </div>
              </div>

              <Button asChild className="h-14 px-8 rounded-full bg-navy-deep text-white hover:bg-navy-mid text-base font-semibold">
                <Link to="/ueber-uns">
                  {t("home.whyUs.about")} <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {whyUs.map(({ icon: Icon, key, title, desc }) => (
                <div key={key} className="p-8 rounded-3xl bg-white border border-gray-100 hover:border-sky-blue/30 hover:shadow-xl transition-all duration-500 group">
                  <div className="w-14 h-14 rounded-2xl bg-sky-blue/10 flex items-center justify-center mb-6 group-hover:bg-gradient-to-br group-hover:from-sky-blue group-hover:to-sky-blue-light transition-all">
                    <Icon className="w-7 h-7 text-sky-blue group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-bold text-lg text-navy-deep mb-3">{title}</h3>
                  <p className="text-navy-deep/60 text-sm leading-relaxed font-normal">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/*  CLIENTS SECTION - Çalıştığımız Firmalar  */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-main">
          <div className="text-center mb-16">
            <span className="inline-block text-sky-blue text-sm font-semibold tracking-wide mb-4 uppercase">
              {t("home.clients.label")}
            </span>
            <h2 className="section-heading text-navy-deep mb-6">
              {t("home.clients.title")}
            </h2>
            <p className="text-navy-deep/60 text-lg font-normal max-w-2xl mx-auto">
              {t("home.clients.desc")}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-10">
            {[
              { src: "/logos/transoflex.png", alt: "Transoflex" },
              { src: "/logos/go-express-logistics.png", alt: "GO! Express & Logistics" },
              { src: "/logos/dpd.png", alt: "DPD" },
            ].map((partner) => (
              <div
                key={partner.alt}
                className="flex items-center justify-center h-24 w-48 rounded-2xl bg-surface-light border border-gray-100 p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <img
                  src={partner.src}
                  alt={partner.alt}
                  className="max-h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  CTA SECTION - Gradient Background  */}
      <section className="section-padding bg-gradient-to-br from-navy-deep to-navy-mid relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-sky-blue/10 rounded-full blur-[150px]" />
        </div>

        <div className="container-main relative z-10 text-center">
          <h2 className="section-heading text-white mb-6">
            {t("home.cta.ready")}
          </h2>
          <p className="text-white/70 text-xl font-normal max-w-2xl mx-auto mb-12">
            {t("home.cta.desc")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="h-14 px-10 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold">
              <Link to="/kontakt">
                {t("home.cta.button")} <ArrowRight className="ml-3 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-10 rounded-full border-2 border-white/30 bg-white/5 backdrop-blur-md text-white hover:bg-white/10 text-base font-semibold">
              <a href="tel:+491793210359">
                <Phone className="mr-2 w-5 h-5" />
                {t("home.cta.call")}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
