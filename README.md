# Rheumatology Society, Mauritius: Official Website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Framer Motion · Lenis · cobe (WebGL globe) · lucide-react

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

Node 20+ required. Deploys as-is to Vercel (every page is statically pre-rendered).

## Pages (16)

| Route | Content |
|---|---|
| `/` | Hero with 3D globe, About, Mission & Vision, Journey timeline, PAFLAR 2027 feature, Education/Research, Awareness, International, Committee, Partnerships, News, Gallery, Contact |
| `/about` | Who we are, vision, mission, aims (pending), interactive timeline, future initiatives |
| `/committee` | Managing committee grid |
| `/education` | CPD, what we offer, educational calendar |
| `/research` | Registries, research, guidelines, Centre of Excellence, publications |
| `/awareness` | Awareness & advocacy, World Arthritis Day, 2024 paediatric campaign |
| `/international` | IRACON / EULAR / ACR / SFR participation, PAFLAR themes |
| `/partnerships` | Audiences, initiatives to support, enquiry form |
| `/news` | Featured story, news grid, upcoming events |
| `/gallery` | Filterable gallery with lightbox |
| `/contact` | Contact details + enquiry form (`?type=sponsorship` pre-selects) |
| `/paflar-2027` | Congress landing: hero, theme, PAFLAR, venue + map, programme, speakers, registration, sponsorship, delegate guides |
| `/paflar-2027/programme` | Day-by-day programme, speakers & faculty |
| `/paflar-2027/accommodation` | Host venue + filterable hotel list |
| `/paflar-2027/mauritius` | Welcome to Mauritius, highlights, things to explore |
| `/paflar-2027/travel` | Airport, transfers, weather, packing, delegate FAQ |

## Where to edit

- **All copy:** `lib/content.ts`. Change text there and every page updates.
- **All photos:** `lib/images.ts`. Currently representative Unsplash images; replace each URL with the Society's approved photographs (put files in `public/images/` and use `/images/...`).
- **Colours & fonts:** `app/globals.css` (`@theme` block).
- **Logo:** `public/brand/` (client-supplied file, displayed on a white tile to keep its original colours).

## Before launch (gold "Awaiting" tags on the site)

1. Constitution: formal aims & objectives
2. World Arthritis Day year (2017 or 2018)
3. Committee names, roles, biographies, photographs, public contacts
4. Status of future initiatives
5. **Congress theme:** PAFLAR's welcome page currently shows "Stronger Together For A Better Future"; this site uses the theme from the client brief. Confirm with organisers.
6. **Registration URL:** `mypaflar.org/congress?c=7th-paflar-congress` currently displays the 5th congress. Get the final link from organisers (`congress.links.main`).
7. Programme, speakers, sponsorship prospectus
8. Hotel category groupings (the official guide doesn't group them)
9. Visa / travel form / tourism tax: verify with official Mauritius government sources
10. Official email (`info@rheumatologysociety.org` is proposed) and contact form backend (`components/ContactForm.tsx`, TODO)
11. Approved photographs and image permissions
