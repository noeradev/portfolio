/**
 * ScrollExpandMedia — port of ECHO's scroll-expand-media.js.
 * Same timings and easing; elements are looked up by [data-sem="..."] inside the section
 * instead of global ids, and the scroll listener only runs while the section is on screen.
 */
export function initScrollExpand(section: HTMLElement, aspect = 1024 / 546) {
	const q = <T extends HTMLElement>(k: string) => section.querySelector<T>(`[data-sem="${k}"]`);
	const bgImg = q('bg');
	const mediaContainer = q('media');
	const mediaBlur = q('blur');
	const mediaOverlay = q('overlay');
	const titleFirst = q('title-first');
	const titleRest = q('title-rest');
	const dateTag = q('date');
	const scrollPrompt = q('prompt');
	const mediaContent = q('content');

	let isMobile = innerWidth < 768;
	let rafScheduled = false;

	function applyFrame(progress: number) {
		const startW = isMobile ? 280 : 300;
		const startH = isMobile ? 360 : 400;
		// Portrait end state on phones so the perimeter copy fits
		const ratio = isMobile ? Math.min(aspect, (innerWidth * 0.94) / (innerHeight * 0.8)) : aspect;
		const endW = Math.min(innerWidth * 0.94, innerHeight * 0.86 * ratio);
		const endH = endW / ratio;
		const currentW = startW + progress * (endW - startW);
		const currentH = startH + progress * (endH - startH);
		// On phones the title holds long enough to be read, then leaves cleanly —
		// the desktop split starts immediately.
		const tp = isMobile ? Math.min(Math.max((progress - 0.14) / 0.5, 0), 1) : progress;
		const textTranslateX = (tp * (isMobile ? 70 : 150)).toFixed(1);

		if (mediaBlur) {
			if (progress < 0.45) {
				mediaBlur.style.visibility = 'visible';
				mediaBlur.style.opacity = Math.max(0, 1 - progress * 2.3).toFixed(3);
			} else {
				mediaBlur.style.opacity = '0';
				mediaBlur.style.visibility = 'hidden';
			}
		}
		if (mediaContainer) {
			mediaContainer.style.width = `${currentW.toFixed(1)}px`;
			mediaContainer.style.height = `${currentH.toFixed(1)}px`;
			mediaContainer.style.borderColor = `rgba(167, 139, 250, ${(0.12 + (1 - progress) * 0.35).toFixed(2)})`;
		}
		if (bgImg) bgImg.style.opacity = Math.max(0, 1 - progress * 1.3).toFixed(3);
		if (mediaOverlay) mediaOverlay.style.opacity = Math.max(0.3, 0.8 - progress * 0.4).toFixed(3);

		const titleOpacity = Math.max(0, 1 - tp * (isMobile ? 1.3 : 1.6)).toFixed(3);
		if (titleFirst) {
			titleFirst.style.transform = `translateX(-${textTranslateX}vw) translateZ(0)`;
			titleFirst.style.opacity = titleOpacity;
		}
		if (titleRest) {
			titleRest.style.transform = `translateX(${textTranslateX}vw) translateZ(0)`;
			titleRest.style.opacity = titleOpacity;
		}
		const subOpacity = Math.max(0, 1 - tp * 2.8).toFixed(3);
		if (dateTag) {
			dateTag.style.transform = `translateX(-${textTranslateX}vw)`;
			dateTag.style.opacity = subOpacity;
		}
		if (scrollPrompt) {
			scrollPrompt.style.transform = `translateX(${textTranslateX}vw)`;
			scrollPrompt.style.opacity = subOpacity;
		}
		if (mediaContent) {
			// Phones reveal the copy earlier — a near-fullscreen card must not
			// scroll empty for a viewport and a half.
			const revealAt = isMobile ? 0.55 : 0.8;
			if (progress >= revealAt) {
				const fade = Math.min(1, (progress - revealAt) / 0.2);
				mediaContent.style.opacity = fade.toFixed(3);
				mediaContent.style.pointerEvents = fade > 0.5 ? 'auto' : 'none';
				mediaContent.style.transform = `translateY(${((1 - fade) * 12).toFixed(1)}px)`;
			} else {
				mediaContent.style.opacity = '0';
				mediaContent.style.pointerEvents = 'none';
				mediaContent.style.transform = 'translateY(15px)';
			}
		}
	}

	function renderFrame() {
		rafScheduled = false;
		const totalDist = section.offsetHeight - innerHeight;
		if (totalDist <= 0) return;
		const scrolled = -section.getBoundingClientRect().top;
		applyFrame(scrolled > 0 ? Math.min(Math.max(scrolled / totalDist / 0.9, 0), 1) : 0);
	}
	const onScroll = () => {
		if (!rafScheduled) {
			rafScheduled = true;
			requestAnimationFrame(renderFrame);
		}
	};

	new IntersectionObserver(([e]) => {
		if (e.isIntersecting) {
			addEventListener('scroll', onScroll, { passive: true });
			renderFrame();
		} else removeEventListener('scroll', onScroll);
	}).observe(section);
	addEventListener(
		'resize',
		() => {
			isMobile = innerWidth < 768;
			renderFrame();
		},
		{ passive: true },
	);
	renderFrame();
}
