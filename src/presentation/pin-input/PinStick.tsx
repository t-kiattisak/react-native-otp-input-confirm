import { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import type { PinStickProps } from './types';

export function PinStick({ style, testID }: PinStickProps) {
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => {
      animation.stop();
    };
  }, [opacity]);

  return (
    <Animated.View testID={testID} style={[styles.stick, style, { opacity }]} />
  );
}

const styles = StyleSheet.create({
  stick: {
    width: 2,
    height: 24,
    backgroundColor: '#007AFF',
  },
});
