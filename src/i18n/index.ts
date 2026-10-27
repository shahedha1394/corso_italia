import en from './en.json';
import ar from './ar.json';
import fr from './fr.json';

export const languages = {
  en: { label: 'English', short: 'EN', dir: 'ltr', locale: 'en-GB' },
  ar: { label: 'العربية', short: 'عربي', dir: 'rtl', locale: 'ar' },
  fr: { label: 'Français', short: 'FR', dir: 'ltr', locale: 'fr-FR' },
} as const;

export type Lang = keyof typeof languages;
export type UIKey = keyof typeof en;

export const langs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'en';

const ui: Record<Lang, Record<UIKey, string>> = { en, ar, fr };

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

/** Locale for formatting dates and numbers in a language. */
export function dateLocale(lang: Lang): string {
  return languages[lang].locale;
}

/** Build a link that respects the site base path, e.g. path('ar', '/study/') → /ar/study/ */
export function path(lang: Lang | null, to = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = to.startsWith('/') ? to : `/${to}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return lang ? `${base}/${lang}${withSlash}` : `${base}${withSlash}`;
}

/** The same page in another language: swaps the language segment of the current URL. */
export function switchLangPath(pathname: string, target: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = pathname.slice(base.length).replace(/^\/(en|ar|fr)(?=\/|$)/, '');
  return path(target, rest || '/');
}

export function getStaticLangPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** Fill "{name}" placeholders in a translated string. */
export function fill(text: string, values: Record<string, string | number>): string {
  return text.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? ''));
}

/** Arrow pointing "forward" in the reading direction. */
export function arrow(lang: Lang): string {
  return languages[lang].dir === 'rtl' ? '←' : '→';
}
