

## Package.json

it must be actual JSON, not just a JavaScript object literal.

- **`"name"`** and **`"version"`**

  - If you plan to publish your package, the most important things in your package.json are the name and version fields as they will be required.

    - *The name and version together form an identifier* that is assumed to be completely unique.
    - Changes to the package should come along with changes to the version.
    - If you don't plan to publish your package, the name and version fields are optional.

  - rules:

    - The name must be less than or equal to 214 characters. This includes the **scope** for scoped packages. 

      > scopes are a way of grouping related packages together.
      >
      > Each npm user/organization has their own scope, and only you can add packages in your scope. 
      >
      > A scoped package is installed by referencing it by name, preceded by an `@` symbol, in `npm install`:
      >
      > ```
      > npm install @myorg/mypackage
      > ```
      >
      > Or in `package.json`:
      >
      > ```json
      > "dependencies": {
      >   "@myorg/mypackage": "^1.3.0"
      > }
      > ```

    - The name can't start with a dot or an underscore.

    - New packages must *not have uppercase letters* in the name.

    - The name ends up being part of a URL, an argument on the command line, and a folder name. Therefore, the name *can't contain any non-URL-safe characters*.

  - tips

    - Don't use the same name as a core Node module.
    - *Don't put "js" or "node" in the name.* It's assumed that it's js, since you're writing a package.json file, and you can specify the engine using the "engines" field. (See below.)
    - The name will probably be passed as an argument to `require()`, so it should be something short, but also reasonably descriptive. 
    - You may want to check the npm registry to see if there's something by that name already, before you get too attached to it. <https://www.npmjs.com/>

- `"description"`

  - a string. This helps people discover your package.

- `"keywords"`

  - an array of strings. This helps people discover your package.

- `"homepage"`

  - The url to the project homepage, for example:

    ```json
    "homepage": "https://github.com/owner/project#readme"
    ```

- `"bugs"`

  - The url to your project's issue tracker and / or the email address to which issues should be reported. These are helpful for people who encounter issues with your package. 

  - for example:

    ```json
    {"bugs" :
     { 
      "url" : "https://github.com/owner/project/issues", 
      "email" : "project@hostname.com"
     }
    }
    ```

    You can specify either one or both values. If you want to provide only a url, you can specify the value for "bugs" as a simple string instead of an object. 

  - If a url is provided, it will be used by the `npm bugs` command. 

