import {
	describe,
	expect,
	it,
} from "vitest";

import {
	mount,
	shallowMount,
} from "@vue/test-utils";

import { nextTick } from "vue";

import { id } from "#composables/modalState.ts";

import { useModal } from "#composables/useModal.ts";

import ModalManager from "#components/ModalManager.vue";

describe("ModalManager", () => {
	it("should create a modal target and render modal content when opened", async () => {
		const wrapper = mount(ModalManager, {
			attachTo: document.body,
			props: {
				transitionOff: true,
			},
		});

		const modal: ReturnType<typeof useModal> = await new Promise(res => {
			shallowMount({
				setup() {
					res(useModal());
					return () => null;
				},
			});
		});

		modal.opened.value = true;

		await nextTick();

		expect(wrapper.html()).toContain(id);
	});
});
