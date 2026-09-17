# Tyls Charitable Foundation SEO foundation

This document records the technical SEO baseline for the current `modernsite/` implementation. The legacy `/site` directory is outside this architecture and was not reviewed or changed.

## Page metadata

Each public HTML page in `modernsite/` has one page-specific title and meta description. The same page-specific values are used for the Open Graph title and description and the Twitter title and description. Canonical URLs use the production domain, `https://tylsfoundation.org/`, so previews do not become alternate canonical versions.

The selected social preview image is the existing `modernsite/assets/image1.png`, served as `https://tylsfoundation.org/assets/image1.png`. It is an existing TCF food-support image; no new or invented image asset was added.

## Structured data

The homepage includes one JSON-LD `NGO` entity with the organization name, production URL, a supported description, and New Hampshire as the area served. The markup intentionally omits unsupported details such as a logo, postal address, telephone number, donation identifiers, and social profile URLs.

## Crawl controls and discovery

- `modernsite/sitemap.xml` lists the 12 primary public HTML URLs and excludes the public site-map page, partials, review material, support notes, and the deleted volunteer page. `site-map.html` remains public and indexable.
- `modernsite/robots.txt` allows public pages and blocks internal partials and support material. It points crawlers to the production sitemap.
- No `noindex` meta directives were added to public pages; they remain indexable.

## Page and accessibility checks

The public root pages were reviewed for one logical H1, heading order, image alt text, local links, and local image references. The homepage and partner page now provide visually hidden H1/H2 context so the existing visual layout remains unchanged. Navigation, footer includes, Formspree handling, Zeffy donation embeds, and existing page styling were preserved.

## Vercel previews

This pass did not change Vercel configuration. Because canonical URLs deliberately point to production, preview deployments should be protected from indexing in Vercel or at the deployment layer if previews are not intended to appear in search. A deployment-level `X-Robots-Tag: noindex` or preview authentication is the appropriate follow-up; do not add speculative site behavior in page HTML.

## Future recommendations

- Add a TCF-specific favicon and Apple touch icon when an approved brand mark is available.
- Create an approved 1200×630 social preview image if the existing food-support photo is not the desired share image.
- If verified organization details become available, extend the homepage JSON-LD with only those confirmed values.

## Release checklist

For a new public page, add a unique title and description, canonical URL, Open Graph and Twitter fields, one logical H1, descriptive image alt text, a sitemap entry, and a review of local links. Keep production canonical URLs stable across Vercel previews, preserve functional integrations, and validate the generated page before promotion.
