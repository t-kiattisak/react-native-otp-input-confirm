import { Pressable, View } from 'react-native';
import { usePinInput } from '../../application/pin-input/usePinInput';
import type { PinContainerProps } from './types';

export function PinContainer({ style, children, testID }: PinContainerProps) {
  const { focusInput } = usePinInput();

  return (
    <Pressable onPress={focusInput} testID={testID}>
      <View style={style}>{children}</View>
    </Pressable>
  );
}
