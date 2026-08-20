<?php
/**
 * Composants du Système de design RDC, en fonctions PHP.
 *
 * Les noms et les paramètres reprennent ceux des macros Jinja2 et des tags
 * Django : un même composant s'écrit pareil dans les trois piles.
 *
 * Chaque fonction `sdcd_x()` renvoie le balisage ; `sdcd_x_e()` l'affiche.
 * Les entrées sont échappées, sauf les paramètres explicitement documentés
 * comme acceptant du HTML — ils sont alors passés par `wp_kses_post()`.
 *
 * @package sdcd
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Racine des fichiers statiques du système.
 */
function sdcd_base() {
	return get_template_directory_uri() . '/assets/sdcd';
}

/**
 * Ajoute des classes supplémentaires, si elles sont fournies.
 */
function sdcd_classes( $sup ) {
	return $sup ? ' ' . esc_attr( $sup ) : '';
}

/**
 * Filet tricolore — signature de la marque d'État.
 */
function sdcd_filet_tricolore() {
	return '<div class="sdcd-filet-tricolore" aria-hidden="true">'
		. '<div class="sdcd-filet-tricolore__bande--bleu"></div>'
		. '<div class="sdcd-filet-tricolore__bande--jaune"></div>'
		. '<div class="sdcd-filet-tricolore__bande--rouge"></div></div>';
}

/**
 * Message d'alerte.
 *
 * @param array $a titre, type (info|succes|alerte|erreur), contenu (HTML),
 *                 balise_titre, fermable, id, classes.
 */
function sdcd_alerte( $a = array() ) {
	$a = wp_parse_args(
		$a,
		array(
			'titre'        => '',
			'type'         => 'info',
			'contenu'      => '',
			'balise_titre' => 'p',
			'fermable'     => false,
			'id'           => '',
			'classes'      => '',
		)
	);

	$icones = array(
		'succes' => 'ri-checkbox-circle-line',
		'erreur' => 'ri-error-warning-line',
		'alerte' => 'ri-alert-line',
		'info'   => 'ri-information-line',
	);
	$icone  = isset( $icones[ $a['type'] ] ) ? $icones[ $a['type'] ] : $icones['info'];
	$bt     = tag_escape( $a['balise_titre'] );

	$html = '<div role="alert" class="sdcd-alert sdcd-alert--' . esc_attr( $a['type'] ) . sdcd_classes( $a['classes'] ) . '"';
	$html .= $a['id'] ? ' id="' . esc_attr( $a['id'] ) . '"' : '';
	$html .= '><i class="sdcd-alert__icone ' . esc_attr( $icone ) . '" aria-hidden="true"></i>';
	$html .= '<div class="sdcd-alert__corps">';
	if ( $a['titre'] ) {
		$html .= "<{$bt} class=\"sdcd-alert__titre\">" . esc_html( $a['titre'] ) . "</{$bt}>";
	}
	if ( $a['contenu'] ) {
		$html .= '<p class="sdcd-alert__texte">' . wp_kses_post( $a['contenu'] ) . '</p>';
	}
	$html .= '</div>';
	if ( $a['fermable'] ) {
		$masquer = esc_attr__( 'Masquer le message', 'sdcd' );
		// Pas d'`onclick` en ligne : il exigerait `unsafe-inline` dans la
		// politique de sécurité de contenu. `sdcd.js` traite cet attribut.
		$html   .= '<button type="button" class="sdcd-fermer" title="' . $masquer . '"'
			. ' data-sdcd-fermer-parent=".sdcd-alert">'
			. '<i class="ri-close-line" aria-hidden="true"></i>'
			. '<span class="sdcd-lecteur-seul">' . $masquer . '</span></button>';
	}
	return $html . '</div>';
}

/**
 * Bouton.
 *
 * @param array $a libelle, type (primaire|secondaire|tertiaire), taille,
 *                 html_type, icone, icone_droite, desactive, classes.
 */
function sdcd_bouton( $a = array() ) {
	$a = wp_parse_args(
		$a,
		array(
			'libelle'      => '',
			'type'         => 'primaire',
			'taille'       => '',
			'html_type'    => 'button',
			'icone'        => '',
			'icone_droite' => '',
			'desactive'    => false,
			'classes'      => '',
		)
	);

	$classe = 'sdcd-button sdcd-button--' . esc_attr( $a['type'] );
	if ( $a['taille'] ) {
		$classe .= ' sdcd-button--' . esc_attr( $a['taille'] );
	}

	$html = '<button type="' . esc_attr( $a['html_type'] ) . '" class="' . $classe . sdcd_classes( $a['classes'] ) . '"';
	$html .= $a['desactive'] ? ' disabled' : '';
	$html .= '>';
	if ( $a['icone'] ) {
		$html .= '<i class="' . esc_attr( $a['icone'] ) . '" aria-hidden="true"></i> ';
	}
	$html .= esc_html( $a['libelle'] );
	if ( $a['icone_droite'] ) {
		$html .= ' <i class="' . esc_attr( $a['icone_droite'] ) . '" aria-hidden="true"></i>';
	}
	return $html . '</button>';
}

