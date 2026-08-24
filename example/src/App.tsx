import { useRef, useState } from 'react';
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
  type PinInputRef,
  type PinVariant,
} from 'react-native-otp-input-confirm';

type DemoTab =
  'default' | 'variants' | 'masking' | 'alphanumeric' | 'headless' | 'confirm';

const appTheme = createTheme({
  slotFocused: { borderColor: '#2563EB' },
  stick: { backgroundColor: '#2563EB' },
});

export default function App() {
  const [tab, setTab] = useState<DemoTab>('default');
  const [value, setValue] = useState('');
  const [variant, setVariant] = useState<PinVariant>('box');
  const [alphaValue, setAlphaValue] = useState('');
  const [maskValue, setMaskValue] = useState('');
  const [maskChar, setMaskChar] = useState('•');
  const [maskAnimation, setMaskAnimation] = useState<'pop' | 'fade' | 'none'>(
    'pop'
  );
  const [maskDelay, setMaskDelay] = useState(600);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  const confirmRef = useRef<PinInputRef>(null);
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
                ['variants', 'Variants'],
                ['masking', '🔒 Cool Masking'],
                ['alphanumeric', 'Alphanumeric'],
                ['headless', 'Headless'],
                ['confirm', 'Confirm (Ref & Shake)'],
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
                blurOnComplete
                onComplete={(code) => console.log('Complete:', code)}
                testID="otp-default"
              />
              <Text style={styles.value}>Value: {value || '—'}</Text>
            </>
          ) : null}

          {tab === 'variants' ? (
            <>
              <View style={styles.variantSelector}>
                {(['box', 'underline', 'rounded', 'circle'] as const).map(
                  (v) => (
                    <Pressable
                      key={v}
                      style={[
                        styles.variantButton,
                        variant === v && styles.variantButtonActive,
                      ]}
                      onPress={() => setVariant(v)}
                    >
                      <Text
                        style={[
                          styles.variantButtonText,
                          variant === v && styles.variantButtonTextActive,
                        ]}
                      >
                        {v}
                      </Text>
                    </Pressable>
                  )
                )}
              </View>
              <PinInputPreset
                value={value}
                onChange={setValue}
                length={6}
                variant={variant}
                testID="otp-variant"
              />
              <Text style={styles.value}>
                Variant: {variant} | Value: {value || '—'}
              </Text>
            </>
          ) : null}

          {tab === 'masking' ? (
            <View style={styles.maskingDemo}>
              <Text style={styles.subtext}>
                iOS-style delayed mask with smooth pop animation and visibility
                toggle:
              </Text>

              {/* Mask Char Selector */}
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>Mask Character:</Text>
                <View style={styles.selectorRow}>
                  {(['•', '●', '✦', '*', '■'] as const).map((char) => (
                    <Pressable
                      key={char}
                      style={[
                        styles.optionButton,
                        maskChar === char && styles.optionButtonActive,
                      ]}
                      onPress={() => setMaskChar(char)}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          maskChar === char && styles.optionButtonTextActive,
                        ]}
                      >
                        {char}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Animation Selector */}
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>Transition Animation:</Text>
                <View style={styles.selectorRow}>
                  {(['pop', 'fade', 'none'] as const).map((anim) => (
                    <Pressable
                      key={anim}
                      style={[
                        styles.optionButton,
                        maskAnimation === anim && styles.optionButtonActive,
                      ]}
                      onPress={() => setMaskAnimation(anim)}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          maskAnimation === anim &&
                            styles.optionButtonTextActive,
                        ]}
                      >
                        {anim}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              {/* Delay Selector */}
              <View style={styles.optionGroup}>
                <Text style={styles.optionLabel}>Mask Delay:</Text>
                <View style={styles.selectorRow}>
                  {(
                    [
                      [0, 'Instant (0ms)'],
                      [500, '500ms'],
                      [800, '800ms'],
                    ] as const
                  ).map(([ms, label]) => (
                    <Pressable
                      key={ms}
                      style={[
                        styles.optionButton,
                        maskDelay === ms && styles.optionButtonActive,
                      ]}
                      onPress={() => setMaskDelay(ms)}
                    >
                      <Text
                        style={[
                          styles.optionButtonText,
                          maskDelay === ms && styles.optionButtonTextActive,
                        ]}
                      >
                        {label}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <PinInput
                value={maskValue}
                onChange={setMaskValue}
                length={6}
                secureTextEntry
                maskChar={maskChar}
                maskDelay={maskDelay}
                maskAnimation={maskAnimation}
                showVisibilityToggle
                variant="rounded"
                testID="otp-masking"
              />
              <Text style={styles.value}>Raw Value: {maskValue || '—'}</Text>
            </View>
          ) : null}

          {tab === 'alphanumeric' ? (
            <>
              <Text style={styles.subtext}>
                Supports letters + numbers with auto-uppercase:
              </Text>
              <PinInput
                value={alphaValue}
                onChange={setAlphaValue}
                length={6}
                type="alphanumeric"
                autoCapitalize="characters"
                variant="rounded"
                onComplete={(code) => console.log('Promo Code:', code)}
                testID="otp-alpha"
              />
              <Text style={styles.value}>Code: {alphaValue || '—'}</Text>
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
            <View style={styles.confirmContainer}>
              <PinConfirm
                ref={confirmRef}
                value={pin}
                onChange={(next) => {
                  setPin(next);
                  setPinError(false);
                }}
                length={6}
                maskChar="●"
                maskDelay={500}
                showVisibilityToggle
                label="Enter Security PIN (Try '123456')"
                autoFocus
                error={pinError}
                shakeOnError
                clearOnError
                errorMessage={
                  pinError ? 'Incorrect PIN. Please try again.' : undefined
                }
                onComplete={(code) => {
                  if (code !== expectedPin) {
                    setPinError(true);
                    return;
                  }
                  console.log('Verified:', code);
                }}
                hapticFeedback
              />
              <View style={styles.buttonRow}>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => confirmRef.current?.clear()}
                >
                  <Text style={styles.actionButtonText}>Clear PIN (Ref)</Text>
                </Pressable>
                <Pressable
                  style={styles.actionButton}
                  onPress={() => confirmRef.current?.focus()}
                >
                  <Text style={styles.actionButtonText}>Focus (Ref)</Text>
                </Pressable>
              </View>
            </View>
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
  subtext: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    maxWidth: 360,
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
  variantSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
  },
  variantButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#E2E8F0',
  },
  variantButtonActive: {
    backgroundColor: '#0F172A',
  },
  variantButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    textTransform: 'capitalize',
  },
  variantButtonTextActive: {
    color: '#FFFFFF',
  },
  maskingDemo: {
    alignItems: 'center',
    gap: 16,
    width: '100%',
  },
  optionGroup: {
    alignItems: 'center',
    gap: 6,
  },
  optionLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  selectorRow: {
    flexDirection: 'row',
    gap: 6,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  optionButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  optionButtonActive: {
    backgroundColor: '#2563EB',
  },
  optionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  optionButtonTextActive: {
    color: '#FFFFFF',
  },
  value: {
    fontSize: 14,
    color: '#6B7280',
  },
  confirmContainer: {
    alignItems: 'center',
    gap: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
  },
  actionButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#374151',
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
