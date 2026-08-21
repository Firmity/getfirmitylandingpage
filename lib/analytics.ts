/**
 * Thin wrapper around the GTM dataLayer push.
 *
 * Kept isolated so every call site is typed and every push is
 * defensive against dataLayer not existing yet (ad blockers, GTM not
 * loaded, SSR). Never throws — analytics must never break the UI.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type SurveyFormSubmitEvent = {
  event: "survey_form_submit";
  form_name: "facility_health_survey";
  property_type: string;
  city: string;
};

export function pushDataLayerEvent(payload: SurveyFormSubmitEvent): void {
  if (typeof window === "undefined") return;

  try {
    window.dataLayer = window.dataLayer ?? [];
    window.dataLayer.push(payload);
  } catch (err) {
    // [ANALYTICS_ERR] — never let a broken dataLayer break the form UX.
    console.error("[ANALYTICS_ERR] dataLayer push failed", err);
  }
}
