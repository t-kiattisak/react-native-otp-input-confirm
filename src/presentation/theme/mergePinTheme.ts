import type { PinTheme, PinThemeOverrides } from './types';

function mergeStyle<T extends Record<string, unknown>>(
  base: T,
  override?: Partial<T>
): T {
  if (!override) {
    return { ...base };
  }

  return { ...base, ...override };
}

export function mergePinTheme(
  base: PinTheme,
  overrides?: PinThemeOverrides
): PinTheme {
  if (!overrides) {
    return { ...base };
  }

  return {
    root: mergeStyle(base.root, overrides.root),
    container: mergeStyle(base.container, overrides.container),
    slot: mergeStyle(base.slot, overrides.slot),
    slotContent: mergeStyle(base.slotContent, overrides.slotContent),
    slotFilled: mergeStyle(base.slotFilled, overrides.slotFilled),
    slotFocused: mergeStyle(base.slotFocused, overrides.slotFocused),
    slotError: mergeStyle(base.slotError, overrides.slotError),
    slotDisabled: mergeStyle(base.slotDisabled, overrides.slotDisabled),
    text: mergeStyle(base.text, overrides.text),
    stick: mergeStyle(base.stick, overrides.stick),
    errorText: mergeStyle(base.errorText, overrides.errorText),
  };
}
