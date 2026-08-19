/** Galerie d'images en grille + visionneuse plein écran (clic pour agrandir, navigation). */
export interface GalleryProps {
  /** contenu : un <image-slot> (ou <img>) par vignette. */
  items: Array<{contenu: React.ReactNode; legende?: string}>;
  colonnes?: number; className?: string;
  style?: React.CSSProperties;
}
export declare function Gallery(props: GalleryProps): JSX.Element;