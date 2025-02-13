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
import { createModal } from "@/composables/createModal.ts";

defineOptions({
	inheritAttrs: false,
});

const { disabled = false } = defineProps<{
	disabled?: boolean
}>();

const opened = defineModel("open", {
	type: Boolean,
	default: false,
});

const {
    rendered,
	to,
	close,
	syncModalState,
} = createModal();

syncModalState(opened);
</script>
