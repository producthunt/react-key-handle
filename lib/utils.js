/* @flow */

import keyNames from 'keycodes';

/**
 * Types.
 */

type Props = {
  keyValue: ?string,
  keyCode: ?number,
  keyName: ?string
};

/**
 * Check if `given` element is an input or textarea form element.
 */

export function isInput(element: HTMLElement): boolean {
  if (!element) {
    return false;
  }

  const {tagName} = element;

  return tagName === 'INPUT' || tagName === 'TEXTAREA';
}

/**
 * Maps [keycodes](https://www.npmjs.com/package/keycodes) key names to KeyboardEvent.key values.
 */
export function keyValues(keyName: string): string {
  const cases = {
    left: 'ArrowLeft',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
  };

  return cases[keyName] || keyName;
}

/**
 * Maps keyCodes to KeyboardEvent.key values.
 */
export function keyValueFromCode(keyCode: number): string {
  return keyValues(keyNames(keyCode));
}

/**
 * Matches a KeyboardEvent against a given Props type by all its possible values.
 */
export function matchesKeyboardEvent(event: KeyboardEvent, {keyValue, keyCode, keyName}: Props): boolean {
  const keyVal = keyValue || (keyCode && keyValueFromCode(keyCode)) || (keyName && keyValues(keyName));
  const eventKeyVal = event.key || keyValueFromCode(event.keyCode);

  return String(eventKeyVal).toLowerCase() === String(keyVal).toLowerCase();
}
