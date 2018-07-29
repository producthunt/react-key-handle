/* @flow */

import React from 'react';

import KeyHandler from './key-handler';
import {matchesKeyboardEvent, eventKey} from './utils';
import { type rawOrArray } from './types';

export type KeyhandleDecoratorState = {|
 keyValue?: ?rawOrArray<string>,
 keyCode: ?rawOrArray<number>,
 code: ?rawOrArray<string>,
|};

export type DecoratorProps = {|
  keyValue: ?rawOrArray<string>,
  keyCode: ?rawOrArray<number>,
  code: ?rawOrArray<string>,
  keyEventName?: string,
|}

export default function keyHandleDecorator<T>(matcher?: typeof matchesKeyboardEvent): Function {
  return (props?: DecoratorProps & T): Function => {
    const { keyValue, keyCode, code, keyEventName, ...other } = props || {};

    return (Component) => (
      class KeyHandleDecorator extends React.Component<T, KeyhandleDecoratorState> {
        state: KeyhandleDecoratorState = {
          keyCode: null,
          keyValue: null,
          code: null,
        }

        render() {
          return (
            <div>
              <KeyHandler
                keyValue={keyValue}
                keyCode={keyCode}
                code={code}
                keyEventName={keyEventName}
                onKeyHandle={this.handleKey}
              />
              <Component {...other} {...this.state} />
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