// Fixed lists used across the site. Each key has an English, an Arabic and a French label.
// To add a city or area, add it here; the content schema only accepts keys listed here.

type Labels = Record<string, { en: string; ar: string; fr: string }>;

export const cities = {
  ancona: { en: 'Ancona', ar: 'أنكونا', fr: 'Ancône' },
  aosta: { en: 'Aosta', ar: 'أوستا', fr: 'Aoste' },
  bari: { en: 'Bari', ar: 'باري', fr: 'Bari' },
  benevento: { en: 'Benevento', ar: 'بينيفينتو', fr: 'Bénévent' },
  bergamo: { en: 'Bergamo', ar: 'بيرغامو', fr: 'Bergame' },
  bologna: { en: 'Bologna', ar: 'بولونيا', fr: 'Bologne' },
  bolzano: { en: 'Bolzano', ar: 'بولزانو', fr: 'Bolzano' },
  brescia: { en: 'Brescia', ar: 'بريشا', fr: 'Brescia' },
  cagliari: { en: 'Cagliari', ar: 'كالياري', fr: 'Cagliari' },
  camerino: { en: 'Camerino', ar: 'كاميرينو', fr: 'Camerino' },
  campobasso: { en: 'Campobasso', ar: 'كامبوباسو', fr: 'Campobasso' },
  casamassima: { en: 'Casamassima', ar: 'كازاماسيما', fr: 'Casamassima' },
  caserta: { en: 'Caserta', ar: 'كازيرتا', fr: 'Caserte' },
  cassino: { en: 'Cassino', ar: 'كاسينو', fr: 'Cassino' },
  castellanza: { en: 'Castellanza', ar: 'كاستيلانتسا', fr: 'Castellanza' },
  catania: { en: 'Catania', ar: 'كاتانيا', fr: 'Catane' },
  catanzaro: { en: 'Catanzaro', ar: 'كاتانزارو', fr: 'Catanzaro' },
  chieti: { en: 'Chieti', ar: 'كييتي', fr: 'Chieti' },
  enna: { en: 'Enna', ar: 'إينا', fr: 'Enna' },
  ferrara: { en: 'Ferrara', ar: 'فيرارا', fr: 'Ferrare' },
  firenze: { en: 'Florence', ar: 'فلورنسا', fr: 'Florence' },
  foggia: { en: 'Foggia', ar: 'فودجا', fr: 'Foggia' },
  genova: { en: 'Genoa', ar: 'جنوة', fr: 'Gênes' },
  laquila: { en: "L'Aquila", ar: 'لاكويلا', fr: "L'Aquila" },
  lecce: { en: 'Lecce', ar: 'ليتشي', fr: 'Lecce' },
  lucca: { en: 'Lucca', ar: 'لوكا', fr: 'Lucques' },
  macerata: { en: 'Macerata', ar: 'ماتشيراتا', fr: 'Macerata' },
  messina: { en: 'Messina', ar: 'ميسينا', fr: 'Messine' },
  milano: { en: 'Milan', ar: 'ميلانو', fr: 'Milan' },
  modena: { en: 'Modena', ar: 'مودينا', fr: 'Modène' },
  napoli: { en: 'Naples', ar: 'نابولي', fr: 'Naples' },
  novedrate: { en: 'Novedrate', ar: 'نوفيدراتي', fr: 'Novedrate' },
  padova: { en: 'Padua', ar: 'بادوفا', fr: 'Padoue' },
  palermo: { en: 'Palermo', ar: 'باليرمو', fr: 'Palerme' },
  parma: { en: 'Parma', ar: 'بارما', fr: 'Parme' },
  pavia: { en: 'Pavia', ar: 'بافيا', fr: 'Pavie' },
  perugia: { en: 'Perugia', ar: 'بيروجيا', fr: 'Pérouse' },
  'pieve-emanuele': { en: 'Pieve Emanuele', ar: 'بييفي إيمانويلي', fr: 'Pieve Emanuele' },
  pisa: { en: 'Pisa', ar: 'بيزا', fr: 'Pise' },
  pollenzo: { en: 'Pollenzo (Bra)', ar: 'بولّنتسو (برا)', fr: 'Pollenzo (Bra)' },
  potenza: { en: 'Potenza', ar: 'بوتنزا', fr: 'Potenza' },
  pozzilli: { en: 'Pozzilli', ar: 'بوتسيلّي', fr: 'Pozzilli' },
  'reggio-calabria': { en: 'Reggio Calabria', ar: 'ريدجو كالابريا', fr: 'Reggio de Calabre' },
  rende: { en: 'Rende', ar: 'ريندي', fr: 'Rende' },
  roma: { en: 'Rome', ar: 'روما', fr: 'Rome' },
  salerno: { en: 'Salerno', ar: 'ساليرنو', fr: 'Salerne' },
  sassari: { en: 'Sassari', ar: 'ساساري', fr: 'Sassari' },
  siena: { en: 'Siena', ar: 'سيينا', fr: 'Sienne' },
  teramo: { en: 'Teramo', ar: 'تيرامو', fr: 'Teramo' },
  torino: { en: 'Turin', ar: 'تورينو', fr: 'Turin' },
  'torrevecchia-teatina': { en: 'Torrevecchia Teatina', ar: 'توريفيكيا تياتينا', fr: 'Torrevecchia Teatina' },
  trento: { en: 'Trento', ar: 'ترينتو', fr: 'Trente' },
  trieste: { en: 'Trieste', ar: 'تريستي', fr: 'Trieste' },
  udine: { en: 'Udine', ar: 'أوديني', fr: 'Udine' },
  urbino: { en: 'Urbino', ar: 'أوربينو', fr: 'Urbino' },
  varese: { en: 'Varese', ar: 'فاريزي', fr: 'Varese' },
  venezia: { en: 'Venice', ar: 'البندقية', fr: 'Venise' },
  vercelli: { en: 'Vercelli', ar: 'فيرتشيلي', fr: 'Verceil' },
  verona: { en: 'Verona', ar: 'فيرونا', fr: 'Vérone' },
  viterbo: { en: 'Viterbo', ar: 'فيتربو', fr: 'Viterbe' },
} satisfies Labels;

