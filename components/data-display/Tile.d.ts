/** Tuile de service (icône + intitulé) — grilles de démarches. */
export interface TileProps { icon?: string; titre: string; description?: string; href?: string; className?: string;
  style?: React.CSSProperties; }
export declare function Tile(props: TileProps): JSX.Element;