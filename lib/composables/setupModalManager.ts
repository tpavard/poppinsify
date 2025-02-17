import {
	computed,
	onBeforeUnmount,
	readonly,
	watch,
} from "vue";

import {
	closeAllModals,
	current,
	id,
	isActive,
	isHidden,
	next,
	reset,
	swap,
} from "#composables/modalState.ts";

function swapOn(callback?: () => boolean) {
	const swapCondition = computed(callback || (() => isHidden.value));

	return watch(swapCondition, canSwap => {
		if (canSwap) {
			swap();
		}
	}, { immediate: true });
}

export function setupModalManager() {
	onBeforeUnmount(reset);

	return {
		id,
		current: readonly(current),
		next: readonly(next),
		isHidden: readonly(isHidden),
		isActive,
		closeAllModals,
		swap,
		reset,
		swapOn,
	};
}
