export interface CodeOTPProps {
  /** Nombre de cases (6 par défaut, conforme au SDCD). */
  longueur?: number;
  label?: string;
  hint?: string;
  /** Message d'erreur : bordure rouge + alerte lue par les lecteurs d'écran. */
  error?: string;
  valeur?: string;
  onChange?: (code: string) => void;
  /** Appelé quand toutes les cases sont remplies. */
  onComplet?: (code: string) => void;
  autoFocus?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function CodeOTP(props: CodeOTPProps): JSX.Element;
