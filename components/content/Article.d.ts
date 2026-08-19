/**
 * Article complet : sur-titre, titre, chapo, barre de méta + partage,
 * image à la une (hero), sommaire, corps, mots-clés.
 * @startingPoint section="Écrans" subtitle="Article de presse officiel" viewport="900x700"
 */
export interface ArticleProps {
  surTitre?: string; titre: string;
  /** Chapô en tête d'article (gras, plus grand). */
  chapo?: string;
  date?: string; tempsLecture?: string;
  /** Image à la une — passez un <image-slot> dans un conteneur. */
  hero?: React.ReactNode;
  sommaire?: string[]; tags?: string[];
  /** Corps de l'article (paragraphes, titres h2, Quote…). */
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Article(props: ArticleProps): JSX.Element;