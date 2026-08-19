/** Badge pilule de statut. */
export interface BadgeProps { ton?: 'neutre'|'info'|'succes'|'alerte'|'erreur'|'nouveau'; children?: React.ReactNode; className?: string;
  style?: React.CSSProperties; }
export declare function Badge(props: BadgeProps): JSX.Element;