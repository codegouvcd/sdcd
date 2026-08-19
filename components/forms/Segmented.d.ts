/** Contrôle segmenté : sélection exclusive de vues, segment actif à liseré bleu et coche. */
export interface SegmentedProps { label?: string; options: Array<string|{label:string}>; valeur?: number; onChange?: (i:number)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Segmented(props: SegmentedProps): JSX.Element;