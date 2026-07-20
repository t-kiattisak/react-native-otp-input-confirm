import { useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  PinConfirm,
  PinContainer,
  PinInput,
  PinInputPreset,
  PinSlot,
  PinStick,
  PinThemeProvider,
  createTheme,
} from 'react-native-otp-input-confirm';

type DemoTab = 'default' | 'preset' | 'headless' | 'confirm';

const appTheme = createTheme({
  slotFocused: { borderColor: '#2563EB' },
  stick: { backgroundColor: '#2563EB' },
});

export default function App() {
  const [tab, setTab] = useState<DemoTab>('default');
  const [value, setValue] = useState('');
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const expectedPin = '123456';

  return (
    <PinThemeProvider theme={appTheme}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>OTP Input Confirm</Text>
          <View style={styles.tabs}>
            {(
              [
                ['default', 'Default'],
                ['preset', 'Preset'],
                ['headless', 'Headless'],
                ['confirm', 'Confirm'],
              ] as const
            ).map(([key, label]) => (
              <Pressable
                key={key}
                style={[styles.tab, tab === key && styles.tabActive]}
                onPress={() => setTab(key)}
              >
                <Text
                  style={[styles.tabText, tab === key && styles.tabTextActive]}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>

          {tab === 'default' ? (
            <>
              <PinInput
                value={value}
                onChange={setValue}
                length={6}
                autoFocus
                hapticFeedback
                onComplete={(code) => console.log('Complete:', code)}
                testID="otp-default"
              />
              <Text style={styles.value}>Value: {value || '—'}</Text>
            </>
          ) : null}

          {tab === 'preset' ? (
            <>
              <PinInputPreset
                value={value}
                onChange={setValue}
                length={6}
                testID="otp-preset"
              />
              <Text style={styles.value}>Value: {value || '—'}</Text>
            </>
          ) : null}

          {tab === 'headless' ? (
            <>
              <PinInput value={value} onChange={setValue} length={6}>
                <PinContainer style={styles.headlessContainer}>
                  {Array.from({ length: 6 }, (_, index) => (
                    <PinSlot key={index} index={index}>
                      {({ isFocused, isFilled, valueInside }) => (
                        <View
                          style={[
                            styles.headlessSlot,
                            isFilled && styles.headlessFilled,
                            isFocused && styles.headlessFocused,
                          ]}
                        >
                          {valueInside !== '' ? (
                            <Text style={styles.headlessText}>
                              {valueInside}
                            </Text>
                          ) : null}
                          {isFocused && !valueInside ? (
                            <PinStick style={styles.headlessStick} />
                          ) : null}
                        </View>
                      )}
                    </PinSlot>
                  ))}
                </PinContainer>
              </PinInput>
              <Text style={styles.value}>Value: {value || '—'}</Text>
            </>
          ) : null}

          {tab === 'confirm' ? (
            <PinConfirm
              value={pin}
              onChange={(next) => {
                setPin(next);
                setPinError(false);
              }}
              length={6}
              maskChar="*"
              label="Enter PIN"
              autoFocus
              error={pinError}
              errorMessage={pinError ? 'PIN does not match' : undefined}
              onComplete={(code) => {
                if (code !== expectedPin) {
                  setPinError(true);
                  return;
                }
                console.log('Verified:', code);
              }}
              hapticFeedback
            />
          ) : null}
        </ScrollView>
      </TouchableWithoutFeedback>
    </PinThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 20,
    backgroundColor: '#F9FAFB',
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#E5E7EB',
  },
  tabActive: {
    backgroundColor: '#2563EB',
  },
  tabText: {
    fontSize: 13,
    color: '#374151',
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  value: {
    fontSize: 14,
    color: '#6B7280',
  },
  headlessContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  headlessSlot: {
    width: 44,
    height: 52,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  headlessFilled: {
    borderColor: '#64748B',
  },
  headlessFocused: {
    borderColor: '#0F172A',
    borderWidth: 2,
  },
  headlessText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
  },
  headlessStick: {
    width: 2,
    height: 20,
    backgroundColor: '#0F172A',
  },
});
