# Signal — Telecom Retention Intelligence

An interactive, portfolio-ready dashboard exploring telecom churn, customer survival, recurring revenue at risk, lifetime value, and service usage.

**Live demo:** [Open Signal](https://patelpreet404-alt.github.io/telecom-churn-analytics/)
**Source code:** [GitHub repository](https://github.com/patelpreet404-alt/telecom-churn-analytics)

## Dashboard

Signal brings the headline portfolio numbers and deeper customer views into one responsive workspace:

- Subscriber, churn, retention, monthly recurring revenue, and revenue-at-risk summaries
- Revenue and churn trends with selectable time ranges
- Contract comparison and early-tenure survival analysis
- Signup cohort retention and service mix
- Searchable customer risk list with a detail drawer and contract filters
- CSV exports for the visible sample customers and portfolio summary

## Try it locally

Requirements: Node.js 20.9 or later.

```sh
npm install
npm run dev
```

Open the local URL printed by Next.js. The dashboard runs without an API key or database.

## Data note

This is an interactive demonstration built from representative sample values and customer profiles. It is not connected to a source database or live subscriber data. The 7,043 subscriber story, churn comparisons, and early-tenure risk framing follow the supplied resume brief; displayed values have not been independently reproduced from a verified source dataset. Treat them as illustrative until the project details and analysis outputs are confirmed.

The portfolio metrics and copy are centralized in `app/page.tsx` for easy revision when verified project results are available.

## Deploy preview

GitHub Actions builds the static site and publishes it to GitHub Pages whenever `main` changes. The public demo link above becomes available after the first Pages workflow completes successfully. To check build progress, open the repository's **Actions** tab.

## Built with

Next.js, React, TypeScript, and custom responsive CSS. The dashboard is exported as a static site for GitHub Pages.
