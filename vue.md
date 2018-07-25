Directive:

- Directives are prefixed with `v-` to indicate that they are special attributes provided by Vue.
- `v-bind`
- ``



## [Handling User Input](https://vuejs.org/v2/guide/#Handling-User-Input)

###### `v-on`

To let users interact with your app, we can use the `v-on` directive to attach event listeners that invoke methods on our Vue instances:

```Vue
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```Javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

Note that in this method we update the state of our app without touching the DOM - all DOM manipulations are handled by Vue, and the code you write is focused on the underlying logic.



###### `v-model`

Vue also provides the `v-model` directive that makes two-way binding between form input and app state a breeze:

```vue
<div id="app-6">
  <p>{{ message }}</p>
  <input v-model="message">
</div>
```

```javascript
var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})
```



## [Composing with Components](https://vuejs.org/v2/guide/#Composing-with-Components)

The component system is another important concept in Vue, because it's an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components:

<img src="https://vuejs.org/images/components.png" width="600">

In Vue, a component is essentially a Vue instance with pre-defined options. Registering a component in Vue is straightforward:

```javascript
// Define a new component called todo-item
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})
```

Now you can compose it in another component's template:

```Vue
<ol>
  <!-- Create an instance of the todo-item component -->
  <todo-item></todo-item>
</ol>
```

But this would render the same text for every todo, which is not super interesting. 

We should be able to *pass data from the parent scope into child components*. Let's modify the component definition to make it accept a [prop](https://vuejs.org/v2/guide/components.html#Props):

```vue
<div id='app-7'>
  <ol>
    <todo-item
       v-for="item in groceryList"
       v-bind:todo="item"
       v-bind:key="item.id">
    </todo-item>
  </ol>
</div>

<script>
Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
  
const app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [
      { id:0, text: 'Vegetables'},
      { id:1, text: 'Cheese'},
      { id:2, text: 'Whatever else humans are supposed to eat'}
    ]
  }
})
</script>
```

This code will generate:

```html
<div id='app-7'>
  <ol>
    <li>Vegetables</li>
    <li>Cheese</li>
    <li>Whatever else humans are supposed to eat</li>
  </ol>
</div>
```



Vue components provide important features that are not available in plain custom elements, most notably cross-component data flow, custom event communication and build tool integrations.



## MVVM(Model-view-viewmodel)

a software architectural pattern, also referred to as *model-view-binder*.

MVVM facilitates a separation of development of the graphical user interface — be it via a markup language or GUI code — from development of the business logic or back-end logic (the data model).

The *viewmodel* of MVVM is a value converter:

- meaning the viewmodel is responsible for exposing(converting) the data objects from the model in such a way that objects are easily managed and presented.
- In this respect, the view model is more model than view, and handles most if not all of the view's display logic.
- The view model may implement a mediator pattern, organizing access to the back-end logic around the set of use cases supported by the view.



## The Vue Instance

When you create a Vue instance, you pass in an *options object.*

A Vue application consists of a **root Vue instance** created with `new Vue`, optionally organized into a tree of nested, reusable components. For example, a todo app’s component tree might look like this:

```
Root Instance
└─ TodoList
   ├─ TodoItem
   │  ├─ DeleteTodoButton
   │  └─ EditTodoButton
   └─ TodoListFooter
      ├─ ClearTodosButton
      └─ TodoListStatistics

```

