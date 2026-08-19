/** Sélecteur des 6 langues officielles (FR référence). */
export interface LangMenuProps { value?: 'FR'|'EN'|'LN'|'SW'|'KG'|'TS'; onChange?: (code:string)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function LangMenu(props: LangMenuProps): JSX.Element;