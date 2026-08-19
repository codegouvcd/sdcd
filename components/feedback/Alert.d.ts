/** Alerte contextuelle (info, succès, alerte, erreur). */
export interface AlertProps { type?: 'info'|'succes'|'alerte'|'erreur'; titre?: string; children?: React.ReactNode; onClose?: ()=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Alert(props: AlertProps): JSX.Element;