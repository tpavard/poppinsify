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

export function useModal<T extends Record<string, unknown>>(
	mode?: Component | "custom" | null,
	data?: Ref<T> | null,
	stateRef?: Ref<boolean> | null,
) {
	const modal: ModalData<T> = {
		opened: stateRef || shallowRef(false),
		component: mode !== "custom" ? markRaw(mode || Modal) : null,
		data: data || shallowRef(null),
	};

	const rendered = computed(() => modal === current.value);

	bind(modal);
	onBeforeUnmount(() => unbind(modal));

	watch(modal.opened, opened => {
		if (opened) {
			activate(modal);
		} else {
			deactivate(modal);
		}
	}, { immediate: true });

	return {
		id,
		to,
		current: readonly(current),
		next: readonly(next),
		isHidden: readonly(isHidden),
		isActive,
		rendered,
		opened: modal.opened,
		open() {
			modal.opened.value = true;
		},
		close: closeAllModals,
	};
}
