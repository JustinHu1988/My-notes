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

The component system is another important concept in Vue, because it’s an abstraction that allows us to build large-scale applications composed of small, self-contained, and often reusable components. If we think about it, almost any type of application interface can be abstracted into a tree of components:

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

























































