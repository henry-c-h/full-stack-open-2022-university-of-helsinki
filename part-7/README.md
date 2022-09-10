# notes

- Custom hooks can be used to extract component logic into reusable functions
- Hooks are called from either React function components or custom hooks
- When built-in hooks are called from custom hooks, it's likely calling the hooks directly in the component because hooks are always called at the top level
- Class components
  - Always need a `render` method. It is used to paint elements to the screen. Called when component first mounts and props or state change.
  - State is always saved in a class instance varaible called `state`, which is an object. Individual values of the state are declared as properties on the object.
  - Simplest and more modern way to declare state: using a class field
    ```js
    state = { count: 0 };
    ```
  - To access state: `this.state.<propertyName>`
  - Class methods that need to call `this.setState` should be declared as an arrow function
  - Before class fields are introduced, `state` needs to be initialized in constructor method using `this.state = {}`. Remember to call `super()` in the constructor method
  - Before arrow functions are introduced, to bind your class methods, add `this.<method> = this.<method>.bind(this)` in the constructor method. This is not needed if you don't need to use the class method as an event handler and don't need `this.setState`
  - If you need to use `this.props` in the constructor method, pass props argument to both the constructor and super
  - `this.setState` automatically joins the returned state with the original state, so copying the unchanged properties is not necessary
  - Lifecycle methods (already have `this` context)
    - `componentDidMount()`: runs immediately after the first render of the component; usually used for api call
    - `componentDidUpdate()`: runs everytime props or state change; receives previous props and previous state as arguments, used to prevent infinite loop
    - `componentWillUnmount()`: to clean up side effects (such as removing event listeners or disconnecting subscriptions)
