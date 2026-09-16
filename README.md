# react-native-otp-input-confirm

Headless-friendly OTP / PIN input for React Native with theming, confirmation flow, visual variants, and clean architecture.

## Features

- `PinInput` with default OTP UI or headless composition
- `PinInputPreset` with built-in visual variants (`box`, `underline`, `rounded`, `circle`)
- `PinConfirm` single masked PIN input with `forwardRef` support, label & container styling
- `createTheme()` + `PinThemeProvider` for app-wide styling
- Numeric, Alphanumeric, and Alpha OTP types (`type="numeric" | "alphanumeric" | "alpha"`) with `autoCapitalize`
- Smooth **Shake animation on error** (`shakeOnError`)
- Auto-blur on complete (`blurOnComplete`) & Auto-clear on error (`clearOnError`)
- Tap-to-edit behavior (`slotTapBehavior="truncate" | "focus"`)
- `onComplete`, error state, custom haptic feedback callback (`onHaptic`), ref API, and accessibility support
- Resend cooldown begins only after an async `onResend` succeeds; use `onResendError` for failures
- SMS OTP keyboard autofill (iOS Security Code AutoFill / Android `sms-otp`)
- Fully exported headless hooks and primitives (`usePinInputController`, `PinHiddenInput`, `PinInputDefaultView`)

## Installation

```sh
npm install react-native-otp-input-confirm
# or
yarn add react-native-otp-input-confirm
```

## Theming & Variants

```tsx
import {
  createTheme,
  PinThemeProvider,
  PinInputPreset,
} from 'react-native-otp-input-confirm';

const theme = createTheme({
  slotFocused: { borderColor: '#2563EB', borderWidth: 2 },
  stick: { backgroundColor: '#2563EB' },
  errorText: { color: '#DC2626' },
});

<PinThemeProvider theme={theme}>
  {/* Choose from 'box' | 'underline' | 'rounded' | 'circle' */}
  <PinInputPreset
    value={value}
    onChange={setValue}
    length={6}
    variant="rounded"
  />
</PinThemeProvider>;
```

Merge priority: `defaultPinTheme` → `createTheme()` → nested `PinThemeProvider` → component `styles` prop.

## Basic usage

```tsx
import { useRef, useState } from 'react';
import { PinInput, type PinInputRef } from 'react-native-otp-input-confirm';

export function OtpScreen() {
  const [value, setValue] = useState('');
  const ref = useRef<PinInputRef>(null);

  return (
    <PinInput
      ref={ref}
      value={value}
      onChange={setValue}
      length={6}
      autoFocus
      hapticFeedback
      blurOnComplete
      onComplete={(code) => console.log('Complete:', code)}
    />
  );
}
```

## Alphanumeric OTP / Promo Codes

```tsx
<PinInput
  value={code}
  onChange={setCode}
  length={6}
  type="alphanumeric"
  autoCapitalize="characters"
  variant="rounded"
  onComplete={(code) => console.log('Promo code:', code)}
/>
```

## Headless usage

```tsx
import { View, Text } from 'react-native';
import {
  PinInput,
  PinContainer,
  PinSlot,
  PinStick,
} from 'react-native-otp-input-confirm';

<PinInput value={value} onChange={setValue} length={6}>
  <PinContainer style={{ flexDirection: 'row', gap: 8 }}>
    {Array.from({ length: 6 }, (_, index) => (
      <PinSlot key={index} index={index}>
        {({ isFocused, isFilled, valueInside }) => (
          <View style={[styles.slot, isFocused && styles.focused]}>
            {valueInside ? <Text>{valueInside}</Text> : null}
            {isFocused && !valueInside ? <PinStick /> : null}
          </View>
        )}
      </PinSlot>
    ))}
  </PinContainer>
</PinInput>;
```

## PinConfirm

Single masked PIN input with `forwardRef` control. Validation and error state are controlled by the parent — use `onComplete` to verify, and pass `error` / `errorMessage` when verification fails with optional `shakeOnError` and `clearOnError`.

```tsx
import { useRef, useState } from 'react';
import { PinConfirm, type PinInputRef } from 'react-native-otp-input-confirm';

const confirmRef = useRef<PinInputRef>(null);
const [pin, setPin] = useState('');
const [error, setError] = useState(false);

<PinConfirm
  ref={confirmRef}
  value={pin}
  onChange={(next) => {
    setPin(next);
    setError(false);
  }}
  length={6}
  maskChar="*"
  label="Enter Security PIN"
  error={error}
  shakeOnError
  clearOnError
  errorMessage={error ? 'PIN does not match' : undefined}
  onComplete={(code) => {
    if (!verifyPin(code)) {
      setError(true);
    }
  }}
/>;

// Clear or focus programmatically:
// confirmRef.current?.clear();
// confirmRef.current?.focus();
```

