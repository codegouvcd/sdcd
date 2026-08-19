/** Indicateur d'étapes d'une démarche : « Étape N sur T », segments de progression, annonce de l'étape suivante. */
export interface StepperProps { etape: number; total: number; titre: string; suivant?: string; className?: string;
  style?: React.CSSProperties; }
export declare function Stepper(props: StepperProps): JSX.Element;