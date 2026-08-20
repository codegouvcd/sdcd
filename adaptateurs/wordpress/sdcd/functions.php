<?php
/**
 * Thème SDCD — amorçage.
 *
 * Sert le Système de design RDC depuis le thème, sans requête vers un tiers :
 * la feuille, le script et les fontes sont livrés dans assets/sdcd/.
 *
 * @package sdcd
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'SDCD_VERSION', '0.6.0' );

/**
 * Déclare ce que le thème sait faire.
 */
function sdcd_apres_configuration() {
	load_theme_textdomain( 'sdcd', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	// Le SDCD impose son propre balisage : on demande le HTML5 partout où
	// WordPress accepte de le produire.
	add_theme_support(
		'html5',
		array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' )
	);

	register_nav_menus(
		array(
			'principal' => __( 'Menu principal', 'sdcd' ),
			'pied'      => __( 'Menu du pied de page', 'sdcd' ),
		)
	);
}
add_action( 'after_setup_theme', 'sdcd_apres_configuration' );

/**
 * Charge la feuille et le script du système.
 *
 * Une seule feuille : `sdcd.min.css` est la distribution aplatie, elle
 * n'entraîne aucune requête en cascade.
 */
function sdcd_ressources() {
	$base = get_template_directory_uri() . '/assets/sdcd';

	wp_enqueue_style( 'sdcd', $base . '/sdcd.min.css', array(), SDCD_VERSION );

	// La feuille du thème vient après, pour pouvoir surcharger.
	wp_enqueue_style( 'sdcd-theme', get_stylesheet_uri(), array( 'sdcd' ), SDCD_VERSION );

	// `defer` : le script pose des attributs ARIA, rien ne dépend de lui au
	// premier rendu.
	wp_enqueue_script( 'sdcd', $base . '/sdcd.js', array(), SDCD_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'sdcd_ressources' );

/**
 * Applique les classes du système aux liens de navigation produits par
 * WordPress, qui ne connaît pas le SDCD.
 */
function sdcd_classe_lien_menu( $atts, $item, $args ) {
	if ( isset( $args->theme_location ) && 'principal' === $args->theme_location ) {
		$atts['class'] = 'sdcd-header__lien';
		if ( ! empty( $item->current ) ) {
			$atts['aria-current'] = 'page';
		}
	}
	return $atts;
}
add_filter( 'nav_menu_link_attributes', 'sdcd_classe_lien_menu', 10, 3 );

/**
 * Pagination aux couleurs du système, en remplacement de `the_posts_pagination`.
 */
function sdcd_pagination() {
	$liens = paginate_links(
		array(
			'type'      => 'array',
			'prev_text' => '<i class="ri-arrow-left-s-line" aria-hidden="true"></i><span class="sdcd-lecteur-seul">' . esc_html__( 'Page précédente', 'sdcd' ) . '</span>',
			'next_text' => '<i class="ri-arrow-right-s-line" aria-hidden="true"></i><span class="sdcd-lecteur-seul">' . esc_html__( 'Page suivante', 'sdcd' ) . '</span>',
		)
	);

	if ( empty( $liens ) ) {
		return;
	}

	echo '<nav role="navigation" class="sdcd-pagination" aria-label="' . esc_attr__( 'Pagination', 'sdcd' ) . '">';
	foreach ( $liens as $lien ) {
		// paginate_links produit ses propres classes : on les remplace.
		$lien = preg_replace( '/class="[^"]*"/', 'class="sdcd-pagination__lien"', $lien );
		$lien = str_replace( '<span class="sdcd-pagination__lien current"', '<span class="sdcd-pagination__lien" aria-current="page"', $lien );
		echo wp_kses_post( $lien );
	}
	echo '</nav>';
}

require_once get_template_directory() . '/inc/composants.php';