## Cool Masking & Delayed Secure Text Entry

Support for iOS-style delayed masking (shows the typed digit briefly before smoothly morphing into the mask dot), bounce/pop animations, custom mask characters, and show/hide visibility toggle:

```tsx
<PinInput
  value={pin}
  onChange={setPin}
  length={6}
  secureTextEntry
  maskChar="●" // '•' | '●' | '✦' | '*' | '■'
  maskDelay={600} // Delay in ms before masking (0 for immediate)
  maskAnimation="pop" // 'pop' | 'fade' | 'none'
  showVisibilityToggle // Shows interactive 'Show PIN' / 'Hide PIN' button
  variant="rounded"
/>
```

## OTP Resend Timer & Countdown Hook

Built-in countdown cooldown and resend button:

```tsx
import {
  PinInput,
  OtpResendTimer,
  useOtpCountdown,
} from 'react-native-otp-input-confirm';

// 1. Ready-made UI component
<OtpResendTimer
  duration={60}
  label="Resend code in"
  resendText="Resend Code"
  onResend={async () => {
    await sendNewOtp();
  }}
  onResendError={(error) => console.warn('Could not resend OTP', error)}
/>;

// 2. Or headless hook
const { seconds, formattedTime, isRunning, isExpired, restart } =
  useOtpCountdown({
    duration: 60,
    autoStart: true,
    onExpire: () => console.log('Expired!'),
  });
```

## PinInput props

| Prop                   | Type                                                | Default      | Description                                          |
| ---------------------- | --------------------------------------------------- | ------------ | ---------------------------------------------------- |
| `value`                | `string`                                            | —            | Controlled OTP value                                 |
| `onChange`             | `(value: string) => void`                           | —            | Value change handler                                 |
| `length`               | `number`                                            | `6`          | Number of digits                                     |
| `type`                 | `'numeric' \| 'alphanumeric' \| 'alpha'`            | `'numeric'`  | Input character format                               |
| `autoCapitalize`       | `'none' \| 'characters' \| 'words' \| 'sentences'`  | `'none'`     | Auto capitalization                                  |
| `variant`              | `'box' \| 'underline' \| 'rounded' \| 'circle'`     | `'box'`      | Built-in UI style preset                             |
| `autoFocus`            | `boolean`                                           | `false`      | Focus hidden input on mount                          |
| `disabled`             | `boolean`                                           | `false`      | Disable input                                        |
| `secureTextEntry`      | `boolean`                                           | `false`      | Mask digits                                          |
| `maskChar`             | `string`                                            | `'•'`        | Character shown when masking                         |
| `maskDelay`            | `number`                                            | `0`          | Delay in ms before masking typed digit (iOS style)   |
| `maskAnimation`        | `'pop' \| 'fade' \| 'none'`                         | `'pop'`      | Transition animation when masking                    |
| `showVisibilityToggle` | `boolean`                                           | `false`      | Render interactive show/hide PIN toggle button       |
| `onToggleSecure`       | `(isSecure: boolean) => void`                       | —            | Callback when secure visibility state changes        |
| `onComplete`           | `(value: string) => void`                           | —            | Fired when all digits are entered                    |
| `blurOnComplete`       | `boolean`                                           | `false`      | Automatically blur input / hide keyboard on complete |
| `clearOnError`         | `boolean`                                           | `false`      | Automatically clear input when error becomes true    |
| `shakeOnError`         | `boolean`                                           | `false`      | Smooth shake animation when error becomes true       |
| `slotTapBehavior`      | `'truncate' \| 'focus'`                             | `'truncate'` | Behavior when tapping a filled slot                  |
| `error`                | `boolean`                                           | `false`      | Error state                                          |
| `errorMessage`         | `string`                                            | —            | Error text below input                               |
| `styles`               | `Partial<PinTheme>`                                 | —            | Local theme override                                 |
| `hapticFeedback`       | `boolean`                                           | `false`      | Native vibration on complete                         |
| `onHaptic`             | `(type: 'complete' \| 'change' \| 'error') => void` | —            | Custom haptic callback (e.g. expo-haptics)           |
| `testID`               | `string`                                            | —            | Root test id                                         |

