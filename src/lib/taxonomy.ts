// Fixed lists used across the site. Each key has an English and an Arabic label.
// To add a city or area, add it here; the content schema only accepts keys listed here.

type Labels = Record<string, { en: string; ar: string }>;

export const cities = {
  ancona: { en: 'Ancona', ar: 'أنكونا' },
  aosta: { en: 'Aosta', ar: 'أوستا' },
  bari: { en: 'Bari', ar: 'باري' },
  benevento: { en: 'Benevento', ar: 'بينيفينتو' },
  bergamo: { en: 'Bergamo', ar: 'بيرغامو' },
  bologna: { en: 'Bologna', ar: 'بولونيا' },
  bolzano: { en: 'Bolzano', ar: 'بولزانو' },
  brescia: { en: 'Brescia', ar: 'بريشا' },
  cagliari: { en: 'Cagliari', ar: 'كالياري' },
  camerino: { en: 'Camerino', ar: 'كاميرينو' },
  campobasso: { en: 'Campobasso', ar: 'كامبوباسو' },
  casamassima: { en: 'Casamassima', ar: 'كازاماسيما' },
  caserta: { en: 'Caserta', ar: 'كازيرتا' },
  cassino: { en: 'Cassino', ar: 'كاسينو' },
  castellanza: { en: 'Castellanza', ar: 'كاستيلانتسا' },
  catania: { en: 'Catania', ar: 'كاتانيا' },
  catanzaro: { en: 'Catanzaro', ar: 'كاتانزارو' },
  chieti: { en: 'Chieti', ar: 'كييتي' },
  enna: { en: 'Enna', ar: 'إينا' },
  ferrara: { en: 'Ferrara', ar: 'فيرارا' },
  firenze: { en: 'Florence', ar: 'فلورنسا' },
  foggia: { en: 'Foggia', ar: 'فودجا' },
  genova: { en: 'Genoa', ar: 'جنوة' },
  laquila: { en: "L'Aquila", ar: 'لاكويلا' },
  lecce: { en: 'Lecce', ar: 'ليتشي' },
  macerata: { en: 'Macerata', ar: 'ماتشيراتا' },
  messina: { en: 'Messina', ar: 'ميسينا' },
  milano: { en: 'Milan', ar: 'ميلانو' },
  modena: { en: 'Modena', ar: 'مودينا' },
  napoli: { en: 'Naples', ar: 'نابولي' },
  padova: { en: 'Padua', ar: 'بادوفا' },
  palermo: { en: 'Palermo', ar: 'باليرمو' },
  parma: { en: 'Parma', ar: 'بارما' },
  pavia: { en: 'Pavia', ar: 'بافيا' },
  perugia: { en: 'Perugia', ar: 'بيروجيا' },
  'pieve-emanuele': { en: 'Pieve Emanuele', ar: 'بييفي إيمانويلي' },
  pisa: { en: 'Pisa', ar: 'بيزا' },
  pollenzo: { en: 'Pollenzo (Bra)', ar: 'بولّنتسو (برا)' },
  potenza: { en: 'Potenza', ar: 'بوتنزا' },
  pozzilli: { en: 'Pozzilli', ar: 'بوتسيلّي' },
  'reggio-calabria': { en: 'Reggio Calabria', ar: 'ريدجو كالابريا' },
  rende: { en: 'Rende', ar: 'ريندي' },
  roma: { en: 'Rome', ar: 'روما' },
  salerno: { en: 'Salerno', ar: 'ساليرنو' },
  sassari: { en: 'Sassari', ar: 'ساساري' },
  siena: { en: 'Siena', ar: 'سيينا' },
  teramo: { en: 'Teramo', ar: 'تيرامو' },
  torino: { en: 'Turin', ar: 'تورينو' },
  trento: { en: 'Trento', ar: 'ترينتو' },
  trieste: { en: 'Trieste', ar: 'تريستي' },
  udine: { en: 'Udine', ar: 'أوديني' },
  urbino: { en: 'Urbino', ar: 'أوربينو' },
  varese: { en: 'Varese', ar: 'فاريزي' },
  venezia: { en: 'Venice', ar: 'البندقية' },
  vercelli: { en: 'Vercelli', ar: 'فيرتشيلي' },
  verona: { en: 'Verona', ar: 'فيرونا' },
  viterbo: { en: 'Viterbo', ar: 'فيتربو' },
} satisfies Labels;

export const regions = {
  abruzzo: { en: 'Abruzzo', ar: 'أبروتسو' },
  basilicata: { en: 'Basilicata', ar: 'بازيليكاتا' },
  calabria: { en: 'Calabria', ar: 'كالابريا' },
  campania: { en: 'Campania', ar: 'كامبانيا' },
  'emilia-romagna': { en: 'Emilia-Romagna', ar: 'إميليا رومانيا' },
  'friuli-venezia-giulia': { en: 'Friuli Venezia Giulia', ar: 'فريولي فينيتسيا جوليا' },
  lazio: { en: 'Lazio', ar: 'لاتسيو' },
  liguria: { en: 'Liguria', ar: 'ليغوريا' },
  lombardia: { en: 'Lombardy', ar: 'لومبارديا' },
  marche: { en: 'Marche', ar: 'ماركي' },
  molise: { en: 'Molise', ar: 'موليزي' },
  piemonte: { en: 'Piedmont', ar: 'بيدمونت' },
  puglia: { en: 'Apulia', ar: 'بوليا' },
  sardegna: { en: 'Sardinia', ar: 'سردينيا' },
  sicilia: { en: 'Sicily', ar: 'صقلية' },
  toscana: { en: 'Tuscany', ar: 'توسكانا' },
  'trentino-alto-adige': { en: 'Trentino-Alto Adige', ar: 'ترينتينو ألتو أديجي' },
  umbria: { en: 'Umbria', ar: 'أومبريا' },
  'valle-d-aosta': { en: "Aosta Valley", ar: 'وادي أوستا' },
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
