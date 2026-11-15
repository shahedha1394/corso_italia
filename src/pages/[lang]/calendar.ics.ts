// Subscription feed: /<lang>/calendar.ics lists every upcoming deadline. Calendar apps that
// subscribe to it pick up new deadlines by themselves (the site rebuilds every morning).
import type { APIRoute } from 'astro';
import { getStaticLangPaths, useTranslations, type Lang } from '../../i18n';
import { buildCalendar } from '../../lib/ics';
import { getUpcomingDeadlines } from '../../lib/content';

export const getStaticPaths = getStaticLangPaths;

export const GET: APIRoute = async ({ params }) => {
  const lang = params.lang as Lang;
  const t = useTranslations(lang);
  const body = buildCalendar(await getUpcomingDeadlines(), lang, {
    name: `${t('site.name')} · ${t('calendar.title')}`,
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
