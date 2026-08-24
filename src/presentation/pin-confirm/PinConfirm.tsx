import { forwardRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import type {
  AutoCapitalizeType,
  PinLength,
  PinType,
  PinValue,
} from '../../domain/pin/types';
import type { HapticType } from '../../application/pin-input/hooks/usePinInputController';
import type { SlotTapBehavior } from '../../application/pin-input/utility/pinInputActions';
import { PinInputPreset } from '../pin-input/PinInputPreset';
import type { PinInputRef, PinVariant } from '../pin-input/types';
import type { PinThemeOverrides } from '../theme/types';

export type PinConfirmProps = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  type?: PinType;
  autoCapitalize?: AutoCapitalizeType;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  maskChar?: string;
  maskDelay?: number;
  maskAnimation?: 'pop' | 'fade' | 'none';
  showVisibilityToggle?: boolean;
  onToggleSecure?: (isSecure: boolean) => void;
  onComplete?: (value: PinValue) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hapticFeedback?: boolean;
  onHaptic?: (type: HapticType) => void;
  blurOnComplete?: boolean;
  clearOnError?: boolean;
  shakeOnError?: boolean;
  slotTapBehavior?: SlotTapBehavior;
  variant?: PinVariant;
  styles?: PinThemeOverrides;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  testID?: string;
  accessibilityLabel?: string;
};

export const PinConfirm = forwardRef<PinInputRef, PinConfirmProps>(
  function PinConfirmComponent(
    {
      value,
      onChange,
      length = 6,
      type = 'numeric',
      autoCapitalize = 'none',
      autoFocus = false,
      disabled = false,
      secureTextEntry = true,
      maskChar,
      maskDelay = 0,
      maskAnimation = 'pop',
      showVisibilityToggle = false,
      onToggleSecure,
      onComplete,
      error = false,
      errorMessage,
      label,
      hapticFeedback = false,
      onHaptic,
      blurOnComplete = false,
      clearOnError = false,
      shakeOnError = false,
      slotTapBehavior = 'truncate',
      variant = 'box',
      styles: styleOverrides,
      containerStyle,
      labelStyle,
      testID = 'pin-confirm',
      accessibilityLabel,
    },
    ref
  ) {
    return (
      <View style={[styles.wrapper, containerStyle]} testID={testID}>
        {label ? <Text style={[styles.label, labelStyle]}>{label}</Text> : null}
        <PinInputPreset
          ref={ref}
          value={value}
          onChange={onChange}
          length={length}
          type={type}
          autoCapitalize={autoCapitalize}
          autoFocus={autoFocus}
          disabled={disabled}
          secureTextEntry={secureTextEntry}
          maskChar={maskChar}
          maskDelay={maskDelay}
          maskAnimation={maskAnimation}
          showVisibilityToggle={showVisibilityToggle}
          onToggleSecure={onToggleSecure}
          onComplete={onComplete}
          error={error}
          errorMessage={errorMessage}
          hapticFeedback={hapticFeedback}
          onHaptic={onHaptic}
          blurOnComplete={blurOnComplete}
          clearOnError={clearOnError}
          shakeOnError={shakeOnError}
          slotTapBehavior={slotTapBehavior}
          variant={variant}
          styles={styleOverrides}
          accessibilityLabel={accessibilityLabel}
          testID={`${testID}-input`}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: {
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
});
