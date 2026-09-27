import { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, Send, Loader2, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
};

export default function Kontakt() {
  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const contactSchema = z.object({
    name: z.string().min(2, t("contact.form.errors.name")),
    email: z.string().email(t("contact.form.errors.email")),
    subject: z.string().min(3, t("contact.form.errors.subject")),
    message: z.string().min(10, t("contact.form.errors.message")),
    honeypot: z.string().max(0, "Bot detected"),
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "", honeypot: "" }
  });

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          type: 'contact'
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (err) {
      console.error(err);
      setErrorMsg(t("contact.form.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-white min-h-screen">
      {/*  HERO SECTION  */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-navy-deep">
        {/* Background Visuals */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-blue/10 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-sky-blue/5 rounded-full blur-[120px] -translate-x-1/4 translate-y-1/4" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="container-main relative z-10 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 mb-8 animate-fade-in">
            <MessageSquare className="w-4 h-4 text-sky-blue" />
            <span className="text-white text-xs font-bold uppercase tracking-widest">
              {t("contact.hero.label")}
            </span>
          </div>
          <h1 className="display-heading text-white mb-8 max-w-4xl mx-auto animate-fade-up">
            {t("contact.hero.title")}<span className="text-sky-blue">{t("contact.hero.titleHighlight")}</span>
          </h1>
          <p className="text-white/60 text-xl font-normal leading-relaxed max-w-2xl mx-auto animate-fade-up delay-100">
            {t("contact.hero.desc")}
          </p>
        </div>

        {/* Wave Shape at Bottom */}
        <div className="absolute bottom-[-1px] left-0 right-0 h-24 z-[5]">
          <svg className="w-full h-full block" viewBox="0 0 1440 120" preserveAspectRatio="none">
            <path
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/*  CONTACT GRID SECTION  */}
      <section className="relative z-20 -mt-16 pb-32 px-4 sm:px-6">
        <div className="container-main max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Col: Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100">
                <div className="mb-10">
                  <h2 className="text-3xl font-bold text-navy-deep mb-4">{t("contact.form.title")}</h2>
                  <p className="text-navy-deep/50">{t("contact.form.desc")}</p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div className="hidden">
                    <input type="text" {...register("honeypot")} tabIndex={-1} autoComplete="off" />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-navy-deep font-bold ml-1">{t("contact.form.name")}</Label>
                      <Input
                        id="name"
                        {...register("name")}
                        placeholder={t("contact.form.namePlaceholder")}
                        className={`h-14 rounded-2xl bg-surface-light ${errors.name ? 'border-red-500' : 'border-none'} focus-visible:ring-sky-blue/20`}
                      />
                      {errors.name && <span className="text-red-500 text-[10px] font-bold uppercase ml-1 block">{errors.name.message}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-navy-deep font-bold ml-1">{t("contact.form.email")}</Label>
                      <Input
                        id="email"
                        type="email"
                        {...register("email")}
                        placeholder={t("contact.form.emailPlaceholder")}
                        className={`h-14 rounded-2xl bg-surface-light ${errors.email ? 'border-red-500' : 'border-none'} focus-visible:ring-sky-blue/20`}
                      />
                      {errors.email && <span className="text-red-500 text-[10px] font-bold uppercase ml-1 block">{errors.email.message}</span>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-navy-deep font-bold ml-1">{t("contact.form.subject")}</Label>
                    <Input
                      id="subject"
                      {...register("subject")}
                      placeholder={t("contact.form.subjectPlaceholder")}
                      className={`h-14 rounded-2xl bg-surface-light ${errors.subject ? 'border-red-500' : 'border-none'} focus-visible:ring-sky-blue/20`}
                    />
                    {errors.subject && <span className="text-red-500 text-[10px] font-bold uppercase ml-1 block">{errors.subject.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-navy-deep font-bold ml-1">{t("contact.form.message")}</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      placeholder={t("contact.form.messagePlaceholder")}
                      className={`min-h-[160px] rounded-2xl bg-surface-light ${errors.message ? 'border-red-500' : 'border-none'} focus-visible:ring-sky-blue/20 p-5 resize-none`}
                    />
                    {errors.message && <span className="text-red-500 text-[10px] font-bold uppercase ml-1 block">{errors.message.message}</span>}
                  </div>

                  {isSuccess && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 animate-fade-in">
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-semibold">{t("contact.form.success")}</span>
                    </div>
                  )}

                  {errorMsg && (
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 animate-fade-in">
                      <span className="text-sm font-semibold">{errorMsg}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-16 rounded-2xl bg-navy-deep text-white hover:bg-navy-mid text-lg font-bold shadow-xl shadow-navy-deep/20 transition-all active:scale-[0.98] disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                    ) : (
                      <>{t("contact.form.submit")} <Send className="ml-3 w-5 h-5" /></>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Col: Contact Cards & Info */}
            <div className="lg:col-span-5 space-y-6">
              {/* Quick Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <a href="tel:+491793210359" className="group p-8 rounded-[2rem] bg-surface-light border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-sky-blue transition-colors">
                      <Phone className="w-6 h-6 text-sky-blue group-hover:text-white" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-black uppercase tracking-widest text-navy-deep/30 mb-1">{t("contact.info.mobile")}</span>
                      <span className="text-navy-deep font-bold text-lg">+49 179 3210359</span>
                    </div>
                  </div>
                </a>

                <a href="mailto:lm2024express@gmail.com" className="group p-8 rounded-[2rem] bg-surface-light border border-gray-100 hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:bg-sky-blue transition-colors">
                      <Mail className="w-6 h-6 text-sky-blue group-hover:text-white" />
                    </div>
                    <div className="break-all">
                      <span className="block text-[10px] font-black uppercase tracking-widest text-navy-deep/30 mb-1">{t("contact.info.email")}</span>
                      <span className="text-navy-deep font-bold text-lg">lm2024express@gmail.com</span>
                    </div>
                  </div>
                </a>
              </div>

              {/* Location & Map Card */}
              <div className="bg-navy-deep rounded-[2.5rem] p-10 text-white relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-blue/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <MapPin className="text-sky-blue w-6 h-6" /> {t("contact.info.location")}
                </h3>

                <div className="space-y-8 relative z-10">
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{t("contact.info.address")}</span>
                    <p className="text-lg font-medium leading-relaxed">
                      Hauptstraße 26<br />
                      94339 Leiblfing
                    </p>
                  </div>

                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">{t("contact.info.hours")}</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="block text-sky-blue font-bold">Mo–Fr</span>
                        <span className="text-sm opacity-60">07:00 – 19:00</span>
                      </div>
                      <div>
                        <span className="block text-sky-blue font-bold">Sa–So</span>
                        <span className="text-sm opacity-60">08:00 – 16:00</span>
                      </div>
                    </div>
                  </div>

                  <div className="h-48 rounded-2xl overflow-hidden grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                    <iframe
                      src="https://www.google.com/maps?q=Hauptstra%C3%9Fe+26%2C+94339+Leiblfing&output=embed"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      title="LM Express Standort"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  FAQ / INFO SECTION  */}
      <section className="section-padding bg-surface-light relative overflow-hidden">
        <div className="container-main relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="section-heading text-navy-deep mb-6">{t("contact.faq.title")}</h2>
            <p className="text-navy-deep/60">{t("contact.faq.desc")}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                q: t("contact.faq.q1"),
                a: t("contact.faq.a1")
              },
              {
                q: t("contact.faq.q2"),
                a: t("contact.faq.a2")
              },
              {
                q: t("contact.faq.q3"),
                a: t("contact.faq.a3")
              },
              {
                q: t("contact.faq.q4"),
                a: t("contact.faq.a4")
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2rem] border border-navy-deep/5 transition-all hover:border-sky-blue/20">
                <h3 className="text-lg font-bold text-navy-deep mb-4 flex gap-3 text-left">
                  <span className="text-sky-blue">Q.</span> {item.q}
                </h3>
                <p className="text-navy-deep/60 text-sm leading-relaxed text-left pl-7">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*  FINAL CALL TO ACTION  */}
      <section className="py-24 bg-navy-deep overflow-hidden relative">
        <div className="container-main relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">{t("contact.cta.title")}</h2>
          <p className="text-white/40 text-lg mb-12 max-w-2xl mx-auto">{t("contact.cta.desc")}</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild className="h-16 px-12 rounded-2xl bg-sky-blue text-white hover:bg-sky-blue-light font-bold text-lg transition-all active:scale-95 shadow-xl shadow-sky-blue/20">
              <a href="tel:+491793210359">{t("contact.cta.button1")}</a>
            </Button>
            <Button asChild variant="outline" className="h-16 px-12 rounded-2xl border-white/20 bg-white/5 text-white backdrop-blur-md hover:bg-white/10 font-bold text-lg transition-all">
              <a href="mailto:lm2024express@gmail.com">{t("contact.cta.button2")}</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

