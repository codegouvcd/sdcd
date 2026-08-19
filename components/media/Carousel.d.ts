/** Carrousel (diaporama) : flèches, compteur, légende, puces rectangulaires. Un enfant = une diapositive. */
export interface CarouselProps { children: React.ReactNode; legende?: string[]; className?: string;
  style?: React.CSSProperties; }
export declare function Carousel(props: CarouselProps): JSX.Element;