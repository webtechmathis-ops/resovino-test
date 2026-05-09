# ResoVino — Blog vin francophone

Blog SSG Next.js 14 (App Router) sur le vin. Objectif : 50k visites/mois via SEO + GEO. Domaine : resovino.fr

## Stack

- Next.js 14 App Router + TypeScript strict
- MDX pour les articles (fichiers dans `/content/`)
- Tailwind CSS v4 + fonts custom (pas Inter/Roboto/Arial)
- Vercel deploy (output: static export)
- Node 20+, pnpm

## Commandes

- `pnpm dev` : dev server port 3000
- `pnpm build` : build prod
- `pnpm lint` : ESLint
- `pnpm format` : Prettier

## Architecture

```
/app                    → pages & layouts (App Router)
/app/blog/[slug]        → article dynamique
/app/[category]/page    → page catégorie
/components             → composants UI réutilisables
/content/articles/      → fichiers .mdx (1 par article)
/content/data/          → JSON data (régions, cépages, etc.)
/lib                    → utils, MDX config, SEO helpers
/public                 → images, fonts, llms.txt, robots.txt
/styles                 → global CSS + Tailwind config
```

## Catégories du blog (slugs)

- `guide-debutant` — cours œnologie, types de vins, noter un vin, acheter
- `regions` — Bordeaux, Bourgogne, Champagne, Rhône, Loire, Alsace, Provence, Languedoc, Sud-Ouest, Jura, Savoie, Corse
- `cepages` — Cabernet Sauvignon, Merlot, Pinot Noir, Chardonnay, Sauvignon Blanc, Syrah, Grenache, Riesling, Gamay, Chenin Blanc, Malbec, Viognier
- `accords` — fromage, chocolat, viande, poisson, desserts, apéritif, cuisine asiatique, cuisine italienne
- `grands-crus` — châteaux Bordeaux, domaines Bourgogne, maisons Champagne, classements
- `vins-du-monde` — Italie, Espagne, Argentine, Chili, Australie, USA, Afrique du Sud, vins naturels/bio

## Règles de contenu (CRITIQUE)

### SEO — chaque article DOIT avoir :
- Frontmatter MDX complet : title, description (155 chars max), keywords[], category, author, date, readingTime, image, imageAlt
- 1 seul H1 (= title)
- H2 structurés pour featured snippets (questions type PAA quand pertinent)
- Liens internes vers 3-5 autres articles ResoVino minimum
- Schema.org JSON-LD : BlogPosting + FAQPage si FAQ présente
- Meta description unique et optimisée (pas de duplicate)
- URL propre : `/blog/[slug]` avec slug descriptif

### GEO — chaque article DOIT avoir :
- Bloc "Résumé rapide" en début d'article (TLDR renommé) — 40-60 mots, réponse directe
- Section FAQ en bas (3-5 questions PAA format) avec schema FAQPage
- Passages citables : blocs de 134-167 mots auto-suffisants que les LLMs peuvent extraire
- Entités nommées explicites (noms de domaines, appellations, cépages, régions)
- Langage factuel, pas de marketing vide — chaque affirmation doit être citable

### Format article type :
```mdx
---
title: "..."
description: "..."
keywords: ["...", "..."]
category: "..."
date: "YYYY-MM-DD"
readingTime: "X min"
image: "/images/..."
imageAlt: "..."
---

## Résumé rapide
[40-60 mots, réponse directe à l'intent de recherche]

## [H2 principal]
[contenu structuré, passages citables 134-167 mots]

## [H2 suivants...]

## Questions fréquentes
### [Question PAA 1] ?
[Réponse 40-60 mots]
### [Question PAA 2] ?
...
```

## Fichiers SEO/GEO à générer

- `/public/llms.txt` — index Markdown de tous les articles pour les LLMs
- `/public/robots.txt` — allow all + sitemap ref
- `/app/sitemap.ts` — sitemap XML dynamique
- `/app/feed.xml/route.ts` — RSS feed
- Schema JSON-LD dans chaque page (BlogPosting, FAQPage, Organization, BreadcrumbList)

## Design

- Thème vin : tons bordeaux/marsala + crème/ivoire + touches dorées
- Typographie : 1 display font distinctive (serif) + 1 body lisible (sans-serif)
- Dark mode supporté
- Mobile-first, responsive
- Animations subtiles au scroll (pas clinquant)
- UX : navigation par catégorie, recherche, temps de lecture, breadcrumbs
- Pas de design générique AI — chaque page doit avoir du caractère

## Règles Claude Code

- Utilise des subagents pour la génération en masse d'articles
- Commit séparé par fichier
- Ne génère JAMAIS de faux témoignages ou avis clients
- Vérifie le build après chaque changement (`pnpm build`)
- Tout le contenu en français
- Pas d'emojis dans les articles (OK dans UI)
- Images : utilise Unsplash URLs pour le dev, on remplacera plus tard

## Compaction

Quand tu compactes, TOUJOURS préserver :
- La liste complète des articles déjà générés
- Les commandes de build/test
- L'architecture des fichiers
- Les règles SEO/GEO ci-dessus
