/**
 * Graphique en barres (inspiré de dsfr-chart) : légende, grille, axe formaté FR,
 * bascule accessible « Tableau / Graphique », mention de source.
 * @startingPoint section="Composants" subtitle="Graphique en barres avec bascule tableau" viewport="760x420"
 */
export interface BarChartProps {
  titre: string; source?: string;
  categories: string[];
  series: Array<{nom: string; valeurs: number[]; couleur?: string}>;
  unite?: string; hauteur?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function BarChart(props: BarChartProps): JSX.Element;