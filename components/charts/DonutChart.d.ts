/** Anneau de répartition : total au centre, légende avec parts, bascule tableau, source. */
export interface DonutChartProps {
  titre: string; source?: string;
  donnees: Array<{nom: string; valeur: number; couleur?: string}>;
  unite?: string;
  /** Texte central (défaut : total formaté). */
  centre?: string;
  className?: string;
  style?: React.CSSProperties;
}
export declare function DonutChart(props: DonutChartProps): JSX.Element;