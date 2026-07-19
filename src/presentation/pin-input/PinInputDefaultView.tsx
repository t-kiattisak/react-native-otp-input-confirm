import { Text, View } from 'react-native';
import { usePinInput } from '../../application/pin-input/hooks/usePinInput';
import { usePinTheme } from '../theme/usePinTheme';
import { PinContainer } from './PinContainer';
import { PinSlot } from './PinSlot';
import { PinStick } from './PinStick';
import type { PinThemeOverrides } from '../theme/types';

type PinInputDefaultViewProps = {
  styles?: PinThemeOverrides;
  error?: boolean;
  errorMessage?: string;
  accessibilityLabel?: string;
};

export function PinInputDefaultView({
  styles: styleOverrides,
  error = false,
  errorMessage,
  accessibilityLabel = 'OTP input',
}: PinInputDefaultViewProps) {
  const theme = usePinTheme(styleOverrides);
  const { length, disabled, secureTextEntry, value } = usePinInput();

  return (
    <View
      style={theme.root}
      accessibilityLabel={accessibilityLabel}
      accessibilityValue={{
        text: `${value.length} of ${length} digits entered`,
      }}
    >
      <PinContainer style={theme.container} accessibilityElementsHidden>
        {Array.from({ length }, (_, index) => (
          <PinSlot key={index} index={index}>
            {({ isFocused, isFilled, valueInside }) => (
              <View
                style={[
                  theme.slot,
                  isFilled && theme.slotFilled,
                  isFocused && !error && theme.slotFocused,
                  error && (isFocused || isFilled) && theme.slotError,
                  disabled && theme.slotDisabled,
                ]}
              >
                <View style={theme.slotContent}>
                  {valueInside !== '' ? (
                    <Text style={theme.text}>
                      {secureTextEntry ? '•' : valueInside}
                    </Text>
                  ) : null}
                  {isFocused && !disabled && valueInside === '' ? (
                    <PinStick style={theme.stick} />
                  ) : null}
                </View>
              </View>
            )}
          </PinSlot>
        ))}
      </PinContainer>
      {error && errorMessage ? (
        <Text
          style={theme.errorText}
          accessibilityRole="alert"
          accessibilityLiveRegion="polite"
        >
          {errorMessage}
        </Text>
      ) : null}
    </View>
  );
}
