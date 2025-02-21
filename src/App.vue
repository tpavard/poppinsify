<template>
	<TestComponent1 />
	<TestComponent2 />
	<TestComponent3 />

	<button @click="useBackdrop = !useBackdrop">Toggle backdrop</button>

	<ModalManager #default="{ id, close, data }: SlotContext<Data>">
		<dialog ref="dialog">
			<button @click="close">Fermer</button>
			<div v-if="data">
				<p>{{ (data as Data).content }}</p>
			</div>
			<div v-else :id />
		</dialog>
	</ModalManager>
</template>

<script lang="ts" setup>
import {
	ref,
	useTemplateRef,
	watch,
} from "vue";

type Data = { content: string };

import ModalManager, { type SlotContext } from "#components/ModalManager.vue";

import TestComponent1 from "@/components/TestComponent1.vue";
import TestComponent2 from "@/components/TestComponent2.vue";
import TestComponent3 from "@/components/TestComponent3.vue";

const useBackdrop = ref(false);
watch(
	useTemplateRef("dialog"),
	el => useBackdrop.value ? el?.showModal() : el?.show(),
	{ immediate: true },
);
</script>

<style scoped>
dialog {
	transition: 0.5s linear opacity;
}

dialog::backdrop {
	background-color: rgba(0, 0, 0, 0.8);
	transition: inherit;
}

.v-enter-from,
.v-leave-to,
.v-enter-active::backdrop,
.v-leave-active::backdrop {
	opacity: 0;
}
</style>
