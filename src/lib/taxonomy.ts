// Fixed lists used by the directory filters. Each key has an English and an Arabic label.
// To add a city or field, add it here; the content schema only accepts keys listed here.

type Labels = Record<string, { en: string; ar: string }>;

export const cities = {
  bologna: { en: 'Bologna', ar: 'بولونيا' },
  milano: { en: 'Milan', ar: 'ميلانو' },
  padova: { en: 'Padua', ar: 'بادوفا' },
  pisa: { en: 'Pisa', ar: 'بيزا' },
  roma: { en: 'Rome', ar: 'روما' },
  torino: { en: 'Turin', ar: 'تورينو' },
  trento: { en: 'Trento', ar: 'ترينتو' },
} satisfies Labels;

export const regions = {
  'emilia-romagna': { en: 'Emilia-Romagna', ar: 'إميليا رومانيا' },
  lazio: { en: 'Lazio', ar: 'لاتسيو' },
  lombardia: { en: 'Lombardy', ar: 'لومبارديا' },
  piemonte: { en: 'Piedmont', ar: 'بيدمونت' },
  toscana: { en: 'Tuscany', ar: 'توسكانا' },
  'trentino-alto-adige': { en: 'Trentino-Alto Adige', ar: 'ترينتينو ألتو أديجي' },
  veneto: { en: 'Veneto', ar: 'فينيتو' },
} satisfies Labels;

export const levels = {
  bachelor: { en: "Bachelor's", ar: 'بكالوريوس' },
  master: { en: "Master's", ar: 'ماجستير' },
  phd: { en: 'PhD', ar: 'دكتوراه' },
} satisfies Labels;

export const teachingLanguages = {
  en: { en: 'English', ar: 'الإنجليزية' },
  it: { en: 'Italian', ar: 'الإيطالية' },
  'en-it': { en: 'English and Italian', ar: 'الإنجليزية والإيطالية' },
} satisfies Labels;

export const fields = {
  'computer-science': { en: 'Computer science and engineering', ar: 'علوم وهندسة الحاسوب' },
  'data-science': { en: 'Data science and AI', ar: 'علم البيانات والذكاء الاصطناعي' },
  economics: { en: 'Economics and management', ar: 'الاقتصاد والإدارة' },
  medicine: { en: 'Medicine', ar: 'الطب' },
} satisfies Labels;

export const fundingTypes = {
  government: { en: 'Italian government', ar: 'الحكومة الإيطالية' },
  regional_dsu: { en: 'Regional (DSU)', ar: 'إقليمية (DSU)' },
  university: { en: 'University', ar: 'الجامعة' },
  external: { en: 'Other organisations', ar: 'جهات أخرى' },
} satisfies Labels;

export function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]];
}
