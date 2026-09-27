import { ArrowLeft, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Impressum() {
  const { t } = useTranslation();

  return (
    <main className="bg-surface-light min-h-screen pb-24 pt-32">
      <div className="container-main max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-navy-deep/60 hover:text-sky-blue transition-colors mb-12 font-medium"
        >
          <ArrowLeft className="w-4 h-4" /> {t("impressum.backHome")}
        </Link>

        <div className="bg-white rounded-[2.5rem] p-10 md:p-14 shadow-xl border border-gray-100">
          <div className="w-16 h-16 rounded-2xl bg-sky-blue/10 flex items-center justify-center mb-8">
            <Scale className="w-8 h-8 text-sky-blue" />
          </div>

          <h1 className="text-4xl font-extrabold text-navy-deep mb-4 tracking-tight">{t("impressum.title")}</h1>
          <p className="text-navy-deep/50 text-base mb-12">{t("impressum.subtitle")}</p>

          <div className="space-y-10 text-navy-deep/80 leading-relaxed font-medium">
            <section>
              <h2 className="text-xl font-bold text-navy-deep mb-4">{t("impressum.contactAddress")}</h2>
              <p>
                Ufuk Enez<br />
                Hauptstraße 26<br />
                94339 Leiblfing
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy-deep mb-4">{t("impressum.management")}</h2>
              <p>{t("impressum.managementDesc")}</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy-deep mb-4">{t("impressum.taxId")}</h2>
              <p className="whitespace-pre-line">
                {t("impressum.taxIdDesc")}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy-deep mb-4">{t("impressum.contact")}</h2>
              <p className="whitespace-pre-line">
                {t("impressum.contactDesc")}
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