Ref API: `focus()`, `blur()`, `clear()`.

## SMS OTP keyboard autofill

When an OTP SMS arrives, iOS and Android can show the code **above the keyboard** so the user can fill it with one tap. This library uses a single hidden `TextInput` with the platform autofill hints already configured:

| Platform | Props                                                           |
| -------- | --------------------------------------------------------------- |
| iOS      | `textContentType="oneTimeCode"`, `autoComplete="one-time-code"` |
| Android  | `autoComplete="sms-otp"`, `importantForAutofill="yes"`          |

**Tips for reliable autofill**

- Keep the OTP field **focused** when the SMS arrives — use `autoFocus` on the OTP screen.
- Test on a **real device**; iOS Simulator usually does not show SMS suggestions.
- Do **not** use `secureTextEntry` on SMS OTP screens; some devices hide autofill when masking is enabled.
- Ask your backend to send a recognizable OTP format, e.g. `Your code is 123456` or (iOS) `@yourapp.com #123456`.

Pasting or autofill fills all digits at once and triggers `onComplete` when the PIN is full.

## PinConfirm props

| Prop                   | Type                                                | Default         | Description                                        |
| ---------------------- | --------------------------------------------------- | --------------- | -------------------------------------------------- |
| `value`                | `string`                                            | —               | Controlled PIN value                               |
| `onChange`             | `(value: string) => void`                           | —               | Value change handler                               |
| `length`               | `number`                                            | `6`             | Number of digits                                   |
| `type`                 | `'numeric' \| 'alphanumeric' \| 'alpha'`            | `'numeric'`     | Character type                                     |
| `autoCapitalize`       | `'none' \| 'characters' \| 'words' \| 'sentences'`  | `'none'`        | Text capitalization                                |
| `variant`              | `'box' \| 'underline' \| 'rounded' \| 'circle'`     | `'box'`         | Preset variant                                     |
| `autoFocus`            | `boolean`                                           | `false`         | Focus input on mount                               |
| `disabled`             | `boolean`                                           | `false`         | Disable input                                      |
| `secureTextEntry`      | `boolean`                                           | `true`          | Mask digits                                        |
| `maskChar`             | `string`                                            | `'•'`           | Character shown when masking                       |
| `maskDelay`            | `number`                                            | `0`             | Delay in ms before masking typed digit (iOS style) |
| `maskAnimation`        | `'pop' \| 'fade' \| 'none'`                         | `'pop'`         | Transition animation when masking                  |
| `showVisibilityToggle` | `boolean`                                           | `false`         | Render interactive show/hide PIN toggle button     |
| `onToggleSecure`       | `(isSecure: boolean) => void`                       | —               | Callback when secure visibility state changes      |
| `onComplete`           | `(value: string) => void`                           | —               | Fired when all digits are entered                  |
| `blurOnComplete`       | `boolean`                                           | `false`         | Auto-dismiss keyboard on complete                  |
| `clearOnError`         | `boolean`                                           | `false`         | Auto-clear input on error                          |
| `shakeOnError`         | `boolean`                                           | `false`         | Shake animation on error                           |
| `error`                | `boolean`                                           | `false`         | Error state (parent-controlled)                    |
| `errorMessage`         | `string`                                            | —               | Error text below input                             |
| `label`                | `string`                                            | —               | Optional label above input                         |
| `labelStyle`           | `StyleProp<TextStyle>`                              | —               | Custom style for label                             |
| `containerStyle`       | `StyleProp<ViewStyle>`                              | —               | Custom style for outer wrapper                     |
| `hapticFeedback`       | `boolean`                                           | `false`         | Vibrate on complete                                |
| `onHaptic`             | `(type: 'complete' \| 'change' \| 'error') => void` | —               | Custom haptic callback                             |
| `styles`               | `Partial<PinTheme>`                                 | —               | Local theme override                               |
| `testID`               | `string`                                            | `'pin-confirm'` | Root test id                                       |

## Architecture

```
src/
├── domain/pin/              # validation, character rules, focus logic
├── application/pin-input/   # hooks (usePinInput, usePinInputController), actions, context
├── presentation/theme/      # createTheme, PinThemeProvider, mergePinTheme
├── presentation/pin-input/  # PinInput, PinHiddenInput, PinInputDefaultView, headless primitives
└── presentation/pin-confirm/# PinConfirm (forwardRef, label, shake animation)
```

## Development

```sh
yarn install
yarn typecheck
yarn lint
yarn test
yarn example start
```

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)
