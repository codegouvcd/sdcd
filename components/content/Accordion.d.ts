/** Accordéon (FAQ, contenus repliés) — un seul volet ouvert à la fois. */
export interface AccordionProps { items: Array<{titre: string; contenu: React.ReactNode}>; className?: string;
  style?: React.CSSProperties; }
export declare function Accordion(props: AccordionProps): JSX.Element;