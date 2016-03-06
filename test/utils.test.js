import {expect} from 'chai';

import {isInput, keyValues} from 'utils';

describe('isInput', () => {
  it('returns true if the element is an input', () => {
    expect(isInput({ tagName: 'INPUT' })).to.be.true;
  });

  it('returns true if the element is a textarea', () => {
    expect(isInput({ tagName: 'TEXTAREA' })).to.be.true;
  });

  it('returns false if the element is falsey', () => {
    expect(isInput(null)).to.be.false;
  });

  it('returns false if the element is not an input or textarea', () => {
    expect(isInput({ tagName: 'A' })).to.be.false;
  });
});

describe('keyValues', () => {
  it('returns the key value of the given key name', () => {
    expect(keyValues('left')).to.be.equal('ArrowLeft');
    expect(keyValues('up')).to.be.equal('ArrowUp');
    expect(keyValues('right')).to.be.equal('ArrowRight');
    expect(keyValues('down')).to.be.equal('ArrowDown');

  });

  it('falls back to the key name if there is no key value for given key name', () => {
    expect(keyValues('numlock')).to.be.equal('numlock');
  });
});
