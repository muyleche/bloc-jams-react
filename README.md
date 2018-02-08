## BlocJams React
This is a version of [BlocJams](https://github.com/tboddyspargo/bloc-jams) written using ES2015 and React. It uses React components to create relatively self-contained, re-usable modules of an application and unites them in a way that is descriptive. The end-product is an even more visually appealing site that is quite maintainable at the same time.

## ES2015
ES2015 includes many enhancements to traditional JavaScript which, together with React, make for a simplified syntax. `class` declarations are an easy way to describe object prototypes and expand on existing ones (like React's `Component`).

ES2015's import/export syntax also facilitates modularizing javascript into functional areas, making it easier to find the code you're looking for and expose only those functions that it's necessary to expose (via `export`).

Additional ES2015 benefits that are used in this project include: `let`, `const`, arrow functions, template strings, `Object.Assign()`, object desconstruction, and more.

# React
React is a JavaScript library that provides a paradigm by which to develop component-based web sites and applications. Rather than working with HTML files, React abstracts away this part of web page development by providing you with [JSX](https://reactjs.org/docs/introducing-jsx.html) an extension of JavaScript which allows you to write semantic content that will be rendered as HTML in the DOM. This 'virtual DOM' can facilitate constructing (somewhat) self-contained and highly reusable segments of your site/app.

In addition to the component model, React also operates on the principal of ['state' management](https://reactjs.org/docs/state-and-lifecycle.html). Components receive 'state' information from their inherited context and 'properties'. They can also respond dynamically as that state changes. To accomplish this, you simply need to inject the proper logic into the Component lifecycle. Managing state can take some getting used to, and requires you to make some design decisions in order to share 'state' within the right scope and in the right way.

## Take It For a Spin!
To see this project in action, clone the repo locally and then run the following command:

```
npm start
```

This runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Resources
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Below you will find some information on how to perform common tasks.<br>
You can find the most recent version of this guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

## Acknowledgements

A big thanks to Junior Klegseth for guidance on this project and interesting discussions about the React paradigm as it compares with other JS frameworks.
