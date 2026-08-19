/** Paramètres d'affichage : clair / sombre / système — applique data-theme à la racine du document. */
export interface DisplayProps { valeur?: 'clair'|'sombre'|'systeme'; onChange?: (mode:string)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Display(props: DisplayProps): JSX.Element;