- **`"license"`**

  - You should specify a license for your package so that people know how they are permitted to use it, and any restrictions you're placing on it. 

  - If you're using a common license such as BSD-2-Clause or MIT, add a current SPDX license identifier for the license you're using, like this:

    ```json
    { "license" : "BSD-3-Clause" }
    ```

    You can check [the full list of SPDX license IDs](https://spdx.org/licenses/). Ideally you should pick one that is [OSI](https://opensource.org/licenses/alphabetical)approved.

  - If your package is licensed under multiple common licenses, use an [SPDX license expression syntax version 2.0 string](https://www.npmjs.com/package/spdx), like this:

    ```json
    { "license" : "(ISC OR GPL-3.0)" }
    ```

  - If you are using a license that hasn't been assigned an SPDX identifier, or if you are using a custom license, use a string value like this one:

    ```json
    { "license" : "SEE LICENSE IN <filename>" }
    ```

    Then include a file named `<filename>` at the top level of the package.

  - Finally, if you do not wish to grant others the right to use a private or unpublished package under any terms:

    ```json
    { "license": "UNLICENSED" }
    ```

    Consider also setting `"private": true` to prevent accidental publication.

- **`"author"`** and **`"contributors"`**

  - The "author" is one person. "contributors" is an array of people. A "person" is an object with a "name" field and optionally "url" and "email", like this:

    ```json
    "author" : { "name" : "Barney Rubble", "email" : "b@rubble.com", "url" : "http://barnyrubble.tumblr.com/" }
    ```

    Or you can shorten that all into a single string, and npm will parse it for you:

    ```json
    {"author" : "Barney Rubble <b@rubble.com> (http://barnyrubble.tumblr.com/)"}
    ```

    Both email and url are optional either way.

- `"files"` ???

  - The optional `files` field is an array of file patterns that describes the entries to be included when your package is installed as a dependency. 
  - File patterns follow a similar syntax to `.gitignore`, but reversed: including a file, directory, or glob pattern (`*`, `**/*`, and such) will make it so that file is included in the tarball when it's packed. Omitting the field will make it default to `["*"]`, which means it will include all files. 
  - ... 

- `"main"` ???

  - The `main` field is a module ID that is the primary entry point to your program. That is, if your package is named `foo`, and a user installs it, and then does `require("foo")`, then your main module's exports object will be returned.

    This should be a module ID relative to the root of your package folder.

    For most modules, it makes the most sense to have a main script and often not much else.

- `"browser"` ???

  - If your module is meant to be used client-side the browser field should be used instead of the main field. This is helpful to hint users that it might rely on primitives that aren't available in Node.js modules. (e.g. `window`) 

- **`"bin"`**

  - *A lot of packages have one or more executable files that they'd like to install into the `PATH`*. npm makes this pretty easy (in fact, it uses this feature to install the "npm" executable.) 

  - To use this, supply a `bin` field:

    ```json
    {"bin" : {"myapp": "./cli.js"} }
    ```

    So, when you install myapp, it'll create a symlink from the `cli.js` script to`/usr/local/bin/myapp`. 

  - If you have a single executable, and its name should be the name of the package, then you can just supply it as a string. For example:

    ```json
    { "name": "my-program"
    , "version": "1.2.5"
    , "bin": "./path/to/program" }
    ```

    would be the same as this:

    ```json
    { "name": "my-program"
    , "version": "1.2.5"
    , "bin" : { "my-program" : "./path/to/program" } }
    ```

    Please make sure that your file(s) referenced in `bin` starts with `#!/usr/bin/env node`, otherwise the scripts are started without the node executable!

- **`"man"`**

  - Specify either a single file or an array of filenames to put in place for the `man` program to find. 

  - If only a single file is provided, then it's installed such that it is the result from `man <pkgname>`, regardless of its actual filename. For example:

    ```json
    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : "./man/doc.1"
    }
    ```

    would link the `./man/doc.1` file in such that it is the target for `man foo`

  - If the filename doesn't start with the package name, then it's prefixed. So, this:

    ```json
    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : [ "./man/foo.1", "./man/bar.1" ]
    }
    ```

    will create files to do `man foo` and `man foo-bar`.

  - Man files must end with a number, and optionally a `.gz` suffix if they are compressed. The number dictates which man section the file is installed into.

    ```json
    { "name" : "foo"
    , "version" : "1.2.3"
    , "description" : "A packaged foo fooer for fooing foos"
    , "main" : "foo.js"
    , "man" : [ "./man/foo.1", "./man/foo.2" ]
    }
    ```

    will create entries for `man foo` and `man 2 foo`

- **`"directories"`**

  - The CommonJS [Packages](http://wiki.commonjs.org/wiki/Packages/1.0) spec details a few ways that you can indicate the structure of your package using a `directories` object.  
  - ... ???

- **`"repository"`**

  - *Specify the place where your code lives.*

  - This is helpful for people who want to contribute.

  - if the git repo is on GitHub, then the `npm docs` command will be able to find you.

  - Do like this:

    ```json
    "repository": {
      "type" : "git",
      "url" : "https://github.com/npm/cli.git"
    }
    // or
    "repository": {
      "type" : "svn",
      "url" : "https://v8.googlecode.com/svn/trunk/"
    }
    ```

  - *The URL should be a publicly available (perhaps read-only) url that can be handed directly to a VCS program without any modification*. It should not be a url to an html project page that you put in your browser. *It's for computers*. 

- **`"scripts"`**

  - The `"scripts"` property is a dictionary containing script commands that are run at various times in the lifecycle of your package.
  - The `key` is the lifecycle event, and the `value` is the command to run at that point.

- **`"config"`** ???

  - A "config" object can be used to set configuration parameters used in package scripts that persist across upgrades. For instance, if a package had the following:

    ```
    { "name" : "foo"
    , "config" : { "port" : "8080" } }
    ```

    and then had a "start" command that then referenced the `npm_package_config_port`environment variable, then the user could override that by doing `npm config set foo:port 8001`.

    See `npm-config` and `npm-scripts` for more on package configs.

- **`"dependencies"`**

  - Dependencies are specified in a simple object that maps a package name to a version range. 

  -  The version range is a string which has one or more space-separated descriptors. Dependencies can also be identified with a tarball or git URL. 

  - *Please do not put test harnesses or transpilers in your dependencies  object*. See `devDependencies`, below.

  - See [semver](https://docs.npmjs.com/misc/semver) for more details about specifying version ranges.

    - `version` Must match `version` exactly
    - `>version` Must be greater than `version`
    - `>=version` etc
    - `<version`
    - `<=version`
    - `~version` "Approximately equivalent to version" See [semver](https://docs.npmjs.com/misc/semver)
    - `^version` "Compatible with version" See [semver](https://docs.npmjs.com/misc/semver)
    - `1.2.x` 1.2.0, 1.2.1, etc., but not 1.3.0
    - `http://...` See 'URLs as Dependencies' below
    - `*` Matches any version
    - `""` (just an empty string) Same as `*`
    - `version1 - version2` Same as `>=version1 <=version2`.
    - `range1 || range2` Passes if either range1 or range2 are satisfied.
    - `git...` See 'Git URLs as Dependencies' below
    - `user/repo` See 'GitHub URLs' below
    - `tag` A specific version tagged and published as `tag` See `npm-dist-tag`
    - `path/path/path` See [Local Paths](https://docs.npmjs.com/files/package.json#local-paths) below

  - For example, these are all valid:

    ```json
    { "dependencies" :
      { "foo" : "1.0.0 - 2.9999.9999"
      , "bar" : ">=1.0.2 <2.1.2"
      , "baz" : ">1.0.2 <=2.3.4"
      , "boo" : "2.0.1"
      , "qux" : "<1.0.0 || >=2.3.1 <2.4.5 || >=2.5.2 <3.0.0"
      , "asd" : "http://asdf.com/asdf.tar.gz"
      , "til" : "~1.2"
      , "elf" : "~1.2.3"
      , "two" : "2.x"
      , "thr" : "3.3.x"
      , "lat" : "latest"
      , "dyl" : "file:../dyl"
      }
    }
    ```

  - URLs as Dependencies

    You may specify a tarball URL in place of a version range.

    This tarball will be downloaded and installed locally to your package at install time.

  - Git URLs as Dependencies

    Git urls are of the form:

    ```
    <protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]
    ```

    `<protocol>` is one of `git`, `git+ssh`, `git+http`, `git+https`, or `git+file`.

    If `#<commit-ish>` is provided, it will be used to clone exactly that commit. If the commit-ish has the format `#semver:<semver>`, `<semver>` can be any valid semver range or exact version, and npm will look for any tags or refs matching that range in the remote repository, much as it would for a registry dependency. If neither `#<commit-ish>` or `#semver:<semver>` is specified, then `master` is used.

    Examples:

    ```
    git+ssh://git@github.com:npm/cli.git#v1.0.27
    git+ssh://git@github.com:npm/cli#semver:^5.0
    git+https://isaacs@github.com/npm/cli.git
    git://github.com/npm/cli.git#v1.0.27
    ```

  - GitHub URLs

    As of version 1.1.65, you can refer to GitHub urls as just "foo": "user/foo-project". Just as with git URLs, a `commit-ish` suffix can be included. For example:

    ```
    {
      "name": "foo",
      "version": "0.0.0",
      "dependencies": {
        "express": "expressjs/express",
        "mocha": "mochajs/mocha#4727d357ea",
        "module": "user/repo#feature\/branch"
      }
    }
    ```

  - Local Paths

    As of version 2.0.0 you can provide a path to a local directory that contains a package. Local paths can be saved using `npm install -S` or `npm install --save`, using any of these forms:

    ```
    ../foo/bar
    ~/foo/bar
    ./foo/bar
    /foo/bar
    ```

    in which case they will be normalized to a relative path and added to your`package.json`. For example:

    ```
    {
      "name": "baz",
      "dependencies": {
        "bar": "file:../foo/bar"
      }
    }
    ```

    This feature is helpful for local offline development and creating tests that require npm installing where you don't want to hit an external server, but should not be used when publishing packages to the public registry.

- **`"devDependencies"`**

  - If someone is planning on downloading and using your module in their program, then they probably don't want or need to download and build the external test or documentation framework that you use. 

  - In this case, it's best to map these additional items in a `devDependencies` object.

  - These things will be installed when doing `npm link` or `npm install` from the root of a package, and can be managed like any other npm configuration param. See [npm-config](https://docs.npmjs.com/misc/config) for more on the topic. 

  - For build steps that are not platform-specific, such as compiling CoffeeScript or other languages to JavaScript, use the `prepare` script to do this, and make the required package a devDependency. 

    For example:

    ```json
    { "name": "ethopia-waza",
      "description": "a delightfully fruity coffee varietal",
      "version": "1.2.3",
      "devDependencies": {
        "coffee-script": "~1.6.3"
      },
      "scripts": {
        "prepare": "coffee -o lib/ -c src/waza.coffee"
      },
      "main": "lib/waza.js"
    }
    ```

    The `prepare` script will be run before publishing, so that users can consume the functionality without requiring them to compile it themselves. In dev mode (ie, locally running `npm install`), it'll run this script as well, so that you can test it easily.

- **`"peerDependencies"`**

  - ... https://docs.npmjs.com/files/package.json#peerdependencies

- **`""`**

- **`""`**

- **`""`**

- **`""`**

- **`""`**

- **`""`**





## `npm install`

https://docs.npmjs.com/cli/install











# Packages

## Check/reform code before commit to git

To accomplish this, we need some step:

- detect the `git commit` operation (*use git hook*)
- find all the files we should check/reform
- check/reform code and do `git add` again

then, we can let `git commit` operation run.



*Method 1*: we can use some packages to do these work:

- **husky** : easy to use git hooks, and add operation to the hook
- **lint-staged** : run arbitrary shell/npm tasks with a list of *staged files* as an argument, filtered by a specified glob pattern
- **prettier** : Prettier is an opinionated code formatter. It enforces a consistent style by parsing your code and re-printing it with its own rules that take the maximum line length into account, wrapping code when necessary. 

#### husky

make git hooks easy.

Install by package.json, and add git hooks in "scripts":

```json
{ 
  "devDependencies": {
    "husky": "^0.14.3",
  },
  "scripts": {
    "precommit": "some operation",
    "prepush": "some operation",
    "...": "..."
  }
}
```

after you set in this way, husky can detect `git commit` operation, and do "some operation" before it.

#### lint-staged

This project contains a script that will run arbitrary shell tasks with a list of staged files as an argument, filtered by a specified glob pattern. 











## test you code in a real browser: Karma+jasmine

#### Karma

A simple tool that allows you to execute JavaScript code in multiple *real browsers*.

*Main purpose*: make your test-driven development easy, fast, and fun.

###### How it works

Karma is essentially a tool which *spawns a web server that executes source code against test code for each of the browsers connected*.

- The results of each test against each browser are examined and displayed via the command line to the developer such that they can see which browsers and tests passed or failed.

A browser can be captured either: 

- manually, by visiting the URL where the Karma server is listening (typically `http://localhost:9876/`),
- or automatically by letting Karma know which browsers to start when Karma is run (see [browsers](https://karma-runner.github.io/2.0/config/browsers.html)).

Karma also *watches all the files*, specified within the configuration file, and whenever any file changes, it triggers the test run by sending a signal to the testing server to inform all of the captured browsers to run the test code again. 

- Each browser then loads the source files inside an IFrame, *executes the tests and reports the results back to the server*.

*The server collects the results from all of the captured browsers and presents them to developer*.

###### Configuration File

In order to serve you well, Karma needs to know about your project in order to test it and this is done via a configuration file. 

- The easiest way to generate an initial configuration file is by using the `karma init` command.

- Karma configuration file can be written in JavaScript, CoffeeScript, or Typescript; and is loaded as a regular Node.js module.

- Unless provided as argument, the Karma CLI will look for a configuration file at

  - `./karma.conf.js`
  - `./karma.conf.coffee`
  - `./karma.conf.ts`
  - `./.config/karma.conf.js`
  - `./.config/karma.conf.coffee`
  - `./.config/karma.conf.ts`

  in that order.



Within the configuration file, the configuration code is put together by setting `module.exports` to point to *a function which accepts one argument*:

```js
// karma.conf.js
module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
  });
};
# karma.conf.coffee
module.exports = (config) ->
  config.set
    basePath: '../..'
    frameworks: ['jasmine']
    # ...
// karma.conf.ts
module.exports = (config) => {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
  });
}
```



###### File Patterns

All of the configuration options, which specify file paths, use the [minimatch](https://github.com/isaacs/minimatch) library to facilitate flexible but concise file expressions so you can easily list all of the files you want to include and exclude. 

You can find details about each configuration option in the section below. The following options utilize minimatch expressions:

- `exclude`
- `files`
- `preprocessors`

Examples:

- `**/*.js`: All files with a "js" extension in all subdirectories
- `**/!(jquery).js`: Same as previous, but excludes "jquery.js"
- `**/(foo|bar).js`: In all subdirectories, all "foo.js" or "bar.js" files



###### Configuration options

https://karma-runner.github.io/2.0/config/configuration-file.html

- `autoWatch`
- ...



#### jasmine

A JavaScript testing framework.

...







