<template>
	<div>
		<button @click="toggle">{{ opened ? "Close" : "Open" }}</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useModal } from "#composables/useModal.ts";

const {
	open,
	close,
	opened,
} = useModal(null, ref({ content: "blablabla..." }));

function toggle() {
	if (opened.value) {
		close();
	} else {
		open();
	}
}
</script>
