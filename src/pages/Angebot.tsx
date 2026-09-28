import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  MapPin,
  Weight,
  Box,
  PlusCircle,
  Info,
  FileText,
  Building2,
  User,
  Mail,
  Phone
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const SERVICE_IDS = ["express", "sonderfahrten", "paket", "adr", "zeitkritisch", "transport35", "deutschlandweit"] as const;
const SERVICE_ICONS: Record<(typeof SERVICE_IDS)[number], string> = {
  express: "/icons/service-express.png",
  sonderfahrten: "/icons/service-sonderfahrten.png",
  paket: "/icons/service-paket.png",
  adr: "/icons/service-adr.png",
  zeitkritisch: "/icons/service-zeitkritisch.png",
  transport35: "/icons/service-transport35.png",
  deutschlandweit: "/icons/service-deutschlandweit.png",
};

type Step1 = { serviceType: string };
type Step2 = {
  pickupLocation: string;
  deliveryLocation: string;
  weight: string;
  volume?: string;
  palletCount?: string;
  additionalNotes?: string;
};
type Step3 = {
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  vatId?: string;
  honeypot: string;
};

function StepIndicator({ current, labels }: { current: number; labels: string[] }) {
  return (
    <div className="flex items-center justify-between gap-4 max-w-xl mx-auto mb-16 relative">
      {/* Background Line */}
      <div className="absolute top-6 left-6 right-6 h-[2px] bg-navy-deep/5 -z-10" />
      <div
        className="absolute top-6 left-6 h-[2px] bg-sky-blue transition-all duration-500 ease-out -z-10"
        style={{ width: `${((current - 1) / (labels.length - 1)) * 88}%` }}
      />

      {labels.map((label, i) => {
        const step = i + 1;
        const isActive = step === current;
        const isDone = step < current;
        return (
          <div key={label} className="flex flex-col items-center gap-3 group">
            <div
              className={`flex items-center justify-center w-12 h-12 rounded-2xl font-semibold text-sm transition-all duration-500 ${isDone
                  ? "bg-sky-blue text-white shadow-lg scale-110"
                  : isActive
                    ? "bg-navy-deep text-white shadow-xl ring-8 ring-navy-deep/5"
                    : "bg-white border border-navy-deep/5 text-navy-deep/30"
                }`}
            >
              {isDone ? <CheckCircle2 className="w-6 h-6" /> : step}
            </div>
            <span className={`text-xs font-medium tracking-wide transition-colors duration-500 ${isActive ? "text-navy-deep" : "text-navy-deep/30"}`}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}

const labelClass = "text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1";
const inputClass = "h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all";
const iconClass = "absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10";
const errorClass = "text-[10px] font-black text-destructive pl-1 uppercase";
const primaryButtonClass = "h-14 px-10 rounded-full bg-gradient-to-r from-sky-blue to-sky-blue-light text-white hover:shadow-sky text-base font-semibold shadow-xl group transition-all disabled:opacity-50";
const backButtonClass = "h-14 px-8 rounded-full border-2 text-base font-semibold gap-2";

export default function Angebot() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<Step1 & Step2 & Step3>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stepLabels = t("quote.steps", { returnObjects: true }) as string[];

  const serviceOptions = SERVICE_IDS.map((id) => ({
    id,
    icon: SERVICE_ICONS[id],
    label: t(`services.items.${id}.title`),
    desc: t(`services.items.${id}.subtitle`),
  }));

  // Preselect a service when coming from the Leistungen page (?service=adr)
  const requestedService = searchParams.get("service") ?? "";
  const initialService = (SERVICE_IDS as readonly string[]).includes(requestedService) ? requestedService : "";

  const step1Schema = z.object({
    serviceType: z.string().min(1, t("quote.step1.error")),
  });

  const step2Schema = z.object({
    pickupLocation: z.string().trim().min(3, t("quote.step2.errors.pickup")).max(200),
    deliveryLocation: z.string().trim().min(3, t("quote.step2.errors.delivery")).max(200),
    weight: z.string().trim().min(1, t("quote.step2.errors.weight")).max(20),
    volume: z.string().trim().max(20).optional(),
    palletCount: z.string().trim().max(10).optional(),
    additionalNotes: z.string().trim().max(500).optional(),
  });

  const step3Schema = z.object({
    companyName: z.string().trim().min(2, t("quote.step3.errors.company")).max(100),
    contactPerson: z.string().trim().min(2, t("quote.step3.errors.contact")).max(100),
    email: z.string().trim().email(t("quote.step3.errors.email")).max(255),
    phone: z.string().trim().min(6, t("quote.step3.errors.phone")).max(30),
    vatId: z.string().trim().max(30).optional(),
    honeypot: z.string().max(0, "Bot detected"),
  });

  const form1 = useForm<Step1>({
    resolver: zodResolver(step1Schema),
    defaultValues: { serviceType: formData.serviceType || initialService },
  });

  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      pickupLocation: formData.pickupLocation || "",
      deliveryLocation: formData.deliveryLocation || "",
      weight: formData.weight || "",
      volume: formData.volume || "",
      palletCount: formData.palletCount || "",
      additionalNotes: formData.additionalNotes || "",
    },
  });

  const form3 = useForm<Step3>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      companyName: formData.companyName || "",
      contactPerson: formData.contactPerson || "",
      email: formData.email || "",
      phone: formData.phone || "",
      vatId: formData.vatId || "",
      honeypot: "",
    },
  });

  const onStep1 = (data: Step1) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(2);
  };

  const onStep2 = (data: Step2) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep(3);
  };

  const onStep3 = async (data: Step3) => {
    const finalData = { ...formData, ...data };
    setErrorMsg(null);

    try {
      const response = await fetch('/api/send-mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...finalData,
          type: 'quote',
          lang: i18n.language,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send');
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setErrorMsg(t("contact.form.error"));
    }
  };

  const selectedService = serviceOptions.find((s) => s.id === form1.watch("serviceType"));

  return (
    <main className="bg-surface-light min-h-screen">
      {/*  HEADER  */}
      <section className="relative pt-40 pb-24 bg-navy-deep overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none" />
        <div className="container-main relative z-10 text-center">
          <span className="inline-block text-sky-blue text-xs font-semibold tracking-wide mb-6">
            {t("quote.badge")}
          </span>
          <h1 className="display-heading text-white text-3xl md:text-5xl mb-4">
            {t("quote.title")}
          </h1>
          <p className="text-white/40 text-base font-normal">
            {t("quote.subtitle")}
          </p>
        </div>
      </section>

      {/*  FORM WIZARD  */}
      <section className="section-padding -mt-12 relative z-20">
        <div className="container-main max-w-4xl">
          <div className="bg-white rounded-[3rem] p-8 lg:p-16 shadow-2xl border border-navy-deep/5 overflow-hidden">

            {submitted ? (
              <div className="text-center py-24 animate-fade-in group">
                <div className="w-24 h-24 rounded-full bg-sky-blue/10 flex items-center justify-center mx-auto mb-10 animate-float">
                  <CheckCircle2 className="w-12 h-12 text-sky-blue" />
                </div>
                <h2 className="section-heading text-navy-deep text-3xl mb-6">{t("quote.success.title")}</h2>
                <p className="text-navy-deep/50 text-lg font-normal max-w-sm mx-auto mb-12">
                  {t("quote.success.desc")}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button asChild className={primaryButtonClass}>
                    <Link to="/">{t("quote.success.button")} <ArrowRight className="ml-3 w-5 h-5" /></Link>
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <StepIndicator current={step} labels={stepLabels} />

                {/* STEP 1: SERVICE TYPE */}
                {step === 1 && (
                  <form onSubmit={form1.handleSubmit(onStep1)} className="animate-fade-in">
                    <div className="mb-12">
                      <h2 className="section-heading text-navy-mid text-2xl mb-3">{t("quote.step1.title")}</h2>
                      <p className="text-navy-deep/40 text-sm font-medium tracking-wide">{t("quote.step1.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
                      {serviceOptions.map((opt) => (
                        <label
                          key={opt.id}
                          className={`relative cursor-pointer transition-all duration-300 group p-6 rounded-3xl border-2 flex flex-col items-center text-center ${form1.watch("serviceType") === opt.id
                              ? "bg-navy-deep border-navy-deep text-white shadow-xl scale-105"
                              : "bg-surface-light border-transparent hover:border-sky-blue/30 text-navy-deep"
                            }`}
                        >
                          <input
                            type="radio"
                            {...form1.register("serviceType")}
                            value={opt.id}
                            className="absolute opacity-0"
                          />
                          <div className={`w-16 h-16 rounded-2xl bg-navy-deep flex items-center justify-center mb-5 transition-all duration-300 ${form1.watch("serviceType") === opt.id ? "ring-2 ring-sky-blue" : "shadow-sm"
                            }`}>
                            <img src={opt.icon} alt="" aria-hidden="true" className="w-12 h-12 object-contain" />
                          </div>
                          <span className="font-semibold text-base mb-2">{opt.label}</span>
                          <span className={`text-xs font-normal transition-opacity duration-300 ${form1.watch("serviceType") === opt.id ? "opacity-60" : "opacity-50"}`}>
                            {opt.desc}
                          </span>
                        </label>
                      ))}
                    </div>
                    {form1.formState.errors.serviceType && (
                      <p className="text-destructive text-sm font-bold text-center mb-8">{form1.formState.errors.serviceType.message}</p>
                    )}

                    <div className="flex justify-end pt-8 border-t border-navy-deep/5">
                      <Button className={primaryButtonClass}>
                        {t("quote.step1.next")} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                )}

                {/* STEP 2: LOGISTICS DETAILS */}
                {step === 2 && (
                  <form onSubmit={form2.handleSubmit(onStep2)} className="animate-fade-in space-y-10">
                    <div>
                      <h2 className="section-heading text-navy-mid text-2xl mb-3">{t("quote.step2.title")}</h2>
                      <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-blue/10 text-sky-blue text-xs font-semibold rounded">
                        {t("quote.step2.selected")} {selectedService?.label}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3">
                        <Label htmlFor="pickupLocation" className={labelClass}>{t("quote.step2.pickupLabel")}</Label>
                        <div className="relative group">
                          <MapPin className={iconClass} />
                          <Input
                            id="pickupLocation"
                            required
                            {...form2.register("pickupLocation")}
                            className={inputClass}
                            placeholder={t("quote.step2.pickupPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.pickupLocation && <p className={errorClass}>{form2.formState.errors.pickupLocation.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="deliveryLocation" className={labelClass}>{t("quote.step2.deliveryLabel")}</Label>
                        <div className="relative group">
                          <MapPin className={iconClass} />
                          <Input
                            id="deliveryLocation"
                            required
                            {...form2.register("deliveryLocation")}
                            className={inputClass}
                            placeholder={t("quote.step2.deliveryPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.deliveryLocation && <p className={errorClass}>{form2.formState.errors.deliveryLocation.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="weight" className={labelClass}>{t("quote.step2.weightLabel")}</Label>
                        <div className="relative group">
                          <Weight className={iconClass} />
                          <Input
                            id="weight"
                            required
                            {...form2.register("weight")}
                            className={inputClass}
                            placeholder={t("quote.step2.weightPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.weight && <p className={errorClass}>{form2.formState.errors.weight.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="volume" className={labelClass}>{t("quote.step2.volumeLabel")}</Label>
                        <div className="relative group">
                          <Box className={iconClass} />
                          <Input
                            id="volume"
                            {...form2.register("volume")}
                            className={inputClass}
                            placeholder={t("quote.step2.volumePlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="palletCount" className={labelClass}>{t("quote.step2.palletLabel")}</Label>
                        <div className="relative group">
                          <PlusCircle className={iconClass} />
                          <Input
                            id="palletCount"
                            {...form2.register("palletCount")}
                            className={inputClass}
                            placeholder={t("quote.step2.palletPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="additionalNotes" className={labelClass}>{t("quote.step2.notesLabel")}</Label>
                      <div className="relative group">
                        <FileText className="absolute left-4 top-6 w-5 h-5 text-sky-blue z-10" />
                        <Textarea
                          id="additionalNotes"
                          {...form2.register("additionalNotes")}
                          className="min-h-[140px] pl-12 rounded-2xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold p-6 transition-all"
                          placeholder={t("quote.step2.notesPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t border-navy-deep/5">
                      <Button variant="outline" type="button" onClick={() => setStep(1)} className={backButtonClass}>
                        <ArrowLeft className="w-5 h-5" /> {t("quote.step2.back")}
                      </Button>
                      <Button className={primaryButtonClass}>
                        {t("quote.step2.continue")} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </div>
                  </form>
                )}

                {/* STEP 3: CONTACT INFORMATION */}
                {step === 3 && (
                  <form onSubmit={form3.handleSubmit(onStep3)} className="animate-fade-in space-y-10">
                    <div>
                      <h2 className="display-heading text-navy-mid text-3xl mb-3">{t("quote.step3.title")}</h2>
                      <p className="text-navy-deep/40 text-[10px] font-black uppercase tracking-widest">{t("quote.step3.subtitle")}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-3 md:col-span-2">
                        <Label htmlFor="companyName" className={labelClass}>{t("quote.step3.companyLabel")}</Label>
                        <div className="relative group">
                          <Building2 className={iconClass} />
                          <Input
                            id="companyName"
                            required
                            {...form3.register("companyName")}
                            className={inputClass}
                            placeholder={t("quote.step3.companyPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.companyName && <p className={errorClass}>{form3.formState.errors.companyName.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="contactPerson" className={labelClass}>{t("quote.step3.contactLabel")}</Label>
                        <div className="relative group">
                          <User className={iconClass} />
                          <Input
                            id="contactPerson"
                            required
                            {...form3.register("contactPerson")}
                            className={inputClass}
                            placeholder={t("quote.step3.contactPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.contactPerson && <p className={errorClass}>{form3.formState.errors.contactPerson.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="quoteEmail" className={labelClass}>{t("quote.step3.emailLabel")}</Label>
                        <div className="relative group">
                          <Mail className={iconClass} />
                          <Input
                            id="quoteEmail"
                            type="email"
                            required
                            {...form3.register("email")}
                            className={inputClass}
                            placeholder={t("quote.step3.emailPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.email && <p className={errorClass}>{form3.formState.errors.email.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="quotePhone" className={labelClass}>{t("quote.step3.phoneLabel")}</Label>
                        <div className="relative group">
                          <Phone className={iconClass} />
                          <Input
                            id="quotePhone"
                            type="tel"
                            required
                            {...form3.register("phone")}
                            className={inputClass}
                            placeholder={t("quote.step3.phonePlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.phone && <p className={errorClass}>{form3.formState.errors.phone.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="vatId" className={labelClass}>{t("quote.step3.vatLabel")}</Label>
                        <div className="relative group">
                          <Info className={iconClass} />
                          <Input
                            id="vatId"
                            {...form3.register("vatId")}
                            className={inputClass}
                            placeholder={t("quote.step3.vatPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Honeypot (hidden from users) */}
                    <input type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" {...form3.register("honeypot")} />

                    <div className="p-8 bg-surface-light rounded-[2rem] border border-navy-deep/5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-navy-mid flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-sky-blue" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase text-navy-deep mb-2 tracking-tight">{t("quote.step3.protectionTitle")}</p>
                          <p className="text-navy-deep/40 text-[10px] font-bold leading-relaxed italic">
                            {t("quote.step3.protectionDesc")}{" "}
                            <Link to="/datenschutz" className="text-sky-blue not-italic underline underline-offset-2">
                              {t("contact.form.privacyLink")}
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t border-navy-deep/5 relative">
                      {errorMsg && (
                        <div className="absolute -top-16 left-0 right-0 flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 animate-fade-in shadow-xl">
                          <span className="text-sm font-semibold">{errorMsg}</span>
                        </div>
                      )}

                      <Button variant="outline" type="button" onClick={() => setStep(2)} className={backButtonClass}>
                        <ArrowLeft className="w-5 h-5" /> {t("quote.step3.back")}
                      </Button>
                      <Button
                        disabled={form3.formState.isSubmitting}
                        className={primaryButtonClass}
                      >
                        {form3.formState.isSubmitting ? (
                          <Loader2 className="animate-spin w-6 h-6" />
                        ) : (
                          <>
                            {t("quote.step3.submit")} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-1" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
