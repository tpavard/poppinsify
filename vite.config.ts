import {
	dirname,
	resolve,
} from "node:path";
import {
	fileURLToPath,
	URL,
} from "node:url";

import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import vueDevTools from "vite-plugin-vue-devtools";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig(({ command, isPreview }) => {
	return {
		plugins: isPreview === true || command === "serve"
			? [
				vue(),
				vueDevTools(),
			]
			: [
				dts({ tsconfigPath: "./tsconfig.app.json" }),
				vue(),
			],
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url)),
			},
		},
		build: {
			lib: {
				entry: resolve(__dirname, "lib/main.ts"),
				formats: ["es"],
				fileName: "main",
			},
			rollupOptions: {
				external: ["vue"],
			},
		},
	};
});
