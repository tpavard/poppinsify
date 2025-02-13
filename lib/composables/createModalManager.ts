import {
	computed,
	onBeforeUnmount,
	readonly,
	watch,
} from "vue";

import {
	close,
	currentKey,
	id,
	isActive,
	isHidden,
	nextKey,
	reset,
	swap,
} from "@/composables/modalState.ts";

function swapOn(callback?: () => boolean) {
	const swapCondition = computed(callback || (() => isHidden.value));

	return watch(swapCondition, canSwap => {
		if (canSwap) {
			swap();
		}
	}, { immediate: true });
}

export function createModalManager() {
	onBeforeUnmount(reset);

	return {
		id,
		currentKey: readonly(currentKey),
		nextKey: readonly(nextKey),
		isHidden: readonly(isHidden),
		isActive,
		swap,
		close,
		reset,
		swapOn,
	};
}
