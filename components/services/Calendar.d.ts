/** Calendrier mensuel : navigation, sélection d'un jour, points d'événements. mois 0-11. */
export interface CalendarProps {
  annee?: number; mois?: number; selection?: number;
  /** Jours du mois portant un événement (points rouges). */
  evenements?: number[];
  onSelect?: (date: Date) => void; className?: string;
  style?: React.CSSProperties;
}
export declare function Calendar(props: CalendarProps): JSX.Element;