/**
 * Carte de contenu.
 *
 * @param array $a titre, description (HTML), lien_url, image, alt, sur_titre,
 *                 meta (HTML), balise_titre, classes.
 */
function sdcd_carte( $a = array() ) {
	$a = wp_parse_args(
		$a,
		array(
			'titre'        => '',
			'description'  => '',
			'lien_url'     => '',
			'image'        => '',
			'alt'          => '',
			'sur_titre'    => '',
			'meta'         => '',
			'balise_titre' => 'h3',
			'classes'      => '',
		)
	);
	$bt = tag_escape( $a['balise_titre'] );

	$html = '<div class="sdcd-card' . sdcd_classes( $a['classes'] ) . '">';
	if ( $a['image'] ) {
		$html .= '<div class="sdcd-card__media"><img src="' . esc_url( $a['image'] ) . '" alt="'
			. esc_attr( $a['alt'] ) . '" loading="lazy"></div>';
	}
	$html .= '<div class="sdcd-card__corps">';
	if ( $a['sur_titre'] ) {
		$html .= '<p class="sdcd-card__sur-titre">' . esc_html( $a['sur_titre'] ) . '</p>';
	}
	$html .= "<{$bt} class=\"sdcd-card__titre\">";
	$html .= $a['lien_url']
		? '<a href="' . esc_url( $a['lien_url'] ) . '">' . esc_html( $a['titre'] ) . '</a>'
		: esc_html( $a['titre'] );
	$html .= "</{$bt}>";
	if ( $a['description'] ) {
		$html .= '<p class="sdcd-card__description">' . wp_kses_post( $a['description'] ) . '</p>';
	}
	if ( $a['meta'] ) {
		$html .= '<p class="sdcd-card__meta">' . wp_kses_post( $a['meta'] ) . '</p>';
	}
	return $html . '</div></div>';
}

/**
 * Fil d'Ariane.
 *
 * @param array  $liens   liste de array( 'url' => …, 'titre' => … ).
 * @param string $courant intitulé de la page courante.
 */
function sdcd_fil_ariane( $liens = array(), $courant = '' ) {
	$html = '<nav role="navigation" class="sdcd-breadcrumb" aria-label="'
		. esc_attr__( 'vous êtes ici :', 'sdcd' ) . '">';
	$html .= '<a class="sdcd-breadcrumb__lien" href="' . esc_url( home_url( '/' ) ) . '">'
		. esc_html__( 'Accueil', 'sdcd' ) . '</a>';
	foreach ( $liens as $l ) {
		$html .= '<i class="sdcd-breadcrumb__separateur ri-arrow-right-s-line" aria-hidden="true"></i>';
		$html .= '<a class="sdcd-breadcrumb__lien" href="' . esc_url( $l['url'] ) . '">'
			. esc_html( $l['titre'] ) . '</a>';
	}
	$html .= '<i class="sdcd-breadcrumb__separateur ri-arrow-right-s-line" aria-hidden="true"></i>';
	$html .= '<span class="sdcd-breadcrumb__courant" aria-current="page">' . esc_html( $courant ) . '</span>';
	return $html . '</nav>';
}

/**
 * Étiquette.
 *
 * @param array $a libelle, lien, selectionnable, selectionne, classes.
 */
function sdcd_etiquette( $a = array() ) {
	$a = wp_parse_args(
		$a,
		array(
			'libelle'        => '',
			'lien'           => '',
			'selectionnable' => false,
			'selectionne'    => false,
			'classes'        => '',
		)
	);

	if ( $a['lien'] ) {
		return '<a class="sdcd-tag sdcd-tag--cliquable' . sdcd_classes( $a['classes'] ) . '" href="'
			. esc_url( $a['lien'] ) . '">' . esc_html( $a['libelle'] ) . '</a>';
	}
	if ( $a['selectionnable'] ) {
		return '<button type="button" class="sdcd-tag sdcd-tag--cliquable' . sdcd_classes( $a['classes'] )
			. '" aria-pressed="' . ( $a['selectionne'] ? 'true' : 'false' ) . '">'
			. esc_html( $a['libelle'] ) . '</button>';
	}
	return '<p class="sdcd-tag' . sdcd_classes( $a['classes'] ) . '">' . esc_html( $a['libelle'] ) . '</p>';
}

