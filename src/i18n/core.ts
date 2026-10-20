// Core i18n primitives. Every user-facing string exists in Marathi, Hindi and English.
// TypeScript enforces that no language is missing for any key.

export type Lang = 'mr' | 'hi' | 'en';
export const LANGS: Lang[] = ['mr', 'hi', 'en'];

/** A piece of text in all supported languages. */
export interface LText {
  mr: string;
  hi: string;
  en: string;
}

export type Params = Record<string, string | number | undefined | null>;

export function defineMessages<T extends Record<string, LText>>(messages: T): T {
  return messages;
}

/** Replace {name} placeholders. Unknown placeholders are left visible so mistakes are easy to spot. */
export function interpolate(text: string, params?: Params): string {
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined || value === null ? match : String(value);
  });
}

export function pick(text: LText, lang: Lang): string {
  return text[lang] || text.en;
}

/** BCP-47 tags used for speech, speech recognition and formatting. */
export const LANG_TAG: Record<Lang, string> = { mr: 'mr-IN', hi: 'hi-IN', en: 'en-IN' };

export const LANG_NAME: Record<Lang, string> = { mr: 'मराठी', hi: 'हिंदी', en: 'English' };

const DEVANAGARI_DIGITS = '०१२३४५६७८९';

/** Convert Devanagari digits (from voice input or keyboards) to ASCII digits. */
export function normaliseDigits(input: string): string {
  return input.replace(/[०-९]/g, (d) => String(DEVANAGARI_DIGITS.indexOf(d)));
}
