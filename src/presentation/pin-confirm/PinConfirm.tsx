import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { isPinComplete } from '../../domain/pin/pinRules';
import { isPinMatch, shouldShowConfirmError } from '../../domain/pin/pinMatch';
import { triggerHaptic } from '../../application/pin-input/triggerHaptic';
import type { PinLength, PinValue } from '../../domain/pin/types';
import { PinInputPreset } from '../pin-input/PinInputPreset';
import type { PinThemeOverrides } from '../theme/types';

export type PinConfirmLabels = {
  pin?: string;
  confirm?: string;
};

export type PinConfirmProps = {
  value: PinValue;
  confirmValue: PinValue;
  onChange: (value: PinValue) => void;
  onConfirmChange: (value: PinValue) => void;
  length?: PinLength;
  autoFocus?: boolean;
  disabled?: boolean;
  secureTextEntry?: boolean;
  onMatch?: (value: PinValue) => void;
  onMismatch?: () => void;
  labels?: PinConfirmLabels;
  errorMessage?: string;
  hapticFeedback?: boolean;
  styles?: PinThemeOverrides;
  testID?: string;
};

export function PinConfirm({
  value,
  confirmValue,
  onChange,
  onConfirmChange,
  length = 6,
  autoFocus = false,
  disabled = false,
  secureTextEntry = false,
  onMatch,
  onMismatch,
  labels,
  errorMessage = 'PIN does not match',
  hapticFeedback = false,
  styles: styleOverrides,
  testID = 'pin-confirm',
}: PinConfirmProps) {
  const [confirmTouched, setConfirmTouched] = useState(false);
  const lastFeedbackState = useRef<'idle' | 'match' | 'mismatch'>('idle');

  const showError = shouldShowConfirmError(
    value,
    confirmValue,
    length,
    confirmTouched
  );

  useEffect(() => {
    const isCompleteMatch =
      isPinComplete(value, length) &&
      isPinComplete(confirmValue, length) &&
      isPinMatch(value, confirmValue);

    const isMismatch =
      confirmTouched &&
      isPinComplete(confirmValue, length) &&
      !isPinMatch(value, confirmValue);

    if (isCompleteMatch && lastFeedbackState.current !== 'match') {
      lastFeedbackState.current = 'match';

      if (hapticFeedback) {
        triggerHaptic();
      }

      onMatch?.(value);
      return;
    }

    if (isMismatch && lastFeedbackState.current !== 'mismatch') {
      lastFeedbackState.current = 'mismatch';

      if (hapticFeedback) {
        triggerHaptic();
      }

      onMismatch?.();
      return;
    }

    if (!isCompleteMatch && !isMismatch) {
      lastFeedbackState.current = 'idle';
    }
  }, [
    confirmTouched,
    confirmValue,
    hapticFeedback,
    length,
    onMatch,
    onMismatch,
    value,
  ]);

  return (
    <View style={styles.wrapper} testID={testID}>
      {labels?.pin ? <Text style={styles.label}>{labels.pin}</Text> : null}
      <PinInputPreset
        value={value}
        onChange={onChange}
        length={length}
        autoFocus={autoFocus}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        styles={styleOverrides}
        testID={`${testID}-pin`}
      />
      {labels?.confirm ? (
        <Text style={styles.label}>{labels.confirm}</Text>
      ) : null}
      <PinInputPreset
        value={confirmValue}
        onChange={(nextValue) => {
          setConfirmTouched(true);
          onConfirmChange(nextValue);
        }}
        length={length}
        disabled={disabled}
        secureTextEntry={secureTextEntry}
        error={showError}
        errorMessage={showError ? errorMessage : undefined}
        styles={styleOverrides}
        testID={`${testID}-confirm`}
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
