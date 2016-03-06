/* @flow */

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
export function keyNameVals(keyName: string): string {
  const cases = {
    left: 'ArrowLeft',
    up: 'ArrowUp',
    right: 'ArrowRight',
    down: 'ArrowDown',
  };

  return cases[keyName] || keyName;
}
