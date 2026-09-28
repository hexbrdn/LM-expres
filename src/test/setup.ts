import "@testing-library/jest-dom";
import i18n from "@/i18n";

// jsdom reports en-US; tests assert the German default texts
i18n.changeLanguage("de");

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
