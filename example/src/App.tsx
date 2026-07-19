import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PinInput } from 'react-native-otp-input-confirm';

export default function App() {
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Input</Text>
      <PinInput
        value={value}
        onChange={setValue}
        length={6}
        autoFocus
        onComplete={(code) => console.log('Complete:', code)}
        testID="otp-input"
      />
      <Text style={styles.value}>Value: {value || '—'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 24,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  value: {
    fontSize: 14,
    color: '#6B7280',
  },
});
