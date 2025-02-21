import type { ModalData } from "#composables/modalState.ts";

import { setupModalManager } from "#composables/setupModalManager.ts";
import { useModal } from "#composables/useModal.ts";

import ModalManager, { type SlotContext } from "#components/ModalManager.vue";
import ModalWrapper from "#components/ModalWrapper.vue";

export {
	type ModalData,
	type SlotContext,
	ModalManager,
	ModalWrapper,
	setupModalManager,
	useModal,
};
