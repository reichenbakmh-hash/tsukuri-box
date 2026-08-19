import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",

      manifest: {
        name: "Tsukuri.Box",
        short_name: "Tsukuri.Box",
        description:
          "Bibliothèque personnelle de templates."
        theme_color: "#090d12",
        background_color: "#090d12",
        display: "standalone",
        orientation: "portrait-primary",

        icons: [
          {
            src: "/pwa-192.svg",
            sizes: "192x192",
            type: "image/svg+xml"
          },
          {
            src: "/pwa-512.svg",
            sizes: "512x512",
            type: "image/svg+xml"
          }
        ]
      }
    })
  ]
});
