/** Interrupteur (paramètres, consentements). */
export interface ToggleProps { label?: React.ReactNode; checked?: boolean; defaultChecked?: boolean; onChange?: (on:boolean)=>void; disabled?: boolean; className?: string;
  style?: React.CSSProperties; }
export declare function Toggle(props: ToggleProps): JSX.Element;