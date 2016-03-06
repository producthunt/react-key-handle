# react-key-handler 🔑

[![npm version](https://img.shields.io/npm/v/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![License](https://img.shields.io/npm/l/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![Build Status](https://travis-ci.org/ayrton/react-key-handler.svg)](https://travis-ci.org/ayrton/react-key-handler)

React component to handle key events.

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
  1. [`keyHandler` decorator](#keyhandler-decorator)
  1. [`keyToggleHandler` decorator](#keytogglehandler-decorator)
  1. [`KeyHandler` component](#keyhandler-component)
  1. [Form key handling](#form-key-handling)
  1. [Demos](#demos)
1. [Development](#development)
1. [Contributing](#contributing)
1. [License](#license)

## Installation

```sh
$ npm install react-key-handler --save
```

## Usage

`react-key-handler` comes in 2 flavors, a component and decorators.

Unless you want absolute flexibility we highly recommend you to use one of the decorators.

### `keyHandler` decorator

The decorator will decorate the given component with a `keyValue`, `keyCode` and `keyName`
property.

```jsx
import React from 'react';
import {keyHandler} from 'react-key-handler';

const S_KEY_CODE = 77;

function DecoratorDemo({keyCode}) {
  return (
    <div>
      {keyCode === S_KEY_CODE &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({keyCode: S_KEY_CODE})(DecoratorDemo);
```

The prop types of the `keyHandler` decorator are:

```js
type Props = {
  keyValue: ?string,
  keyCode: ?number,
  keyEventName: ?string,
  keyName: ?string,
}
```

* `keyValue` can be any given [W3C keyboard key value](https://www.w3.org/TR/DOM-Level-3-Events-key/)
* `keyCode` can be any given [keyboard code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
* `keyEventName` will default to `'keyup'`
* `keyName` can be any given character

You should either pass a `keyValue`, a `keyCode` or a `keyName`, not both.

### `keyToggleHandler` decorator

This decorator has the exact same API as the `keyHandler` decorator and should be used
for when you're looking to toggle a key.

### `KeyHandler` component

```jsx
import React from 'react';
import KeyHandler from 'react-key-handler';

const S_KEY_CODE = 77;

export default React.createClass({
  getInitialState() {
    return {showMenu: false};
  },

  render() {
    const {showMenu} = this.state;

    return (
      <div>
        <KeyHandler keyCode={S_KEY_CODE} onKeyHandle={this.toggleMenu} />

        {showMenu &&
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        }
      </div>
    );
  },

  toggleMenu(event) {
    event.preventDefault();

    this.setState({showMenu: !this.state.showMenu});
  },
});
```

The prop types of the `KeyHandler` component are:

```js
type Props = {
  keyValue: ?string,
  keyCode: ?number,
  keyEventName: string,
  keyName: ?string,
  onKeyHandle: Function,
};
```

* `keyValue` can be any given [W3C keyboard key value](https://www.w3.org/TR/DOM-Level-3-Events-key/)
* `keyCode` can be any given [keyboard code](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode)
* `keyEventName` will default to `'keyup'`
* `keyName` can be any given character
* `onKeyHandle` is the function that is being called when key code is handled

You should either pass a `keyValue`, a `keyCode` or a `keyName`, not both.

### Form key handling

This library does not handle any keys coming from an `<input />` or `<textarea />` element.

We recommend you to use react's built in [form events](https://facebook.github.io/react/docs/events.html#form-events)
for these.

If you disagree and feel very strong about this, feel free to open an issue with
your reasoning and we will consider adding this functionality.

### Demos

For more examples have a look at `demo/components/demos/`.

## Development

### Setup

```sh
$ git clone <this repo>
$ cd react-key-handler
$ npm install
```

### Getting started

To start the server:

```sh
$ npm start
```

This starts a webpack-dev-server, which is a little node.js Express server:

```sh
$ open http://localhost:8080
```

### Tests

To run all tests:

```sh
$ npm test
```

Or you can run the linters, unit tests and check for type errors individually:

```sh
$ npm run test:lint
$ npm run test:unit
$ npm run test:flow
```

## Contributing

Bug reports and pull requests are welcome on GitHub. This project is intended to be a
safe, welcoming space for collaboration, and contributors are expected to adhere
to the [Contributor Covenant](http://contributor-covenant.org/) code of conduct.

## License

```
 _________________
< The MIT License >
 -----------------
        \   ^__^
         \  (oo)\_______
            (__)\       )\/\
                ||----w |
                ||     ||
```
