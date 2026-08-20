<?php
/**
 * Article ou page.
 *
 * @package sdcd
 */

get_header();

while ( have_posts() ) :
	the_post();

	$fil = array();
	if ( is_single() ) {
		$fil[] = array( 'url' => get_permalink( get_option( 'page_for_posts' ) ), 'titre' => __( 'Actualités', 'sdcd' ) );
	}
	sdcd_fil_ariane_e( $fil, get_the_title() );
	?>

	<article <?php post_class( 'sdcd-article' ); ?>>
		<h1 class="sdcd-h1 sdcd-mt-5"><?php the_title(); ?></h1>

		<?php if ( is_single() ) : ?>
			<p class="sdcd-texte-sm sdcd-texte-muet"><?php echo esc_html( get_the_date() ); ?></p>
		<?php endif; ?>

		<?php if ( has_post_thumbnail() ) : ?>
			<figure class="sdcd-my-5"><?php the_post_thumbnail( 'large', array( 'style' => 'width:100%;height:auto' ) ); ?></figure>
		<?php endif; ?>

		<div class="sdcd-wp-contenu"><?php the_content(); ?></div>

		<?php
		$etiquettes = get_the_tags();
		if ( $etiquettes ) :
			?>
			<div class="sdcd-flex sdcd-wrap sdcd-mt-6" style="gap:var(--sdcd-2)">
				<?php
				foreach ( $etiquettes as $e ) {
					sdcd_etiquette_e(
						array(
							'libelle' => $e->name,
							'lien'    => get_tag_link( $e->term_id ),
						)
					);
				}
				?>
			</div>
		<?php endif; ?>
	</article>

	<?php
endwhile;

get_footer();
