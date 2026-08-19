/** Onglets DSFR-like : languette active blanche à liseré bleu supérieur. Un enfant par onglet. */
export interface TabsProps { onglets: string[]; actif?: number; onChange?: (i:number)=>void; children?: React.ReactNode; className?: string;
  style?: React.CSSProperties; }
export declare function Tabs(props: TabsProps): JSX.Element;