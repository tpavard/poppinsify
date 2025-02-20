<template>
	<div>
		<button @click="show1 = !show1">toggle {{ show1 }}</button>
		<button @click="show2 = !show2">toggle {{ show2 }}</button>
		<ModalWrapper v-model:open="show1">
			<p>Test 1</p>
		</ModalWrapper>
		<ModalWrapper v-model:open="show2">
			<p>Test 2</p>
		</ModalWrapper>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import ModalWrapper from "#components/ModalWrapper.vue";

const show1 = ref(false);
const show2 = ref(false);
</script>
