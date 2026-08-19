/** Liste déroulante native stylée. */
export interface SelectProps {
  label?: string; hint?: string; error?: string;
  options: Array<string | {value: string; label: string}>;
  value?: string; onChange?: (e: any) => void; disabled?: boolean; className?: string;
  style?: React.CSSProperties;
}
export declare function Select(props: SelectProps): JSX.Element;