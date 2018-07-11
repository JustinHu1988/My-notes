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















