// Fixed lists used across the site. Each key has an English and an Arabic label.
// To add a city or area, add it here; the content schema only accepts keys listed here.

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

// Broad study areas, used to describe what each university teaches.
export const areas = {
  engineering: { en: 'Engineering', ar: 'الهندسة' },
  'architecture-design': { en: 'Architecture and design', ar: 'العمارة والتصميم' },
  'computer-science': { en: 'Computer science and IT', ar: 'علوم الحاسوب وتقنية المعلومات' },
  sciences: { en: 'Natural sciences and mathematics', ar: 'العلوم الطبيعية والرياضيات' },
  'medicine-health': { en: 'Medicine and health', ar: 'الطب والصحة' },
  'economics-business': { en: 'Economics and business', ar: 'الاقتصاد والأعمال' },
  law: { en: 'Law', ar: 'القانون' },
  'politics-social': { en: 'Political and social sciences', ar: 'العلوم السياسية والاجتماعية' },
  humanities: { en: 'Humanities and languages', ar: 'العلوم الإنسانية واللغات' },
  'agriculture-veterinary': { en: 'Agriculture and veterinary', ar: 'الزراعة والطب البيطري' },
} satisfies Labels;

export const fundingTypes = {
  government: { en: 'Italian government', ar: 'الحكومة الإيطالية' },
  regional_dsu: { en: 'Regional (DSU)', ar: 'إقليمية (DSU)' },
  university: { en: 'University', ar: 'الجامعة' },
  external: { en: 'Other organisations', ar: 'جهات أخرى' },
} satisfies Labels;

export const opportunityTypes = {
  workshop: { en: 'Workshop', ar: 'ورشة عمل' },
  teaching_session: { en: 'Teaching session', ar: 'جلسة تعليمية' },
  scholarship_call: { en: 'Scholarship call', ar: 'إعلان منحة' },
  other: { en: 'Other', ar: 'أخرى' },
} satisfies Labels;

export const deadlineTypes = {
  application: { en: 'University application', ar: 'التقديم للجامعة' },
  pre_enrolment: { en: 'Universitaly pre-enrolment', ar: 'التسجيل المسبق على Universitaly' },
  test: { en: 'Admission test', ar: 'اختبار القبول' },
  scholarship: { en: 'Scholarship', ar: 'منحة' },
  visa: { en: 'Visa', ar: 'التأشيرة' },
  other: { en: 'Other', ar: 'أخرى' },
} satisfies Labels;

export const modes = {
  online: { en: 'Online', ar: 'عبر الإنترنت' },
  in_person: { en: 'In person', ar: 'حضوري' },
} satisfies Labels;

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export const skills = {
  speaking: { en: 'Speaking', ar: 'المحادثة' },
  listening: { en: 'Listening', ar: 'الاستماع' },
  reading: { en: 'Reading', ar: 'القراءة' },
  writing: { en: 'Writing', ar: 'الكتابة' },
  grammar: { en: 'Grammar', ar: 'القواعد' },
  vocabulary: { en: 'Vocabulary', ar: 'المفردات' },
  exam: { en: 'Exam preparation', ar: 'التحضير للاختبارات' },
  general: { en: 'All skills', ar: 'جميع المهارات' },
} satisfies Labels;

export function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]];
}
