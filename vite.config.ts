import {
	dirname,
	resolve,
} from "node:path";
import {
	fileURLToPath,
	URL,
} from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import vueDevTools from "vite-plugin-vue-devtools";

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		// dts({ tsconfigPath: "./tsconfig.app.json" }),
		vue(),
		vueDevTools(),
	],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./lib", import.meta.url)),
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
});
