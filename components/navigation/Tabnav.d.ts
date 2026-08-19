/** Navigation tertiaire : rangée d'ancres soulignées (sous-sections d'une page). */
export interface TabnavProps { onglets: string[]; actif?: number; onChange?: (i:number)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Tabnav(props: TabnavProps): JSX.Element;