import { StyleSheet } from 'react-native';
import type { PinTheme } from './types';

export const defaultPinTheme = StyleSheet.create({
  root: {
    position: 'relative',
  },
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  slot: {
    width: 48,
    height: 56,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  slotContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slotFilled: {
    borderColor: '#9CA3AF',
  },
  slotFocused: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  slotError: {
    borderColor: '#EF4444',
    borderWidth: 2,
  },
  slotDisabled: {
    opacity: 0.5,
    backgroundColor: '#F3F4F6',
  },
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
  },
  stick: {
    width: 2,
    height: 24,
    backgroundColor: '#007AFF',
  },
  errorText: {
    marginTop: 8,
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
  },
}) satisfies PinTheme;
