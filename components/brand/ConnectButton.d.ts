/** Bouton d'identité numérique officielle (équivalent FranceConnect) : « S'identifier avec CongoConnect ». */
export interface ConnectButtonProps { service?: string; hint?: boolean; onClick?: ()=>void; assetsBase?: string; className?: string; style?: React.CSSProperties; }
export declare function ConnectButton(props: ConnectButtonProps): JSX.Element;