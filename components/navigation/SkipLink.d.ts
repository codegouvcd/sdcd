/** Lien d'évitement (accessibilité) : invisible jusqu'au focus clavier, premier élément de la page. */
export interface SkipLinkProps { cible?: string; libelle?: string; className?: string;
  style?: React.CSSProperties; }
export declare function SkipLink(props: SkipLinkProps): JSX.Element;