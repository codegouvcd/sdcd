/** Case à cocher avec libellé. */
export interface CheckboxProps { label: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (e:any)=>void; disabled?: boolean; className?: string;
  style?: React.CSSProperties; }
export declare function Checkbox(props: CheckboxProps): JSX.Element;