import {
	afterEach,
	beforeEach,
	describe,
	expect,
	it,
	vi,
} from "vitest";

import { mount } from "@vue/test-utils";

import {
	id,
	to,
} from "#composables/modalState.ts";

import { useModal } from "#composables/useModal.ts";

import ModalWrapper from "#components/ModalWrapper.vue";

vi.mock("#composables/useModal.ts", { spy: true });

describe("ModalWrapper", () => {
	beforeEach(() => {
		const modalTarget = document.createElement("div");
		modalTarget.id = id;
		document.body.appendChild(modalTarget);
	});

	afterEach(() => {
		document.body.innerHTML = "";
		vi.clearAllMocks();
	});

	it("should render teleported content when modal is opened", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = mount(ModalWrapper, {
			props: { open: true },
			slots: { default: "<p>Test</p>" },
		});

		expect(document.querySelector(`${to} p`)!.textContent).toBe("Test");
	});

	it("should not render teleported content when modal is closed", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = mount(ModalWrapper, {
			props: { open: false },
			slots: { default: "<p>Test</p>" },
		});

		expect(document.querySelector(`${to} p`)).toBeNull();
	});

	it("should use custom mode without binding when noBinding prop is true", () => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const wrapper = mount(ModalWrapper, {
			props: {
				open: false,
				noBinding: true,
			},
			slots: { default: "<p>Test</p>" },
		});

		expect(useModal).toHaveBeenCalledWith("custom", null, null);
	});
});
