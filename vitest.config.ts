import { fileURLToPath } from "node:url";
import {
	configDefaults,
	defineConfig,
	mergeConfig,
} from "vitest/config";
import viteConfig from "./vite.config.ts";

const exclude = [
	...configDefaults.exclude,
	"src/**",
	"e2e/**",
	"lib/main.ts",
	"**/*.d.ts",
];

export default defineConfig(configEnv => (
	mergeConfig(
		viteConfig(configEnv),
		defineConfig({
			test: {
				environment: "jsdom",
				exclude: [...exclude],
				root: fileURLToPath(new URL("./", import.meta.url)),
				coverage: {
					exclude: [...exclude],
				},
			},
		}),
	)
));
