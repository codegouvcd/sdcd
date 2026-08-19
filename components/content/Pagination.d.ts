/** Pagination carrée, page active en bleu plein. */
export interface PaginationProps { pages: number; actif?: number; onChange?: (page:number)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Pagination(props: PaginationProps): JSX.Element;