We’ll talk about [the component system](https://vuejs.org/v2/guide/components.html) in detail later. For now, just know that all Vue components are also Vue instances, and so accept the same options object (except for a few root-specific options).



#### Data and Methods

When a Vue instance is created, it adds all the properties found in its `data` object to Vue's  **reactivity system**. 

- When the values of those properties change, the view will “react”, updating to match the new values.

*When this data changes, the view will re-render.*

- It should be noted that properties in `data`are only **reactive** if they existed when the instance was created. That means if you add a new property, like:

  ```Javascript
  vm.b = 'hi'
  ```

  Then changes to `b` will not trigger any view updates. If you know you’ll need a property later, but it starts out empty or non-existent, you’ll need to set some initial value. For example:

  ```Javascript
  data: {
    newTodoText: '',
    visitCount: 0,
    hideCompletedTodos: false,
    todos: [],
    error: null
  }
  ```

  The only exception to this being the use of `Object.freeze()`, which prevents existing properties from being changed, which also means the reactivity system can’t *track* changes.

  ```Javascript
  var obj = {
    foo: 'bar'
  }

  Object.freeze(obj)

  new Vue({
    el: '#app',
    data: obj
  })
  ```

  ```Vue
  <div id="app">
    <p>{{ foo }}</p>
    <!-- this will no longer update `foo`! -->
    <button v-on:click="foo = 'baz'">Change it</button>
  </div>
  ```

  In addition to data properties, Vue instances expose a number of useful instance properties and methods. These are prefixed with `$` to differentiate them from user-defined properties. For example:

  ```Javascript
  var data = { a: 1 }
  var vm = new Vue({
    el: '#example',
    data: data
  })

  vm.$data === data // => true
  vm.$el === document.getElementById('example') // => true

  // $watch is an instance method
  vm.$watch('a', function (newValue, oldValue) {
    // This callback will be called when `vm.a` changes
  })
  ```





#### Instance Lifecycle Hooks

For example, the [`created`](https://vuejs.org/v2/api/#created) hook can be used to run code after an instance is created:

```javascript
new Vue({
  data: {
    a: 1
  },
  created: function () {
    // `this` points to the vm instance
    console.log('a is: ' + this.a)
  }
})
// => "a is: 1"
```

There are also other hooks which will be called at different stages of the instance’s lifecycle, such as [`mounted`](https://vuejs.org/v2/api/#mounted), [`updated`](https://vuejs.org/v2/api/#updated), and [`destroyed`](https://vuejs.org/v2/api/#destroyed). All lifecycle hooks are called with their `this`context pointing to the Vue instance invoking it.

> Don’t use [arrow functions](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions) on an options property or callback, such as `created: () => console.log(this.a)` or `vm.$watch('a', newValue => this.myMethod())`. Since arrow functions are bound to the parent context, `this` will not be the Vue instance as you’d expect, often resulting in errors such as `Uncaught TypeError: Cannot read property of undefined` or `Uncaught TypeError: this.myMethod is not a function`.



#### Lifecycle Diagram

<img src='https://vuejs.org/images/lifecycle.png' width='500'>



## Template Syntax

Under the hood, Vue compiles the templates into Virtual DOM render functions.

- Combined with the reactivity system, Vue *is able to intelligently figure out the minimal number of components to re-render and apply the minimal amount of DOM manipulations when the app state changes*.



#### Interpolations

###### Text

- The most basic form of data binding is text interpolation using the "Mustache" syntax (double curly braces):

  ```vue
  <span>Message: {{msg}}</span>
  ```

  The mustache tag will be replaced with the value of the `msg` property on the corresponding data object.
  - It will also be *updated* whenever the data object's `msg` property changes.

- You can also perform one-time interpolations that do not update on data change by using the [v-once directive](https://vuejs.org/v2/api/#v-once), but keep in mind this will also affect any other bindings on the same node:

  ```vue
  <span v-once>This will never change: {{msg}}</span>
  ```

###### Raw HTML

- The double mustaches interprets the data as plain text, not HTML. In order to output real HTML, you will need to use the `v-html` directive:

  ```vue
  <p>
    Using mustaches: {{rawHtml}}
  </p>
  <p>
    Using v-html directive: <span v-html="rawHtml"></span>
  </p>
  ```

  - The contents of the `span` will be replaced with the value of the `rawHtml` property, interpreted as plain HTML - data bindings are ignored. 
  - Note that you cannot use `v-html`to compose template partials, because Vue is not a string-based templating engine. 
  - Instead, components are preferred as the fundamental unit for UI reuse and composition.

> Dynamically rendering arbitrary HTML on your website can be very dangerous because it can easily lead to [XSS vulnerabilities](https://en.wikipedia.org/wiki/Cross-site_scripting). Only use HTML interpolation on trusted content and **never** on user-provided content.



###### Attributes

Mustaches cannot be used inside HTML attributes. Instead, use a [v-bind directive](https://vuejs.org/v2/api/#v-bind):

```vue
<div v-bind:id="dynamicId"></div>
```

In the case of boolean attributes, where their mere existence implies `true`, `v-bind` works a little differently. In this example:

```vue
<button v-bind:disabled="isButtonDisabled">
  Button
</button>
```

If `isButtonDisabled` has the value of `null`, `undefined`, or `false`, the `disabled` attribute will not even be included in the rendered `<button>` element.



###### Using JavaScript Expressions

Vue.js actually *supports the full power of JavaScript expressions inside all data bindings:*

```vue
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind="'list-' + id"></div>
```

These expressions will be evaluated as JavaScript in the data scope of the owner Vue instance.

- One restriction is that each binding can only contain *one single expression*, so the following will not work:

  ```vue
  <!-- this is a statement, not an expression -->
  {{ var a = 1 }}

  <!-- flow control won't work either, use ternary expressions -->
  {{ if (ok) {return message} }}
  ```

> Template expressions are sandboxed and only have access to a whitelist of globals such as `Math` and `Date`. You should not attempt to access user defined globals in template expressions.



#### Directives

Directives are special attributes with the `v-` prefix.

- Directive attribute values are expected to be **a single JavaScript expression** (with the exception for `v-for`, which will be discussed later). 

- A directive's job is to reactively apply side effects to the DOM when the value of its expression changes.

  - For example:

    ```vue
    <p v-if="seen">Now you see me</p>
    ```

    Here, the `v-if` directive would remove/insert the `<p>` element based on the truthiness of the value of the expression `seen`.

###### Arguments

Some directives can take an "argument", denoted by a colon after the directive name. For example:

- the `v-bind` directive is used to reactively update an HTML attribute:

  ```vue
  <a v-bind:href="url"></a>
  ```

  Here `href` is the argument, which tells the `v-bind` directive to bind the element's `href` attribute to the value of the expression `url`.

- Another example is the *`v-on` directive, which listens to DOM events:*

  ```vue
  <a v-on:click="doSomething">...</a>
  ```

  Here the argument is the event name to listen to. We will talk about event handling in more detail too.

###### Modifiers

Modifiers are special postfixes denoted by a dot, which indicate that a directive should be bound in some special way.

For example, the `.prevent` modifier tells the `v-on` directive to call `event.preventDefault()` on the triggered event:

```vue
<form v-on:submit.prevent="onSubmit">
  ...
</form>
```

You'll see other examples of modifiers later, [for `v-on`](https://vuejs.org/v2/guide/events.html#Event-Modifiers) and [for `v-model`](https://vuejs.org/v2/guide/forms.html#Modifiers), when we explore those features.



#### Shorthands

Vue.js provides special shorthands for two of the most often used directives, `v-bind` and `v-on`:

- `v-bind` Shorthand

  ```vue
  <!-- full syntax -->
  <a v-bind:href="url"></a>
  <!-- shorthand -->
  <a :href="url"></a>
  ```

- `v-on` Shorthand

  ```vue
  <!-- full syntax -->
  <a v-on:click="doSomething"></a>
  <!-- shorthand -->
  <a @click="doSomething"></a>
  ```

  ​



#### **SPA**

A *single-page application* is a web application or web site that interacts with the user by dynamically rewriting the current page rather than loading entire new pages from a server.

- This approach avoids interruption of the user experience between successive pages, making the application behave more like a desktop application.
- The page does not reload at any point in the process, nor does controls transfer to another page, although the *location hash* or the *HTML5 History API*(`window.history`) can be used to provide the perception and navigability of separate logical pages in the application.
- Interaction with the single page application often involves dynamic communication with the web server behind the scenes.

> **location hash** (fragment identifier) : The fragment identifier introduced by a hash mark **#** is the optional last part of a [URL](https://en.wikipedia.org/wiki/Uniform_Resource_Locator) for a document. It is typically used to identify a portion of that document. The [hash mark](https://en.wikipedia.org/wiki/Number_sign) separator in URIs does not belong to the fragment identifier. 



###### *Technical approaches*???

There are various techniques available that enable the browser to retain a single page even when the application requires server communication.

Mature open-source libraries are available that support the building of an SPA, reducing the amount of JavaScript code the developer has to write.

- *JavaScript frameworks*

  - AngularJS
  - Ember.js
  - Knockout.js
  - Meteor.js
  - ExtJS
  - React
  - Vue

- Ajax

- Websockets

  - WebSockets are a bidirectional stateful real-time client-server communication technology part of the HTML5 specification, superior to Ajax in terms of performance and simplicity.

- Sever-sent events

- Browser plugins

- Data transport (XML, JSON and Ajax)

- Server architecture

  - *Thin server architecture*

    - An SPA moves logic from the server to the client.
    - This results in the role of the web server evolving into a pure data API or web service.

  - *Thick stateful server architecture*

    - The server keeps the necessary *state* in memory of the client state of the page. 

    - In this way, when any request hits the server (usually user actions), the server sends the appropriate HTML and/or JavaScript with the concrete changes to bring the client to the new desired state (usually adding/deleting/updating a part of the client DOM). At the same time, the state in server is updated. 

    - Most of the logic is executed on the server, and HTML is usually also rendered on the server. In some ways, the server simulates a web browser, receiving events and performing delta changes in server state which are automatically propagated to client.

    - This approach needs more server memory and server processing, but the advantage is a simplified development model because:

      - the application is usually fully coded in the server


      - data and UI state in the server are shared in the same memory space with no need for custom client/server communication bridges.

  - *Thick stateless server architecture*

    - This is a variant of the stateful server approach. The client page sends data representing its current state to the server, usually through Ajax requests. Using this data, the server is able to reconstruct the client state of the part of the page which needs to be modified and can generate the necessary data or code (for instance, as JSON or JavaScript), which is returned to the client to bring it to a new state, usually modifying the page DOM tree according to the client action which motivated the request.
    - This approach requires that more data be sent to the server and may require more computational resources per request to partially or fully reconstruct the client page state in the server. At the same time, this approach is more easily scalable because there is no per-client page data kept in the server and, therefore, Ajax requests can be dispatched to different server nodes with no need for session data sharing or server affinity.





## Computed Properties and Watchers

#### Computed Properties

for any complex logic, you should use a **computed property**.

- Basic Example

  ```vue
  <div id="example">
    <p>Original message: "{{message}}"</p>
    <p>Computed reversed message: "{{reversedMessage}}"</p>
  </div>
  ```

  ```javascript
  var vm = new Vue({
    el:'#example',
    data:{
      message: 'Hello'
    },
    computed: {
      // a computed getter
      reversedMessage: function(){
        // `this` points to the vm instance
        return this.message.split('').reverse().join('')
  	}
    }
  })
  ```

  Here we have declared a computed property `reversedMessage`. The function we provided will be used as the getter function for the property `vm.reversedMessage`:

  ```javascript
  console.log(vm.reversedMessage) // 'olleH'
  vm.message = 'Goodbye'
  console.log(vm.reversedMessage) // 'eybdooG'
  ```

  The value of `vm.reversedMessage` is always dependent on the value of `vm.message`.

- *Computed Caching vs Methods*

  - You may have noticed we can achieve the same result by invoking a method in the expression:

    ```vue
    <p>
      Reversed message: "{{reverseMessage()}}"
    </p>
    ```

    ```javascript
    // in component
    methods: {
        reverseMessage: function(){
            return this.message.split('').reverse().join('')
        }
    }
    ```

  - the difference is that : **computed properties are cached based on their dependencies.**

    - A computed property will only re-evaluate when some of its dependencies have changed.
    - This means as long as `message` has not changed, multiple access to the `reverseMessage` computed property will immediately return the previously computed result without having to run the function again.

  - This also means the following computed property will never update, because `Date.now()` is not a reactive dependency:

    ```javascript
    computed:{
        now: function(){
            return Date.now()
        }
    }
    ```

    In comparison, a method invocation will *always* run the function whenever a re-render happens.

  - You can choose use `computed` or `method` by different usage.

- *Computed vs Watched Property*

  - Vue does provide a more generic way to observe and react to data changes on a Vue instance: **watch properties**. 

  - When you have some data that needs to change based on some other data, it is tempting to overuse `watch`. However, it is often a better idea to use a computed property rather than an imperative `watch` callback.

  - *Consider this example:*

    ```vue
    <div id="demo">
      {{fullName}}
    </div>
    ```

    ```javascript
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar',
        fullName: 'Foo Bar'
      },
      watch: {
        firstName: function(val){
          this.fullName = val + ' ' + this.lastName
        },
        lastName: function(val){
          this.fullName = this.firstName + ' ' + val
        }
      }
    })
    ```

    The above code is imperative and repetitive. Compare it with a computed property version:

    ```javascript
    var vm = new Vue({
      el: '#demo',
      data: {
        firstName: 'Foo',
        lastName: 'Bar'
      },
      computed: {
        fullName: function(){
          return this.firstName + ' ' + this.lastName
        }
      }
    })
    ```

- *Computed Setter:*

  - Computed properties are by default getter-only, but you can also provide a setter when you need it:

    ```javascript
    // ...
    computed: {
      fullName: {
        // getter
        get: function(){
          return this.firstName + ' ' + this.lastName
        },
        // setter
        set: function(newValue){
          var names = newValue.split(' ')
          this.firstName = name[0]
          this.laseName = name[name.length-1]
        }
      }
    }
    ```


#### Watchers

While computed properties are more appropriate in most cases, there are times when a custom watcher is necessary.

This is most useful when you want to *perform asynchronous or expensive operations in response to changing data*.

- *For example*: 

  ```vue
  <div id="watch-example">
    <p>
      Ask a yes/no question:
      <input v-model="question">
    </p>
    <p>
      {{ answer }}
    </p>
  </div>
  ```

  ```vue
  <!-- Since there is already a rich ecosystem of ajax libraries    -->
  <!-- and collections of general-purpose utility methods, Vue core -->
  <!-- is able to remain small by not reinventing them. This also   -->
  <!-- gives you the freedom to use what you're familiar with. -->
  <script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>
  <script>
  var watchExampleVM = new Vue({
    el: '#watch-example',
    data: {
      question: '',
      answer: 'I cannot give you an answer until you ask a question!'
    },
    watch: {
      // whenever question changes, this function will run
      question: function (newQuestion, oldQuestion){
        this.answer = 'Waiting for you to stop typing...'
        this.debouncedGetAnswer()
      }
    },
    created: function(){
      // _.debounce is a function provided by lodash to limit how
      // often a particularly expensive operation can be run.
      // In this case, we want to limit how often we access
      // yesno.wtf/api, waiting until the user has completely
      // finished typing before making the ajax request. To learn
      // more about the _.debounce function (and its cousin
      // _.throttle), visit: https://lodash.com/docs#debounce
      this.debounceGetAnswer = _.debounce(this.getAnswer, 500)
    },
    methods: {
      getAnswer: function(){
        if(this.question.indexOf('?') === -1){
          this.answer = 'Questions usually contain a question mark. ;-)'
          return
        }
        this.answer = 'Thinking...'
        var vm = this
        axios.get('https://yesno.wtf/api')
        	.then(function(response){
            vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function(error){
          vm.answer = 'Error! Could not reach the API. ' + error
        })
      }
    }
  })
  </script>
  ```

  *In this case, using the `watch` option allows us to perform an asynchronous operation (accessing an API), limit how often we perform that operation, and set intermediary states until we get a final answer. None of that would be possible with a computed property.???*

  In addition to the `watch` option, you can also use the imperative [vm.$watch API](https://vuejs.org/v2/api/#vm-watch).





## Class and Style Bindings

A common need for data binding is manipulating an element's class list and its inline styles. 

- Since they are both attributes, we can use `v-bind` to handle them: we only need to calculate a final string with our expressions. 
- However, meddling with string concatenation is annoying and error-prone.
- For this reason, *Vue provides special enhancements when `v-bind` is used with `class` and `style`.* 
- In addition to strings, the expressions can also evaluate to objects or arrays.




#### Binding HTML Classes

###### Object Syntax

We can pass an object to `v-bind:class` to dynamically toggle classes:

```vue
<div :class="{ active: isActive }"></div>
```

The above syntax means the presence of the `active` class will be determined by the [truthiness](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) of the data property `isActive`.

You can have multiple classes toggled by having more fields in the object. In addition, the `v-bind:class` directive can also co-exist with the plain `class` attribute. So given the following template:

```vue
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }">
</div>
```

And the following data:

```javascript
data: {
    isActive:true,
    hasError:false
}
```

It will render:

```vue
<div class="static active"></div>
```

When `isActive` or `hasError` changes, the class list will be updated accordingly.

The bound object doesn't have to be inline:

```vue
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  classObject: {
    active: true,
    'text-danger': false
  }
}
```

This will render the same result. We can also bind to a [computed property](https://vuejs.org/v2/guide/computed.html) that returns an object. This is a common and powerful pattern:

```vue
<div v-bind:class="classObject"></div>
```

```javascript
data: {
  isActive: true,
  error: null
},
computed: {
  classObject: function () {
    return {
      active: this.isActive && !this.error,
      'text-danger': this.error && this.error.type === 'fatal'
    }
  }
}
```



###### Array Syntax

We can pass an array to `v-bind:class` to apply a list of classes:

```Vue
<div v-bind:class="[activeClass, errorClass]"></div>
```

```javascript
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

Which will render:

```vue
<div class="active text-danger"></div>
```

If you would like to also toggle a class in the list conditionally, you can do it with a ternary expression:

```Vue
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

This will always apply `errorClass`, but will only apply `activeClass` when `isActive` is truthy.

However, this can be a bit verbose if you have multiple conditional classes. That’s why it’s also possible to use the object syntax inside array syntax:

```vue
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```



###### With Components

…???





#### Binding Inline Styles

###### Object Syntax

- The object syntax for `v-bind:style` is pretty straightforward - it looks almost like CSS, except it’s a JavaScript object. You can use either camelCase or kebab-case (use quotes with kebab-case) for the CSS property names:

  ```vue
  <div v-bind:sytle="{ color: activeColor, fontSize: fontSize + 'px' }">
  </div>
  ```

  ```javascript
  data: {
    activeColor: 'red',
    fontSize: 30
  }
  ```

- It is often a good idea to bind to a style object directly so that the template is cleaner:

  ```vue
  <div v-bind:style="styleObject">
  </div>
  ```

  ```javascript
  data: {
    styleObject:{
      color: 'red',
      fontSize: '13px'
    }
  }
  ```

  Again, the object syntax is often used in conjunction *with computed properties* that return objects.

###### Array Syntax

- The array syntax for `v-bind:style` allows you to apply multiple style objects to the same element:

  ```vue
  <div v-bind:style="[baseStyles, overridingStyles]">
  </div>
  ```

###### Auto-prefixing

When you use a CSS property that requires [vendor prefixes](https://developer.mozilla.org/en-US/docs/Glossary/Vendor_Prefix) in `v-bind:style`, for example `transform`, Vue will automatically detect and add appropriate prefixes to the applied styles.

###### Multiple Values

> 2.3.0+

- Starting in 2.3.0+ you can provide an array of multiple (prefixed) values to a style property, for example:

  ```vue
  <div v-bind:style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
  ```

  This will only render the last value in the array which the browser supports. In this example, it will render `display: flex` for browsers that support the unprefixed version of flexbox.





## Conditional Rendering

#### `v-if`

```Vue
<h1 v-if="ok">Yes</h1>
```

It is also possible to add an “else block” with `v-else`:

```vue
<h1 v-if="ok">Yes</h1>
<h1 v-else>No</h1>
```

###### Conditional Groups with `v-if` on `<template>`

- Because `v-if` is a directive, it has to be attached to a single element. 

- But what if we want to toggle more than one element? In this case we can use `v-if` on a `<template>` element, which serves as an invisible wrapper. The final rendered result will not include the `<template>` element.

  ```vue
  <template v-if="ok">
    <h1>Title</h1>
    <p>Paragraph 1</p>
    <p>Paragraph 2</p>
  </template>
  ```

###### `v-else`

- You can use the `v-else` directive to indicate an “else block” for `v-if`:

  ```vue
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```

  A `v-else` element must immediately follow a `v-if` or a `v-else-if` element - otherwise it will not be recognized.

###### `v-else-if`

> New in 2.1.0+

- The `v-else-if`, as the name suggests, serves as an “else if block” for `v-if`. It can also be chained multiple times:

  ```vue
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```

  Similar to `v-else`, a `v-else-if` element must immediately follow a `v-if` or a `v-else-if` element.

###### Controlling Reusable elements with `key`

- Vue tries to render elements as efficiently as possible, often re-using them instead of rendering from scratch. Beyond helping make Vue very fast, this can have some useful advantages. 

  For example, if you allow users to toggle between multiple login types:

  ```vue
  <template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username">
  </template>
  <template v-else>
    <label>Email</label>
    <input placeholder="Enter your email address">
  </template>
  ```

  Then switching the `loginType` in the code above will not erase what the user has already entered. Since both templates use the same elements, the `<input>` is not replaced - just its `placeholder`.

- This isn’t always desirable though, so Vue offers a way for you to say, “These two elements are completely separate - don’t re-use them.” Add a `key` attribute with unique values:

  ```vue
  <template v-if="loginType === 'username'">
    <label>Username</label>
    <input placeholder="Enter your username" key="username-input">
  </template>
  <template>
    <label>Email</label>
    <input placeholder="Enter your email address" key="email-input">
  </template>
  ```

  Now those inputs will be rendered from scratch each time you toggle.

  Note that the `<label>` elements are still efficiently re-used, because they don't have `key`attributes.

#### `v-show`

- Another option for conditionally displaying an element is the `v-show` directive. The usage is largely the same:

  ```vue
  <h1 v-show="ok">Hello!</h1>
  ```

  The difference is that an element with `v-show` will always be rendered and remain in the DOM; `v-show` only toggles the `display` CSS property of the element.

- Note that `v-show` doesn’t support the `<template>` element, nor does it work with `v-else`.



#### `v-if` vs `v-show`

- `v-if` is “real” conditional rendering because it ensures that event listeners and child components inside the conditional block are properly destroyed and re-created during toggles.
  - `v-if` is also **lazy**: if the condition is false on initial render, it will not do anything - the conditional block won’t be rendered until the condition becomes true for the first time.
- In comparison, `v-show` is much simpler - the element is always rendered regardless of initial condition, with CSS-based toggling.
- Generally speaking:
  - `v-if` has higher toggle costs while `v-show` has higher initial render costs. 
  - So prefer `v-show` if you need to toggle something very often, and prefer `v-if` if the condition is unlikely to change at runtime.



#### `v-if` with `v-for`

When used together with `v-if`, *`v-for` has a higher priority than `v-if`.* See the [list rendering guide](https://vuejs.org/v2/guide/list.html#V-for-and-v-if) for details.



# List Rendering

#### Mapping an Array to Elements with `v-for`

- We can use the `v-for` directive to render a list of items based on an array. 

- The `v-for`directive requires a special syntax in the form of `item in items`, where `items` is the source data array and `item` is an **alias** for the array element being iterated on:

  ```vue
  <ul id="example-1">
    <li v-for="item in items">
    	{{ item.message }}
    </li>
  </ul>
  ```

  ```javascript
  var example1 = new Vue({
    el: '#example-1',
    data: {
      items:[
        { message: 'Foo' },
        { message: 'Bar' }
      ]
    }
  })
  ```

- *Inside `v-for` blocks we have full access to parent scope properties.*

  - `v-for` also supports an optional second argument for the index of the current item.

    ```vue
    <ul id="example2">
      <li v-for="(item, index) in items">
        {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
    ```

    ```javascript
    var example2 = new Vue({
      el: 'example2',
      data: {
        parentMessage: 'Parent',
        items: [
          { message: 'Foo' },
          { message: 'Bar' }
        ]
      }
    })
    ```

- You can also use `of` as the delimiter instead of `in`, so that it is closer to JavaScript’s syntax for iterators:

  ```vue
  <div v-for="item of items"></div>
  ```



#### `v-for` with an Object

- *You can also use `v-for` to iterate through the properties of an object.*

  ```vue
  <ul id="v-for-object" class="demo">
    <li v-for="value in object">
      {{ value }}
    </li>
  </ul>
  ```

  ```javascript
  new Vue({
    el:'#v-for-object',
    data:{
      object:{
        firstName: 'John',
        lastName: 'Doe',
        age: 30
      }
    }
  })
  ```

- You can also provide a second argument for the key:

  ```vue
  <div v-for="(value, key) in object">
    {{key}}: {{value}}
  </div>
  ```

- And another for the index:

  ```vue
  <div v-for="(value, key, index) in object">
    {{index}}. {{key}}: {{value}}
  </div>
  ```

> When iterating over an object, the order is based on the key enumeration order of `Object.keys()`, which is **not** guaranteed to be consistent across JavaScript engine implementations.



#### `key`

- When Vue is updating a list of elements rendered with `v-for`, by default it uses an “in-place patch” strategy. If the order of the data items has changed, instead of moving the DOM elements to match the order of the items, Vue will patch each element in-place and make sure it reflects what should be rendered at that particular index. 

- This default mode is efficient, but only suitable **when your list render output does not rely on child component state or temporary DOM state (e.g. form input values)**.

- To give Vue a hint so that it can track each node’s identity, and thus reuse and reorder existing elements, you need to provide a unique `key` attribute for each item. An ideal value for `key`would be the unique id of each item. This special attribute is a rough equivalent to `track-by`in 1.x, but it works like an attribute, so you need to use `v-bind` to bind it to dynamic values (using shorthand here):

  ```vue
  <div v-for="item in items" :key="item.id">
    <!--content-->
  </div>
  ```

- It is recommended to provide a `key` with `v-for` whenever possible, unless the iterated DOM content is simple, or you are intentionally relying on the default behavior for performance gains.

- Since it’s a generic mechanism for Vue to identify nodes, the `key` also has other uses that are not specifically tied to `v-for`.




#### Array Change Detection

###### Mutation Methods

- Vue wraps an observed array's mutation methods so they will also trigger view updates. The wrapped methods are:
  - `push()`
  - `pop()`
  - `shift()`
  - `unshift()`
  - `splice()`
  - `sort()`
  - `reverse()`

- You can open the console and play with the previous examples' `items` array by calling their mutation methods. For example: `example1.items.push({ message: 'Baz' })`.

  ​

###### Replacing an Array

Mutation methods, as the name suggests, mutate the original array they are called on. In comparison, there are also non-mutating methods, e.g. `filter()`, `concat()` and `slice()`, which do not mutate the original array but **always return a new array**. When working with non-mutating methods, you can replace the old array with the new one:

```javascript
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

You might think this will cause Vue to throw away the existing DOM and re-render the entire list - luckily, that is not the case. Vue implements some smart heuristics to maximize DOM element reuse, so replacing an array with another array containing overlapping objects is a very efficient operation.



###### Caveats

Due to limitations in JavaScript, Vue **cannot** detect the following changes to an array:

1. When you directly set an item with the index, e.g. `vm.items[indexOfItem] = newValue`
2. When you modify the length of the array, e.g. `vm.items.length = newLength`

For example:

```javascript
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // is NOT reactive
vm.items.length = 2 // is NOT reactive
```

- To overcome caveat 1,  use `Vue.set()`(same as `vueObject.$set()`) or `Array.items.splice()` method:

  - ```javascript
    // Vue.set
    Vue.set(vm.items, indexOfItem, newValue)
    ```


  - ```javascript
    // vueObject.$set
    vm.$set(vm.items, indexOfItem, newValue)
    ```

  - ```javascript
    // Array.prototype.splice
    vm.items.splice(indexOfItem, 1, newValue)
    ```

- To deal with caveat 2, you can use `Array.prototype.splice()`:

  - ```javascript
    vm.items.splice(newLength)
    ```



#### Object Change Detection Caveats

 **Vue cannot detect property addition or deletion**. For example:

```javascript
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` is now reactive

vm.b = 2
// `vm.b` is NOT reactive
```

Vue does not allow dynamically adding new root-level reactive properties to an already created instance. 

*It's possible to add reactive properties to a nested object using the `Vue.set(object, key, value)` method.* For example, given:

- ```javascript
  var vm = new Vue({
    data: {
      userProfile: {
        name: 'Anika'
      }
    }
  })
  ```

- You could add a new `age` property to the nested `userProfile` object with:

  ```javascript
  Vue.set(vm.userProfile, 'age', 27)
  ```

- You can also use the `vm.$set` instance method, which is an alias for the global `Vue.set`:

  ```javascript
  vm.$set(vm.userProfile, 'age', 27)
  ```

- Sometimes you may want to assign a number of new properties to an existing object, for example using `Object.assign()` or `_.extend()`. In such cases, you should create a fresh object with properties from both objects. So instead of:

  ```javascript
  Object.assign(vm.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
  })
  ```

  You would add new, reactive properties with:

  ```javascript
  vm.userProfile = Object.assign({}, vm.userProfile, {
    age: 27,
    favoriteColor: 'Vue Green'
  })
  ```



#### Displaying Filtered/Sorted Results

Sometimes we want to display a filtered or sorted version of an array without actually mutating or resetting the original data. In this case, you can *create a computed property that returns the filtered or sorted array*.

For example:

- ```vue
  <li v-for="n in eventNumbers">{{ n }}</li>
  ```

- ```javascript
  data:{
    numbers: [1,2,3,4,5]
  },
  computed: {
    eventNumbers: function(){
      return this.numbers.filter(function(){
        return number%2 === 0
      })
    }
  }
  ```



In situations where computed properties are not feasible (e.g. inside nested `v-for` loops), you can use a method:

- ```vue
  <li v-for="n in even(numbers)">{{ n }}</li>
  ```

- ```javascript
  data: {
    numbers: [1,2,3,4,5]
  },
  methods: {
    even: function(numbers){
      return numbers.filter(function(number){
        return number%2 === 0
      })
    }
  }
  ```



#### `v-for` with a Range

`v-for` can also take an integer. In this case it will repeat the template that many times.

```vue
<div>
  <span v-for="n in 10">{{ n }}</span>
</div>
```



#### `v-for` on a `<template>`

Similar to template `v-if`, you can also use a `<template>` tag with `v-for` to render a block of multiple elements. For example:

```vue
<ul>
  <template>
    <li>{{ item.msg }}</li>
	<li class="divider" role="presentation"></li>
  </template>
</ul>
```



#### `v-for` with `v-if`

When they exist on the same node, *`v-for` has a higher priority than `v-if`*.

- That means *the `v-if` will be run on each iteration of the loop separately*. This can be useful when you want to render nodes for only some items, like below:

  ```vue
  <li v-for="todo in todos" v-if="!todo.isComplete">
    {{ todo }}
  </li>
  ```

  The above only renders the todos that are not complete.

- If instead, your intent is to conditionally skip execution of the loop, *you can place the `v-if`on a wrapper element (or `<template>`).* For example:

  ```vue
  <ul v-if="todos.length">
    <li v-for="todo in todos">
    	{{ todo }}
    </li>
  </ul>
  <p v-else>
    No todos left!
  </p>
  ```



#### `v-for` with a Component

???







# Event Handling

#### Listening to Events

We can use the `v-on` directive to listen to DOM events and run some JavaScript when they’re triggered.

For example:

```vue
<div id="example-1">
  <button v-on:click="counter += 1">Add 1</button>
  <p>The button above has been clicked {{ counter }} times.</p>
</div>
```

```javascript
const example1 = new Vue({
  el: '#example-1',
  data:{
    counter:0
  }
})
```



#### Method Event Handlers

The logic for many event handlers will be more complex though, so keeping your JavaScript in the value of the `v-on` attribute isn't feasible. That's why `v-on` can also accept the name of a method you'd like to call.

For example:

```vue
<div id="example-2">
  <!-- `greet` is the name of a method defined below -->
  <button v-on:click="greet">Greet</button>
</div>
```

```javascript
const example2 = new Vue({
  el:'#example-2',
  data:{
    name: 'Vue.js'  
  },
  method:{
    greet:function(event){
      // `this` inside methods poiints to the Vue instance
      alert('Hello ' + this.name + '!')
      // `event` is the native DOM event
      if(event){
        alert(event.target.tagName)
      }
    }
  }
})

// you can invoke methods in JavaScript too
example2.greet() // => 'Hello Vue.js!'
```



#### Methods in Inline Handlers

Instead of binding directly to a method name, we can also use methods in an inline JavaScript statement:

```vue
<div id="example-3">
  <button v-on:click="say('hi')">Say hi</button>
  <button v-on:click="say('what')">Say what</button>
</div>
```

```javascript
new Vue({
  el: '#example-3',
  methods: {
    say: function(message){
      alert(message)
    }
  }
})
```

Sometimes we also need to access the original DOM event in an inline statement handler.

- You can pass it into a method using the special **`$event`** variable:

  ```vue
  <button v-on:click="warn('Form cannot be submitted yet.', $event)">
    Submit
  </button>
  ```

  ```javascript
  // ...
  methods: {
    warn: function(message, event){
      // now we have access to the native event
      if(event) event.preventDefault()
      alert(message)
    }
  }
  ```




#### Event Modifiers

It is a very common need to call `event.preventDefault()` or `event.stopPropagation()` inside event handlers.

- Although we can do this inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

To address this problem, Due provides **event modifiers** for `v-on`. Recall that modifiers are directive postfixes denoted by a dot.

- `.stop`
- `.prevent`
- `.capture`
- `.self`
- `.once`
- `.passive`

```vue
<!-- the click event's propagation will be stopped -->
<a v-on:click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- use capture mode when adding the event listener -->
<!-- i.e. an event targeting an inner element is handled here before being handled by that element -->
<div @click.capture="doThis">...</div>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

>Order matters when using modifiers because the relevant code is generated in the same order.
>
>*Therefore using `@click.prevent.self` will prevent all clicks while `@click.self.prevent` will only prevent clicks on the element itself.*

> New in 2.1.4+

```Vue
<!-- the click event will be triggered at most once -->
<a v-on:click.once="doThis"></a>
```

Unlike the other modifiers, which are exclusive to native DOM events, the `.once` modifier can also be used on [component events](https://vuejs.org/v2/guide/components-custom-events.html). If you haven’t read about components yet, don’t worry about this for now.

> New in 2.3.0+

Vue also offers the `.passive` modifier, corresponding to [`addEventListener`‘s `passive`option](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters).

```vue
<!-- the scroll event's default behavior (scrolling) will happen -->
<!-- immediately, instead of waiting for `onScroll` to complete  -->
<!-- in case it contains `event.preventDefault()`                -->
<div v-on:scroll.passive="onScroll">...</div>
```

The `.passive` modifier is especially useful for improving performance on mobile devices.

Don’t use `.passive` and `.prevent` together, because `.prevent` will be ignored and your browser will probably show you a warning. Remember, `.passive`communicates to the browser that you *don’t* want to prevent the event’s default behavior.







