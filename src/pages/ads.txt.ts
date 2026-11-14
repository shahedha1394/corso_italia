import type { APIRoute } from 'astro';
import { adsense } from '../config/site';

// https://corsoitaly.com/ads.txt – lists Google as the only seller allowed to sell ads on this site.
export const GET: APIRoute = () => {
  const pub = adsense.client.replace(/^ca-/, '');
  const body = pub
    ? `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`
    : '# This site does not show ads yet.\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
