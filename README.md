# react-key-handler 🔑

[![npm version](https://img.shields.io/npm/v/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![License](https://img.shields.io/npm/l/react-key-handler.svg)](https://www.npmjs.com/package/react-key-handler) [![Build Status](https://travis-ci.org/ayrton/react-key-handler.svg?branch=master)](https://travis-ci.org/ayrton/react-key-handler)

React component to handle keyboard events (such as keyup, keydown & keypress).

## Testimonials

> <div>“Happy to see that react-key-handler is SSR safe :+1:”</div>
> [Veselin Todorov](https://github.com/vesln), Chai.js core

## Table of Contents

1. [Installation](#installation)
1. [Usage](#usage)
  1. [Higher-order Components](#higher-order-components)
  1. [Component](#component)
  1. [Form key handling](#form-key-handling)
1. [Key event names](#key-event-names)
1. [`keyValue`, `keyCode`](#keyvalue-keycode)
1. [Development](#development)
1. [Contributing](#contributing)
1. [License](#license)

## Installation

```sh
$ npm install react-key-handler --save
```

## Usage

You can use `react-key-handler` library in two flavours:

- [higher-order components](#higher-order-components)
- [component](#component)

Unless you want absolute flexibility we recommend you to use a higher-order component in favour
of the component.

### Higher-order Components

This library includes two similar higher-order components, but with a different puprose:

| Higher-order Component | Purpose             |
| ---------------------- | ------------------- |
| `keyHandler`           | Handles key changes |
| `keyToggleHandler`     | Handles key toggles |

Both have the same API and will decorate the given component with a `keyValue`
and `keyCode` property.

Internally the `KeyHandler` component is used, for a full understanding be sure to
check out [the implementation](lib/key-handler.js).

```jsx
import React from 'react';
import {keyHandler, KEYPRESS} from 'react-key-handler';

function Demo({ keyValue }) {
  return (
    <div>
      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </div>
  );
}

export default keyHandler({ keyEventName: KEYPRESS, keyValue: 's' })(Demo);
```

The prop types of the `KeyHandler` component are:

| Name         | Type     | Required   | Default   |                                        |
| ------------ | -------- | ---------- | --------- | -------------------------------------- |
| keyEventName | string   | no         | `'keyup'` | `'keydown'`, `'keypress'` or `'keyup'` |
| keyValue     | string   | yes __\*__ |           | Any given [KeyboardEvent.key]          |
| keyCode      | number   | yes __\*__ |           | Any given [KeyboardEvent.keyCode]      |

__\*__ You should pass only one of these two props: `keyValue` or `keyCode`. [Which one do I pick?](#keyvalue-keycode)

[Examples](demo/components/examples/decorators/)

### Component

```jsx
import React from 'react';
import KeyHandler, {KEYPRESS} from 'react-key-handler';

export default React.createClass({
  getInitialState() {
    return { showMenu: false };
  },

  render() {
    const { showMenu } = this.state;

    return (
      <div>
        <KeyHandler keyEventName={KEYPRESS} keyValue="s" onKeyHandle={this.toggleMenu} />

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

    this.setState({ showMenu: !this.state.showMenu });
  },
});
```

The prop types of the `KeyHandler` component are:

| Name         | Type     | Required   | Default   |                                                  |
| ------------ | -------- | ---------- | --------- | ------------------------------------------------ |
| keyEventName | string   | no         | `'keyup'` | `'keydown'`, `'keypress'` or `'keyup'`           |
| keyValue     | string   | yes __\*__ |           | Any given [KeyboardEvent.key]                    |
| keyCode      | number   | yes __\*__ |           | Any given [KeyboardEvent.keyCode]                |
| onKeyHandle  | function | yes        |           | Function that is called when they key is handled |

__\*__ You should pass only one of these two props: `keyValue` or `keyCode`. [Which one do I pick?](#keyvalue-keycode)

[Example](demo/components/examples/component/index.js)

### Form key handling

This library does not handle key events for form elements such as `<input />` and `<textarea />`.

React does a fine job supporting these already via [keyboard events](https://facebook.github.io/react/docs/events.html#keyboard-events).

[Examples](demo/components/examples/input/)

## Key event names

TODO: explain the differences between the different key events.

## `keyValue`, `keyCode`

We recommend you to use the new Web standard [KeyboardEvent.key] over the deprecated
[KeyboardEvent.keyCode].

Be cautious not to use the `key` property like the spec suggests, use `keyValue`,
this is due to [key] being a reserved property in React.

__Browser support:__

There's no need to worry about browser support because internally we normalize
deprecated HTML5 `keyValue` values and translate from legacy `keyCode` values,
similar to how React does this for their `SyntheticKeyboardEvent`.

__More information:__

[W3C Working Draft].

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

[W3C Working Draft]: https://www.w3.org/TR/DOM-Level-3-Events-key/
[KeyboardEvent.key]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key
[KeyboardEvent.keyCode]: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode
[key]: https://facebook.github.io/react/docs/create-fragment.html
