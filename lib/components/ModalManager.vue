<template>
	<Transition
		v-if="!transitionOff"
		mode="out-in"
		v-bind="$attrs"
		@afterLeave="swap"
	>
		<slot
			v-if="isActive"
			:id
			:close
			:data="current?.data || null"
		>
			<div :id />
		</slot>
	</Transition>
	<slot
		v-else-if="isActive"
		:id
		:close
		:data="current?.data || null"
	>
		<div :id />
	</slot>
	<component
		v-if="current?.component"
		v-bind="current.data"
		:is="current.component"
		noBinding
		open
	/>
</template>

<script lang="ts">
import type {
	closeAllModals,
	DataType,
	id,
} from "#composables/modalState.ts";

export type SlotContext<T extends DataType = null> = {
	close: typeof closeAllModals,
	id: typeof id,
	data: T | unknown,
};
</script>

<script lang="ts" setup>
import { setupModalManager } from "#composables/setupModalManager.ts";

defineOptions({
	inheritAttrs: false,
});

const {
	transitionOff = false,
} = defineProps<{
	transitionOff?: boolean,
}>();

const {
	current,
	id,
	isActive,
	isHidden,
	swap,
	swapOn,
	closeAllModals: close,
} = setupModalManager();

swapOn(() => transitionOff && isHidden.value);
</script>
