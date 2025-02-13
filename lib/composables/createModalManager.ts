import {
	readonly,
	watch,
	computed,
	onBeforeUnmount,
} from "vue";

import {
	id,
	currentKey,
	nextKey,
	isHidden,
	isActive,
	swap,
	close,
	reset,
} from "@/composables/modalState.ts";

function swapOn(callback?: () => boolean) {
	const swapCondition = computed(callback || (() => isHidden.value));

	return watch(swapCondition, canSwap => {
		if (canSwap) swap();
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
