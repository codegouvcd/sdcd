/** Champ de saisie avec libellé, aide et erreur. */
export interface InputProps {
  label?: string; hint?: string; error?: string;
  type?: string; value?: string; defaultValue?: string; placeholder?: string;
  disabled?: boolean; onChange?: (e: any) => void; className?: string;
  style?: React.CSSProperties;
}
export declare function Input(props: InputProps): JSX.Element;