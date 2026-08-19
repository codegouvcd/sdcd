/** Menu déroulant d'actions : bouton + liste (icônes, variante danger). */
export interface DropdownProps { libelle?: string; items: Array<string|{libelle:string;icone?:string;danger?:boolean}>; onSelect?: (libelle:string,index:number)=>void; variant?: 'primaire'|'secondaire'; className?: string;
  style?: React.CSSProperties; }
export declare function Dropdown(props: DropdownProps): JSX.Element;