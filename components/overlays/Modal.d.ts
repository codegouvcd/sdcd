/** Modale : scrim 60 %, fermeture Échap/scrim/bouton, zone d'actions. */
export interface ModalProps { ouvert: boolean; titre: string; children?: React.ReactNode; actions?: React.ReactNode; onClose?: ()=>void; largeur?: number; className?: string; style?: React.CSSProperties; }
export declare function Modal(props: ModalProps): JSX.Element;