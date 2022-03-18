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
                'permission_callback' => $this->get_options_permissions_check
            ),
            array(
                'methods' => WP_REST_Server::EDITABLE,
                'callback' => array( $this, 'edit_option' ),
                'permission_callback' => $this->get_options_permissions_check
            ),
        ) );
    }

    /**
     * Reads our store option
     *
     * @param WP_REST_Request $request Current request.
     * @return option content.
     */
    public function read_option( $request ) {

        $content = get_option( 'rapid_products_options' );
    
        return $content;
    
    }
    
    /**
     * Edits our store option
     *
     * @param WP_REST_Request $request Current request.
     * @return option content.
     */
    public function edit_option( $request ) {
    
        $option = $request;
    
        update_option( 'rapid_products_options', $option );
    
        $content =  get_option( 'rapid_products_options' );
    
        return $content;
        
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
            return new WP_Error( 'rest_forbidden', esc_html__( 'You cannot view the options.  Sorry!' ), array( 'status' => $this->authorization_status_code() ) );
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