/* @flow */

import React from 'react';
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
    handledKeys?: Array<HandledKey>,
  };

  static propTypes = {
    keyValue: React.PropTypes.string,
    keyCode: React.PropTypes.number,
    keyEventName: React.PropTypes.oneOf([KEYDOWN, KEYPRESS, KEYUP]),
    onKeyHandle: React.PropTypes.func,
    handledKeys: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        keyValue: React.PropTypes.string,
        keyCode: React.PropTypes.number,
        allowInputTarget: React.PropTypes.bool,
      })
    ),
  };

  static defaultProps = {
    keyEventName: KEYUP,
  };

  shouldComponentUpdate(): boolean {
    return false;
  }

  constructor(props) {
    super(props);

    this.handleKey = this.handleKey.bind(this);

    /* eslint-disable no-console */

    if (!(props.keyValue || props.keyCode) && !props.handledKeys) {
      console.error('Warning: Failed propType: Missing prop `handledKeys` or `keyValue` or `keyCode` for `KeyHandler`.');
    }

    /* eslint-enable */
  }

  handledKeys() {
    /* normalize legacy props into new handledKeys array */
    const { handledKeys, keyValue, keyCode } = this.props;
    return handledKeys ? handledKeys : [{keyValue, keyCode}];
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
    const {onKeyHandle} = this.props;
    const matchesEvent = matchesKeyboardEvent.bind(null, event);
    const handledKey = this.handledKeys().find(key => matchesEvent(key));

    if (!onKeyHandle || !handledKey) {
      return;
    }

    const {target} = event;

    if (target instanceof window.HTMLElement && isInput(target)) {
      if (!handledKey.allowInputTarget) return;
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
  handledKeys?: Array<HandledKey>,
  handleKey?: (event: KeyboardEvent) => void,
}

type State = {
  keyValue: ?string,
  keyCode: ?number,
};

type HandledKey = {
  keyValue: ?string,
  keyCode: ?number,
  allowInputTarget?: bool,
}

/**
 * KeyHandler decorators.
 */

function keyHandleDecorator(matcher?: typeof matchesKeyboardEvent): Function {
  return (props?: DecoratorProps): Function => {
    const { keyValue, keyCode, keyEventName, handledKeys, handleKey } = props || {};

    return (Component) => (
      class KeyHandleDecorator extends React.Component {
        state: State = { keyValue: null, keyCode: null };

        render() {
          return (
            <div>
              <KeyHandler
                  keyValue={keyValue}
                  keyCode={keyCode}
                  keyEventName={keyEventName}
                  handledKeys={handledKeys}
                  onKeyHandle={handleKey || this.handleKey} />
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
