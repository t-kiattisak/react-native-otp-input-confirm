import { Platform, TextInput, StyleSheet } from 'react-native';
import { usePinInput } from '../../application/pin-input/hooks/usePinInput';
import type { PinHiddenInputProps } from './componentTypes';

export function PinHiddenInput({
  testID,
  accessibilityLabel = 'OTP digit input',
  accessibilityHint = 'Enter your one-time passcode',
}: PinHiddenInputProps) {
  const {
    value,
    length,
    disabled,
    secureTextEntry,
    inputRef,
    handleChangeText,
    handleKeyPress,
    handleInputFocus,
    handleInputBlur,
  } = usePinInput();

  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={handleChangeText}
      onKeyPress={handleKeyPress}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      keyboardType="number-pad"
      maxLength={length}
      caretHidden
      editable={!disabled}
      secureTextEntry={secureTextEntry}
      autoComplete={Platform.OS === 'android' ? 'sms-otp' : 'one-time-code'}
      textContentType="oneTimeCode"
      importantForAutofill="yes"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      testID={testID}
      style={styles.hiddenInput}
    />
  );
}

const styles = StyleSheet.create({
  hiddenInput: {
    position: 'absolute',
    width: 1,
    height: 1,
    opacity: 0,
  },
});
