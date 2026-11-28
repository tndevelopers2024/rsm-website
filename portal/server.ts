/**
 * Hostinger Node.js entry point.
 * Wraps the Vercel-style fetch-handler API and serves the Vite SPA static files.
 *
 * Run (after build):  node dist-server/server.js
 * Or set this as the entry point in Hostinger hPanel → Node.js.
 */
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import handler from "./api/index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Static files are in ./dist (the Vite build output uploaded alongside this server)
const STATIC_DIR = path.join(__dirname, "dist");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".js":   "application/javascript",
  ".mjs":  "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg":  "image/svg+xml",
  ".ico":  "image/x-icon",
  ".woff": "font/woff",
  ".woff2":"font/woff2",
  ".ttf":  "font/ttf",
  ".webp": "image/webp",
  ".txt":  "text/plain",
};

const PORT = Number(process.env.PORT || 3000);

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url ?? "/", `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // ── API routes → forward to the Vercel-style fetch handler ──────────────
  if (pathname.startsWith("/api/")) {
    // Collect body
    const chunks: Buffer[] = [];
    for await (const chunk of req) chunks.push(chunk as Buffer);
    const body = Buffer.concat(chunks);

    // Build a Web API Request for the handler
    const webReq = new Request(`http://localhost:${PORT}${req.url}`, {
      method: req.method ?? "GET",
      headers: req.headers as HeadersInit,
      body: req.method !== "GET" && req.method !== "HEAD" ? body : undefined,
    });

    try {
      const webRes = await handler.fetch(webReq);
      res.writeHead(webRes.status, Object.fromEntries(webRes.headers.entries()));
      const buf = await webRes.arrayBuffer();
      res.end(Buffer.from(buf));
    } catch (err) {
      console.error("API error:", err);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Internal server error" }));
    }
    return;
  }

  // ── Static file serving ──────────────────────────────────────────────────
  // Strip leading slash and resolve inside STATIC_DIR
  const relPath = pathname === "/" ? "/index.html" : pathname;
  const filePath = path.join(STATIC_DIR, relPath);

  // Security: prevent path traversal
  if (!filePath.startsWith(STATIC_DIR)) {
    res.writeHead(403); res.end("Forbidden"); return;
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { "Content-Type": MIME[ext] ?? "application/octet-stream" });
    fs.createReadStream(filePath).pipe(res);
  } else {
    // SPA fallback — always serve index.html for unknown paths (HashRouter)
    const index = path.join(STATIC_DIR, "index.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
    fs.createReadStream(index).pipe(res);
  }
});

server.listen(PORT, () => {
  console.log(`RSM Portal running on port ${PORT}`);
});
