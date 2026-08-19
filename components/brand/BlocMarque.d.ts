/** Bloc-marque autonome : armoiries + intitulé + devise, déclinable par entité, version fond sombre. */
export interface BlocMarqueProps { entite?: string; sousTitre?: string; devise?: boolean; fondSombre?: boolean; taille?: number; assetsBase?: string; className?: string; style?: React.CSSProperties; }
export declare function BlocMarque(props: BlocMarqueProps): JSX.Element;