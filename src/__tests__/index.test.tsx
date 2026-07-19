import { describe, expect, it } from '@jest/globals';
import {
  PinConfirm,
  PinContainer,
  PinInput,
  PinInputPreset,
  PinSlot,
  PinStick,
  PinThemeProvider,
  createTheme,
  usePinTheme,
} from '../index';

describe('react-native-otp-input-confirm exports', () => {
  it('exports public API', () => {
    expect(PinInput).toBeDefined();
    expect(PinInputPreset).toBeDefined();
    expect(PinContainer).toBeDefined();
    expect(PinSlot).toBeDefined();
    expect(PinStick).toBeDefined();
    expect(PinConfirm).toBeDefined();
    expect(PinThemeProvider).toBeDefined();
    expect(createTheme).toBeDefined();
    expect(usePinTheme).toBeDefined();
  });
});
