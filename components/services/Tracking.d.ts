/**
 * Suivi de dossier : n° de dossier, statut, chronologie verticale des étapes (fait / en cours / à venir), actions.
 * @startingPoint section="Composants" subtitle="Suivi de dossier administratif" viewport="700x520"
 */
export interface TrackingProps {
  dossier?: string; demarche?: string;
  etapes?: Array<{titre: string; detail?: string; date?: string; statut: 'fait'|'encours'|'avenir'}>;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Tracking(props: TrackingProps): JSX.Element;