/** Bandeau d’information pleine largeur sous l’en-tête. */
export interface NoticeProps { children?: React.ReactNode; onClose?: ()=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Notice(props: NoticeProps): JSX.Element;