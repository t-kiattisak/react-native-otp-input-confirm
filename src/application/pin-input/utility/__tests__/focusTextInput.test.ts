import { describe, expect, it, jest } from '@jest/globals';
import { setTextInputSelection } from '../focusTextInput';

describe('setTextInputSelection', () => {
  it('uses setNativeProps when a native ref has no setSelection method', () => {
    const setNativeProps = jest.fn();

    setTextInputSelection({ setNativeProps }, 2, 3);

    expect(setNativeProps).toHaveBeenCalledWith({
      selection: { start: 2, end: 3 },
    });
  });
});
