/** Bouton radio avec libellé. */
export interface RadioProps { label: React.ReactNode; name?: string; value?: string; checked?: boolean; defaultChecked?: boolean; onChange?: (e:any)=>void; disabled?: boolean; className?: string;
  style?: React.CSSProperties; }
export declare function Radio(props: RadioProps): JSX.Element;