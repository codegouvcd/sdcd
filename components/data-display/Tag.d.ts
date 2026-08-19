/** Tag cliquable (filtres) : état actif avec coche, variante supprimable. Distinct du Badge (statut non cliquable). */
export interface TagProps { children: React.ReactNode; actif?: boolean; supprimable?: boolean; onClick?: ()=>void; onDelete?: ()=>void; className?: string;
  style?: React.CSSProperties; }
export declare function Tag(props: TagProps): JSX.Element;