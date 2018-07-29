/* @flow */

import React from 'react';

import {keyToggleHandler, KEYPRESS} from '../../../../lib';
import ExampleBox from '../ExampleBox';

type Props = {
  keyValue: ?string,
};

function Default({keyValue}: Props) {
  return (
    <ExampleBox>
      <h2>Input example:</h2>

      <p>
        Press <code>s</code> in the following form component and see that the key
        handle will be ignored by default.
      </p>

      <input />

      {keyValue === 's' &&
        <ol>
          <li>hello</li>
          <li>world</li>
        </ol>
      }
    </ExampleBox>
  );
}

export default keyToggleHandler({keyEventName: KEYPRESS, keyValue: 's'})(Default);
