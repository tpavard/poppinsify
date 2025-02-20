import {
	afterEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

import {
	mount,
	shallowMount,
} from "@vue/test-utils";

import {
	type Component,
	type Ref,
	nextTick,
} from "vue";

import {
	activate,
	deactivate,
	models,
	reset,
} from "#composables/modalState.ts";

import { useModal } from "#composables/useModal.ts";

import ModalManager from "#components/ModalManager.vue";

vi.mock("#composables/modalState.ts", { spy: true });

function mountModal(
	mode?: Component | "custom" | null,
	data?: Ref<Record<string, unknown>> | null,
	stateRef?: Ref<boolean> | null,
) {
	let result: ReturnType<typeof useModal>;
	const wrapper = shallowMount({
		setup() {
			result = useModal(mode, data, stateRef);
			return () => null;
		},
	});
	return [result!, wrapper] as const;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const manager = mount(ModalManager, {
	attachTo: document.body,
	props: {
		transitionOff: true,
	},
});

describe("useModal", () => {
	afterEach(() => {
		reset();
		models.clear();
		vi.clearAllMocks();
	});

	it("should open and close modal through direct method calls", async () => {
		const [modal] = mountModal();

		modal.open();
		await nextTick();
		expect(activate).toHaveBeenCalled();

		modal.close();
		await nextTick();
		expect(deactivate).toHaveBeenCalled();
	});

	it("should handle default mode with Modal component", () => {
		const [modal] = mountModal();

		expect(modal.current.value?.component).not.toBeNull();
	});
});
