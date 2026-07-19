import { describe, expect, it } from '@jest/globals';
import { createTheme } from '../createTheme';
import { defaultPinTheme } from '../defaultPinTheme';
import { mergePinTheme } from '../mergePinTheme';

describe('mergePinTheme', () => {
  it('returns a copy of the base theme when overrides are empty', () => {
    const theme = mergePinTheme(defaultPinTheme);

    expect(theme.slot.borderColor).toBe('#D1D5DB');
    expect(theme).not.toBe(defaultPinTheme);
  });

  it('merges partial overrides from createTheme', () => {
    const theme = createTheme({
      slotFocused: { borderColor: '#EF4444' },
    });

    expect(theme.slotFocused.borderColor).toBe('#EF4444');
    expect(theme.slotFocused.borderWidth).toBe(2);
    expect(theme.slot.borderColor).toBe('#D1D5DB');
  });
});
