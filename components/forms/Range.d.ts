/** Curseur : valeur affichée en mono, bornes min/max visibles. */
export interface RangeProps { label?: string; min?: number; max?: number; step?: number; valeur?: number; onChange?: (v:number)=>void; unite?: string; hint?: string; className?: string;
  style?: React.CSSProperties; }
export declare function Range(props: RangeProps): JSX.Element;