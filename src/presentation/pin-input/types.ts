import type { ReactNode } from 'react';
import type {
  AutoCapitalizeType,
  PinLength,
  PinType,
  PinValue,
} from '../../domain/pin/types';
import type { HapticType } from '../../application/pin-input/hooks/usePinInputController';
import type { SlotTapBehavior } from '../../application/pin-input/utility/pinInputActions';
import type { PinThemeOverrides } from '../theme/types';

export type PinVariant = 'box' | 'underline' | 'rounded' | 'circle';

export type PinInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

export type PinInputBaseProps = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  type?: PinType;
  autoCapitalize?: AutoCapitalizeType;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  maskChar?: string;
  onComplete?: (value: PinValue) => void;
  testID?: string;
  error?: boolean;
  errorMessage?: string;
  styles?: PinThemeOverrides;
  variant?: PinVariant;
  hapticFeedback?: boolean;
  onHaptic?: (type: HapticType) => void;
  blurOnComplete?: boolean;
  clearOnError?: boolean;
  shakeOnError?: boolean;
  slotTapBehavior?: SlotTapBehavior;
  accessibilityLabel?: string;
  children?: ReactNode;
};

export type PinInputProps = PinInputBaseProps;

export type PinInputPresetProps = PinInputBaseProps;
