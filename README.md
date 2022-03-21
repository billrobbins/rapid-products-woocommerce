# Rapid Products for WooCommerce

This plugin was born out of a need to create products quickly within the WordPress admin. While it's possile to create products in a spreadsheet app and export them via CSV, this has its own drawbacks. Image handling is tedious and errors can be difficult to track down.

This plugin provides a customizable form for creating products in the admin. You select the fields you want to include and the plugin will generate a form with just what you need. It's powered by React and the REST API to speed up the process.

## Development

To work with this plugin, you'll need to use Docker. Once it is installed clone the repository and run `NPM install`. Then you can start developing by running `npx wp-env start` followed by `NPM start`.

When you're ready, you can run `NPM build` to create a distributable build.
