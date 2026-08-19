/**
 * Prise de rendez-vous en 2 temps (jour puis horaire) avec confirmation.
 * @startingPoint section="Composants" subtitle="Prise de rendez-vous" viewport="700x420"
 */
export interface RdvProps {
  lieu?: string; dates?: string[]; creneaux?: string[];
  onConfirm?: (date: string, heure: string) => void; className?: string;
  style?: React.CSSProperties;
}
export declare function Rdv(props: RdvProps): JSX.Element;