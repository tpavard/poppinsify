<template>
	<div>
		<template
			v-for="i of 2"
			:key="i"
		>
			<button @click="toggle(i)">toggle {{ pad(i) }}</button>
			<ModalWrapper
				:open="id === i"
				@update:open="(e) => onUpdateOpen(e, i)"
			>
				<p>Test {{ pad(i) }}</p>
			</ModalWrapper>
		</template>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import ModalWrapper from "#components/ModalWrapper.vue";

const id = ref<number | null>(null);

function toggle(i: number) {
	id.value = id.value === i ? null : i;
}

function onUpdateOpen(open: boolean, i: number) {
	if (!open && id.value === i) {
		id.value = null;
	}
}

function pad(i: number) {
	return i.toString().padStart(2, "0");
}
</script>
