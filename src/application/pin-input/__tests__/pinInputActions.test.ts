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
      length: 6,
      disabled: true,
      onChange,
    });

    expect(onChange).not.toHaveBeenCalled();
    expect(nextFocusIndex).toBeNull();
  });
});
