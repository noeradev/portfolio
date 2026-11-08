export const locales = ['ru', 'en', 'kk'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export const localeNames: Record<Locale, string> = { ru: 'RU', en: 'EN', kk: 'KK' };

const ru = {
	'meta.title': 'Максим Потапченко (noera) — full-stack разработчик',
	'meta.description': 'Портфолио Максима Потапченко: Go-бэкенды, Next.js-интерфейсы, OCR и LLM-пайплайны.',
	name: 'Максим Потапченко',

	'nav.home': 'Главная',
	'nav.about': 'Обо мне',
	'nav.journey': 'Траектория',
	'nav.projects': 'Проекты',
	'nav.screens': 'Экраны',
	'nav.services': 'Услуги',
	'nav.contact': 'Связаться',
	'nav.menu': 'Меню',
	'nav.close': 'Закрыть',

	'hero.title.a': 'Максим',
	'hero.title.b': 'Потапченко',
	'hero.est': 'noera · с 2024',
	'hero.scroll': 'Листать к разделу «Обо мне»',
	'hero.pitch': 'Собираю продукты целиком: бэкенд на Go, интерфейс на Next.js, инфраструктура — self-hosted.',
	'hero.d1': 'Go-бэкенды',
	'hero.d2': 'Next.js',
	'hero.d3': 'OCR и LLM',

	'about.first': 'Обо',
	'about.rest': 'мне',
	'about.date': 'Немного обо мне',
	'about.prompt': 'Листай, чтобы раскрыть',
	'about.bio': 'Лучший способ предсказать будущее — изобрести его.',
	'about.author': 'Алан Кей',
	'about.stats': '4 проекта · 13 protobuf-сервисов · 8 self-hosted контейнеров · 2 сайта в продакшне',
	'about.where': 'github · noeradev',
	'about.discipline': 'Основной стек',
	'about.stack': 'Go • TypeScript • Next.js • Python',
	'about.cta': 'Написать',
	'about.cta2': 'Проекты',
	'about.alt': 'Ракета noera на орбите планеты',

	'exp.badge': 'Траектория',
    'exp.title.a': 'Хронология',
    'exp.title.b': 'развития',
    'exp.intro': 'От прикладных исследований на React к проектированию распределенных систем на Go.',
    'exp.phase.0': 'Этапы',
    'exp.ticker.top': '2024 · 2025 · 2026 ·',
    'exp.ticker.bottom': 'RESEARCH → ARCHITECTURE → PRODUCTION ·',

    // 7 КЛАСС (2024)
    'exp.c1.bg': '2024',
    'exp.c1.tag': '7 класс · Исследования',
    'exp.c1.title.a': 'Прикладная',
    'exp.c1.title.b': 'математика',
    'exp.c1.text':
        'Разработал клиентскую часть на React для научного проекта по математике и занял 3-е место на Республиканском конкурсе научных проектов (РКНП).',
    'exp.c1.m1.k': 'РКНП',
    'exp.c1.m1.v': '3-е место на Республиканском этапе по математике',
    'exp.c1.m2.k': 'Стек',
    'exp.c1.m2.v': 'Разработка SPA-приложения на React',
    'exp.c1.m3.k': 'Фокус',
    'exp.c1.m3.v': 'Дискретная математика и алгоритмический фундамент',

    // 8 КЛАСС (2025)
    'exp.c2.bg': '2025',
    'exp.c2.tag': '8 класс · Архитектура',
    'exp.c2.title.a': 'Системная',
    'exp.c2.title.b': 'инженерия',
    'exp.c2.text':
        'Переход к сервисной архитектуре: изучение Go, реляционных баз данных и сетевых протоколов. Победа на олимпиаде по блокчейн-технологиям.',
    'exp.c2.m1.k': 'Бэкенд',
    'exp.c2.m1.v': 'Переход на Go, PostgreSQL и микросервисные паттерны',
    'exp.c2.m2.k': 'Олимпиады',
    'exp.c2.m2.v': '1-е место на городской олимпиаде по блокчейн-технологиям',
    'exp.c2.m3.k': 'Практика',
    'exp.c2.m3.v': 'Парламентские дебаты и развитие навыков аргументации',

    // 9 КЛАСС (2026)
    'exp.c3.bg': '2026',
    'exp.c3.tag': '9 класс · Системы',
    'exp.c3.title.a': 'Распределенные',
    'exp.c3.title.b': 'платформы',
    'exp.c3.text':
        'Разработка B2G-платформы Vraloo и научного проекта QadamAlgo. Проведение технического аудита кодовой базы с инженерами Eurasia Group Kazakhstan.',
    'exp.c3.m1.k': 'Vraloo',
    'exp.c3.m1.v': 'Go, ConnectRPC, PostgreSQL, Redis, ZK-proofs',
    'exp.c3.m2.k': 'QadamAlgo',
    'exp.c3.m2.v': 'Дискретно-детерминированное моделирование IT-процессов',
    'exp.c3.m3.k': 'Индустрия',
    'exp.c3.m3.v': 'Технический аудит архитектуры в Eurasia Group Kazakhstan',

	'projects.title': 'Проекты',
	'projects.carousel': 'Карусель проектов',
	'screens.title': 'Экраны',
	'screens.label': 'Экраны ’26',
	'screens.action': 'Открыть',
	'screens.hint': 'Листай или тяни',

	'services.title': 'Чем могу помочь',
	'services.sub':
		'Проектирую и собираю системы целиком: от контрактов и базы данных до интерфейса и деплоя.',
	'services.1.title': 'Бэкенд-системы',
	'services.1.text':
		'Модульные монолиты на Go с ConnectRPC, PostgreSQL и Redis. Ролевая модель, очереди, аудит и наблюдаемость с первого дня.',
	'services.1.meta': 'Стек: Go, ConnectRPC, Protobuf, PostgreSQL, Redis',
	'services.2.title': 'Веб-приложения',
	'services.2.text':
		'Интерфейсы на Next.js и React с продуманной архитектурой, сгенерированными типами и аккуратной анимацией.',
	'services.2.meta': 'Стек: Next.js, React, TypeScript, FSD, SCSS',
	'services.3.title': 'OCR и LLM-пайплайны',
	'services.3.text':
		'Распознавание документов, извлечение структурированных данных и векторная память — self-hosted, без утечки данных наружу.',
	'services.3.meta': 'Стек: Python, FastAPI, RapidOCR, Tesseract, pgvector',
	'services.4.title': 'Инфраструктура и деплой',
	'services.4.text':
		'Docker Compose, CI-гейты в Makefile и наблюдаемость — весь стек поднимается одной командой и живёт на своих серверах.',
	'services.4.meta': 'Стек: Docker Compose, Makefile, CI, PostgreSQL, Redis',
	'services.cta': 'Обсудить ↗',

	'footer.title': 'NOERA',
	'footer.label': 'Контакт',
	'footer.headline': 'Открыт для проектов',
	'footer.note': 'Есть идея или задача — пиши, отвечаю быстро.',
	'footer.meta': 'UTC+5 · RU / EN / KK · обычно отвечаю в течение дня',
	'footer.top': 'Наверх',
	'footer.contact': 'Написать',
	'footer.rights': '© 2024–2026 Noera',
	'footer.credit': '',

	'modal.close': 'Закрыть',
	'modal.highlights': 'Ключевое',
	'modal.stack': 'Стек',
	'modal.live': 'Открыть сайт',
	'modal.repo': 'Исходный код',
	'modal.private': 'Приватный репозиторий',
	'status.live': 'В продакшне',
	'status.alpha': 'В разработке',
	'status.concept': 'Концепт',
};

export type UIKey = keyof typeof ru;
type UIDict = Record<UIKey, string>;

const en: UIDict = {
	'meta.title': 'Maxim Potapchenko (noera) — full-stack developer',
	'meta.description': 'Portfolio of Maxim Potapchenko: Go backends, Next.js interfaces, OCR and LLM pipelines.',
	name: 'Maxim Potapchenko',

	'nav.home': 'Home',
	'nav.about': 'About me',
	'nav.journey': 'Trajectory',
	'nav.projects': 'Projects',
	'nav.screens': 'Screens',
	'nav.services': 'Services',
	'nav.contact': 'Contact',
	'nav.menu': 'Menu',
	'nav.close': 'Close',

	'hero.title.a': 'Maxim',
	'hero.title.b': 'Potapchenko',
	'hero.est': 'noera · est. 2024',
	'hero.scroll': 'Scroll to the About section',
	'hero.pitch': 'I build products end to end: Go backends, Next.js interfaces, self-hosted infra.',
	'hero.d1': 'Go backends',
	'hero.d2': 'Next.js',
	'hero.d3': 'OCR & LLM',

	'about.first': 'About',
	'about.rest': 'me',
	'about.date': 'A bit about me',
	'about.prompt': 'Scroll to expand',
	'about.bio': 'The best way to predict the future is to invent it.',
	'about.author': 'Alan Kay',
	'about.stats': '4 projects · 13 protobuf services · 8 self-hosted containers · 2 live sites',
	'about.where': 'github · noeradev',
	'about.discipline': 'Core stack',
	'about.stack': 'Go • TypeScript • Next.js • Python',
	'about.cta': 'Get in touch',
	'about.cta2': 'Projects',
	'about.alt': 'The noera rocket in planetary orbit',

	'exp.badge': 'Trajectory',
	'exp.title.a': 'Development',
	'exp.title.b': 'chronology',
	'exp.intro': 'From applied React research to designing distributed systems in Go.',
	'exp.phase.0': 'Stages',
	'exp.ticker.top': '2024 · 2025 · 2026 ·',
	'exp.ticker.bottom': 'RESEARCH → ARCHITECTURE → PRODUCTION ·',

	// GRADE 7 (2024)
	'exp.c1.bg': '2024',
	'exp.c1.tag': '7th grade · Research',
	'exp.c1.title.a': 'Applied',
	'exp.c1.title.b': 'mathematics',
	'exp.c1.text':
		'Built the React front end for a mathematics research project and took 3rd place at the Republican Scientific Projects Competition.',
	'exp.c1.m1.k': 'RNPC',
	'exp.c1.m1.v': '3rd place at the national stage in mathematics',
	'exp.c1.m2.k': 'Stack',
	'exp.c1.m2.v': 'SPA application built with React',
	'exp.c1.m3.k': 'Focus',
	'exp.c1.m3.v': 'Discrete mathematics and algorithmic foundations',

	// GRADE 8 (2025)
	'exp.c2.bg': '2025',
	'exp.c2.tag': '8th grade · Architecture',
	'exp.c2.title.a': 'Systems',
	'exp.c2.title.b': 'engineering',
	'exp.c2.text':
		'Shift toward service architecture: learning Go, relational databases and network protocols. Won the city olympiad in blockchain technologies.',
	'exp.c2.m1.k': 'Backend',
	'exp.c2.m1.v': 'Moved to Go, PostgreSQL and microservice patterns',
	'exp.c2.m2.k': 'Olympiads',
	'exp.c2.m2.v': '1st place at the city blockchain-technology olympiad',
	'exp.c2.m3.k': 'Practice',
	'exp.c2.m3.v': 'Parliamentary debates and argumentation skills',

	// GRADE 9 (2026)
	'exp.c3.bg': '2026',
	'exp.c3.tag': '9th grade · Systems',
	'exp.c3.title.a': 'Distributed',
	'exp.c3.title.b': 'platforms',
	'exp.c3.text':
		'Building the Vraloo B2G platform and the QadamAlgo research project. Ran a codebase architecture audit with engineers at Eurasia Group Kazakhstan.',
	'exp.c3.m1.k': 'Vraloo',
	'exp.c3.m1.v': 'Go, ConnectRPC, PostgreSQL, Redis, ZK-proofs',
	'exp.c3.m2.k': 'QadamAlgo',
	'exp.c3.m2.v': 'Discrete-deterministic modeling of IT processes',
	'exp.c3.m3.k': 'Industry',
	'exp.c3.m3.v': 'Architecture audit at Eurasia Group Kazakhstan',

	'projects.title': 'Projects',
	'projects.carousel': 'Project carousel',
	'screens.title': 'Screens',
	'screens.label': 'Screens ’26',
	'screens.action': 'Open',
	'screens.hint': 'Scroll or drag',

	'services.title': 'How I can help',
	'services.sub': 'I design and build whole systems: from contracts and databases to interface and deployment.',
	'services.1.title': 'Backend systems',
	'services.1.text':
		'Go modular monoliths with ConnectRPC, PostgreSQL and Redis. Roles, queues, audit and observability from day one.',
	'services.1.meta': 'Stack: Go, ConnectRPC, Protobuf, PostgreSQL, Redis',
	'services.2.title': 'Web applications',
	'services.2.text':
		'Next.js and React interfaces with thoughtful architecture, generated types and careful motion.',
	'services.2.meta': 'Stack: Next.js, React, TypeScript, FSD, SCSS',
	'services.3.title': 'OCR & LLM pipelines',
	'services.3.text':
		'Document recognition, structured data extraction and vector memory — self-hosted, with no data leaving your environment.',
	'services.3.meta': 'Stack: Python, FastAPI, RapidOCR, Tesseract, pgvector',
	'services.4.title': 'Infrastructure & deploy',
	'services.4.text':
		'Docker Compose, Makefile CI gates and observability — the whole stack comes up with one command and lives on its own servers.',
	'services.4.meta': 'Stack: Docker Compose, Makefile, CI, PostgreSQL, Redis',
	'services.cta': 'Discuss ↗',

	'footer.title': 'NOERA',
	'footer.label': 'Contact',
	'footer.headline': 'Open for projects',
	'footer.note': 'Got an idea or a task — write, I reply fast.',
	'footer.meta': 'UTC+5 · RU / EN / KK · usually reply within a day',
	'footer.top': 'Back to top',
	'footer.contact': 'Contact me',
	'footer.rights': '© 2024–2026 Noera',
	'footer.credit': '',

	'modal.close': 'Close',
	'modal.highlights': 'Highlights',
	'modal.stack': 'Stack',
	'modal.live': 'Open site',
	'modal.repo': 'Source code',
	'modal.private': 'Private repository',
	'status.live': 'Live',
	'status.alpha': 'In development',
	'status.concept': 'Concept',
};

const kk: UIDict = {
	'meta.title': 'Максим Потапченко (noera) — full-stack әзірлеуші',
	'meta.description': 'Максим Потапченконың портфолиосы: Go-бэкендтер, Next.js-интерфейстер, OCR және LLM-пайплайндар.',
	name: 'Максим Потапченко',

	'nav.home': 'Басты',
	'nav.about': 'Мен туралы',
	'nav.journey': 'Траектория',
	'nav.projects': 'Жобалар',
	'nav.screens': 'Экрандар',
	'nav.services': 'Қызметтер',
	'nav.contact': 'Байланыс',
	'nav.menu': 'Мәзір',
	'nav.close': 'Жабу',

	'hero.title.a': 'Максим',
	'hero.title.b': 'Потапченко',
	'hero.est': 'noera · 2024 жылдан',
	'hero.scroll': '«Мен туралы» бөліміне өту',
	'hero.pitch': 'Өнімдерді толық жинаймын: Go бэкендтер, Next.js интерфейстер, self-hosted инфраструктура.',
	'hero.d1': 'Go-бэкендтер',
	'hero.d2': 'Next.js',
	'hero.d3': 'OCR және LLM',

	'about.first': 'Мен',
	'about.rest': 'туралы',
	'about.date': 'Мен туралы қысқаша',
	'about.prompt': 'Ашу үшін айналдыр',
	'about.bio': 'Болашақты болжаудың ең жақсы жолы — оны ойлап табу.',
	'about.author': 'Алан Кей',
	'about.stats': '4 жоба · 13 protobuf-сервис · 8 self-hosted контейнер · 2 живой сайт',
	'about.where': 'github · noeradev',
	'about.discipline': 'Негізгі стек',
	'about.stack': 'Go • TypeScript • Next.js • Python',
	'about.cta': 'Жазу',
	'about.cta2': 'Жобалар',
	'about.alt': 'noera зымыраны ғаламшар орбитасында',

	'exp.badge': 'Траектория',
	'exp.title.a': 'Даму',
	'exp.title.b': 'хронологиясы',
	'exp.intro': 'React-пен қолданбалы зерттеуден Go-дағы бөлінген жүйелерді жобалауға дейін.',
	'exp.phase.0': 'Кезеңдер',
	'exp.ticker.top': '2024 · 2025 · 2026 ·',
	'exp.ticker.bottom': 'ЗЕРТТЕУ → АРХИТЕКТУРА → ПРОДАКШН ·',

	// 7 СЫНЫП (2024)
	'exp.c1.bg': '2024',
	'exp.c1.tag': '7 сынып · Зерттеу',
	'exp.c1.title.a': 'Қолданбалы',
	'exp.c1.title.b': 'математика',
	'exp.c1.text':
		'Математика бойынша ғылыми жобаның React клиенттік бөлігін жасап, Республикалық ғылыми жобалар конкурсында (РҒЖК) 3-орын алдым.',
	'exp.c1.m1.k': 'РҒЖК',
	'exp.c1.m1.v': 'Математика бойынша республикалық кезеңде 3-орын',
	'exp.c1.m2.k': 'Стек',
	'exp.c1.m2.v': 'React-пен SPA-қосымша әзірлеу',
	'exp.c1.m3.k': 'Фокус',
	'exp.c1.m3.v': 'Дискретті математика және алгоритмдік база',

	// 8 СЫНЫП (2025)
	'exp.c2.bg': '2025',
	'exp.c2.tag': '8 сынып · Архитектура',
	'exp.c2.title.a': 'Жүйелік',
	'exp.c2.title.b': 'инженерия',
	'exp.c2.text':
		'Сервистік архитектураға көшу: Go, реляциялық дерекқорлар және желі протоколдарын үйрену. Блокчейн-технологиялар олимпиадасында жеңіс.',
	'exp.c2.m1.k': 'Бэкенд',
	'exp.c2.m1.v': 'Go, PostgreSQL және микросервис паттерндеріне көшу',
	'exp.c2.m2.k': 'Олимпиадалар',
	'exp.c2.m2.v': 'Қалалық блокчейн-технологиялар олимпиадасында 1-орын',
	'exp.c2.m3.k': 'Практика',
	'exp.c2.m3.v': 'Парламенттік дебаттар және аргументация дағдысы',

	// 9 СЫНЫП (2026)
	'exp.c3.bg': '2026',
	'exp.c3.tag': '9 сынып · Жүйелер',
	'exp.c3.title.a': 'Бөлінген',
	'exp.c3.title.b': 'платформалар',
	'exp.c3.text':
		'Vraloo B2G-платформасы мен QadamAlgo ғылыми жобасын әзірлеу. Eurasia Group Kazakhstan инженерлерімен код базасы архитектурасының техникалық аудитін жүргізу.',
	'exp.c3.m1.k': 'Vraloo',
	'exp.c3.m1.v': 'Go, ConnectRPC, PostgreSQL, Redis, ZK-proofs',
	'exp.c3.m2.k': 'QadamAlgo',
	'exp.c3.m2.v': 'IT-процестерді дискретті-детерминирленген модельдеу',
	'exp.c3.m3.k': 'Индустрия',
	'exp.c3.m3.v': 'Eurasia Group Kazakhstan-да архитектураның техникалық аудиті',

	'projects.title': 'Жобалар',
	'projects.carousel': 'Жобалар каруселі',
	'screens.title': 'Экрандар',
	'screens.label': 'Экрандар ’26',
	'screens.action': 'Ашу',
	'screens.hint': 'Айналдыр немесе тарт',

	'services.title': 'Қалай көмектесе аламын',
	'services.sub': 'Жүйелерді толық жобалап, жасаймын: келісімшарттар мен дерекқордан интерфейс пен деплойға дейін.',
	'services.1.title': 'Бэкенд жүйелер',
	'services.1.text':
		'ConnectRPC, PostgreSQL және Redis бар Go-дағы модульдік монолиттер. Рөлдер, кезектер, аудит және бақылау бірінші күннен.',
	'services.1.meta': 'Стек: Go, ConnectRPC, Protobuf, PostgreSQL, Redis',
	'services.2.title': 'Веб-қосымшалар',
	'services.2.text':
		'Ойластырылған архитектурасы, генерацияланған типтері және ұқыпты анимациясы бар Next.js пен React интерфейстері.',
	'services.2.meta': 'Стек: Next.js, React, TypeScript, FSD, SCSS',
	'services.3.title': 'OCR және LLM-пайплайндар',
	'services.3.text':
		'Құжаттарды тану, құрылымдық деректерді алу және векторлық жады — self-hosted, деректер сыртқа шықпайды.',
	'services.3.meta': 'Стек: Python, FastAPI, RapidOCR, Tesseract, pgvector',
	'services.4.title': 'Инфрақұрылым және деплой',
	'services.4.text':
		'Docker Compose, Makefile-тағы CI-гейттер және бақылау — бүкіл стек бір командамен көтеріліп, өз серверлерінде жұмыс істейді.',
	'services.4.meta': 'Стек: Docker Compose, Makefile, CI, PostgreSQL, Redis',
	'services.cta': 'Талқылау ↗',

	'footer.title': 'NOERA',
	'footer.label': 'Байланыс',
	'footer.headline': 'Жобаларға ашықпын',
	'footer.note': 'Идея немесе тапсырма болса — жаз, тез жауап беремін.',
	'footer.meta': 'UTC+5 · RU / EN / KK · әдетте күн ішінде жауап беремін',
	'footer.top': 'Жоғарыға',
	'footer.contact': 'Жазу',
	'footer.rights': '© 2024–2026 Noera',
	'footer.credit': '',

	'modal.close': 'Жабу',
	'modal.highlights': 'Негізгісі',
	'modal.stack': 'Стек',
	'modal.live': 'Сайтты ашу',
	'modal.repo': 'Бастапқы код',
	'modal.private': 'Жабық репозиторий',
	'status.live': 'Продакшнда',
	'status.alpha': 'Әзірлеуде',
	'status.concept': 'Концепт',
};

export const ui: Record<Locale, UIDict> = { ru, en, kk };

export function t(lang: Locale, key: UIKey): string {
	return ui[lang]?.[key] ?? ui[defaultLocale][key] ?? key;
}
