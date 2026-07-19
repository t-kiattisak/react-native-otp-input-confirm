import type { ReactNode } from 'react';
import type { PinLength, PinValue } from '../../domain/pin/types';
import type { PinThemeOverrides } from '../theme/types';

export type PinInputRef = {
  focus: () => void;
  blur: () => void;
  clear: () => void;
};

export type PinInputBaseProps = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  onComplete?: (value: PinValue) => void;
  testID?: string;
  error?: boolean;
  errorMessage?: string;
  styles?: PinThemeOverrides;
  hapticFeedback?: boolean;
  accessibilityLabel?: string;
  children?: ReactNode;
};

export type PinInputProps = PinInputBaseProps;

export type PinInputPresetProps = PinInputBaseProps;
