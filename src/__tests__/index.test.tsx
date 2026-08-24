import { describe, expect, it } from '@jest/globals';
import {
  PinConfirm,
  PinContainer,
  PinHiddenInput,
  PinInput,
  PinInputDefaultView,
  PinInputPreset,
  PinMaskedText,
  PinSlot,
  PinStick,
  PinThemeProvider,
  createTheme,
  getActiveFocusIndex,
  getCharAt,
  getSlotState,
  isPinComplete,
  mergePinTheme,
  sanitizePinInput,
  usePinInput,
  usePinInputController,
  usePinMask,
  usePinTheme,
} from '../index';

describe('react-native-otp-input-confirm exports', () => {
  it('exports public API', () => {
    expect(PinInput).toBeDefined();
    expect(PinInputPreset).toBeDefined();
    expect(PinMaskedText).toBeDefined();
    expect(PinContainer).toBeDefined();
    expect(PinSlot).toBeDefined();
    expect(PinStick).toBeDefined();
    expect(PinHiddenInput).toBeDefined();
    expect(PinInputDefaultView).toBeDefined();
    expect(PinConfirm).toBeDefined();
    expect(PinThemeProvider).toBeDefined();
    expect(createTheme).toBeDefined();
    expect(usePinTheme).toBeDefined();
    expect(mergePinTheme).toBeDefined();
    expect(usePinInput).toBeDefined();
    expect(usePinInputController).toBeDefined();
    expect(usePinMask).toBeDefined();
    expect(sanitizePinInput).toBeDefined();
    expect(isPinComplete).toBeDefined();
    expect(getCharAt).toBeDefined();
    expect(getActiveFocusIndex).toBeDefined();
    expect(getSlotState).toBeDefined();
  });
});
