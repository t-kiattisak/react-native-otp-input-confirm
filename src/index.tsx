export { createTheme } from './presentation/theme/createTheme';
export { defaultPinTheme } from './presentation/theme/defaultPinTheme';
export { PinThemeProvider } from './presentation/theme/PinThemeProvider';
export { usePinTheme } from './presentation/theme/usePinTheme';
export { mergePinTheme } from './presentation/theme/mergePinTheme';

export { PinInput } from './presentation/pin-input/PinInput';
export { PinContainer } from './presentation/pin-input/PinContainer';
export { PinSlot } from './presentation/pin-input/PinSlot';
export { PinStick } from './presentation/pin-input/PinStick';
export { PinHiddenInput } from './presentation/pin-input/PinHiddenInput';
export { PinInputDefaultView } from './presentation/pin-input/PinInputDefaultView';
export { PinInputPreset } from './presentation/pin-input/PinInputPreset';
export { PinMaskedText } from './presentation/pin-input/PinMaskedText';
export { PinConfirm } from './presentation/pin-confirm/PinConfirm';
export { OtpResendTimer } from './presentation/pin-input/OtpResendTimer';

export { usePinInput } from './application/pin-input/hooks/usePinInput';
export { usePinInputController } from './application/pin-input/hooks/usePinInputController';
export { usePinMask } from './application/pin-input/hooks/usePinMask';
export { useOtpCountdown } from './application/pin-input/hooks/useOtpCountdown';
export { formatSecondsToTime } from './application/pin-input/utility/formatTime';

export {
  sanitizePinInput,
  isPinComplete,
  getCharAt,
  normalizePinLength,
} from './domain/pin/pinRules';
export { getActiveFocusIndex, getSlotState } from './domain/pin/pinFocus';

export type {
  PinValue,
  PinLength,
  PinType,
  AutoCapitalizeType,
  SlotState,
} from './domain/pin/types';
export type {
  HapticType,
  UsePinInputControllerParams,
} from './application/pin-input/hooks/usePinInputController';
export type { UsePinMaskParams } from './application/pin-input/hooks/usePinMask';
export type {
  UseOtpCountdownParams,
  UseOtpCountdownReturn,
} from './application/pin-input/hooks/useOtpCountdown';
export type { SlotTapBehavior } from './application/pin-input/utility/pinInputActions';
export type { PinInputContextValue } from './application/pin-input/types';
export type { PinTheme, PinThemeOverrides } from './presentation/theme/types';
export type {
  PinInputProps,
  PinInputRef,
  PinInputPresetProps,
  PinVariant,
} from './presentation/pin-input/types';
export type {
  PinContainerProps,
  PinSlotProps,
  PinSlotRenderProps,
  PinStickProps,
  PinHiddenInputProps,
} from './presentation/pin-input/componentTypes';
export type { PinMaskedTextProps } from './presentation/pin-input/PinMaskedText';
export type { PinConfirmProps } from './presentation/pin-confirm/PinConfirm';
export type { OtpResendTimerProps } from './presentation/pin-input/OtpResendTimer';
