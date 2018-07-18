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
-  For this reason, *Vue provides special enhancements when `v-bind` is used with `class` and `style`.* 
- In addition to strings, the expressions can also evaluate to objects or arrays.



 































