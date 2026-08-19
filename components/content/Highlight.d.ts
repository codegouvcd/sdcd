/** Mise en exergue : information essentielle à liseré bleu, sans fond (distinct de Callout). */
export interface HighlightProps { children: React.ReactNode; taille?: 'sm'|'md'|'lg'; className?: string;
  style?: React.CSSProperties; }
export declare function Highlight(props: HighlightProps): JSX.Element;