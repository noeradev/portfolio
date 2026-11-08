import { StringTune, StringParallax, StringMagnetic } from '@fiddle-digital/string-tune';

let instance: StringTune | null = null;

/** StringTune singleton for declarative `string="parallax|magnetic"` attributes. Native scroll stays on. */
export function getStringTune(): StringTune {
	if (instance) return instance;
	instance = StringTune.getInstance();
	instance.scrollDesktopMode = 'default';
	instance.scrollMobileMode = 'default';
	instance.use(StringParallax);
	instance.use(StringMagnetic);
	instance.start(60);
	instance.scrollDesktopMode = 'default';
	instance.scrollMobileMode = 'default';
	return instance;
}
