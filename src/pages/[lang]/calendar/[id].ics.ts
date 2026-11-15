// One calendar file per deadline: /<lang>/calendar/<deadline>.ics, for the "Apple / Outlook" button.
import type { APIRoute } from 'astro';
import type { CollectionEntry } from 'astro:content';
import { langs, useTranslations, type Lang } from '../../../i18n';
import { buildCalendar } from '../../../lib/ics';
import { getUpcomingDeadlines } from '../../../lib/content';

export async function getStaticPaths() {
  const deadlines = await getUpcomingDeadlines();
  return langs.flatMap((lang) => deadlines.map((d) => ({ params: { lang, id: d.id }, props: { deadline: d } })));
}

export const GET: APIRoute = ({ params, props }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const deadline = props.deadline as CollectionEntry<'deadlines'>;
  const body = buildCalendar([deadline], lang, {
    name: t('site.name'),
    officialLabel: t('calendar.official'),
    reminders: {
      week: t('calendar.ics.inAWeek'),
      day: t('calendar.ics.tomorrow'),
      month: t('calendar.ics.inAMonth'),
      opens: t('calendar.ics.opens'),
    },
  });
  return new Response(body, { headers: { 'Content-Type': 'text/calendar; charset=utf-8' } });
};
