import { Platform, Vibration } from 'react-native';

export function triggerHaptic(): void {
  if (Platform.OS === 'web') {
    return;
  }

  try {
    Vibration.vibrate(10);
  } catch {
    // Native vibrate can fail when VIBRATE permission is missing.
  }
}
