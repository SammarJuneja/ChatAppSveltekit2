import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
const websocket = require("./src/lib/sockets/webSocket");

export default defineConfig({
	server: {
		port: 4000,
		// proxy: {
        //     '/api': {
        //         target: 'http://localhost:4000', // Your server's URL
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     }
        // },
		fs: {
			allow: [".."]
		}
	},
	preview: {
		port: 4000
	},
	plugins: [sveltekit(), websocket]
});
