<template>
	<Teleport
		v-if="rendered"
		:disabled
		:to
		defer
	>
		<slot
			:close
			:data="$attrs"
		/>
	</Teleport>
</template>

<script lang="ts" setup>
import { useModal } from "#composables/useModal.ts";

defineOptions({
	inheritAttrs: false,
});

const {
	disabled = false,
	noBinding = false,
} = defineProps<{
	disabled?: boolean,
	noBinding?: boolean,
}>();

const opened = defineModel("open", {
	type: Boolean,
	default: false,
});

const {
	rendered,
	to,
	close,
} = useModal("slot", noBinding ? null : opened);
</script>
