import {
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

import { shallowMount } from "@vue/test-utils";

import {
	nextTick,
	ref,
} from "vue";

import {
	models,
	reset,
	swap,
} from "#composables/modalState.ts";

import { setupModalManager } from "#composables/setupModalManager.ts";

vi.mock("#composables/modalState.ts", { spy: true });

function mountManager() {
	let result: ReturnType<typeof setupModalManager>;
	const wrapper = shallowMount({
		setup() {
			result = setupModalManager();
			return () => null;
		},
	});
	return [result!, wrapper] as const;
}

describe("setupModalManager", () => {
	beforeEach(() => {
		models.clear();
		reset();
		vi.clearAllMocks();
	});

	it("should use isHidden value as default swap condition", () => {
		const [manager] = mountManager();
		expect(swap).not.toHaveBeenCalled();
		manager.swapOn();
		expect(swap).toHaveBeenCalled();
	});

	it("should use custom condition callback and swap immediately when true", () => {
		const [manager] = mountManager();
		expect(swap).not.toHaveBeenCalled();
		manager.swapOn(() => true);
		expect(swap).toHaveBeenCalled();
	});

	it("should use custom condition callback and swap when condition changes", async () => {
		const condition = ref(false);
		const [manager] = mountManager();
		manager.swapOn(() => condition.value);

		expect(swap).not.toHaveBeenCalled();
		await nextTick();

		condition.value = true;
		await nextTick();

		expect(swap).toHaveBeenCalled();
	});

	it("should clean up watch and reset state on unmount", () => {
		const [, wrapper] = mountManager();
		expect(reset).not.toHaveBeenCalled();
		wrapper.unmount();
		expect(reset).toHaveBeenCalled();
	});
});
