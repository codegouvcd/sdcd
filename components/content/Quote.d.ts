/** Citation à liseré bleu et guillemets. */
export interface QuoteProps { children: React.ReactNode; auteur?: string; source?: string; className?: string;
  style?: React.CSSProperties; }
export declare function Quote(props: QuoteProps): JSX.Element;