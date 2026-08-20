<?php
/**
 * Vérifie les composants du thème WordPress, hors WordPress.
 *
 * Les fonctions de WordPress dont `inc/composants.php` dépend sont simulées :
 * on peut ainsi rendre chaque composant et contrôler sa sortie sans installer
 * de CMS. Ce n'est pas un substitut à un essai réel dans WordPress, mais cela
 * attrape les erreurs de syntaxe, de nommage et de balisage.
 *
 * Usage : php adaptateurs/wordpress/verifier.php
 */

define( 'ABSPATH', __DIR__ );

// --- Simulacres des fonctions de WordPress ---------------------------------

function get_template_directory_uri() {
	return '/wp-content/themes/sdcd';
}
function home_url( $chemin = '/' ) {
	return 'https://exemple.gouv.cd' . $chemin;
}
function esc_attr( $t ) {
	return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' );
}
function esc_html( $t ) {
	return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' );
}
function esc_url( $t ) {
	return htmlspecialchars( (string) $t, ENT_QUOTES, 'UTF-8' );
}
function esc_attr__( $t, $d = '' ) {
	return esc_attr( $t );
}
function esc_html__( $t, $d = '' ) {
	return esc_html( $t );
}
function __( $t, $d = '' ) {
	return $t;
}
function tag_escape( $t ) {
	return preg_replace( '/[^a-zA-Z0-9]/', '', (string) $t );
}
function wp_kses_post( $t ) {
	return $t;
}
function wp_parse_args( $a, $d ) {
	return array_merge( $d, (array) $a );
}

require_once __DIR__ . '/sdcd/inc/composants.php';

// --- Jeu d'essai -----------------------------------------------------------

$appels = array(
	'filet_tricolore' => sdcd_filet_tricolore(),
	'alerte'          => sdcd_alerte( array( 'titre' => 'Attention', 'type' => 'alerte', 'contenu' => 'Dossier incomplet.', 'fermable' => true ) ),
	'bouton'          => sdcd_bouton( array( 'libelle' => 'Envoyer', 'icone' => 'ri-send-plane-line' ) ),
	'carte'           => sdcd_carte( array( 'titre' => 'Démarche', 'description' => 'Texte', 'lien_url' => '/d', 'sur_titre' => 'Service' ) ),
	'fil_ariane'      => sdcd_fil_ariane( array( array( 'url' => '/a', 'titre' => 'Démarches' ) ), 'État civil' ),
	'etiquette'       => sdcd_etiquette( array( 'libelle' => 'État civil', 'selectionnable' => true, 'selectionne' => true ) ),
	'accordeon'       => sdcd_accordeon( array( 'id' => 'a1', 'titre' => 'Quelles pièces ?', 'contenu' => '<p>Une pièce d’identité.</p>' ) ),
	'bloc_marque'     => sdcd_bloc_marque( 'Ministère de l’Intérieur' ),
	'choix_theme'     => sdcd_choix_theme(),
);

// --- Contrôles -------------------------------------------------------------

$definies = array();
foreach ( array( 'components.css', 'base.css', 'utilitaires.css', 'responsive.css' ) as $f ) {
	$css = file_get_contents( __DIR__ . '/../../' . $f );
	preg_match_all( '/\.(sdcd-[a-zA-Z0-9_-]+)/', $css, $m );
	$definies = array_merge( $definies, $m[1] );
}
$definies = array_unique( $definies );

$echecs = 0;
$emises = array();

echo "Composants WordPress du SDCD\n" . str_repeat( '-', 28 ) . "\n";
foreach ( $appels as $nom => $html ) {
	preg_match_all( '/class="([^"]*)"/', $html, $m );
	$classes = array();
	foreach ( $m[1] as $groupe ) {
		$classes = array_merge( $classes, preg_split( '/\s+/', trim( $groupe ) ) );
	}
	$fuites = array_filter( $classes, fn( $c ) => str_starts_with( $c, 'fr-' ) );
	$emises = array_merge( $emises, array_filter( $classes, fn( $c ) => str_starts_with( $c, 'sdcd-' ) ) );

	if ( $fuites ) {
		$echecs++;
		printf( "  FUITE  %-18s %s\n", $nom, implode( ', ', $fuites ) );
	} elseif ( ! $html ) {
		$echecs++;
		printf( "  VIDE   %-18s\n", $nom );
	} else {
		printf( "  ok     %-18s %4d car.\n", $nom, strlen( $html ) );
	}
}

$emises     = array_unique( $emises );
$manquantes = array_diff( $emises, $definies );
printf( "\nClasses sdcd-* emises : %d   manquantes : %d\n", count( $emises ), count( $manquantes ) );
foreach ( $manquantes as $c ) {
	echo "  MANQUANTE $c\n";
}
$echecs += count( $manquantes );

echo "\n" . ( 0 === $echecs ? "Aucun defaut.\n" : "$echecs defaut(s).\n" );
exit( $echecs > 0 ? 1 : 0 );
