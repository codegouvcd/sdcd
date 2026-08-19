/**
 * Pied de page officiel complet : filet tricolore, bloc-marque + devise,
 * liens institutionnels en gras (sites .gouv.cd), colonnes de liens,
 * rangée des 6 langues, rangée légale avec drapeau, mention de licence.
 * @startingPoint section="Écrans" subtitle="Pied de page officiel" viewport="1200x420"
 */
export interface FooterProps {
  /** Intitulé de l'entité (ex. « Ministère du Numérique — numerique.gouv.cd »). */
  entite?: string;
  /** Phrase de description sous la marque (défaut : texte générique gouv.cd). */
  description?: string;
  colonnes?: Array<{titre: string; liens: string[]}>;
  /** Liens institutionnels en gras : paires [libellé, href]. Défaut : gouv.cd, présidence, primature, JO, données. */
  liensInstitutionnels?: Array<[string, string]>;
  /** Rangée légale (défaut : plan du site, accessibilité, mentions, données perso, cookies). */
  legal?: string[];
  assetsBase?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Footer(props: FooterProps): JSX.Element;