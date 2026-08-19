/** Sélecteur de fichiers (justificatifs) : bouton parcourir, liste des fichiers avec taille et retrait. */
export interface UploadProps { label?: string; hint?: string; multiple?: boolean; onChange?: (files: Array<{nom:string;taille:number}>)=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Upload(props: UploadProps): JSX.Element;