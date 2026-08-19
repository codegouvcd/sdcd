/**
 * Assistant de démarche (wizard) : étapes déclaratives avec champs typés et
 * validation (requis, email, nombre), récapitulatif automatique avant envoi,
 * confirmation. Fil de progression intégré.
 * @startingPoint section="Composants" subtitle="Assistant de démarche multi-étapes" viewport="700x520"
 */
export interface WizardProps {
  titre?: string;
  etapes: Array<{titre: string; description?: string;
    champs?: Array<{cle: string; label: string; type?: 'texte'|'email'|'nombre'|'date'|'choix'; options?: string[]; hint?: string; requis?: boolean}>}>;
  onFinish?: (data: Record<string,string>) => void;
  className?: string;
  style?: React.CSSProperties;
}
export declare function Wizard(props: WizardProps): JSX.Element;