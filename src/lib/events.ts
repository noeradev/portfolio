/** Typed DOM event bus — replaces ECHO's global `window.openProjectModal`. */
export interface ProjectPayload {
	title: string;
	subtitle?: string;
	description?: string;
	src?: string;
	status?: string;
	year?: string;
	stack?: string[];
	highlights?: string[];
	live?: string;
	repo?: string;
	private?: boolean;
}

const OPEN_PROJECT = 'app:open-project';

export const openProject = (detail: ProjectPayload) =>
	document.dispatchEvent(new CustomEvent<ProjectPayload>(OPEN_PROJECT, { detail }));

export const onOpenProject = (fn: (p: ProjectPayload) => void) =>
	document.addEventListener(OPEN_PROJECT, (e) => fn((e as CustomEvent<ProjectPayload>).detail));
