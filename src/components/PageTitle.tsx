import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

const DEFAULT_TITLE = "LM Express - Kurier & Expressdienst | Schnell. Sicher. Zuverlässig.";

// title key + optional description key per route
const PAGE_META: Record<string, { title: string; desc?: string }> = {
  "/leistungen": { title: "nav.services", desc: "services.hero.desc" },
  "/ueber-uns": { title: "nav.about", desc: "about.hero.desc" },
  "/kontakt": { title: "nav.contact", desc: "contact.hero.desc" },
  "/angebot": { title: "quote.title", desc: "quote.subtitle" },
  "/impressum": { title: "impressum.title" },
  "/datenschutz": { title: "privacy.title" },
};

export default function PageTitle() {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (meta && !meta.dataset.default) meta.dataset.default = meta.content;
    const defaultDesc = meta?.dataset.default ?? "";

    if (pathname === "/") {
      document.title = DEFAULT_TITLE;
      if (meta) meta.content = t("home.hero.subtitle");
      return;
    }

    const page = PAGE_META[pathname];
    document.title = `${t(page?.title ?? "notFound.label")} | LM Express`;
    if (meta) meta.content = page?.desc ? t(page.desc) : page ? defaultDesc : t("notFound.desc");
  }, [pathname, t, i18n.language]);

  return null;
}
