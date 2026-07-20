import { View, Text, StyleSheet } from 'react-native';
import type { PinLength, PinValue } from '../../domain/pin/types';
import { PinInputPreset } from '../pin-input/PinInputPreset';
import type { PinThemeOverrides } from '../theme/types';

export type PinConfirmProps = {
  value: PinValue;
  onChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  maskChar?: string;
  onComplete?: (value: PinValue) => void;
  error?: boolean;
  errorMessage?: string;
  label?: string;
  hapticFeedback?: boolean;
  styles?: PinThemeOverrides;
  testID?: string;
  accessibilityLabel?: string;
};

export function PinConfirm({
  value,
  onChange,
  length = 6,
  autoFocus = false,
  disabled = false,
  secureTextEntry = true,
  maskChar,
  onComplete,
  error = false,
  errorMessage,
  label,
  hapticFeedback = false,
  styles: styleOverrides,
  testID = 'pin-confirm',
  accessibilityLabel,
}: PinConfirmProps) {
  return (
    <View style={styles.wrapper} testID={testID}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <PinInputPreset
        value={value}
        onChange={onChange}
        length={length}
        autoFocus={autoFocus}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        maskChar={maskChar}
        onComplete={onComplete}
        error={error}
        errorMessage={errorMessage}
        hapticFeedback={hapticFeedback}
        styles={styleOverrides}
        accessibilityLabel={accessibilityLabel}
        testID={`${testID}-input`}
      />
    </View>
  );
}

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
