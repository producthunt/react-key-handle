/* @flow */

import React from 'react';
import ExampleBox from '../ExampleBox';

type State = {
  keyValue: ?string,
};

export default class Keypress extends React.Component<{||}, State> {
  state: State = { keyValue: null };

  render() {
    return (
      <ExampleBox>
        <h2>Input onKeyPress example:</h2>

        <p>
          Press <code>s</code> in the following form component to toggle the menu.
        </p>

        <input onKeyPress={this.handleKeyPress} />

        {this.state.keyValue === 's' &&
          <ol>
            <li>hello</li>
            <li>world</li>
          </ol>
        }

        <p>
          Code:
        </p>
        <pre>{`
state: State = { keyValue: null };

render() {
  ...
  <input onKeyPress={this.handleKeyPress} />
  ...
}

handleKeyPress = ({key}: SyntheticKeyboardEvent<HTMLInputElement>) => {
  const keyValue = this.state.keyValue === key ? null : key;

  this.setState({ keyValue });
};`}
        </pre>
      </ExampleBox>
    );
  }

  handleKeyPress = ({key}: SyntheticKeyboardEvent<HTMLInputElement>) => {
    const keyValue = this.state.keyValue === key ? null : key;

    this.setState({ keyValue });
  };
}
