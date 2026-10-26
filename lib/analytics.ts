/**
 * Thin wrapper around the GTM dataLayer push.
 *
 * Kept isolated so every call site is typed and every push is
 * defensive against dataLayer not existing yet (ad blockers, GTM not
 * loaded, SSR). Never throws: analytics must never break the UI.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

/** Legacy event from the previous health-assessment form. */
export type SurveyFormSubmitEvent = {
  event: "survey_form_submit";
  form_name: "facility_health_survey";
  property_type: string;
  city: string;
};

/** Fired once per successful contact request; use as the Google Ads conversion trigger. */
export type ContactFormSubmitEvent = {
  event: "contact_form_submit";
  form_name: "contact";
  form_location: "hero" | "closing";
  module_interest: string;
};

export type DataLayerEvent = SurveyFormSubmitEvent | ContactFormSubmitEvent;

export function pushDataLayerEvent(payload: DataLayerEvent): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  } catch (err) {
    // [ANALYTICS_ERR] never let a broken dataLayer break the form UX.
    console.error("[ANALYTICS_ERR] dataLayer push failed", err);
  }
}
