import { Link } from "react-router-dom";
import { Shield, Award, Users, Heart, ArrowRight, History, Target, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

export default function UeberUns() {
  const { t } = useTranslation();

  const values = [
    {
      icon: Shield,
      title: t("about.values.items.reliability.title"),
      desc: t("about.values.items.reliability.desc"),
    },
    {
      icon: Award,
      title: t("about.values.items.quality.title"),
      desc: t("about.values.items.quality.desc"),
    },
    {
      icon: Users,
      title: t("about.values.items.partnership.title"),
      desc: t("about.values.items.partnership.desc"),
    },
    {
      icon: Heart,
      title: t("about.values.items.passion.title"),
      desc: t("about.values.items.passion.desc"),
    },
  ];

  const milestones = [
    { year: "2011", title: t("about.timeline.m1.title"), text: t("about.timeline.m1.desc") },
    { year: "2017", title: t("about.timeline.m2.title"), text: t("about.timeline.m2.desc") },
    { year: "2019", title: t("about.timeline.m3.title"), text: t("about.timeline.m3.desc") },
    { year: "2021", title: t("about.timeline.m4.title"), text: t("about.timeline.m4.desc") },
    { year: t("about.timeline.today"), title: t("about.timeline.m5.title"), text: t("about.timeline.m5.desc") },
  ];

  return (
    <main className="bg-white min-h-screen">
      {/*  VISION & CORE SECTION  */}
      <section className="section-padding pt-36 lg:pt-44 bg-white relative">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-24 items-center mb-32">
            <div className="order-2 lg:order-1">
              <div className="relative group">
                <div className="absolute -inset-4 bg-navy-deep/5 rounded-[4rem] group-hover:bg-navy-deep/10 transition-colors duration-500" />
                <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden border border-gray-100 shadow-2xl">
                  <img
                    src="/about/team.jpg"
                    alt="LM Express Team bei der Verladung"
                    className="w-full h-full object-cover transition-all duration-700 scale-110 group-hover:scale-100"
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
                <h1 className="section-heading text-navy-deep text-4xl md:text-5xl leading-tight">
                  {t("about.vision.title")} <br />
                  <span className="text-navy-deep/30">{t("about.vision.titleHighlight")}</span>
                </h1>
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
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,hsl(var(--sky-blue)/0.05),transparent)] pointer-events-none" />

        <div className="container-main relative z-10">
          <div className="text-center mb-24 max-w-3xl mx-auto">
            <span className="text-sky-blue text-xs font-black uppercase tracking-[0.4em] mb-4 block">{t("about.values.label")}</span>
            <h2 className="section-heading text-navy-deep mb-6">{t("about.values.title")}</h2>
            <p className="text-navy-deep/50 font-medium">{t("about.values.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative p-10 rounded-[2.5rem] bg-white border border-gray-100 hover:border-sky-blue/20 hover:shadow-[0_20px_60px_-15px_hsl(var(--sky-blue)/0.15)] transition-all duration-700"
              >
                <div className={`w-16 h-16 rounded-2xl bg-sky-blue/10 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-sky-blue group-hover:to-sky-blue-light transition-all duration-500`}>
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
            <Button asChild className="h-14 px-10 rounded-full bg-navy-deep text-white hover:bg-navy-mid text-base font-semibold shadow-xl">
              <Link to="/kontakt">{t("about.cta.button1")} <ArrowRight className="ml-3 w-5 h-5" /></Link>
            </Button>
            <Button asChild variant="outline" className="h-14 px-10 rounded-full border-2 border-white/40 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 text-base font-semibold">
              <Link to="/leistungen">{t("about.cta.button2")}</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

