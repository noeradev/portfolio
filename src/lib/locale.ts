import type { Locale } from '../i18n/ui';

/** Pick the best localized block: requested lang → fallback → first available. */
export function pickLocale<T>(
	localesRecord: Record<string, T>,
	lang: Locale,
	fallback: Locale = 'ru',
): T {
	return (localesRecord[lang] ??
		localesRecord[fallback] ??
		Object.values(localesRecord)[0]) as T;
}
