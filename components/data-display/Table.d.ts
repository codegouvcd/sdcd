/** Tableau de données officiel (en-tête souligné, zébrage discret). */
export interface TableProps { caption?: string; colonnes: string[]; lignes: Array<Array<React.ReactNode>>; className?: string;
  style?: React.CSSProperties; }
export declare function Table(props: TableProps): JSX.Element;