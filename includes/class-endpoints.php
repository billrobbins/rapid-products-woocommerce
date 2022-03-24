<?php

class Rapid_Products_WC_REST_Controller {
 
    /**
     * Initialize our namespace and resource name
     * @return void
     */
    public function __construct() {
        $this->namespace     = 'rapid-products/v1';
        $this->options_name  = 'options';
    }
 
    /**
     * Register our routes
     * @return void
     */
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->options_name, array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'read_option' ),
                'permission_callback' => array( $this, 'get_options_permissions_check' )
            ),
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array( $this, 'edit_option' ),
                'permission_callback' => array( $this, 'get_options_permissions_check' )
            ),
        ) );

        register_rest_route( $this->namespace, '/' . $this->options_name. '/fields', array(
            array(
                'methods' => WP_REST_Server::READABLE,
                'callback' => array( $this, 'load_fields' ),
                'permission_callback' => array( $this, 'get_options_permissions_check' )
            ),
        ) );
    }

    /**
     * Reads our option
     *
     * @param WP_REST_Request $request Current request.
     * @return option content.
     */
    public function read_option( $request ) {

        $content = get_option( 'rapid_products_options' );
    
        return $content;
    
    }
    
    /**
     * Edits our option
     *
     * @param WP_REST_Request $request Current request.
     * @return option content.
     */
    public function edit_option( $request ) {
    
        $options = $request['options'];
    
        update_option( 'rapid_products_options', $options );
    
        $content =  get_option( 'rapid_products_options' );
    
        return $content;
        
    }

    /**
     * Loads our fields
     *
     * @param WP_REST_Request $request Current request.
     * @return option content.
     */
    public function load_fields( $request ) {

        $content = get_option( 'rapid_products_options' );

        $tf = [
            [
                'id' => true,
                'name' => 'Yes'
            ],
            [
                'id' => false,
                'name' => 'No'
            ]
        ];

        $response = [];

        // Every product needs a name
        $name = [
            'name' => 'Name',
            'id' => 'name',
            'type' => 'text',
            'value' => '',
            'required' => true
        ];
        array_push($response, $name);
        

        if ( $content['regular_price']) {
            $price = [
                'name' => 'Price',
                'id' => 'regular_price',
                'type' => 'text',
                'value' => ''
            ];
            array_push($response, $price);
        }

        if ( $content['slug']) {
            $slug = [
                'name' => 'Slug',
                'id' => 'slug',
                'type' => 'text',
                'value' => ''
            ];
            array_push($response, $slug);
        }

        if ( $content['sku']) {
            $sku = [
                'name' => 'SKU',
                'id' => 'sku',
                'type' => 'text',
                'value' => ''
            ];
            array_push($response, $sku);
        }

        if ( $content['short_description']) {
            $short_description = [
                'name' => 'Short Description',
                'id' => 'short_description',
                'type' => 'text',
                'value' => ''
            ];
            array_push($response, $short_description);
        }

        if ( $content['description']) {
            $description = [
                'name' => 'Description',
                'id' => 'description',
                'type' => 'textarea',
                'value' => ''
            ];
            array_push($response, $description);
        }

        if ( $content['category']) {

            $cats = get_terms([
                'taxonomy' => 'product_cat',
                'hide_empty' => false,
             ]);

            foreach ($cats as $cat) {
                $cat_list[] = [
                    'id' => $cat->term_id,
                    'name' => $cat->name
                ];
            }

            $empty = [
                'id' => '',
                'name' => ''
            ];

            array_unshift($cat_list, $empty);

            $category = [
                'name' => 'Category',
                'id' => 'category',
                'type' => 'select',
                'value' => '',
                'options' => $cat_list
            ];
            array_push($response, $category);
        }

        if ( $content['weight']) {
            $weight = [
                'name' => 'Weight',
                'id' => 'weight',
                'type' => 'number',
                'value' => ''
            ];
            array_push($response, $weight);
        }

        // stock_quantity and backorders require manage_stock == true
        if ( $content['manage_stock']) {
            $manage_stock = [
                'name' => 'Manage Stock',
                'id' => 'manage_stock',
                'type' => 'select',
                'required' => true,
                'options' => $tf,
                'value' => true
            ];
            array_push($response, $manage_stock);
            $stock_quantity = [
                'name' => 'Stock Quantity',
                'id' => 'stock_quantity',
                'type' => 'number',
                'value' => ''
            ];
            array_push($response, $stock_quantity);
            $backorders = [
                'name' => 'Backorders',
                'id' => 'backorders',
                'type' => 'select',
                'value' => '',
                'options' => [
                    [
                        'id' => 'no',
                        'name' => 'No'
                    ],
                    [
                        'id' => 'notify',
                        'name' => 'Notify Customer'
                    ],
                    [
                        'id' => 'yes',
                        'name' => 'Yes'
                    ],
                ]
            ];
            array_push($response, $backorders);
        }

        if ( $content['sold_individually']) {
            $sold_individually = [
                'name' => 'Sold Individually',
                'id' => 'sold_individually',
                'type' => 'select',
                'value' => false,
                'options' => $tf,
            ];
            array_push($response, $sold_individually);
        }

        if ( $content['tax_status']) {
            $tax_status = [
                'name' => 'Tax Status',
                'id' => 'tax_status',
                'type' => 'select',
                'value' => '',
                'options' => [
                    [
                        'id' => 'taxable',
                        'name' => 'Taxable'
                    ],
                    [
                        'id' => 'none',
                        'name' => 'None'
                    ],
                    [
                        'id' => 'shipping',
                        'name' => 'Shipping'
                    ],
                ]
            ];
            array_push($response, $tax_status);
        }

        return apply_filters( 'rapid_products_form_fields', $response );
    
    }
 
    /**
     * Sets up the proper HTTP status code for authorization.
     * @return HTTP status code
     */
    public function authorization_status_code() {
 
        $status = 401;
 
        if ( is_user_logged_in() ) {
            $status = 403;
        }
 
        return $status;
    }

    /**
     * Check permissions for the options.
     *
     * @param WP_REST_Request $request Current request.
     * @return boolean for permissions
     */
    public function get_options_permissions_check() {
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