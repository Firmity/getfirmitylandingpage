# GTM Setup — React

Same GTM container ID as the rest of firmity.in — do not create a new container. Replace `GTM-XXXXXXX` below with your real ID everywhere it appears.

## If using Vite or Create React App

Put the standard GTM snippet directly in `public/index.html` — NOT inside a React component. This is a static HTML file React mounts into, so it's the correct place for scripts that need to load before React itself does.

In `public/index.html`, inside `<head>`:
```html
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXXX');</script>
```

Right after the opening `<body>` tag:
```html
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
```

## If using Next.js

Use `next/script` in your root layout or `_app.js` — do not hand-write the snippet with `dangerouslySetInnerHTML` inside a component, it fights with Next's script loading and hydration.

```jsx
import Script from 'next/script';

<Script id="gtm-script" strategy="afterInteractive">
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','GTM-XXXXXXX');`}
</Script>
```

For the `<noscript>` iframe, add it directly in `app/layout.js` (App Router) or `pages/_document.js` (Pages Router), right after `<body>`.

## The form-submit event — same for both setups

`FirmityLandingPage.jsx` already pushes this event on successful form submit:
```js
window.dataLayer.push({
  event: 'survey_form_submit',
  form_name: 'facility_health_survey',
  property_type: form.ftype,
  city: form.fcity,
});
```

## Last step — inside GTM itself (not code)

1. Log in to GTM, open your existing container (same one as firmity.in).
2. Create a new **Trigger** → type: Custom Event → Event name: `survey_form_submit`.
3. Create a **GA4 Event Tag** (and/or Google Ads Conversion Tag) → fire on that trigger.
4. Publish the container version.

Without step 3–4, the event fires in the browser but nothing captures it — this is a common miss, don't skip it.
