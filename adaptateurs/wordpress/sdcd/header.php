<?php
/**
 * En-tête du site.
 *
 * @package sdcd
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<nav role="navigation" aria-label="<?php esc_attr_e( 'Liens d’évitement', 'sdcd' ); ?>">
	<a class="sdcd-skiplink" href="#contenu"><?php esc_html_e( 'Aller au contenu', 'sdcd' ); ?></a>
</nav>

<?php sdcd_filet_tricolore_e(); ?>

<header role="banner" class="sdcd-header">
	<div class="sdcd-header__utilitaire">
		<div class="sdcd-container">
			<span class="sdcd-header__mention">
				<?php esc_html_e( 'Site officiel de la République Démocratique du Congo — vérifiez que l’adresse se termine par .gouv.cd', 'sdcd' ); ?>
			</span>
		</div>
	</div>

	<div class="sdcd-container sdcd-header__corps">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="sdcd-header__lien-marque"
		   title="<?php esc_attr_e( 'Retour à l’accueil', 'sdcd' ); ?>">
			<?php sdcd_bloc_marque_e( get_bloginfo( 'name' ) ); ?>
		</a>
	</div>

	<?php if ( has_nav_menu( 'principal' ) ) : ?>
		<nav class="sdcd-header__navigation" role="navigation"
		     aria-label="<?php esc_attr_e( 'Menu principal', 'sdcd' ); ?>">
			<div class="sdcd-container">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'principal',
						'container'      => false,
						'menu_class'     => 'sdcd-header__nav',
						'depth'          => 2,
					)
				);
				?>
			</div>
		</nav>
	<?php endif; ?>
</header>

<main id="contenu" role="main" class="sdcd-container sdcd-my-6 sdcd-wp-contenu">
