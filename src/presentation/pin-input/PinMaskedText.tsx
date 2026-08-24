import { useEffect, useRef } from 'react';
import { Animated, type StyleProp, type TextStyle } from 'react-native';

export type PinMaskedTextProps = {
  char: string;
  maskChar?: string;
  isMasked?: boolean;
  animation?: 'pop' | 'fade' | 'none';
  style?: StyleProp<TextStyle>;
};

export function PinMaskedText({
  char,
  maskChar = '•',
  isMasked = false,
  animation = 'pop',
  style,
}: PinMaskedTextProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const prevMaskedRef = useRef(isMasked);

  useEffect(() => {
    // When transitioning from unmasked -> masked, run smooth animation
    if (!prevMaskedRef.current && isMasked && animation !== 'none') {
      if (animation === 'pop') {
        scaleAnim.setValue(0.4);
        opacityAnim.setValue(0.2);
        Animated.parallel([
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 5,
            tension: 100,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 150,
            useNativeDriver: true,
          }),
        ]).start();
      } else if (animation === 'fade') {
        opacityAnim.setValue(0);
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
    } else if (!isMasked) {
      scaleAnim.setValue(1);
      opacityAnim.setValue(1);
    }
    prevMaskedRef.current = isMasked;
  }, [animation, isMasked, opacityAnim, scaleAnim]);

  const displayChar = isMasked ? maskChar : char;

  return (
    <Animated.Text
      style={[
        style,
        {
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        },
      ]}
    >
      {displayChar}
    </Animated.Text>
  );
}
