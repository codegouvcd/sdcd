/** Lettre d'information + réseaux sociaux (bloc pré-pied de page) avec validation du courriel. */
export interface FollowProps { onSubscribe?: (email:string)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Follow(props: FollowProps): JSX.Element;