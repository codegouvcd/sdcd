<?php
/**
 * Pied de page.
 *
 * @package sdcd
 */
?>
</main>

<footer role="contentinfo" class="sdcd-footer">
	<?php sdcd_filet_tricolore_e(); ?>

	<div class="sdcd-footer__haut">
		<div>
			<?php sdcd_bloc_marque_e(); ?>
			<p class="sdcd-footer__description"><?php bloginfo( 'description' ); ?></p>
		</div>

		<?php if ( has_nav_menu( 'pied' ) ) : ?>
			<div class="sdcd-footer__colonnes sdcd-grid">
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'pied',
						'container'      => false,
						'menu_class'     => 'sdcd-footer__liste',
						'depth'          => 1,
					)
				);
				?>
			</div>
		<?php endif; ?>
	</div>

	<div class="sdcd-footer__bande">
		<div class="sdcd-footer__bande-corps">
			<?php sdcd_choix_theme_e(); ?>
		</div>
	</div>

	<div class="sdcd-footer__licence">
		<div class="sdcd-footer__licence-corps">
			<?php esc_html_e( 'Sauf mention contraire, tous les contenus de ce site sont sous licence ouverte de l’État congolais.', 'sdcd' ); ?>
		</div>
	</div>
</footer>

<?php wp_footer(); ?>
</body>
</html>
