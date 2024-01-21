# React Qestions:

## 1- What is the difference between Component and PureComponent? Give an example where it might break my app.

- The difference between a Compononet and a PureComponent is that a Componenet doesn't implement the `shouldComponentUpdate` by default. This results in the component re-rendering on every update even if the state or props didn't change, while the PureComponent does implement `shouldComponentUpdate` and makes a shallow comparison between the props and state. If a change is found, it will be re-rendering.
- PureComponent might break your app when you have a complex or deeply nested data structure as a state or props. This is because PureComponent makes shallow comparisons to determine whether the component should re-render. If you rely on a complex data structure, the shallow might not catch the change, which results in not re-rendering the component.

## 2- Context + ShouldComponentUpdate might be dangerous. Why is that?

- Components that use Context API will re-render when the context value changes. The `ShouldComponentUpdate` might not be reliable for stopping the component from re-reading.

## 3- Describe 3 ways to pass information from a component to its PARENT.

1. Pass a callback function as a prop from the parent to the child. The child component can then invoke this callback to send information back to the parent.
2. Use the Context API to create a shared context between the parent and child components. This allows them to share information without passing props through each level of the component tree.
3. If the parent and child components share a common ancestor, lift the state up to that ancestor. The common ancestor manages the state and passes down callback functions as props to the child components for updating.

## 4- Give 2 ways to prevent components from re-rendering.

1. Using `React. memo` which a higher-order component that memoizes the result of a Functional Component. It prevents the element from re-rendering by caching the component props; if the props don't change, the component will not re-render.
2. Implementing the `shouldComponentUpdate` life cycle method in a Class Component can prevent the Component from re-rendering. We can add custom logic to compare the previous state and props and conclude if the Component should re-render.

## 5- What is a fragment and why do we need it? Give an example where it might break my app.

- Fragment is a way of wrapping a group of elements together without creating an additional element in the DOM. One scenario that I can think of when using CSS Selectors that specifically target parent elements using a fragment might interfere with your styles because the component is not in the DOM.

## 6- Give 3 examples of the HOC pattern.

- Higher order is a function that takes a component and returns a new component with additional behavior and props.

Examples of HOC patterns I used before:

1. Authentication HOC: you can use an Authentication higher-order component to share the user authentication state in the application.
2. Styling HOC: You can use a HOC to share a theme or style in the application.
3. Data Fetching: You can fetch the data in HOC and pass the data as props.

## 7- What's the difference in handling exceptions in promises, callbacks and async...await?

- In promises, you can chain operations together while handling errors with a single `catch()` block, while in callbacks, you need to pass error-handling callbacks to each asynchrony function. Async/await provides a cleaner way to write asynchronous code than promises, which makes code easier to read, use and maintain.

## 8- How many arguments does setState take and why is it async.

- `setState` takes two arguments, `Partial State` and `Callback function`:

1. Partial State: The object contains the state you want to update.
2. Callback Function: a callback function that is executed after that state is updated. Callback is an optional argument.

- It is async for performance reasons. When a user calls setState, the component state is not updated immediately. React schedules and updates and continues with its current execution. This is done to batch multiple state updates into a single update.

## 9- List the steps needed to migrate a Class to Function Component.

1. Update the `this.state` to use `useState` hook.
2. change the Class methods `handleChnage = () => {}` to functions inside of the function component `const handleChnage = () => {}`
3. Remove any `this` reference.
4. Update Lifecycle methods to use `useEffect`.
5. Remove `render` and update the compoennt.
6. Update your imports.

## 10- List a few ways styles can be used with components.

1. Add the style directly to the style attribute.
2. Import a CSS file in the Component.
3. Enable local scoping of styles by generating unique class names for each Component.
4. Use a theming library like ThemeProvider.

## 11- How to render an HTML string coming from the server.

- You can use the `dangerouslySetInnerHTML` prop to render strings from a trusted server. If we don't trust the message's source, we can rely on 3rd party library like DOMPurify to ensure it doesn't contain malicious code.
