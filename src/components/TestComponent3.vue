<template>
	<div>
		<button @click="open">Open</button>
	</div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useModal } from "#composables/useModal.ts";

const modal = useModal(null, ref({ content: "blablabla..." }));

function open() {
	modal.open();
}
</script>
