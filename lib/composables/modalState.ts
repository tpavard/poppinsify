import {
	type Component,
	type Ref,
	computed,
	nextTick,
	shallowRef,
} from "vue";

export type ModalData<T = Record<string, unknown>> = {
	opened: Ref<boolean>,
	component: Component | null,
	data: T | null,
};

export const id = "m_" + Date.now().toString(36);
export const to = `#${id}`;

export const isHidden = shallowRef<boolean>(true);

export const current = shallowRef<ModalData | null>(null);
export const next = shallowRef<ModalData | null>(null);

export const models = new Set<ModalData>();

export const isActive = computed(() => !!current.value && !isHidden.value);

export async function swap() {
	current.value = null;
	await nextTick();
	current.value = next.value;
	next.value = null;
	if (current.value) {
		isHidden.value = false;
	}
}

function dismissAllBut(modal?: ModalData) {
	for (const item of models) {
		if (item !== modal && item.opened.value) {
			item.opened.value = false;
		}
	}
}

export function activate(modal: ModalData) {
	if (!current.value) {
		current.value = modal;
		isHidden.value = false;
	} else {
		next.value = modal;
		isHidden.value = true;
	}

	dismissAllBut(modal);
}

export function deactivate(modal: ModalData) {
	if (![current.value, next.value].includes(modal)) {
		return;
	}

	if (modal.opened.value) {
		modal.opened.value = false;
	}

	if (current.value === modal) {
		isHidden.value = true;
	} else {
		next.value = null;
	}
}

export function bind(modal: ModalData) {
	if (modal.opened) {
		models.add(modal);
	}
}

export function unbind(modal: ModalData) {
	if (models.has(modal)) {
		models.delete(modal);
		modal.opened!.value = false;
	}
}

export function closeAllModals() {
	next.value = null;
	dismissAllBut();
	isHidden.value = true;
}

export function reset() {
	next.value = null;
	current.value = null;
	isHidden.value = true;
}
