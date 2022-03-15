<?php

class Rapid_Product_WC_Admin_Page {
 
    /**
     * Autoload method
     * @return void
     */
    public function __construct() {
        add_action( 'admin_menu', array(&$this, 'register_sub_menu') );
    }
 
    /**
     * Register submenu page
     * @return void
     */
    public function register_sub_menu() {
        add_submenu_page( 
            'edit.php?post_type=product', 'Rapid Products', 'Rapid Products', 'manage_options', 'rapid-products', array(&$this, 'admin_page_callback')
        );
    }
 
    /**
     * Render submenu page
     * @return void
     */
    public function admin_page_callback() {
        echo '<div class="rapid-products-wrap"></div>';
    }
 
}
 
new Rapid_Product_WC_Admin_Page();