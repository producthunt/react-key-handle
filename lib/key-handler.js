/* @flow */

import React from 'react';
import PropTypes from 'prop-types';
import {canUseDOM} from 'exenv';

import {KEYDOWN, KEYPRESS, KEYUP} from './constants';
import {isInput, matchesKeyboardEvent, eventKey} from './utils';

/**
 * KeyHandler component.
 */

export default class KeyHandler extends React.Component {
  props: {
    keyValue?: string,
    keyCode?: number,
    keyEventName: KEYDOWN | KEYPRESS | KEYUP,
    onKeyHandle?: (event: KeyboardEvent) => void,
  };

  static propTypes = {
    keyValue: PropTypes.string,
    keyCode: PropTypes.number,
    keyEventName: PropTypes.oneOf([KEYDOWN, KEYPRESS, KEYUP]),
    onKeyHandle: PropTypes.func,
  };

  static defaultProps = {
    keyEventName: KEYUP,
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props) {
    super(props);

    /* eslint-disable no-console */

    if (!props.keyValue && !props.keyCode) {
      console.error('Warning: Failed propType: Missing prop `keyValue` or `keyCode` for `KeyHandler`.');
    }

    /* eslint-enable */
  }

  componentDidMount(): void {
    if (!canUseDOM) return;

    window.document.addEventListener(this.props.keyEventName, this.handleKey);
  }

  componentWillUnmount(): void {
    if (!canUseDOM) return;

    window.document.removeEventListener(this.props.keyEventName, this.handleKey);
  }

  render(): null {
    return null;
  }

  handleKey = (event: KeyboardEvent): void => {
    const {keyValue, keyCode, onKeyHandle} = this.props;

    if (!onKeyHandle) {
      return;
    }

    const {target} = event;

    if (target instanceof window.HTMLElement && isInput(target)) {
      return;
    }

    if (!matchesKeyboardEvent(event, {keyValue, keyCode})) {
      return;
    }

    onKeyHandle(event);
  };
}

/**
 * Types.
 */

type DecoratorProps = {
  keyValue?: string,
  keyCode?: number,
  keyEventName?: string,
}

type State = {
  keyValue: ?string,
  keyCode: ?number,
};

/**
 * KeyHandler decorators.
 */

function keyHandleDecorator(matcher?: typeof matchesKeyboardEvent): Function {
  return (props?: DecoratorProps): Function => {
    const { keyValue, keyCode, keyEventName } = props || {};

    return (Component) => (
      class KeyHandleDecorator extends React.Component {
        state: State = { keyValue: null, keyCode: null };

        render() {
          return (
            <div>
              <KeyHandler keyValue={keyValue} keyCode={keyCode} keyEventName={keyEventName} onKeyHandle={this.handleKey} />
              <Component {...this.props} {...this.state} />
            </div>
          );
        }

        handleKey = (event: KeyboardEvent): void => {
          if (matcher && matcher(event, this.state)) {
            this.setState({ keyValue: null, keyCode: null });
            return;
          }

          this.setState({ keyValue: eventKey(event), keyCode: event.keyCode });
        };
      }
    );
  };
}

export const keyHandler = keyHandleDecorator();
export const keyToggleHandler = keyHandleDecorator(matchesKeyboardEvent);

/**
 * Constants
 */

export * from './constants';
