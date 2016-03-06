import {expect} from 'chai';

import {isInput, keyValues, keyValueFromCode, matchesKeyboardEvent} from 'utils';

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
    expect(keyValues('ctrl')).to.be.equal('Control');
    expect(keyValues('control')).to.be.equal('Control');
    expect(keyValues('alt')).to.be.equal('Alt');
    expect(keyValues('option')).to.be.equal('Option');
    expect(keyValues('shift')).to.be.equal('Shift');
    expect(keyValues('windows')).to.be.equal('Meta');
    expect(keyValues('command')).to.be.equal('Meta');
    expect(keyValues('esc')).to.be.equal('Escape');
    expect(keyValues('escape')).to.be.equal('Escape');
    expect(keyValues('backspace')).to.be.equal('Backspace');
    expect(keyValues('tab')).to.be.equal('Tab');
    expect(keyValues('enter')).to.be.equal('Enter');
    expect(keyValues('return')).to.be.equal('Enter');
    expect(keyValues('space')).to.be.equal(' ');
    expect(keyValues('pause')).to.be.equal('Pause');
    expect(keyValues('insert')).to.be.equal('Insert');
    expect(keyValues('delete')).to.be.equal('Delete');
    expect(keyValues('home')).to.be.equal('Home');
    expect(keyValues('end')).to.be.equal('End');
    expect(keyValues('pageup')).to.be.equal('PageUp');
    expect(keyValues('pagedown')).to.be.equal('PageDown');
    expect(keyValues('left')).to.be.equal('ArrowLeft');
    expect(keyValues('up')).to.be.equal('ArrowUp');
    expect(keyValues('right')).to.be.equal('ArrowRight');
    expect(keyValues('down')).to.be.equal('ArrowDown');
    expect(keyValues('capslock')).to.be.equal('CapsLock');
    expect(keyValues('numlock')).to.be.equal('NumLock');
    expect(keyValues('scrolllock')).to.be.equal('ScrollLock');
  });

  it('falls back to the key name if there is no key value for given key name', () => {
    expect(keyValues('break')).to.be.equal('break');
  });
});

describe('keyValueFromCode', () => {
  it('returns the key value of a given key code', () => {
    expect(keyValueFromCode(13)).to.be.equal('Enter');
    expect(keyValueFromCode(32)).to.be.equal(' ');
  });
});

describe('matchesKeyboardEvent', () => {
  describe('matches KeyboardEvent.key against', () => {
    const arrowUpValueEvent = new window.KeyboardEvent('keyup', {key: 'ArrowUp'});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 38})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyCode: 40})).to.be.false;
    });

    it('keyName Props property', () => {
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyName: 'up'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpValueEvent, {keyName: 'down'})).to.be.false;
    });
  });

  describe('matches KeyboardEvent.keyCode against', () => {
    const arrowUpCodeEvent = new window.KeyboardEvent('keyup', {keyCode: 38});

    it('keyValue Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowUp'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyValue: 'ArrowDown'})).to.be.false;
    });

    it('keyCode Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 38})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyCode: 40})).to.be.false;
    });

    it('keyName Props property', () => {
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyName: 'up'})).to.be.true;
      expect(matchesKeyboardEvent(arrowUpCodeEvent, {keyName: 'down'})).to.be.false;
    });
  });
});
