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
		>
			<div :id/>
		</slot>
	</Transition>
	<slot
		v-else-if="isActive"
		:id
		:close
	>
		<div :id/>
	</slot>
</template>

<script lang="ts" setup>
import { createModalManager } from "@/composables/createModalManager.ts";

defineOptions({
	inheritAttrs: false,
});

const { transitionOff = false } = defineProps<{
	transitionOff?: boolean,
}>();

const {
	id,
	isActive,
	isHidden,
	swap,
	close,
	swapOn,
} = createModalManager();

swapOn(() => transitionOff && isHidden.value);
</script>
