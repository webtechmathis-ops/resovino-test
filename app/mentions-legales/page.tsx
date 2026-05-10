import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Mentions légales — ResoVino",
  description:
    "Mentions légales du site ResoVino : éditeur, hébergeur, propriété intellectuelle, cookies, données personnelles.",
  robots: { index: false, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <div className="container-page py-12">
      <Breadcrumbs
        items={[{ name: "Accueil", href: "/" }, { name: "Mentions légales" }]}
      />

      <article className="prose prose-vino mx-auto mt-8 max-w-3xl">
        <h1 className="font-display text-4xl font-semibold md:text-5xl">Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>Site :</strong> resovino.fr
          <br />
          <strong>Responsable de publication :</strong> informations personnelles non divulguées
          (whois privé)
          <br />
          <strong>Localisation :</strong> Paris, France
        </p>

        <h2>Hébergement</h2>
        <p>
          Hostinger International UAB
          <br />
          61 Lordou Vironos str., 6023 Larnaca, Chypre
          <br />
          <a href="https://www.hostinger.fr" target="_blank" rel="noopener noreferrer">
            https://www.hostinger.fr
          </a>
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu de ce site (textes, images, structure) est protégé par le droit
          d'auteur. Toute reproduction sans autorisation est interdite.
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site utilise uniquement des cookies essentiels au fonctionnement technique. Aucun
          cookie publicitaire ou de tracking tiers n'est déposé. Aucune donnée personnelle n'est
          collectée ni transmise à des tiers.
        </p>

        <h2>Données personnelles</h2>
        <p>
          Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de
          suppression de vos données. Contact via le formulaire du site.
        </p>

        <h2>Mention alcool</h2>
        <p>
          L'abus d'alcool est dangereux pour la santé. À consommer avec modération. La vente
          d'alcool est interdite aux mineurs de moins de 18 ans.
        </p>
      </article>
    </div>
  );
}