export const regions = {
  abruzzo: { en: 'Abruzzo', ar: 'أبروتسو', fr: 'Abruzzes' },
  basilicata: { en: 'Basilicata', ar: 'بازيليكاتا', fr: 'Basilicate' },
  calabria: { en: 'Calabria', ar: 'كالابريا', fr: 'Calabre' },
  campania: { en: 'Campania', ar: 'كامبانيا', fr: 'Campanie' },
  'emilia-romagna': { en: 'Emilia-Romagna', ar: 'إميليا رومانيا', fr: 'Émilie-Romagne' },
  'friuli-venezia-giulia': { en: 'Friuli Venezia Giulia', ar: 'فريولي فينيتسيا جوليا', fr: 'Frioul-Vénétie Julienne' },
  lazio: { en: 'Lazio', ar: 'لاتسيو', fr: 'Latium' },
  liguria: { en: 'Liguria', ar: 'ليغوريا', fr: 'Ligurie' },
  lombardia: { en: 'Lombardy', ar: 'لومبارديا', fr: 'Lombardie' },
  marche: { en: 'Marche', ar: 'ماركي', fr: 'Marches' },
  molise: { en: 'Molise', ar: 'موليزي', fr: 'Molise' },
  piemonte: { en: 'Piedmont', ar: 'بيدمونت', fr: 'Piémont' },
  puglia: { en: 'Apulia', ar: 'بوليا', fr: 'Pouilles' },
  sardegna: { en: 'Sardinia', ar: 'سردينيا', fr: 'Sardaigne' },
  sicilia: { en: 'Sicily', ar: 'صقلية', fr: 'Sicile' },
  toscana: { en: 'Tuscany', ar: 'توسكانا', fr: 'Toscane' },
  'trentino-alto-adige': { en: 'Trentino-Alto Adige', ar: 'ترينتينو ألتو أديجي', fr: 'Trentin-Haut-Adige' },
  umbria: { en: 'Umbria', ar: 'أومبريا', fr: 'Ombrie' },
  'valle-d-aosta': { en: "Aosta Valley", ar: 'وادي أوستا', fr: "Vallée d'Aoste" },
  veneto: { en: 'Veneto', ar: 'فينيتو', fr: 'Vénétie' },
} satisfies Labels;

// University types, as grouped by the Ministry of University and Research (MUR).
export const universityTypes = {
  public: { en: 'Public university', ar: 'جامعة حكومية', fr: 'Université publique' },
  private: { en: 'Non-state university', ar: 'جامعة غير حكومية', fr: 'Université non étatique' },
  special: { en: 'Special-status institute', ar: 'معهد جامعي ذو نظام خاص', fr: 'Institut à statut spécial' },
  online: { en: 'Online university', ar: 'جامعة عبر الإنترنت', fr: 'Université en ligne' },
} satisfies Labels;

