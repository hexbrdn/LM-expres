import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Loader2,
  Package,
  Zap,
  Thermometer,
  Car,
  Pill,
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
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

const SERVICE_IDS = ["stueckgut", "express", "kuehltransport", "kurier", "apotheken"] as const;
const SERVICE_ICONS = {
  stueckgut: Package,
  express: Zap,
  kuehltransport: Thermometer,
  kurier: Car,
  apotheken: Pill,
} as const;

type Step1 = { serviceType: string };
type Step2 = {
  pickupLocation: string;
  deliveryLocation: string;
  weight: string;
  volume?: string;
  palletCount?: string;
  temperatureRequired?: boolean;
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
                  ? "bg-sky-blue text-navy-deep shadow-lg scale-110"
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

export default function Angebot() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<Step1 & Step2 & Step3>>({});
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const stepLabels = t("quote.steps", { returnObjects: true }) as string[];

  const serviceOptions = SERVICE_IDS.map((id) => ({
    id,
    icon: SERVICE_ICONS[id],
    label: t(`quote.services.${id}.label`),
    desc: t(`quote.services.${id}.desc`),
  }));

  const step1Schema = z.object({
    serviceType: z.string().min(1, t("quote.step1.error")),
  });

  const step2Schema = z.object({
    pickupLocation: z.string().trim().min(3, t("quote.step2.errors.pickup")).max(200),
    deliveryLocation: z.string().trim().min(3, t("quote.step2.errors.delivery")).max(200),
    weight: z.string().trim().min(1, t("quote.step2.errors.weight")).max(20),
    volume: z.string().trim().max(20).optional(),
    palletCount: z.string().trim().max(10).optional(),
    temperatureRequired: z.boolean().optional(),
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
    defaultValues: { serviceType: formData.serviceType || "" },
  });

  const form2 = useForm<Step2>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      pickupLocation: formData.pickupLocation || "",
      deliveryLocation: formData.deliveryLocation || "",
      weight: formData.weight || "",
      volume: formData.volume || "",
      palletCount: formData.palletCount || "",
      temperatureRequired: formData.temperatureRequired || false,
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
          name: finalData.contactPerson,
          email: finalData.email,
          subject: `New Quote Request: ${finalData.serviceType}`,
          message: `Service: ${finalData.serviceType}\nFrom: ${finalData.pickupLocation}\nTo: ${finalData.deliveryLocation}\nWeight: ${finalData.weight}`,
          type: 'quote',
          ...finalData
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
    <main className="pt-24 bg-surface-light min-h-screen">
      {/*  HEADER  */}
      <section className="relative py-24 bg-navy-deep overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.02] pointer-events-none" />
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
                  <Button asChild className="h-14 px-10 rounded-2xl bg-navy-deep items-center gap-3">
                    <a href="/">{t("quote.success.button")} <ArrowRight className="w-5 h-5" /></a>
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
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-colors duration-300 ${form1.watch("serviceType") === opt.id ? "bg-sky-blue" : "bg-white shadow-sm"
                            }`}>
                            <opt.icon className={`w-7 h-7 transition-colors duration-300 ${form1.watch("serviceType") === opt.id ? "text-navy-deep" : "text-sky-blue"}`} />
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
                      <Button className="h-14 px-10 rounded-xl bg-navy-deep hover:bg-sky-blue hover:text-navy-deep text-base font-semibold shadow-xl group transition-all">
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
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.pickupLabel")}</Label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10 transition-transform group-focus-within:scale-110" />
                          <Input
                            {...form2.register("pickupLocation")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step2.pickupPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.pickupLocation && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form2.formState.errors.pickupLocation.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.deliveryLabel")}</Label>
                        <div className="relative group">
                          <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10 transition-transform group-focus-within:scale-110" />
                          <Input
                            {...form2.register("deliveryLocation")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step2.deliveryPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.deliveryLocation && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form2.formState.errors.deliveryLocation.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.weightLabel")}</Label>
                        <div className="relative group">
                          <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10 transition-transform group-focus-within:scale-110" />
                          <Input
                            {...form2.register("weight")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step2.weightPlaceholder")}
                          />
                        </div>
                        {form2.formState.errors.weight && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form2.formState.errors.weight.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.volumeLabel")}</Label>
                        <div className="relative group">
                          <Box className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10 transition-transform group-focus-within:scale-110" />
                          <Input
                            {...form2.register("volume")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step2.volumePlaceholder")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.palletLabel")}</Label>
                        <div className="relative group">
                          <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10 transition-transform group-focus-within:scale-110" />
                          <Input
                            {...form2.register("palletCount")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step2.palletPlaceholder")}
                          />
                        </div>
                      </div>

                      <div className="p-6 bg-surface-light rounded-2xl border border-navy-deep/5 flex items-center gap-4">
                        <Checkbox
                          id="temp"
                          checked={form2.watch("temperatureRequired")}
                          onCheckedChange={(c) => form2.setValue("temperatureRequired", !!c)}
                          className="w-6 h-6 rounded-lg border-navy-deep/10 data-[state=checked]:bg-sky-blue data-[state=checked]:border-sky-blue"
                        />
                        <div className="flex flex-col">
                          <Label htmlFor="temp" className="text-sm font-black uppercase tracking-tight text-navy-deep cursor-pointer">{t("quote.step2.climateLabel")}</Label>
                          <span className="text-[10px] font-bold text-navy-deep/30 uppercase tracking-widest">{t("quote.step2.climateDesc")}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step2.notesLabel")}</Label>
                      <div className="relative group">
                        <FileText className="absolute left-4 top-6 w-5 h-5 text-sky-blue z-10" />
                        <Textarea
                          {...form2.register("additionalNotes")}
                          className="min-h-[140px] pl-12 rounded-2xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold p-6 transition-all"
                          placeholder={t("quote.step2.notesPlaceholder")}
                        />
                      </div>
                    </div>

                    <div className="flex justify-between pt-8 border-t border-navy-deep/5">
                      <Button variant="outline" type="button" onClick={() => setStep(1)} className="h-16 px-10 rounded-2xl border-2 font-black uppercase text-xs tracking-widest gap-3">
                        <ArrowLeft className="w-5 h-5" /> {t("quote.step2.back")}
                      </Button>
                      <Button className="h-16 px-12 rounded-2xl bg-navy-deep hover:bg-sky-blue hover:text-navy-deep text-lg font-black uppercase tracking-widest shadow-xl group transition-all">
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
                      <div className="space-y-3 lg:col-span-2">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step3.companyLabel")}</Label>
                        <div className="relative group">
                          <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10" />
                          <Input
                            {...form3.register("companyName")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step3.companyPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.companyName && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form3.formState.errors.companyName.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step3.contactLabel")}</Label>
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10" />
                          <Input
                            {...form3.register("contactPerson")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step3.contactPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.contactPerson && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form3.formState.errors.contactPerson.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step3.emailLabel")}</Label>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10" />
                          <Input
                            {...form3.register("email")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step3.emailPlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.email && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form3.formState.errors.email.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step3.phoneLabel")}</Label>
                        <div className="relative group">
                          <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10" />
                          <Input
                            {...form3.register("phone")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step3.phonePlaceholder")}
                          />
                        </div>
                        {form3.formState.errors.phone && <p className="text-[10px] font-black text-destructive pl-1 uppercase">{form3.formState.errors.phone.message}</p>}
                      </div>

                      <div className="space-y-3">
                        <Label className="text-[10px] uppercase font-black tracking-widest text-navy-deep/40 pl-1">{t("quote.step3.vatLabel")}</Label>
                        <div className="relative group">
                          <Info className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-blue z-10" />
                          <Input
                            {...form3.register("vatId")}
                            className="h-14 pl-12 rounded-xl bg-surface-light border-transparent focus:border-sky-blue focus:ring-4 focus:ring-sky-blue/10 font-bold transition-all"
                            placeholder={t("quote.step3.vatPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-8 bg-surface-light rounded-[2rem] border border-navy-deep/5">
                      <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-lg bg-navy-mid flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4 text-sky-blue" />
                        </div>
                        <div>
                          <p className="text-[11px] font-black uppercase text-navy-deep mb-2 tracking-tight">{t("quote.step3.protectionTitle")}</p>
                          <p className="text-navy-deep/40 text-[10px] font-bold leading-relaxed italic">
                            {t("quote.step3.protectionDesc")}
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

                      <Button variant="outline" type="button" onClick={() => setStep(2)} className="h-16 px-10 rounded-2xl border-2 font-black uppercase text-xs tracking-widest gap-3">
                        <ArrowLeft className="w-5 h-5" /> {t("quote.step3.back")}
                      </Button>
                      <Button
                        disabled={form3.formState.isSubmitting}
                        className="h-16 px-12 rounded-2xl bg-sky-blue text-navy-deep hover:bg-navy-deep hover:text-white text-lg font-black uppercase tracking-widest shadow-xl group transition-all disabled:opacity-50"
                      >
                        {form3.formState.isSubmitting ? (
                          <Loader2 className="animate-spin w-6 h-6" />
                        ) : (
                          <>
                            {t("quote.step3.submit")} <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
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
