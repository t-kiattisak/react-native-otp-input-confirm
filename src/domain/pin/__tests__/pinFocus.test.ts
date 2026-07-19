import { describe, expect, it } from '@jest/globals';
import { getActiveFocusIndex, getSlotState } from '../pinFocus';

describe('pinFocus', () => {
  it('returns next empty index as active focus', () => {
    expect(getActiveFocusIndex('', 6)).toBe(0);
    expect(getActiveFocusIndex('12', 6)).toBe(2);
  });

  it('returns last index when pin is complete', () => {
    expect(getActiveFocusIndex('123456', 6)).toBe(5);
  });

  it('derives slot state', () => {
    expect(getSlotState('123', 2, 1)).toEqual({
      isFocused: false,
      isFilled: true,
      valueInside: '2',
    });

    expect(getSlotState('123', 2, 2)).toEqual({
      isFocused: true,
      isFilled: true,
      valueInside: '3',
    });

    expect(getSlotState('12', 2, 3)).toEqual({
      isFocused: false,
      isFilled: false,
      valueInside: '',
    });
  });
});