// Broad study areas, used to describe what each university teaches.
export const areas = {
  engineering: { en: 'Engineering', ar: 'الهندسة', fr: 'Ingénierie' },
  'architecture-design': { en: 'Architecture and design', ar: 'العمارة والتصميم', fr: 'Architecture et design' },
  'computer-science': { en: 'Computer science and IT', ar: 'علوم الحاسوب وتقنية المعلومات', fr: 'Informatique' },
  sciences: { en: 'Natural sciences and mathematics', ar: 'العلوم الطبيعية والرياضيات', fr: 'Sciences naturelles et mathématiques' },
  'medicine-health': { en: 'Medicine and health', ar: 'الطب والصحة', fr: 'Médecine et santé' },
  'economics-business': { en: 'Economics and business', ar: 'الاقتصاد والأعمال', fr: 'Économie et gestion' },
  law: { en: 'Law', ar: 'القانون', fr: 'Droit' },
  'politics-social': { en: 'Political and social sciences', ar: 'العلوم السياسية والاجتماعية', fr: 'Sciences politiques et sociales' },
  humanities: { en: 'Humanities and languages', ar: 'العلوم الإنسانية واللغات', fr: 'Lettres et langues' },
  'agriculture-veterinary': { en: 'Agriculture and veterinary', ar: 'الزراعة والطب البيطري', fr: 'Agriculture et médecine vétérinaire' },
} satisfies Labels;

export const fundingTypes = {
  government: { en: 'Italian government', ar: 'الحكومة الإيطالية', fr: 'Gouvernement italien' },
  regional_dsu: { en: 'Regional (DSU)', ar: 'إقليمية (DSU)', fr: 'Régionale (DSU)' },
  university: { en: 'University', ar: 'الجامعة', fr: 'Université' },
  external: { en: 'Other organisations', ar: 'جهات أخرى', fr: 'Autres organismes' },
} satisfies Labels;

export const opportunityTypes = {
  workshop: { en: 'Workshop', ar: 'ورشة عمل', fr: 'Atelier' },
  teaching_session: { en: 'Teaching session', ar: 'جلسة تعليمية', fr: 'Séance de cours' },
  scholarship_call: { en: 'Scholarship call', ar: 'إعلان منحة', fr: 'Appel à bourses' },
  other: { en: 'Other', ar: 'أخرى', fr: 'Autre' },
} satisfies Labels;

export const deadlineTypes = {
  application: { en: 'University application', ar: 'التقديم للجامعة', fr: "Candidature à l'université" },
  pre_enrolment: { en: 'Universitaly pre-enrolment', ar: 'التسجيل المسبق على Universitaly', fr: 'Préinscription Universitaly' },
  test: { en: 'Admission test', ar: 'اختبار القبول', fr: "Test d'admission" },
  scholarship: { en: 'Scholarship', ar: 'منحة', fr: 'Bourse' },
  visa: { en: 'Visa', ar: 'التأشيرة', fr: 'Visa' },
  other: { en: 'Other', ar: 'أخرى', fr: 'Autre' },
} satisfies Labels;

export const modes = {
  online: { en: 'Online', ar: 'عبر الإنترنت', fr: 'En ligne' },
  in_person: { en: 'In person', ar: 'حضوري', fr: 'En présentiel' },
} satisfies Labels;

export const videoCategories = {
  study: { en: 'Studying and applying', ar: 'الدراسة والتقديم', fr: 'Études et candidature' },
  papers: { en: 'Visa and paperwork', ar: 'التأشيرة والأوراق الرسمية', fr: 'Visa et démarches' },
  life: { en: 'Daily life and vlogs', ar: 'الحياة اليومية والفلوغات', fr: 'Vie quotidienne et vlogs' },
  engpro: { en: 'EngPro and English', ar: 'EngPro والإنجليزية', fr: 'EngPro et anglais' },
  stories: { en: 'Student stories', ar: 'تجارب الطلاب', fr: "Témoignages d'étudiants" },
  about: { en: 'About Corso Italy', ar: 'عن Corso Italy', fr: 'À propos de Corso Italy' },
} satisfies Labels;

export const cefrLevels = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

export const skills = {
  speaking: { en: 'Speaking', ar: 'المحادثة', fr: 'Expression orale' },
  listening: { en: 'Listening', ar: 'الاستماع', fr: 'Compréhension orale' },
  reading: { en: 'Reading', ar: 'القراءة', fr: 'Lecture' },
  writing: { en: 'Writing', ar: 'الكتابة', fr: 'Écriture' },
  grammar: { en: 'Grammar', ar: 'القواعد', fr: 'Grammaire' },
  vocabulary: { en: 'Vocabulary', ar: 'المفردات', fr: 'Vocabulaire' },
  exam: { en: 'Exam preparation', ar: 'التحضير للاختبارات', fr: 'Préparation aux examens' },
  general: { en: 'All skills', ar: 'جميع المهارات', fr: 'Toutes les compétences' },
} satisfies Labels;

export function keysOf<T extends object>(obj: T) {
  return Object.keys(obj) as [keyof T & string, ...(keyof T & string)[]];
}
