/** Carte de contenu cliquable (actualité, démarche, publication). */
export interface CardProps {
  surTitre?: string; titre: string; description?: string; meta?: string; href?: string;
  /** URL d’image ou nœud (ex. <image-slot>) ; zone 160 px. */
  image?: React.ReactNode | string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Card(props: CardProps): JSX.Element;