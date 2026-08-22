import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text, View, type ViewStyle } from 'react-native';
import { usePinInput } from '../../application/pin-input/hooks/usePinInput';
import { usePinTheme } from '../theme/usePinTheme';
import { PinContainer } from './PinContainer';
import { PinSlot } from './PinSlot';
import { PinStick } from './PinStick';
import type { PinVariant } from './types';
import type { PinThemeOverrides } from '../theme/types';

type PinInputDefaultViewProps = {
  styles?: PinThemeOverrides;
  variant?: PinVariant;
  error?: boolean;
  errorMessage?: string;
  shakeOnError?: boolean;
  accessibilityLabel?: string;
};

const variantStyles = StyleSheet.create({
  box: {},
  underline: {
    borderWidth: 0,
    borderBottomWidth: 2,
    borderRadius: 0,
    backgroundColor: 'transparent',
  },
  rounded: {
    borderRadius: 16,
  },
  circle: {
    borderRadius: 9999,
  },
});

export function PinInputDefaultView({
  styles: styleOverrides,
  variant = 'box',
  error = false,
  errorMessage,
  shakeOnError = false,
  accessibilityLabel = 'OTP input',
}: PinInputDefaultViewProps) {
  const theme = usePinTheme(styleOverrides);
  const { length, disabled, secureTextEntry, maskChar, value } = usePinInput();
  const shakeAnim = useRef(new Animated.Value(0)).current;
  const prevErrorRef = useRef(error);

  useEffect(() => {
    if (shakeOnError && !prevErrorRef.current && error) {
      shakeAnim.setValue(0);
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: -8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 8,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -3,
          duration: 40,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 40,
          useNativeDriver: true,
        }),
      ]).start();
    }
    prevErrorRef.current = error;
  }, [error, shakeAnim, shakeOnError]);

  const selectedVariantStyle: ViewStyle | undefined = variantStyles[variant];

  return (
    <Animated.View
      style={[theme.root, { transform: [{ translateX: shakeAnim }] }]}
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
                  selectedVariantStyle,
                  isFilled && theme.slotFilled,
                  isFocused && !error && theme.slotFocused,
                  error && (isFocused || isFilled) && theme.slotError,
                  disabled && theme.slotDisabled,
                ]}
              >
                <View style={theme.slotContent}>
                  {valueInside !== '' ? (
                    <Text style={theme.text}>
                      {secureTextEntry ? maskChar : valueInside}
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
    </Animated.View>
  );
}
