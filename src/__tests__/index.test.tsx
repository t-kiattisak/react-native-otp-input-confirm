import { describe, expect, it } from '@jest/globals';
import {
  OtpResendTimer,
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
  formatSecondsToTime,
  getActiveFocusIndex,
  getCharAt,
  getSlotState,
  isPinComplete,
  mergePinTheme,
  sanitizePinInput,
  useOtpCountdown,
  useInterval,
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
    expect(OtpResendTimer).toBeDefined();
    expect(PinThemeProvider).toBeDefined();
    expect(createTheme).toBeDefined();
    expect(usePinTheme).toBeDefined();
    expect(mergePinTheme).toBeDefined();
    expect(usePinInput).toBeDefined();
    expect(usePinInputController).toBeDefined();
    expect(usePinMask).toBeDefined();
    expect(useOtpCountdown).toBeDefined();
    expect(useInterval).toBeDefined();
    expect(formatSecondsToTime).toBeDefined();
    expect(sanitizePinInput).toBeDefined();
    expect(isPinComplete).toBeDefined();
    expect(getCharAt).toBeDefined();
    expect(getActiveFocusIndex).toBeDefined();
    expect(getSlotState).toBeDefined();
  });
});
