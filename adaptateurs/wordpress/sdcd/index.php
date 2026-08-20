<?php
/**
 * Liste des articles.
 *
 * @package sdcd
 */

get_header();
?>

<h1 class="sdcd-h1"><?php echo esc_html( get_the_archive_title() ? get_the_archive_title() : get_bloginfo( 'name' ) ); ?></h1>

<?php if ( have_posts() ) : ?>

	<div class="sdcd-grid sdcd-my-6"
	     style="--sdcd-cols: repeat(3, minmax(0, 1fr)); --sdcd-cols-md: repeat(2, minmax(0, 1fr)); --sdcd-cols-sm: minmax(0, 1fr)">
		<?php
		while ( have_posts() ) :
			the_post();
			sdcd_carte_e(
				array(
					'titre'       => get_the_title(),
					'lien_url'    => get_permalink(),
					'description' => get_the_excerpt(),
					'image'       => get_the_post_thumbnail_url( null, 'medium_large' ),
					'sur_titre'   => get_the_date(),
				)
			);
		endwhile;
		?>
	</div>

	<?php sdcd_pagination(); ?>

<?php else : ?>

	<?php
	sdcd_alerte_e(
		array(
			'titre'   => __( 'Aucun contenu', 'sdcd' ),
			'type'    => 'info',
			'contenu' => __( 'Aucun résultat pour votre recherche.', 'sdcd' ),
		)
	);
	?>

<?php endif; ?>

<?php get_footer(); ?>
