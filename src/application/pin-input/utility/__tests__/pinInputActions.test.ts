import { describe, expect, it, jest } from '@jest/globals';
import {
  applyPinBackspace,
  applyPinChangeText,
  applySlotPress,
} from '../pinInputActions';

describe('pinInputActions', () => {
  it('sanitizes and updates value on change text', () => {
    const onChange = jest.fn();
    const nextFocusIndex = applyPinChangeText('a1b2', {
      value: '',
      focusIndex: 0,
      length: 6,
      onChange,
    });

    expect(onChange).toHaveBeenCalledWith('12');
    expect(nextFocusIndex).toBe(2);
  });

  it('fires onComplete when pin is full', () => {
    const onChange = jest.fn();
    const onComplete = jest.fn();

    applyPinChangeText('123456', {
      value: '',
      focusIndex: 0,
      length: 6,
      onChange,
      onComplete,
    });

    expect(onComplete).toHaveBeenCalledWith('123456');
  });

  it('handles backspace', () => {
    const onChange = jest.fn();
    const nextFocusIndex = applyPinBackspace({
      value: '123',
      focusIndex: 3,
      length: 6,
      onChange,
    });

    expect(onChange).toHaveBeenCalledWith('12');
    expect(nextFocusIndex).toBe(2);
  });

  it('truncates value when pressing a filled slot', () => {
    expect(applySlotPress(1, '32332')).toEqual({
      nextValue: '3',
      nextFocusIndex: 1,
    });
  });

  it('focuses next empty slot without truncating', () => {
    expect(applySlotPress(4, '3233')).toEqual({
      nextValue: '3233',
      nextFocusIndex: 4,
    });
  });

  it('ignores slot press when disabled', () => {
    expect(applySlotPress(1, '12', true)).toBeNull();
  });

  it('ignores input when disabled', () => {
    const onChange = jest.fn();
    const nextFocusIndex = applyPinChangeText('123', {
      value: '',
      focusIndex: 0,
      length: 6,
      disabled: true,
      onChange,
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(nextFocusIndex).toBeNull();
  });

  it('inserts at focusIndex when native text is out of sync after truncate', () => {
    const onChange = jest.fn();
    const nextFocusIndex = applyPinChangeText('2123456', {
      value: '12',
      focusIndex: 2,
      length: 6,
      onChange,
    });

    expect(onChange).toHaveBeenCalledWith('122');
    expect(nextFocusIndex).toBe(3);
  });

  it('supports alphanumeric inputs with autoCapitalize="characters"', () => {
    const onChange = jest.fn();
    const nextFocusIndex = applyPinChangeText('ab-12', {
      value: '',
      focusIndex: 0,
      length: 6,
      type: 'alphanumeric',
      autoCapitalize: 'characters',
      onChange,
    });

    expect(onChange).toHaveBeenCalledWith('AB12');
    expect(nextFocusIndex).toBe(4);
  });

  it('keeps full value when slotTapBehavior is "focus"', () => {
    expect(applySlotPress(1, '32332', false, 'focus')).toEqual({
      nextValue: '32332',
      nextFocusIndex: 1,
    });
  });

  it('accepts a replacement value for a selected filled slot', () => {
    const onChange = jest.fn();

    applyPinChangeText('129456', {
      value: '123456',
      focusIndex: 2,
      length: 6,
      onChange,
    });

    expect(onChange).toHaveBeenCalledWith('129456');
  });
});
