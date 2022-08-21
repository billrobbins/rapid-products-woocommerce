<?php

/**
 * Creates Admin Page.
 *
 * This class registeres a new nav menu item under "Products" for our Rapid Products UI.
 * Since the form is created in React, this simply creates a div that will be used to insert the form.
 *
 * @since 0.1
 *
 * @see add_submenu_page
 * @link https://developer.wordpress.org/reference/functions/add_submenu_page/
 */

class Rapid_Product_WC_Admin_Page {

	/**
	 * Autoload method
	 *
	 * @return void
	 */
	public function __construct() {
		add_action( 'admin_menu', array( &$this, 'register_sub_menu' ) );
	}

	/**
	 * Register submenu page
	 *
	 * @return void
	 */
	public function register_sub_menu() {
		add_submenu_page(
			'edit.php?post_type=product',
			'Rapid Products',
			'Rapid Products',
			'manage_options',
			'rapid-products',
			array( &$this, 'admin_page_callback' )
		);
	}

	/**
	 * Render submenu page
	 *
	 * @return void
	 */
	public function admin_page_callback() {
		echo '<div class="rapid-products-wrap"></div>';
	}

}

new Rapid_Product_WC_Admin_Page();
