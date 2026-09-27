import { Link } from "react-router-dom";
import { Shield, Award, Users, Heart, ArrowRight, History, Target, TrendingUp, Sparkles, Globe, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function UeberUns() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: t("about.values.items.reliability.title"),
      desc: t("about.values.items.reliability.desc"),
      color: "bg-blue-500/10",
      textShadow: "shadow-blue-500/20"
    },
    {
      icon: Award,
      title: t("about.values.items.quality.title"),
      desc: t("about.values.items.quality.desc"),
      color: "bg-amber-500/10",
      textShadow: "shadow-amber-500/20"
    },
    {
      icon: Users,
      title: t("about.values.items.partnership.title"),
      desc: t("about.values.items.partnership.desc"),
      color: "bg-emerald-500/10",
      textShadow: "shadow-emerald-500/20"
    },
    {
      icon: Heart,
      title: t("about.values.items.passion.title"),
      desc: t("about.values.items.passion.desc"),
      color: "bg-rose-500/10",
      textShadow: "shadow-rose-500/20"
    },
  ];

  const milestones = [
    { year: "2015", title: t("about.timeline.m1.title"), text: t("about.timeline.m1.desc") },
    { year: "2017", title: t("about.timeline.m2.title"), text: t("about.timeline.m2.desc") },
    { year: "2019", title: t("about.timeline.m3.title"), text: t("about.timeline.m3.desc") },
    { year: "2021", title: t("about.timeline.m4.title"), text: t("about.timeline.m4.desc") },
    { year: "2024", title: t("about.timeline.m5.title"), text: t("about.timeline.m5.desc") },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/*  HERO SECTION - Immersive Design  */}
      <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-navy-deep">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-sky-blue/15 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-sky-blue/5 rounded-full blur-[140px] -translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        </div>

        <div className="container-main relative z-10 py-32 lg:py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="max-w-2xl animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8 shadow-lg">
                <Sparkles className="w-4 h-4 text-sky-blue" />
                <span className="text-white text-xs font-bold uppercase tracking-[0.2em]">
                  {t("about.hero.label")}
                </span>
              </div>
              <h1 className="display-heading text-white mb-8 leading-[1.05]">
                {t("about.hero.title")} <br />
                <span className="text-sky-blue">{t("about.hero.titleHighlight")}</span>
              </h1>
              <p className="text-white/60 text-xl font-normal leading-relaxed mb-10">
                {t("about.hero.desc")}
              </p>

              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-bold text-white mb-1">500+</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-black">{t("about.hero.stats.partners")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">10k+</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-black">{t("about.hero.stats.deliveries")}</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-1">98%</div>
                  <div className="text-xs text-white/40 uppercase tracking-widest font-black">{t("about.hero.stats.ontime")}</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block animate-slide-in-right">
              <div className="relative z-10 rounded-[3rem] overflow-hidden border-8 border-white/5 shadow-2xl skew-x-1 hover:skew-x-0 transition-transform duration-700">
                <img
                  src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
                  alt="Modern Warehouse"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-transparent to-transparent" />
              </div>
              {/* Floating element */}
              <div className="absolute z-20 -bottom-16 -left-10 bg-white p-8 rounded-[2rem] shadow-3xl animate-bounce-slow">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-sky-blue/10 flex items-center justify-center text-sky-blue font-bold">15+</div>
                  <div>
                    <div className="text-navy-deep font-bold text-sm">{t("about.hero.stats.years")}</div>
                    <div className="text-navy-deep/40 text-xs">{t("about.hero.stats.yearsText")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Shape at Bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0 h-32 z-[5]">
          <svg className="w-full h-full block" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/*  VISION & CORE SECTION  */}
      <section className="section-padding bg-white relative">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-navy-deep/5 rounded-[4rem] group-hover:bg-navy-deep/10 transition-colors duration-500" />
                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop"
                    alt="Team Planning"
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-12 left-12 right-12 text-white">
                    <History className="w-10 h-10 text-sky-blue mb-4" />
                    <h3 className="text-2xl font-bold mb-2 tracking-tight">{t("about.vision.imageText")}</h3>
                    <p className="text-sm text-white/70">{t("about.vision.imageSub")}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-10">
              <div className="space-y-6">
                <span className="text-sky-blue text-xs font-black uppercase tracking-[0.4em] block">{t("about.vision.label")}</span>
                <h2 className="section-heading text-navy-deep text-4xl md:text-5xl leading-tight">
                  {t("about.vision.title")} <br />
                  <span className="text-navy-deep/30">{t("about.vision.titleHighlight")}</span>
                </h2>
                <div className="space-y-6 text-navy-deep/60 text-lg leading-relaxed">
                  <p>
                    {t("about.vision.desc1")}
                  </p>
                  <p>
                    {t("about.vision.desc2")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 rounded-2xl bg-surface-light border border-gray-100 flex items-start gap-4 hover:border-sky-blue/30 transition-all">
                  <Target className="w-6 h-6 text-sky-blue shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-deep mb-1">{t("about.vision.visionLabel")}</h4>
                    <p className="text-xs text-navy-deep/50">{t("about.vision.visionDesc")}</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-surface-light border border-gray-100 flex items-start gap-4 hover:border-sky-blue/30 transition-all">
                  <Globe className="w-6 h-6 text-sky-blue shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-navy-deep mb-1">{t("about.vision.scopeLabel")}</h4>
                    <p className="text-xs text-navy-deep/50">{t("about.vision.scopeDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  VALUES SECTION - Sleek Bento Cards  */}
      <section className="section-padding bg-navy-surface overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(14,165,233,0.05),transparent)] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-sky-blue text-xs font-black uppercase tracking-[0.4em] mb-4 block">{t("about.values.label")}</span>
            <h2 className="section-heading text-navy-deep mb-6">{t("about.values.title")}</h2>
            <p className="text-navy-deep/50 font-medium">{t("about.values.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc, color }) => (
              <div
                key={title}
                className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-sky-blue/20 hover:shadow-[0_20px_60px_-15px_rgba(30,115,190,0.15)] transition-all duration-700"
              >
                <div className={`w-16 h-16 rounded-2xl ${color} flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-blue group-hover:to-sky-blue-light transition-all duration-500`}>
                  <Icon className="w-8 h-8 text-sky-blue group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-black text-navy-deep mb-4">{title}</h3>
                <p className="text-navy-deep/50 text-sm leading-relaxed font-medium">{desc}</p>
                <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Icon className="w-12 h-12 text-navy-deep" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  TIMELINE SECTION - Elegant Vertical Design  */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="container-main">
          <div className="text-center mb-32">
            <h2 className="section-heading text-navy-deep mb-4">{t("about.timeline.title")}</h2>
            <div className="w-24 h-1.5 bg-sky-blue mx-auto rounded-full" />
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Center Line */}
            <div className="absolute left-[20px] md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-sky-blue via-gray-200 to-transparent md:-translate-x-1/2" />

            <div className="space-y-24 md:space-y-32">
              {milestones.map((m, idx) => (
                <div key={m.year} className={`relative flex flex-col md:flex-row gap-12 items-start md:items-center ${idx % 2 === 1 ? "md:flex-row-reverse" : ""}`}>
                  {/* Circle Marker */}
                  <div className="absolute left-[20px] md:left-1/2 w-10 h-10 rounded-full bg-white border-4 border-sky-blue z-10 md:-translate-x-1/2 flex items-center justify-center shadow-lg group">
                    <div className="w-2 h-2 rounded-full bg-sky-blue animate-ping" />
                  </div>

                  {/* Year Tag */}
                  <div className={`flex-1 ${idx % 2 === 0 ? "md:text-right" : "text-left"} pl-16 md:pl-0`}>
                    <div className={`inline-block px-4 py-1.5 rounded-full bg-navy-deep text-white text-xs font-bold shadow-xl mb-4`}>
                      {m.year}
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 pl-16 md:pl-0">
                    <div className="p-8 rounded-[2rem] bg-surface-light border border-gray-100 hover:border-sky-blue/30 transition-all hover:bg-white hover:shadow-2xl">
                      <h4 className="font-extrabold text-xl text-navy-deep mb-2">{m.title}</h4>
                      <p className="text-navy-deep/50 text-sm leading-relaxed font-medium">{m.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>



      <section className="py-24 bg-gradient-to-br from-sky-blue to-sky-blue-light relative overflow-hidden group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519003722824-194d4455a60c?q=80&w=2075&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container-main relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">{t("about.cta.title")}</h2>
          <p className="text-white/80 text-xl font-bold mb-14 max-w-2xl mx-auto">{t("about.cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="h-16 px-12 rounded-2xl bg-navy-deep text-white hover:bg-navy-mid font-black text-lg transition-all active:scale-95 shadow-3xl">
              <Link to="/kontakt">{t("about.cta.button1")} <ArrowRight className="ml-3 w-6 h-6" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-16 px-12 rounded-2xl border-white/40 bg-white/10 text-white backdrop-blur-xl hover:bg-white/20 font-black text-lg transition-all">
              <Link to="/leistungen">{t("about.cta.button2")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

