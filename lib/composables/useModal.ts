import {
	type Component,
	type Ref,
	computed,
	markRaw,
	onBeforeUnmount,
	readonly,
	shallowRef,
	watch,
} from "vue";

import {
	type ModalData,
	activate,
	bind,
	closeAllModals,
	current,
	deactivate,
	id,
	isActive,
	isHidden,
	next,
	to,
	unbind,
} from "#composables/modalState.ts";

import Modal from "#components/ModalWrapper.vue";

function bindState(modal: ModalData, source?: Ref<boolean> | null) {
	if (source) {
		modal.opened = source;
	}

	bind(modal);
	onBeforeUnmount(() => unbind(modal));

	return watch(modal.opened, opened => {
		if (opened) {
			activate(modal);
		} else {
			deactivate(modal);
		}
	}, { immediate: true });
}

export function useModal<T extends Record<string, unknown>>(
	mode?: Component | "slot" | "default" | null,
	stateRef?: Ref<boolean> | null,
) {
	const resolvedMode = mode || "default";

	const modal: ModalData<T> = {
		opened: shallowRef(false),
		component: null,
		data: null,
	};

	const rendered = computed(() => modal === current.value);

	if (resolvedMode !== "slot") {
		modal.component = markRaw(resolvedMode === "default" ? Modal : resolvedMode);
	}

	bindState(modal, stateRef);

	return {
		id,
		to,
		current: readonly(current),
		next: readonly(next),
		isHidden: readonly(isHidden),
		isActive,
		rendered,
		open(payload: T) {
			modal.data = payload;
			modal.opened.value = true;
		},
		close: closeAllModals,
	};
}
