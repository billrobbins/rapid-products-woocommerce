<?php
/**
 * Plugin Name:       Rapid Products for WooCommerce
 * Plugin URI:        https://github.com/billrobbins/rapid-products-woocommerce
 * Description:       A simple interface to quickly create WooCommerce products.
 * Version:           0.2
 * Requires at least: 5.2
 * Requires PHP:      7.4
 * Author:            Bill Robbins
 * Author URI:        https://justabill.blog
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

// Load Admin Page.
require_once plugin_dir_path( __FILE__ ) . '/includes/class-rapid-product-wc-admin-page.php';

// Load REST Endpoint for Options.
require_once plugin_dir_path( __FILE__ ) . '/includes/class-rapid-products-wc-rest-controller.php';

/**
 * Register and enqueue JS and CSS
 */
function rapid_products_load_scripts() {
	if ( isset( $_GET['page'] ) && ! empty( $_GET['page'] ) && 'rapid-products' !== $_GET['page'] ) {
		return;
	}

	$script_path       = '/build/index.js';
	$script_asset_path = dirname( __FILE__ ) . '/build/index.asset.php';
	$script_asset      = file_exists( $script_asset_path )
		? require $script_asset_path
		: array(
			'dependencies' => array(),
			'version'      => filemtime( $script_path ),
		);
	$script_url        = plugins_url( $script_path, __FILE__ );

	wp_register_script(
		'rapid-products',
		$script_url,
		$script_asset['dependencies'],
		$script_asset['version'],
		true
	);

	wp_register_style(
		'rapid-products',
		plugins_url( '/build/index.css', __FILE__ ),
		array(),
		filemtime( dirname( __FILE__ ) . '/build/index.css' )
	);

	wp_enqueue_script( 'rapid-products' );
	wp_enqueue_style( 'rapid-products' );
}

add_action( 'admin_enqueue_scripts', 'rapid_products_load_scripts' );
