/** Infobulle au survol et au focus clavier. */
export interface TooltipProps { texte: string; children: React.ReactNode; className?: string;
  style?: React.CSSProperties; }
export declare function Tooltip(props: TooltipProps): JSX.Element;