# Excite Capital Website — v2 Design Note

**Status:** Confidential draft for internal review. Not published. Open `index.html` locally; access password is `excite`.
**Location:** `Work/Excite/projects/website-v2/` (built alongside the original draft at `Workspace/Excite-Capital-Site/`, which is untouched).

---

## What this version is

A ground-up rebuild that keeps the strongest ideas from the first draft but resets the experience from "pitch deck stretched into a long scroll" into web-native, diligence-ready modules. It follows the Excite corporate style guide tokens and the messaging/compliance rules in the knowledgebase.

## How it differs from the current draft

**1. Mixed mode, light-led (~65% light / 35% dark).**
The previous draft was dark and cinematic throughout. This version uses warm off-white (`#F7F7F4`/`#FFFFFF`) as the default information architecture for reading-heavy sections (strategy, problem, thesis, fund, team) and reserves the dark plum "technology chamber" for the hero, the technology/model visuals, the evidence module, and the final investor-access section. Dark is now a premium accent language, not the whole site.

**2. Typography reset — calmer, less all-caps.**
Dropped the condensed all-caps display face (Oswald). Titles are now **Source Serif 4** in sentence case for research-led institutional gravitas (benchmarked to AQR / Bridgewater / Man), and body/UI is **Inter** for clean readability (Two Sigma / D. E. Shaw / Aladdin). All-caps is now reserved for small eyebrows and labels only. *(Note: the brand guide leans sans-serif; the serif headline is a deliberate choice to hit the "research lab" benchmarks — easy to swap back to all-Inter if you prefer.)*

**3. Web-native modules instead of a deck scroll.**
Nine clearly delineated sections with numbered section markers, stronger hierarchy, shorter decision points, and scannable feature/stat/framework grids rather than slide-after-slide. The argument in "The problem" and "The thesis" is tightened and de-theatricalized — the rearview-mirror dramatization is gone; the lag is shown as one quiet diagram.

**4. Institutional CTAs.**
"Trade the Future" is removed. Primary CTAs are now **Request investor materials**, **View strategy overview**, **Request access**, and **Discuss the strategy**.

**5. Hero softened, not weakened.**
"The market is no longer human." is kept (memorable, deck-derived) but set in calm serif sentence case and immediately paired with an institutional subhead. The intense phrasing is not repeated downstream. The background motif is a restrained, contained signal-line animation (muted market line + orange estimate) that never leaves blank zones.

**6. Diligence-grade compliance treatment.**
- The evidence/proof module is explicitly framed as **state-estimate tracking accuracy, not returns**, carries a visible "For discussion · pending compliance review" flag, and a full source/disclaimer footnote.
- Fund terms are labeled **indicative** and **qualified in their entirety by the Offering Documents**; capacity ($20B) is labeled **illustrative/derived**.
- A complete Important Notice sits in the footer; the whole site remains behind the access gate.
- No performance, return, AUM, backtest, or LP-name claims were invented. All substantive content is drawn from the existing deck/draft source material, per `restricted_claims.md` and the messaging guideline.

**7. Executive-grade team section.**
Replaced the grid of oversized portraits with an editorial layout: small grayscale portraits (color on hover) beside name, role, and a one-line credential; advisory board as a compact credential row; affiliations as a quiet logo bar.

## Brand tokens used (from `EXCITE_CORPORATE_STYLE_GUIDE.md`)
Orange `#FF3B12` / `#FF3400` / deep `#D93616`; plum-black `#1A1224`, panel `#241828`, rule `#35243B`; light `#FFFFFF` / `#F7F7F4` / `#F4F4F1`; text `#111111` / `#555555`. Orange is used only for eyebrows, accents, key signals, and the primary CTA.

## Verification
- Rendered and checked at desktop (1440), tablet (820), and mobile (390).
- Zero horizontal overflow at all three widths; no console/page errors.
- Reveal animations have a load-time failsafe so content is never hidden in full-page renders or for users without JS.
- Contrast, heading clipping, and chart rendering verified by screenshot.

## Open items for your review / sign-off
- **Compliance:** the evidence charts and indicative fund terms need Frank Castro / Josh Becker sign-off before any external use. They are flagged in-page as pending.
- **Serif headline:** deliberate deviation from the sans-only brand guide — confirm or I revert to all-Inter.
- **Logo:** the wordmark/mark are reconstructed from deck assets; drop a final logo file into `assets/` to swap.
- Not deployed anywhere. When ready for a private demo, it can be pushed to a gated host — pending your go-ahead (no external publishing without confirmation).
