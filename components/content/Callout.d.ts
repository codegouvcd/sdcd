/** Mise en avant : bloc pâle à liseré bleu, icône, action optionnelle. */
export interface CalloutProps { titre?: string; children?: React.ReactNode; icone?: string; action?: string; onAction?: ()=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Callout(props: CalloutProps): JSX.Element;