/** Sommaire autonome : liste numérotée d'ancres de page. */
export interface SummaryProps { titre?: string; items: Array<string|{libelle:string;ancre?:string}>; className?: string;
  style?: React.CSSProperties; }
export declare function Summary(props: SummaryProps): JSX.Element;