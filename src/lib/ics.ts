// Calendar files (iCalendar, RFC 5545) for the deadlines calendar: one file per deadline
// and one feed per language that students can subscribe to. Built at build time, no server.
import type { CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n';

type Deadline = CollectionEntry<'deadlines'>;

const SITE_HOST = 'corsoitaly.com';

/** 2026-11-15 → 20261115 (deadlines are whole-day dates). */
export function icsDate(d: Date): string {
  return d.toISOString().slice(0, 10).replace(/-/g, '');
}

function nextDay(d: Date): Date {
  return new Date(d.getTime() + 24 * 60 * 60 * 1000);
}

function escapeText(s: string): string {
  return s.replace(/\\/g, '\\\\').replace(/;/g, '\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
}

/** Lines longer than 75 bytes are folded; never split a UTF-8 character (Arabic text). */
function fold(line: string): string {
  const encoder = new TextEncoder();
  const parts: string[] = [];
  let current = '';
  let bytes = 0;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    const limit = parts.length === 0 ? 75 : 74;
    if (bytes + size > limit) {
      parts.push(current);
      current = '';
      bytes = 0;
    }
    current += ch;
    bytes += size;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

function stamp(): string {
  return new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

export function deadlineDetails(d: Deadline, lang: Lang, officialLabel: string): string {
  const note = d.data.note?.[lang] ?? d.data.note?.en;
  return [note, `${officialLabel}: ${d.data.url}`].filter(Boolean).join('\n\n');
}

export type Reminders = { week: string; day: string; month: string; opens: string };

function alarm(trigger: string, text: string): string[] {
  return ['BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${escapeText(text)}`, `TRIGGER:${trigger}`, 'END:VALARM'];
}

/** When applications open (if the date is set and still ahead): a separate event, reminded a month before. */
function openingEvent(d: Deadline, lang: Lang, officialLabel: string, reminders: Reminders, now: Date): string[] {
  const opens = d.data.opens;
  if (!opens || opens < new Date(now.getFullYear(), now.getMonth(), now.getDate())) return [];
  const title = `${reminders.opens}: ${d.data.title[lang] ?? d.data.title.en}`;
  return [
    'BEGIN:VEVENT',
    `UID:${d.id}-opens-${lang}@${SITE_HOST}`,
    `DTSTAMP:${stamp()}`,
    `DTSTART;VALUE=DATE:${icsDate(opens)}`,
    `DTEND;VALUE=DATE:${icsDate(nextDay(opens))}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(deadlineDetails(d, lang, officialLabel))}`,
    `URL:${d.data.url}`,
    'TRANSP:TRANSPARENT',
    ...alarm('-P30D', `${reminders.month}: ${title}`),
    'END:VEVENT',
  ];
}

function event(d: Deadline, lang: Lang, officialLabel: string, reminders: Reminders): string[] {
  const title = d.data.title[lang] ?? d.data.title.en;
  return [
    'BEGIN:VEVENT',
    `UID:${d.id}-${lang}@${SITE_HOST}`,
    `DTSTAMP:${stamp()}`,
    `DTSTART;VALUE=DATE:${icsDate(d.data.date)}`,
    `DTEND;VALUE=DATE:${icsDate(nextDay(d.data.date))}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(deadlineDetails(d, lang, officialLabel))}`,
    `URL:${d.data.url}`,
    'TRANSP:TRANSPARENT',
    ...alarm('-P7D', `${reminders.week}: ${title}`),
    ...alarm('-P1D', `${reminders.day}: ${title}`),
    'END:VEVENT',
  ];
}

export function buildCalendar(
  deadlines: Deadline[],
  lang: Lang,
  opts: { name: string; officialLabel: string; reminders: Reminders },
  now = new Date(),
): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//Corso Italy//Deadlines ${lang}//EN`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${escapeText(opts.name)}`,
    'X-WR-TIMEZONE:Europe/Rome',
    // Ask subscribed calendar apps to check for new deadlines once a day.
    'REFRESH-INTERVAL;VALUE=DURATION:P1D',
    'X-PUBLISHED-TTL:P1D',
    ...deadlines.flatMap((d) => [
      ...openingEvent(d, lang, opts.officialLabel, opts.reminders, now),
      ...event(d, lang, opts.officialLabel, opts.reminders),
    ]),
    'END:VCALENDAR',
  ];
  return lines.map(fold).join('\r\n') + '\r\n';
}

/** "Add to Google Calendar" link for one deadline, or for its opening date when `opensPrefix` is given. */
export function googleCalendarLink(d: Deadline, lang: Lang, officialLabel: string, opensPrefix?: string): string {
  const day = opensPrefix && d.data.opens ? d.data.opens : d.data.date;
  const title = d.data.title[lang] ?? d.data.title.en;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: opensPrefix ? `${opensPrefix}: ${title}` : title,
    dates: `${icsDate(day)}/${icsDate(nextDay(day))}`,
    details: deadlineDetails(d, lang, officialLabel),
  });
  return `https://calendar.google.com/calendar/render?${params}`;
}
