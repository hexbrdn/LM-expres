import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// Serves api/send-mail.ts during `npm run dev`, which otherwise has no /api routes.
function devMailApi(): Plugin {
  return {
    name: "dev-mail-api",
    apply: "serve",
    configureServer(server) {
      Object.assign(process.env, loadEnv(server.config.mode, process.cwd(), ""));

      server.middlewares.use("/api/send-mail", async (req, res) => {
        let raw = "";
        for await (const chunk of req) raw += chunk;

        const send = (code: number, data: unknown) => {
          res.statusCode = code;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(data));
        };

        try {
          const { default: handler } = await server.ssrLoadModule("/api/send-mail.ts");
          await handler(
            { method: req.method ?? "GET", body: raw ? JSON.parse(raw) : {} },
            { status: (code: number) => ({ json: (data: unknown) => send(code, data) }) },
          );
        } catch (error) {
          server.config.logger.error(`[dev-mail-api] ${String(error)}`);
          send(500, { error: "Failed to send email" });
        }
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "localhost",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), devMailApi(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
