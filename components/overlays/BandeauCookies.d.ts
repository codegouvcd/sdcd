/** Bandeau de consentement cookies (RGPD) : accepter / refuser / personnaliser, à parité visuelle. */
export interface CookieConsentProps { visible?: boolean; onChoice?: (choix:'accepte'|'refuse'|'personnalise')=>void; /** false = rendu dans le flux (démos). */ fixe?: boolean; className?: string;
  style?: React.CSSProperties; }
export declare function CookieConsent(props: CookieConsentProps): JSX.Element;