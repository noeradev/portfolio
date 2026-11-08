/**
 * Horizontal spatial canvas — port of ECHO's experience-section.js.
 * Vertical scroll drives a lerped horizontal camera, counter-drifting tickers, parallax
 * background type, a HUD progress bar/phase label and chapter jump buttons.
 */
export function initExperience(section: HTMLElement) {
	const q = <T extends HTMLElement>(k: string) => section.querySelector<T>(`[data-exp="${k}"]`);
	const stage = q('stage');
	if (!stage) return;
	const tickerTop = q('ticker-top');
	const tickerBottom = q('ticker-bottom');
	const hudProgress = q('progress');
	const hudPhase = q('phase');
	const dateBgs = section.querySelectorAll<HTMLElement>('[data-parallax-factor]');
	const jumpButtons = section.querySelectorAll<HTMLButtonElement>('[data-target-progress]');
	const phases = [...section.querySelectorAll<HTMLElement>('[data-phase-from]')].map((el) => ({
		from: Number(el.dataset.phaseFrom),
		label: el.dataset.phaseLabel ?? '',
	}));

	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let currentX = 0,
		targetX = 0,
		currentP = 0,
		targetP = 0,
		ticking = false,
		lastPhase = '';

	const dims = () => ({
		totalDist: section.offsetHeight - innerHeight,
		maxTranslate: Math.max(0, stage.scrollWidth - innerWidth),
	});
	let { totalDist, maxTranslate } = dims();
	addEventListener('resize', () => ({ totalDist, maxTranslate } = dims()), { passive: true });

	function renderFrame() {
		ticking = false;
		currentP += (targetP - currentP) * 0.09;
		currentX += (targetX - currentX) * 0.09;

		stage!.style.transform = `translate3d(${currentX.toFixed(2)}px, 0, 0)`;
		dateBgs.forEach((el) => {
			const f = parseFloat(el.dataset.parallaxFactor || '0.15');
			el.style.transform = `translate3d(${(-currentX * f).toFixed(2)}px, 0, 0)`;
		});
		if (tickerTop) tickerTop.style.transform = `translate3d(${(currentX * 0.35).toFixed(2)}px, 0, 0)`;
		if (tickerBottom) tickerBottom.style.transform = `translate3d(${(-currentX * 0.25).toFixed(2)}px, 0, 0)`;
		if (hudProgress) hudProgress.style.transform = `scaleX(${currentP.toFixed(4)})`;

		if (hudPhase && phases.length) {
			const label = [...phases].reverse().find((p) => currentP >= p.from)?.label ?? phases[0].label;
			if (label !== lastPhase) hudPhase.textContent = lastPhase = label;
		}
		jumpButtons.forEach((btn) => {
			const t = parseFloat(btn.dataset.targetProgress || '0');
			btn.toggleAttribute('data-active', Math.abs(currentP - t) < 0.17);
		});

		if (Math.abs(targetX - currentX) > 0.1 || Math.abs(targetP - currentP) > 0.001) {
			ticking = true;
			requestAnimationFrame(renderFrame);
		}
	}

	function onScroll() {
		if (totalDist <= 0) return;
		targetP = Math.min(Math.max(-section.getBoundingClientRect().top / totalDist, 0), 1);
		targetX = -targetP * maxTranslate;
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(renderFrame);
		}
	}

	new IntersectionObserver(([e]) => {
		if (e.isIntersecting) {
			addEventListener('scroll', onScroll, { passive: true });
			onScroll();
		} else removeEventListener('scroll', onScroll);
	}).observe(section);

	jumpButtons.forEach((btn) =>
		btn.addEventListener('click', () => {
			const p = parseFloat(btn.dataset.targetProgress || '0');
			scrollTo({ top: section.getBoundingClientRect().top + scrollY + p * totalDist, behavior: 'smooth' });
		}),
	);
	onScroll();
}
