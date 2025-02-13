import {
	computed,
	nextTick,
	type Ref,
	shallowRef,
} from "vue";

export const id = "m_" + Date.now().toString(36);
export const to = `#${id}`;

const models = new Map<symbol, Ref<boolean>>();

export const currentKey = shallowRef<symbol | null>(null);
export const nextKey = shallowRef<symbol | null>(null);
export const isHidden = shallowRef<boolean>(true);

export const isActive = computed(() => !!currentKey.value && !isHidden.value);

export async function swap() {
	currentKey.value = null;
	await nextTick();
	currentKey.value = nextKey.value;
	nextKey.value = null;
	if (currentKey.value) {
		isHidden.value = false;
	}
}

export function activate(identifier: symbol) {
	if (currentKey.value == null) {
		currentKey.value = identifier;
		isHidden.value = false;
	} else {
		isHidden.value = true;
		nextKey.value = identifier;
	}
}

export function deactivate(identifier: symbol) {
	isHidden.value = true;
	if (nextKey.value === identifier) {
		nextKey.value = null;
	}
}

export function dismissAllBut(identifier?: symbol) {
	for (const [key, model] of models.entries()) {
		if (key !== identifier && model.value) {
			model.value = false;
		}
	}
}

export function close() {
	isHidden.value = true;
	nextKey.value = null;
	dismissAllBut();
}

export function reset() {
	currentKey.value = null;
	close();
}

export function bind(identifier: symbol, model: Ref<boolean>) {
	models.set(identifier, model);
}

export function unbind(identifier: symbol) {
	const model = models.get(identifier);
	if (model?.value) {
		model.value = false;
	}
	models.delete(identifier);
}
