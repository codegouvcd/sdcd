/** Mot de passe : affichage masqué/visible, règles de sécurité validées en direct (mode création). */
export interface PasswordProps { label?: string; creation?: boolean; valeur?: string; onChange?: (v:string)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Password(props: PasswordProps): JSX.Element;