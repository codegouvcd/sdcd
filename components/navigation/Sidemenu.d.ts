/** Menu latéral de rubrique : sections repliables, item actif à liseré bleu. */
export interface SidemenuProps {
  titre?: string;
  sections: Array<{titre?: string; liens: string[]}>;
  actif?: string; onSelect?: (lien:string)=>void; className?: string;
  style?: React.CSSProperties;
}
export declare function Sidemenu(props: SidemenuProps): JSX.Element;