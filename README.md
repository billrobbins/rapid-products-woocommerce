# Rapid Products for WooCommerce

This plugin was born out of a need to create products quickly within the WordPress admin. While it's possile to create products in a spreadsheet app and export them via CSV, this has its own drawbacks. Image handling is tedious and errors can be difficult to track down.

This plugin provides a customizable form for creating products in the admin. You select the fields you want to include and the plugin will generate a form with just what you need. It's powered by React and the REST API to speed up the process.

![rapid-products-ui](https://user-images.githubusercontent.com/1138631/160152349-90fbb688-5f15-4ea2-90a8-404b2bd9816d.png)

## Development

To work with this plugin, you'll need to use Docker. Once it is installed clone the repository. Then you can get started with these commands.

```
npm install
npx wp-env start
npm start
```

The site will be available at http://localhost:8888 with the username: `admin` and password: `password`.
