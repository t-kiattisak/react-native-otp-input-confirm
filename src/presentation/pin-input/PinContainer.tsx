import { Pressable, View } from 'react-native';
import { usePinInput } from '../../application/pin-input/usePinInput';
import type { PinContainerProps } from './componentTypes';

export function PinContainer({
  style,
  children,
  testID,
  accessibilityElementsHidden,
}: PinContainerProps) {
  const { focusInput } = usePinInput();

  return (
    <Pressable
      onPress={focusInput}
      testID={testID}
      accessibilityElementsHidden={accessibilityElementsHidden}
    >
      <View style={style}>{children}</View>
    </Pressable>
  );
}
