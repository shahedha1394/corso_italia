import en from './en.json';
import ar from './ar.json';

export const languages = {
  en: { label: 'English', dir: 'ltr' },
  ar: { label: 'العربية', dir: 'rtl' },
} as const;

export type Lang = keyof typeof languages;
export type UIKey = keyof typeof en;

export const langs = Object.keys(languages) as Lang[];
export const defaultLang: Lang = 'en';

const ui: Record<Lang, Record<UIKey, string>> = { en, ar };

export function useTranslations(lang: Lang) {
  return (key: UIKey) => ui[lang][key] ?? ui[defaultLang][key];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'ar' : 'en';
}

/** Build a link that respects the site base path, e.g. path('ar', '/study/') → /ar/study/ */
export function path(lang: Lang | null, to = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = to.startsWith('/') ? to : `/${to}`;
  const withSlash = clean.endsWith('/') ? clean : `${clean}/`;
  return lang ? `${base}/${lang}${withSlash}` : `${base}${withSlash}`;
}

/** Same page in the other language: swaps the language segment of the current URL. */
export function switchLangPath(pathname: string, lang: Lang): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const rest = pathname.slice(base.length).replace(/^\/(en|ar)(?=\/|$)/, '');
  return path(otherLang(lang), rest || '/');
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
