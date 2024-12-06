import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/vue3-demo",
  server: {
    host: "0.0.0.0",
    port: 8081,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [vue(), vueSetupExtend()],
});
