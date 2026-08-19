/**
 * En-tête officiel : filet tricolore, bandeau « site officiel », marque d’État, nav soulignée.
 * @startingPoint section="Écrans" subtitle="En-tête officiel avec marque d’État" viewport="1200x220"
 */
export interface HeaderProps {
  /** Intitulé de l’entité (ex. « Ministère du Numérique »). Omis = portail national. */
  entite?: string;
  /** Sous-titre (ex. « numerique.gouv.cd »). */
  sousTitre?: string;
  nav?: string[];
  actif?: number;
  onNav?: (index: number) => void;
  /** Afficher le bouton « Se connecter ». */
  connexion?: boolean;
  /** Préfixe des chemins d’assets (ex. '../../'). */
  assetsBase?: string;
  lang?: string;
  onLang?: (code: string) => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Header(props: HeaderProps): JSX.Element;