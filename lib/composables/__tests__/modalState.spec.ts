import {
	beforeAll,
	beforeEach,
	describe,
	expect,
	it,
} from "vitest";

import { shallowRef } from "vue";

import {
	type ModalData,
	activate,
	bind,
	closeAllModals,
	current,
	deactivate,
	isHidden,
	models,
	next,
	reset,
	swap,
	unbind,
} from "#composables/modalState.ts";

function mockModal(autobind: boolean = false) {
	const data: ModalData = {
		opened: shallowRef(false),
		component: null,
		data: shallowRef(null),
	};

	if (autobind) {
		bind(data);
	}

	return data;
}

function resetHook() {
	reset();
	models.clear();
}

let modal1: ModalData;
let modal2: ModalData;

describe("modalState", () => {
	describe("unbinding modal state", () => {
		beforeEach(resetHook);

		it("should remove modal from models Set and reset its state when unbound", () => {
			modal1 = mockModal(true);
			unbind(modal1);
			expect(models.has(modal1)).toBe(false);
			expect(modal1.opened.value).toBe(false);
		});
	});

	describe("error scenarios", () => {
		beforeEach(resetHook);

		it("should handle malformed modal object", () => {
			// @ts-expect-error Testing invalid input
			activate({});
			expect(current.value).toBeNull();
			expect(next.value).toBeNull();
		});
	});

	describe("should activate, queue, swap, and close modals", () => {
		beforeAll(resetHook);

		it("should queue modal when one is active", () => {
			modal1 = mockModal();
			modal2 = mockModal();

			activate(modal1);
			activate(modal2);

			expect(current.value).toBe(modal1);
			expect(next.value).toBe(modal2);
			expect(isHidden.value).toBe(true);
		});

		it("should swap current with next modal", async () => {
			await swap();

			expect(current.value).toBe(modal2);
			expect(next.value).toBeNull();
			expect(isHidden.value).toBe(false);
		});

		it("should close all modals", async () => {
			closeAllModals();

			await swap();

			expect(current.value).toBeNull();
			expect(next.value).toBeNull();
			expect(isHidden.value).toBe(true);
		});

		it("should not swap when not hidden", async () => {
			activate(modal1);
			activate(modal2);
			isHidden.value = false;

			await swap();

			expect(current.value).toBe(modal1);
			expect(next.value).toBe(modal2);
			expect(isHidden.value).toBe(false);
		});
	});

	describe("deactivating modal", () => {
		beforeEach(resetHook);

		it("should handle deactivating a queued modal with opened state", () => {
			modal1 = mockModal(true);
			activate(modal1);
			modal1.opened.value = true;

			modal2 = mockModal(true);
			activate(modal2);
			modal2.opened.value = true;

			expect(current.value).toBe(modal1);
			expect(next.value).toBe(modal2);

			deactivate(modal2);

			expect(current.value).toBe(modal1);
			expect(next.value).toBeNull();
			expect(modal2.opened.value).toBe(false);
			expect(isHidden.value).toBe(true);
		});

		it("should handle deactivating current modal with opened state", () => {
			modal1 = mockModal(true);
			activate(modal1);
			modal1.opened.value = true;

			modal2 = mockModal(true);
			activate(modal2);
			modal2.opened.value = true;

			expect(current.value).toBe(modal1);
			expect(next.value).toBe(modal2);

			deactivate(modal1);

			expect(current.value).toBe(modal1);
			expect(next.value).toBe(modal2);
			expect(modal1.opened.value).toBe(false);
			expect(isHidden.value).toBe(true);
		});
	});
});
