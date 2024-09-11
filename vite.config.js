import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import websocketServer from "./src/lib/sockets/webSocket";

export default defineConfig({
	server: {
		port: 4000,
		// proxy: {
        //     '/api': {
        //         target: "http://localhost:4000",
        //         changeOrigin: true,
        //         rewrite: (path) => path.replace(/^\/api/, ''),
        //     }
        // },
		// "/socket.io": {
		// 	target: "http://localhost:4000",
		// 	ws: true,
		// 	changeOrigin: true,
		// },
		fs: {
			allow: [".."]
		}
	},

	preview: {
		port: 4000
	},
	plugins: [sveltekit(), websocketServer]
});