/**
 * Accordéon. Exige `sdcd.js` : c'est lui qui pose `aria-expanded`.
 *
 * @param array $a id, titre, contenu (HTML), ouvert.
 */
function sdcd_accordeon( $a = array() ) {
	$a = wp_parse_args( $a, array( 'id' => '', 'titre' => '', 'contenu' => '', 'ouvert' => false ) );

	return '<div class="sdcd-accordion"><div class="sdcd-accordion__item">'
		. '<button type="button" class="sdcd-accordion__entete" aria-expanded="'
		. ( $a['ouvert'] ? 'true' : 'false' ) . '" aria-controls="' . esc_attr( $a['id'] ) . '">'
		. esc_html( $a['titre'] ) . '</button>'
		. '<div class="sdcd-accordion__contenu" id="' . esc_attr( $a['id'] ) . '"'
		. ( $a['ouvert'] ? '' : ' hidden' ) . '>' . wp_kses_post( $a['contenu'] ) . '</div>'
		. '</div></div>';
}

/**
 * Bloc-marque de l'État congolais.
 *
 * @param string $entite     intitulé de l'entité, facultatif.
 * @param bool   $avec_devise afficher « Justice · Paix · Travail ».
 */
function sdcd_bloc_marque( $entite = '', $avec_devise = true ) {
	$html = '<div class="sdcd-blocmarque">';
	$html .= '<img class="sdcd-blocmarque__armoiries" src="' . esc_url( sdcd_base() . '/assets/armoiries-rdc.png' )
		. '" alt="' . esc_attr__( 'Armoiries de la République Démocratique du Congo', 'sdcd' ) . '">';
	$html .= '<div><div class="sdcd-blocmarque__republique">'
		. esc_html__( 'République Démocratique du Congo', 'sdcd' ) . '</div>';
	if ( $avec_devise ) {
		$html .= '<div class="sdcd-blocmarque__devise">'
			. esc_html__( 'Justice · Paix · Travail', 'sdcd' ) . '</div>';
	}
	if ( $entite ) {
		$html .= '<div class="sdcd-blocmarque__entite">' . esc_html( $entite ) . '</div>';
	}
	return $html . '</div></div>';
}

/**
 * Choix du thème clair / sombre / système.
 */
function sdcd_choix_theme() {
	$options = array(
		array( 'clair', 'ri-sun-line', __( 'Clair', 'sdcd' ), 'false' ),
		array( 'sombre', 'ri-moon-line', __( 'Sombre', 'sdcd' ), 'false' ),
		array( 'systeme', 'ri-computer-line', __( 'Système', 'sdcd' ), 'true' ),
	);

	$html = '<fieldset class="sdcd-display"><legend class="sdcd-display__legende">'
		. esc_html__( 'Affichage', 'sdcd' ) . '</legend><div class="sdcd-display__options">';
	foreach ( $options as $o ) {
		$html .= '<button type="button" class="sdcd-display__option" role="radio" aria-checked="' . $o[3]
			. '" data-sdcd-theme="' . esc_attr( $o[0] ) . '">'
			. '<i class="' . esc_attr( $o[1] ) . '" aria-hidden="true"></i> ' . esc_html( $o[2] ) . '</button>';
	}
	return $html . '</div></fieldset>';
}

/*
 * Variantes qui affichent directement, pour alléger les gabarits.
 * Écrites une par une : générer ces fonctions par `eval` serait plus court,
 * mais c'est exactement le genre de chose qu'un relecteur de thème refuse —
 * et à raison.
 */

function sdcd_filet_tricolore_e() {
	echo sdcd_filet_tricolore(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_alerte_e( $a = array() ) {
	echo sdcd_alerte( $a ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_bouton_e( $a = array() ) {
	echo sdcd_bouton( $a ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_carte_e( $a = array() ) {
	echo sdcd_carte( $a ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_fil_ariane_e( $liens = array(), $courant = '' ) {
	echo sdcd_fil_ariane( $liens, $courant ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_etiquette_e( $a = array() ) {
	echo sdcd_etiquette( $a ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_accordeon_e( $a = array() ) {
	echo sdcd_accordeon( $a ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_bloc_marque_e( $entite = '', $avec_devise = true ) {
	echo sdcd_bloc_marque( $entite, $avec_devise ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}

function sdcd_choix_theme_e() {
	echo sdcd_choix_theme(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
}
