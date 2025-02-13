import {
	type Ref,
	computed,
	watch,
	onBeforeUnmount,
	readonly,
} from "vue";

import {
	id,
	to,
	currentKey,
	nextKey,
	isHidden,
	isActive,
	close,
	activate,
	deactivate,
	dismissAllBut,
	bind,
	unbind,
} from "@/composables/modalState.ts";

export function createModal() {
	const KEY = Symbol();

	const rendered = computed(() => KEY === currentKey.value);

	function syncModalState(ref: Ref<boolean>) {
		bind(KEY, ref);
		onBeforeUnmount(() => unbind(KEY));
		const stop = watch(ref, opened => {
			if (opened) {
				activate(KEY);
				dismissAllBut(KEY);
			} else {
				deactivate(KEY);
			}
		}, { immediate: true });

		return () => {
			stop();
			unbind(KEY);
		};
	}

	return {
		KEY,
		id,
		to,
		currentKey: readonly(currentKey),
		nextKey: readonly(nextKey),
		isHidden: readonly(isHidden),
		isActive,
		rendered,
		close,
		activate,
		deactivate,
		dismissAllBut,
		bind,
		unbind,
		syncModalState,
	};
}
