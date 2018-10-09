# Webpack

Webpack is a *static module bundler* for modern JavaScript applications.

- When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.

*Core Concepts*:

- Entry
- Output
- Loaders
- Plugins

## Entry

An **entry point** indicates which module webpack should use to begin building out its internal *dependency graph*. webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly). 

- By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by configuring the `entry` property in the [webpack configuration](https://webpack.js.org/configuration).  

  ```js
  module.exports = {
      entry: './path/to/my/entry/file.js'
  }
  ```

  

## Output

The `output` property tells webpack where to emit the *bundles* it creates and how to name these files.

- It defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

- You can configure this part of the process by specifying an `output` field in your configuration:

  ```js
  const path = require('path')
  
  module.exports = {
      entry: './path/to/my/entry/file.js',
      output: {
          path: path.resolve(__dirname, 'dist'),
          filename: 'my-first-webpack.bundle.js'
      }
  }
  ```



## Loaders

Out of the box, webpack only understands JavaScript files.

**Loaders** *allow webpack to process other types of files and convert them into valid modules* that can be consumed by your application and added to the dependency graph.

> Note that the ability to `import` any type of module, e.g.`.css` files, is a feature specific to webpack and may not be supported by other bundlers or task runners.

> this extension of the language allows developers to *build a more accurate dependency graph*.

At a high level, **loaders** have two properties in your webpack configuration:

1. The `test` property identifies which file or files should be transformed.
2. The `use` property indicates which loader should be used to do the transforming.

For example:

```js
const path = require('path')

module.exports = {
    output: {
        filename: 'my-first-webpack.bundle.js'
    },
    module: {
        rules: [
            { test: /\.txt$/, use: 'raw-loader' }
        ]
    }
}
```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to transform it before you add it to the bundle."



## Plugins

While loaders are used to transform certain types of modules, plugins can be leveraged to perform a wider range of tasks like bundle optimization, asset management and injection of environment variables.



In order to use a plugin, you need to `require()` it and add it to the `plugins` array. 

- Most plugins are customizable through options.

- Since you can use a plugin multiple times in a config for different purposes, *you need to create an instance of it by calling it with the `new` operator.*

  ```js
  const HtmlWebpackPlugin = require('html-webpack-plugin') // installed via npm
  const webpack = require('webpack')  // to access built-in plugins
  
  module.exports = {
      module: {
          rules: [
              { test: /\.txt$/, use: 'raw-loader' }
          ]
      },
      plugins: [
          new HtmlWebpackPlugin({template: './src/index.html'})
      ]
  }
  ```

  In the example above, the `html-webpack-plugin` generates an HTML file for your application by injecting automatically all your generated bundles.

  > There are many plugins that webpack provides out of the box! Check out the [list of plugins](https://webpack.js.org/plugins). 

Using plugins in your webpack config is straightforward - however, there are many use cases that are worth further exploration. [Learn more about them here](https://webpack.js.org/concepts/plugins). 



## Mode

By setting the `mode` parameter to either `development`, `production` or `none`, you can enable webpack's built-in optimizations that correspond to each environment. The default value is `production`.

```js
module.exports = {
    mode: 'production'
}
```

Learn more about the [mode configuration here](https://webpack.js.org/concepts/mode) and what optimizations take place on each value. 



## Browser Compatibility

webpack supports all browsers that are [ES5-compliant](https://kangax.github.io/compat-table/es5/) (IE8 and below are not supported). webpack needs `Promise` for `import()` and `require.ensure()`. 

*If you want to support older browsers, you will need to [load a polyfill](https://webpack.js.org/guides/shimming/) before using these expressions.* 

#### Shimming

The `webpack` compiler can understand modules written as *ES2015 modules*, *CommonJS* or *AMD*.

- However, some third party libraries may expect global dependencies(e.g. `$` for `jQuery`). The libraries might also create globals which need to be exported. These "broken modules" are one instance where *shimming* comes into play.

  > **We don't recommend using globals!** The whole concept behind webpack is to allow more modular front-end development. This means writing isolated modules that are well contained and do not rely on hidden dependencies (e.g. globals). Please use these features only when necessary. 

- Another instance where *shimming* can be useful is when you want to polyfill browser functionality to support more users.

  - In this case, you may only want to deliver those polyfills to the browsers that need patching (i.e. load them on demand).

- 

https://webpack.js.org/guides/shimming/







## Configuration

Out of the box, webpack won't require you to use a configuration file. However, it will assume the entry point of your project is `src/index` and will output the result in `dist/main.js` minified and optimized for production. 

Usually your projects will need to extend this functionality, for this you can create a `webpack.config.js` file in the root folder and webpack will automatically use it. 

All the available configuration options are specified below. 

https://webpack.js.org/configuration/

```js
const path = require('path')

module.exports = {
    mode: "production", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizatoins accordingly
    entry: "./app/entry", // string | object | array
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        // options related to how webpack emits results
        path: path.resolve(__dirname, "dist"), // string
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        filename: "bundle.js", // string
        publicPath: "https://cdn.example.com/", // string
        // the url to the output directory resolved relative to the HTML page
        library: "MyLibrary", // string
        // the name of the exported library
        libraryTarget: "umd", // universal module definition
        // the type of the exported library
    },
    module: {
        // configuration regarding modules
        rules: [
        // rules for modules (configure loaders, parser options, etc.)
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "app")
                ],
                exclude: [
                    path.resolve(__dirname, "app/demo-files")
                ],
                // these are matching conditions, each accepting a regular expression or string
                // test and include have the same behavior, both must be matched
                // exclude must not be matched (takes preferrence over test and include)
                // Best practices:
                // - Use RegExp only in test and for filename matching
                // - Use arrays of absolute paths in include and exclude
                // - Try to avoid exclude and prefer include
                issuer: {test, include, exclude},
                // conditions for the issuer (the origin of the import)
                enforce: "pre",
                enforce: "post",
                // flags to apply these rules, even if they are overridden (advanced option)
                loader: "babel-loader",
                // the loader which should be applied, it'll be resolved relative to the context
			   // -loader suffix is no longer optional in webpack2 for clarity reasons
                options: {
                    presets: ["es2015"]
                },
                // options for the loader
            },
            {
                test: /\.html$/,
                use: [
                    // apply multiple loaders and options
                    "htmlline-loader",
                    {
                        loader: "html-loader",
                        options: {
                            /* ... */
                        }
                    }
                ]
            },
        ],
        
    },
    resolve: {
        // options for resolvin module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "app")
        ],
        // directories where to look for modules
        extensions: [".js", ".json", ".jsx", ".css"],
        // extensions that are used
        alias: {
            // a list of module name aliases
            "module": "new-module",
            // alias "module" -> "new-module" and "module/path/file" -> "new-module/path/file"
            "only-module$": "new-module",
            // alias "only-module" -> "new-module, but not "only-module/path/file" -> "new-module/path/file"
            "module": path.resolve(__dirname, "app/third/module.js"),
            // alias "module" -> "./app/third/module.js" and "module/file" result in error
            // modules aliases are imported relative to the current context
        },
    },
    performance: {
        hints: "warning", // enum    maxAssetSize: 200000, // int (in bytes),
        maxEntrypointSize: 400000, // int (in bytes)
        assetFilter: function(assetFilename) {
          // Function predicate that provides asset filenames
          return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devtool: "source-map", // enum
    // enhance debugging by adding meta info for the browser devtools
    // source-map most detailed at the expense of build speed.
    context: __dirname, // string (absolute path!)
    // the home directory for webpack
    // the entry and module.rules.loader option is resolved relative to this directory
    target: "web", // enum
    // the environment in which the bundle should run
    // changes chunk loading behavior and available modules
    externals: ["react", /^@angular\//],
    // Don't follow/bundle these modules, but request then at runtime from the environment
    serve: { // object
        port: 1337,
        content: './dist',
    },
    // lets you provide options for webpack-serve
    stats: "errors-only",
    // lets you precisely control what bundle information gets displayed
    devServer: {
        proxy: { // proxy URLs to backend development server
            'api': 'http://localhost:3000'
        },
        contentBase: path.join(__dirname, 'public'), // boolean | string | array, static file location
        compress: true, // enable gzip compression
        historyApiFallback: true, // true for index.html upon 404, object for multiple paths
        hot: true, // hot module replacement. Depends on HotModuleReplacementPlugin
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        
    },
    plugins: [
        
    ]
}
```













