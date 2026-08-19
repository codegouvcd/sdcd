/** Bouton icône seul (action compacte) — label accessible obligatoire. */
export interface IconButtonProps {
  icon: string;
  /** Libellé accessible (aria-label). */
  label: string;
  variant?: 'primaire' | 'secondaire' | 'tertiaire';
  size?: 'md' | 'sm';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;