import { TextInput, StyleSheet } from 'react-native';
import { usePinInput } from '../../application/pin-input/usePinInput';
import type { PinHiddenInputProps } from './types';

export function PinHiddenInput({ testID }: PinHiddenInputProps) {
  const {
    value,
    length,
    disabled,
    secureTextEntry,
    inputRef,
    handleChangeText,
    handleKeyPress,
  } = usePinInput();

  return (
    <TextInput
      ref={inputRef}
      value={value}
      onChangeText={handleChangeText}
      onKeyPress={handleKeyPress}
      keyboardType="number-pad"
      maxLength={length}
      caretHidden
      editable={!disabled}
      secureTextEntry={secureTextEntry}
      autoComplete="one-time-code"
      textContentType="oneTimeCode"
      importantForAutofill="yes"
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
