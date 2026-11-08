import qadamHome from '../assets/projects/qadam.png';
import qadamResearch from '../assets/gallery/qadam-research.png';
import qadamGlossary from '../assets/gallery/qadam-glossary.png';
import qadamStats from '../assets/gallery/qadam-stats.png';
import gradeHome from '../assets/projects/grade.png';
import gradeFilled from '../assets/gallery/grade-filled.png';
import type { ImageMetadata } from 'astro';

export const site = {
	handle: 'noera',
	github: 'https://github.com/noeradev',
	/** Contact pills render only when set. */
	email: 'niffyforstop@gmail.com',
	telegram: 'https://t.me/webprogdev',
};

/** Real screens of the live projects for the WorksWheel drum. `project` = content collection id. */
export const screens: { image: ImageMetadata; title: string; project: string }[] = [
	{ image: qadamHome, title: 'QadamAlgo — Home', project: 'qadam-algo' },
	{ image: qadamResearch, title: 'QadamAlgo — Research', project: 'qadam-algo' },
	{ image: qadamGlossary, title: 'QadamAlgo — Glossary', project: 'qadam-algo' },
	{ image: qadamStats, title: 'QadamAlgo — Stats', project: 'qadam-algo' },
	{ image: gradeHome, title: 'Grade Calculator', project: 'grade-calculator' },
	{ image: gradeFilled, title: 'Grade — Forecast', project: 'grade-calculator' },
];
