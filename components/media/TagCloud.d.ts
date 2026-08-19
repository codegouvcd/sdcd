/** Nuage de mots-clés : taille et graisse proportionnelles au poids, compteur en exposant. */
export interface TagCloudProps { tags: Array<{label: string; poids?: number}>; onSelect?: (label:string)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function TagCloud(props: TagCloudProps): JSX.Element;