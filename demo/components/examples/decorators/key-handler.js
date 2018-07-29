/* @flow */

import React from 'react';

import {keyToggleHandler, KEYPRESS} from '../../../../lib';
import ExampleBox from '../ExampleBox';

type Props = {
  keyValue: ?string,
};


function Demo({keyValue}: Props) {
  return (
    <ExampleBox>
      <h2>Decorator example:</h2>

      <p>Press <code>s</code> to <strong>open</strong> the menu.</p>

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }

      <p>
        Code:
      </p>
      <pre>
        {'keyToggleHandler({keyEventName: KEYPRESS, keyValue: \'s\'})(Component)'}
      </pre>
    </ExampleBox>
  );
}

export default keyToggleHandler({keyEventName: KEYPRESS, keyValue: 's'})(Demo);
