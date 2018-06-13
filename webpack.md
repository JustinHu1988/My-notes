# Concepts

At its core, **webpack** is a *static module bundler* for modern JavaScript applications. When webpack processes your application, it internally builds a *dependency graph* which maps every module your project needs and generates one or more *bundles*.

> Since version 4, **webpack does not require a configuration file** to bundle your project, nevertheless it is [incredibly configurable](https://webpack.js.org/configuration) to better fit your needs.



To get started you only need to understand its **Core Concepts**:

- Entry
- Output
- Loaders
- Plugins



## Entry

An **entry point** indicates which module webpack should use to begin building out its internal *dependency graph*, webpack will figure out which other modules and libraries that entry point depends on (directly and indirectly).

By default its value is `./src/index.js`, but you can specify a different (or multiple entry points) by configuring the **entry** property in the [webpack configuration](https://webpack.js.org/configuration). 

For example:

```javascript
module.exports = {
    entry: './path/to/my/entry/file.js'
};
```



## Output

The **output** property tells webpack where to emit the *bundles* it creates and how to name these files, it defaults to `./dist/main.js` for the main output file and to the `./dist` folder for any other generated file.

You can configure this part of the process by specifying an `output` field in your configuration:

```javascript
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
```

In the example above, we use the `output.filename` and the `output.path` properties to tell webpack the name of our bundle and where we want it to be emitted to.

> the path module being imported at the top, it is a core [Node.js module](https://nodejs.org/api/modules.html) that gets used to manipulate file paths.



## Loaders

*Out of the box, webpack only understands JavaScript files.*

 **Loaders** allow webpack to process other types of files and converting them into valid [modules](https://webpack.js.org/concepts/modules) that can be consumed by your application and added to the dependency graph.

> Note that the ability to `import` any type of module, e.g. `.css` files, is a feature specific to webpack and may not be supported by other bundlers or task runners. We feel this extension of the language is warranted as it allows developers to build a more accurate dependency graph.

At a high level,  **loaders** have two purposes in your webpack configuration:

1. The `test` property identifies which file or files should be transformed.
2. The `use` property indicates which loader should be used to do the transforming.

```javascript
const path = require('path');

module.exports = {
  output: {
    filename: 'my-first-webpack.bundle.js'
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'}
    ]
  }
}
```

The configuration above has defined a `rules` property for a single module with two required properties: `test` and `use`. This tells webpack's compiler the following:

> "Hey webpack compiler, when you come across a path that resolves to a '.txt' file inside of a `require()`/`import` statement, **use** the `raw-loader` to transform it before you add it to the bundle."

> It is important to remember that when defining rules in your webpack config, you are defining them under `module.rules` and not `rules`. For your benefit, webpack will warn you if this is done incorrectly.



## Plugins











