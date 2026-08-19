/**
 * Tableau avancé complet : filtre plein-texte, tri, pagination, export CSV,
 * édition en ligne, sélection multiple avec barre d'actions groupées, menu
 * d'actions par ligne, sélecteur de colonnes visibles, densité
 * confortable/compacte, état de chargement (squelette), état vide avec
 * réinitialisation, lignes en alerte (liseré rouge).
 * @startingPoint section="Composants" subtitle="Tableau : sélection, densité, colonnes, export, états" viewport="1000x480"
 */
export interface DataTableProps {
  titre?: string;
  colonnes: Array<{cle: string; label: string; type?: 'texte'|'nombre'; editable?: boolean; /** Rendu personnalisé de la cellule. */ rendu?: (ligne: any) => React.ReactNode}>;
  lignes: Array<Record<string, string|number>>;
  parPage?: number; filtrable?: boolean; exportable?: boolean; editable?: boolean;
  /** Cases de sélection + barre d'actions groupées. */
  selectionnable?: boolean;
  /** Rendu de la barre d'actions groupées (reçoit les lignes sélectionnées). */
  actionsGroupees?: (selection: any[]) => React.ReactNode;
  /** Menu ⋯ par ligne. */
  actionsLigne?: Array<{libelle: string; icone?: string; danger?: boolean}>;
  onAction?: (libelle: string, ligne: any) => void;
  /** Squelette de chargement. */
  chargement?: boolean;
  videTitre?: string; videTexte?: string; onReinit?: () => void;
  /** Ligne signalée (fond rouge pâle + liseré). */
  ligneAlerte?: (ligne: any) => boolean;
  densifiable?: boolean; className?: string;
  style?: React.CSSProperties;
}
export declare function DataTable(props: DataTableProps): JSX.Element;