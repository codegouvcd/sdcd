/** Courbes (évolution) : points soulignés, grille, bascule tableau, source. */
export interface LineChartProps {
  titre: string; source?: string;
  categories: string[];
  series: Array<{nom: string; valeurs: number[]; couleur?: string}>;
  unite?: string; hauteur?: number;
  className?: string;
  style?: React.CSSProperties;
}
export declare function LineChart(props: LineChartProps): JSX.Element;