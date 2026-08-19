/**
 * Barre de recherche officielle (champ + bouton bleu accolé).
 * @startingPoint section="Composants" subtitle="Recherche de démarches" viewport="700x120"
 */
export interface SearchBarProps {
  placeholder?: string; buttonLabel?: string;
  /** Version héro 52 px avec libellé visible. */
  large?: boolean;
  onSearch?: (query: string) => void; className?: string;
  style?: React.CSSProperties;
}
export declare function SearchBar(props: SearchBarProps): JSX.Element;