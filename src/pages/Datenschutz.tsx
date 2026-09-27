import { useTranslation } from "react-i18next";

export default function Datenschutz() {
  const { t } = useTranslation();

  return (
    <main className="pt-24 bg-surface-light min-h-screen">
      <section className="bg-navy-deep py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-white/[0.02] bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px]" />
        <div className="container-main relative z-10">
          <p className="text-sky-blue text-xs font-semibold tracking-wide mb-4">{t("privacy.transparency")}</p>
          <h1 className="display-heading text-white text-4xl md:text-5xl">{t("privacy.title")}</h1>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-main max-w-4xl">
          <div className="bg-white rounded-[2.5rem] p-10 lg:p-16 shadow-2xl space-y-12">

            <section>
              <h2 className="section-heading text-navy-deep text-2xl mb-6">{t("privacy.general.title")}</h2>
              <p className="text-navy-deep/60 leading-relaxed font-normal whitespace-pre-line">
                {t("privacy.general.desc")}
              </p>
            </section>

            <section className="grid gap-8">
              <div className="p-8 rounded-3xl bg-navy-deep/5 border border-navy-deep/10">
                <h3 className="font-semibold text-lg text-navy-deep mb-4">
                  {t("privacy.collection.title")}
                </h3>
                <p className="text-sm text-navy-deep/60 leading-relaxed whitespace-pre-line">
                  {t("privacy.collection.desc")}
                </p>
              </div>

              <div className="p-8 rounded-3xl bg-navy-deep/5 border border-navy-deep/10">
                <h3 className="font-semibold text-lg text-navy-deep mb-4">
                  {t("privacy.rights.title")}
                </h3>
                <p className="text-sm text-navy-deep/60 leading-relaxed whitespace-pre-line">
                  {t("privacy.rights.desc")}
                </p>
              </div>
            </section>

            <section className="pt-8 border-t border-navy-deep/10">
              <h2 className="section-heading text-navy-deep text-xl mb-6">
                {t("privacy.hosting.title")}
              </h2>
              <p className="text-navy-deep/60 leading-relaxed text-sm">
                {t("privacy.hosting.desc")}
                <br /><br />
                <strong>{t("privacy.hosting.external")}</strong><br />
                <span className="whitespace-pre-line">{t("privacy.hosting.externalDesc")}</span>
              </p>
            </section>

            <section className="pt-8 border-t border-navy-deep/10">
              <h2 className="section-heading text-navy-deep text-xl mb-6">
                {t("privacy.legal.title")}
              </h2>
              <p className="text-navy-deep/60 leading-relaxed text-sm whitespace-pre-line">
                {t("privacy.legal.desc")}
              </p>
            </section>

          </div>
        </div>
      </section>
    </main>
  );
}
