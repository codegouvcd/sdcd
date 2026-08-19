/** Lien : variantes externe (nouvelle fenêtre), téléchargement (avec détail « PDF – 1,2 Mo »), icône, trois tailles. */
export interface LienProps { href?: string; children: React.ReactNode; externe?: boolean; telechargement?: boolean; detail?: string; icone?: string; taille?: 'sm'|'md'|'lg'; onClick?: (e:any)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Lien(props: LienProps): JSX.Element;