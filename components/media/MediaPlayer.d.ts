/** Lecteur média officiel (vidéo ou audio) : lecture simulée, barre de progression, lien transcription (accessibilité). */
export interface MediaPlayerProps {
  type?: 'video' | 'audio';
  titre: string; duree?: string;
  /** Vignette vidéo — passez un <image-slot>. */
  poster?: React.ReactNode;
  /** Affiche le lien de transcription (défaut true — exigence d'accessibilité). */
  transcription?: boolean;
  className?: string;
  style?: React.CSSProperties;
}
export declare function MediaPlayer(props: MediaPlayerProps): JSX.Element;