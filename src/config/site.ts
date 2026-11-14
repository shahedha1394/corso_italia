// Public links and services used across the site. Edit the values here; templates read them.
export const social = {
  instagram: 'https://www.instagram.com/shahedmah13/',
  // Channel ID link: keeps working if the @handle changes.
  youtube: 'https://www.youtube.com/channel/UCWbb-p1OAHiI-y2kqyz2Izw',
};

// Visitor counter (GoatCounter: no cookies, no personal data). Put the site code here,
// e.g. 'corsoitaly' for https://corsoitaly.goatcounter.com. Leave empty to turn it off.
export const goatcounter = 'corsoitaly';

// Google AdSense. Leave `client` empty to turn ads off everywhere (no script, no ad boxes).
// After AdSense approves the site, paste the publisher ID shown in AdSense, e.g. 'ca-pub-1234567890123456'.
// `slot`: the ID of a display ad unit created in AdSense (Ads → By ad unit). Leave empty to rely on Auto ads only.
// Ads load only on pages that allow them (see `adsAllowed` in src/layouts/Base.astro); guides listed in
// `noAdsGuides` never show ads, because their readers are in a difficult situation.
// Before turning ads on, set up the consent message for EEA/UK visitors in AdSense
// (Privacy & messaging → European regulations), so no ad cookie is set without consent.
export const adsense = {
  client: '',
  slot: '',
};
export const noAdsGuides = ['refugees-and-conflict-areas', 'palestinian-students', 'support-and-help'];
