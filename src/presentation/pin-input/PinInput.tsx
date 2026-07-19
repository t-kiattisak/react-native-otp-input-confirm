import { StyleSheet, Text, View } from 'react-native';
import { PinInputContext } from '../../application/pin-input/PinInputContext';
import { usePinInputController } from '../../application/pin-input/usePinInputController';
import { PinContainer } from './PinContainer';
import { PinHiddenInput } from './PinHiddenInput';
import { PinSlot } from './PinSlot';
import { PinStick } from './PinStick';
import type { PinInputProps } from './types';

export function PinInput({
  value,
  onChange,
  length = 6,
  autoFocus = false,
  disabled = false,
  secureTextEntry = false,
  onComplete,
  testID,
}: PinInputProps) {
  const controller = usePinInputController({
    value,
    onChange,
    length,
    autoFocus,
    disabled,
    onComplete,
  });

  const contextValue = {
    ...controller,
    secureTextEntry,
  };

  return (
    <PinInputContext.Provider value={contextValue}>
      <View style={styles.root} testID={testID}>
        <PinHiddenInput testID={testID ? `${testID}-input` : undefined} />
        <PinContainer style={styles.container}>
          {Array.from({ length }, (_, index) => (
            <PinSlot key={index} index={index}>
              {({ isFocused, isFilled, valueInside }) => (
                <View
                  style={[
                    styles.slot,
                    isFilled && styles.slotFilled,
                    isFocused && styles.slotFocused,
                    disabled && styles.slotDisabled,
                  ]}
                >
                  <View style={styles.slotContent}>
                    {valueInside !== '' ? (
                      <Text style={styles.text}>
                        {secureTextEntry ? '•' : valueInside}
                      </Text>
                    ) : null}
                    {isFocused && !disabled && valueInside === '' ? (
                      <PinStick />
                    ) : null}
                  </View>
                </View>
              )}
            </PinSlot>
          ))}
        </PinContainer>
      </View>
    </PinInputContext.Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  slot: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  slotContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotFilled: {
    borderColor: '#9CA3AF',
  },
  slotFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  slotDisabled: {
    opacity: 0.5,
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
});
