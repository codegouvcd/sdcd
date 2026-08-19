/**
 * Bouton officiel SDCD.
 * @startingPoint section="Composants" subtitle="Bouton primaire / secondaire / tertiaire" viewport="700x200"
 */
export interface ButtonProps {
  /** 'primaire' (plein bleu) | 'secondaire' (contour) | 'tertiaire' (texte) */
  variant?: 'primaire' | 'secondaire' | 'tertiaire';
  size?: 'md' | 'sm';
  /** Classe Remix Icon, ex. 'ri-arrow-right-line' */
  icon?: string;
  iconRight?: string;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Button(props: ButtonProps): JSX.Element;