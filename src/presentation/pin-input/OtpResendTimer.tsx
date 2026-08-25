import {
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import { useOtpCountdown } from '../../application/pin-input/hooks/useOtpCountdown';

export type OtpResendTimerProps = {
  duration?: number;
  autoStart?: boolean;
  onResend?: () => void | Promise<void>;
  label?: string;
  resendText?: string;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  timerStyle?: StyleProp<TextStyle>;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonTextStyle?: StyleProp<TextStyle>;
  disabledButtonStyle?: StyleProp<ViewStyle>;
  disabledButtonTextStyle?: StyleProp<TextStyle>;
  testID?: string;
};

export function OtpResendTimer({
  duration = 60,
  autoStart = true,
  onResend,
  label = 'Resend code in',
  resendText = 'Resend Code',
  containerStyle,
  labelStyle,
  timerStyle,
  buttonStyle,
  buttonTextStyle,
  disabledButtonStyle,
  disabledButtonTextStyle,
  testID = 'otp-resend-timer',
}: OtpResendTimerProps) {
  const { seconds, formattedTime, isRunning, isExpired, restart } =
    useOtpCountdown({
      duration,
      autoStart,
    });

  const handlePressResend = async () => {
    if (!isExpired) return;
    restart(duration);
    await onResend?.();
  };

  return (
    <View style={[styles.container, containerStyle]} testID={testID}>
      {isRunning || seconds > 0 ? (
        <View style={styles.timerRow}>
          {label ? (
            <Text style={[styles.label, labelStyle]}>{label} </Text>
          ) : null}
          <Text style={[styles.timer, timerStyle]}>{formattedTime}</Text>
        </View>
      ) : null}

      <Pressable
        onPress={handlePressResend}
        disabled={!isExpired}
        accessibilityRole="button"
        accessibilityLabel={resendText}
        accessibilityState={{ disabled: !isExpired }}
        style={[
          styles.button,
          buttonStyle,
          !isExpired && [styles.buttonDisabled, disabledButtonStyle],
        ]}
        testID={`${testID}-button`}
      >
        <Text
          style={[
            styles.buttonText,
            buttonTextStyle,
            !isExpired && [styles.buttonTextDisabled, disabledButtonTextStyle],
          ]}
        >
          {resendText}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 8,
  },
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 13,
    color: '#6B7280',
  },
  timer: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563EB',
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
  },
  buttonTextDisabled: {
    color: '#9CA3AF',
  },
});
