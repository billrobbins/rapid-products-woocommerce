<?php

/**
 * Creates REST API Endpoints for Plugin.
 *
 * This class sets up two endpoints for the plugin.  Options allows saving and retreiving of the
 * options for the class.  Fields passes the necessary data for the form fields.
 *
 * @since 0.1
 *
 * @see register_rest_route
 * @link https://developer.wordpress.org/reference/functions/register_rest_route/
 */
class Rapid_Products_WC_REST_Controller {

	/**
	 * Initialize our namespace and resource name
	 *
	 * @return void
	 */
	private function __construct() {
		$this->namespace    = 'rapid-products/v1';
		$this->options_name = 'options';
	}

	/**
	 * Register our routes
	 *
	 * @return void
	 */
	private function register_routes() {
		register_rest_route(
			$this->namespace,
			'/' . $this->options_name,
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'read_option' ),
					'permission_callback' => array( $this, 'get_options_permissions_check' ),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'edit_option' ),
					'permission_callback' => array( $this, 'get_options_permissions_check' ),
				),
			)
		);

		register_rest_route(
			$this->namespace,
			'/' . $this->options_name . '/fields',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'load_fields' ),
					'permission_callback' => array( $this, 'get_options_permissions_check' ),
				),
			)
		);
	}

	/**
	 * Reads our option
	 *
	 * @param  WP_REST_Request $request Current request.
	 * @return  option content.
	 */
	private function read_option( $request ) {

		$content = get_option( 'rapid_products_options' );

		return $content;

	}

	/**
	 * Edits our option
	 *
	 * @param WP_REST_Request $request Current request.
	 * @return option content.
	 */
	private function edit_option( $request ) {

		$options = $request['options'];

		update_option( 'rapid_products_options', $options, '', false );

		$content = get_option( 'rapid_products_options' );

		return $content;

	}

	/**
	 * Loads our fields
	 *
	 * @param WP_REST_Request $request Current request.
	 * @return option content.
	 */
	private function load_fields( $request ) {

		$content = get_option( 'rapid_products_options' );

		$empty = array(
			'id'   => '',
			'name' => '',
		);

		$tf = array(
			$empty,
			array(
				'id'   => true,
				'name' => 'Yes',
			),
			array(
				'id'   => false,
				'name' => 'No',
			),
		);

		$response = array();

		// Every product needs a name.
		$name = array(
			'name'     => 'Name',
			'id'       => 'name',
			'type'     => 'text',
			'value'    => '',
			'required' => true,
		);
		array_push( $response, $name );

		if ( $content['regular_price'] ) {
			$price = array(
				'name'  => 'Price',
				'id'    => 'regular_price',
				'type'  => 'text',
				'value' => '',
			);
			array_push( $response, $price );
		}

		if ( $content['slug'] ) {
			$slug = array(
				'name'  => 'Slug',
				'id'    => 'slug',
				'type'  => 'text',
				'value' => '',
			);
			array_push( $response, $slug );
		}

		if ( $content['sku'] ) {
			$sku = array(
				'name'  => 'SKU',
				'id'    => 'sku',
				'type'  => 'text',
				'value' => '',
			);
			array_push( $response, $sku );
		}

		if ( $content['short_description'] ) {
			$short_description = array(
				'name'  => 'Short Description',
				'id'    => 'short_description',
				'type'  => 'text',
				'value' => '',
			);
			array_push( $response, $short_description );
		}

		if ( $content['description'] ) {
			$description = array(
				'name'  => 'Description',
				'id'    => 'description',
				'type'  => 'textarea',
				'value' => '',
			);
			array_push( $response, $description );
		}

		if ( $content['category'] ) {

			$cats = get_terms(
				array(
					'taxonomy'   => 'product_cat',
					'hide_empty' => false,
				)
			);

			foreach ( $cats as $cat ) {
				$cat_list[] = array(
					'id'   => $cat->term_id,
					'name' => $cat->name,
				);
			}

			array_unshift( $cat_list, $empty );

			$category = array(
				'name'    => 'Category',
				'id'      => 'category',
				'type'    => 'select',
				'value'   => '',
				'options' => $cat_list,
			);
			array_push( $response, $category );
		}

		// stock_quantity and backorders require manage_stock == true.
		if ( $content['manage_stock'] ) {
			$manage_stock = array(
				'name'     => 'Manage Stock',
				'id'       => 'manage_stock',
				'type'     => 'select',
				'required' => true,
				'options'  => $tf,
				'value'    => true,
			);
			array_push( $response, $manage_stock );
			$stock_quantity = array(
				'name'  => 'Stock Quantity',
				'id'    => 'stock_quantity',
				'type'  => 'number',
				'value' => '',
			);
			array_push( $response, $stock_quantity );
			$backorders = array(
				'name'    => 'Backorders',
				'id'      => 'backorders',
				'type'    => 'select',
				'value'   => 'no',
				'options' => array(
					$empty,
					array(
						'id'   => 'no',
						'name' => 'No',
					),
					array(
						'id'   => 'notify',
						'name' => 'Notify Customer',
					),
					array(
						'id'   => 'yes',
						'name' => 'Yes',
					),
				),
			);
			array_push( $response, $backorders );
		}

		if ( $content['sold_individually'] ) {
			$sold_individually = array(
				'name'    => 'Sold Individually',
				'id'      => 'sold_individually',
				'type'    => 'select',
				'value'   => false,
				'options' => $tf,
			);
			array_push( $response, $sold_individually );
		}

		if ( $content['tax_status'] ) {
			$tax_status = array(
				'name'    => 'Tax Status',
				'id'      => 'tax_status',
				'type'    => 'select',
				'value'   => 'taxable',
				'options' => array(
					$empty,
					array(
						'id'   => 'taxable',
						'name' => 'Taxable',
					),
					array(
						'id'   => 'none',
						'name' => 'None',
					),
					array(
						'id'   => 'shipping',
						'name' => 'Shipping',
					),
				),
			);
			array_push( $response, $tax_status );
		}

		if ( $content['weight'] ) {
			$weight = array(
				'name'  => 'Weight',
				'id'    => 'weight',
				'type'  => 'number',
				'value' => '',
			);
			array_push( $response, $weight );
		}

		if ( $content['dimensions'] ) {
			$dimensions = array(
				'name'    => 'Dimensions',
				'id'      => 'dimensions',
				'type'    => 'group',
				'value'   => array(),
				'options' => array(
					array(
						'name'  => 'Length',
						'id'    => 'length',
						'type'  => 'text',
						'value' => '',
					),
					array(
						'name'  => 'Width',
						'id'    => 'width',
						'type'  => 'text',
						'value' => '',
					),
					array(
						'name'  => 'Height',
						'id'    => 'height',
						'type'  => 'text',
						'value' => '',
					),
				),
			);
			array_push( $response, $dimensions );
		}

		return apply_filters( 'rapid_products_form_fields', $response );

	}

	/**
	 * Sets up the proper HTTP status code for authorization.
	 *
	 * @return HTTP status code
	 */
	private function authorization_status_code() {

		$status = 401;

		if ( is_user_logged_in() ) {
			$status = 403;
		}

		return $status;
	}

	/**
	 * Check permissions for the options.
	 *
	 * @return boolean for permissions
	 */
	private function get_options_permissions_check() {
		if ( ! current_user_can( 'edit_posts' ) ) {
			return new WP_Error( 'rest_forbidden', esc_html__( 'You cannot view these.  Sorry!' ), array( 'status' => $this->authorization_status_code() ) );
		}
		return true;
	}
}

/**
 * Function to register our new routes from the controller.
 *
 * @return void
 */
function rapid_products_wc_register_rest_routes() {
	$controller = new Rapid_Products_WC_REST_Controller();
	$controller->register_routes();
}

add_action( 'rest_api_init', 'rapid_products_wc_register_rest_routes' );
