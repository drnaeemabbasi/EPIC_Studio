const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const { spawn } = require("child_process");
const http = require("http");
const fs = require("fs");

let mainWindow = null;
let backendProcess = null;

// ── Backend Management ──────────────────────────────────────────────────────

function startBackend() {
  const backendDir = path.join(__dirname, "backend");
  const entryScript = path.join(backendDir, "src", "index.js");

  // Read the .env.development file manually so we don't need env-cmd
  const envPath = path.join(backendDir, ".env.development");
  const envVars = { ...process.env };

  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, "utf-8").split("\n");
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIndex = trimmed.indexOf("=");
      if (eqIndex === -1) continue;
      const key = trimmed.substring(0, eqIndex).trim();
      let val = trimmed.substring(eqIndex + 1).trim();
      // Remove surrounding quotes
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      envVars[key] = val;
    }
  }

  // Spawn the backend using the current Node runtime directly.
  // Avoid shell:true so the child process is the actual Node process we can terminate cleanly.
  const nodeExecutable = process.execPath || "node";
  backendProcess = spawn(nodeExecutable, ["--experimental-modules", entryScript], {
    cwd: backendDir,
    env: envVars,
    stdio: ["pipe", "pipe", "pipe"],
    windowsHide: true,
    shell: false,
  });

  backendProcess.stdout.on("data", (data) => {
    console.log(`[backend] ${data.toString().trim()}`);
  });

  backendProcess.stderr.on("data", (data) => {
    console.error(`[backend:err] ${data.toString().trim()}`);
  });

  backendProcess.on("error", (err) => {
    console.error(`[electron] backend process error: ${err.message}`);
  });

  backendProcess.on("exit", (code, signal) => {
    console.log(`[backend] exited with code ${code}${signal ? `, signal ${signal}` : ""}`);
    backendProcess = null;
  });
}

function killBackend() {
  if (backendProcess) {
    console.log("[electron] Shutting down backend...");
    // On Windows, we need to kill the entire process tree
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", backendProcess.pid.toString(), "/f", "/t"], {
        windowsHide: true,
      });
    } else {
      backendProcess.kill("SIGTERM");
    }
    backendProcess = null;
  }
}

// Wait for the backend to be ready by polling the port
function waitForBackend(port, timeout = 30000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(`http://localhost:${port}`, () => {
        resolve();
      });
      req.on("error", () => {
        if (Date.now() - start > timeout) {
          reject(new Error("Backend did not start in time"));
        } else {
          setTimeout(check, 300);
        }
      });
      req.end();
    };
    check();
  });
}

// ── Frontend Static Server ──────────────────────────────────────────────────
// Serve the React build via a local HTTP server so BrowserRouter works
// (file:// protocol doesn't support client-side routing)

let frontendServer = null;
const FRONTEND_PORT = 3000;

function startFrontendServer() {
  const buildDir = path.join(__dirname, "front-end", "build");
  const mimeTypes = {
    ".html": "text/html",
    ".js": "application/javascript",
    ".css": "text/css",
    ".json": "application/json",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".ico": "image/x-icon",
    ".woff": "font/woff",
    ".woff2": "font/woff2",
    ".ttf": "font/ttf",
    ".map": "application/json",
  };

  return new Promise((resolve, reject) => {
    frontendServer = http.createServer((req, res) => {
      const requestUrl = req.url ? req.url.split("?")[0] : "/";
      let decodedPath = "/";
      try {
        decodedPath = decodeURIComponent(requestUrl);
      } catch {
        decodedPath = requestUrl;
      }

      let filePath = path.join(buildDir, decodedPath);
      if (path.relative(buildDir, filePath).startsWith("..")) {
        filePath = path.join(buildDir, "index.html");
      }

      if (!path.extname(filePath)) {
        filePath = path.join(buildDir, "index.html");
      }

      if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
        const ext = path.extname(filePath).toLowerCase();
        const contentType = mimeTypes[ext] || "application/octet-stream";
        res.writeHead(200, { "Content-Type": contentType });
        fs.createReadStream(filePath).pipe(res);
      } else {
        const indexFile = path.join(buildDir, "index.html");
        if (fs.existsSync(indexFile)) {
          res.writeHead(200, { "Content-Type": "text/html" });
          fs.createReadStream(indexFile).pipe(res);
        } else {
          res.writeHead(404, { "Content-Type": "text/plain" });
          res.end("404 Not Found");
        }
      }
    });

    frontendServer.listen(FRONTEND_PORT, () => {
      console.log(
        `[electron] Frontend server running on http://localhost:${FRONTEND_PORT}`
      );
      resolve();
    });

    frontendServer.on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        console.warn(
          `[electron] Port ${FRONTEND_PORT} is in use, trying ${FRONTEND_PORT + 1}...`
        );
        frontendServer.listen(FRONTEND_PORT + 1, () => {
          console.log(
            `[electron] Frontend server running on http://localhost:${FRONTEND_PORT + 1}`
          );
          resolve();
        });
      } else {
        reject(err);
      }
    });
  });
}

function stopFrontendServer() {
  if (frontendServer) {
    frontendServer.close();
    frontendServer = null;
  }
}

// ── Window Management ───────────────────────────────────────────────────────

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    title: "EPIC Studio",
    icon: path.join(__dirname, "front-end", "public", "EPIC_fav.ico"),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    show: false, // Don't show until ready
  });

  // Load from the local static server
  const port =
    frontendServer && frontendServer.address()
      ? frontendServer.address().port
      : FRONTEND_PORT;

  const url = `http://localhost:${port}`;
  console.log(`[electron] Loading frontend from ${url}`);

  mainWindow.loadURL(url).catch((err) => {
    console.error("[electron] Failed to load URL:", err.message);
  });

  // Log any page load failures
  mainWindow.webContents.on("did-fail-load", (event, errorCode, errorDescription) => {
    console.error(`[electron] Page load failed: ${errorCode} - ${errorDescription}`);
  });

  mainWindow.webContents.on("did-finish-load", () => {
    console.log("[electron] Page finished loading");
  });

  // Show window once content is ready
  mainWindow.once("ready-to-show", () => {
    console.log("[electron] Window ready to show");
    mainWindow.show();
  });

  // When window is closed, clean up
  mainWindow.on("closed", () => {
    console.log("[electron] Window closed");
    mainWindow = null;
  });
}

// ── IPC Handlers ────────────────────────────────────────────────────────

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
    title: "Select Model Folder",
  });
  if (!result.canceled && result.filePaths.length > 0) {
    return result.filePaths[0];
  }
  return null;
});

// ── App Lifecycle ───────────────────────────────────────────────────────────

app.on("ready", async () => {
  console.log("[electron] Starting backend server...");
  startBackend();

  try {
    const backendPort = 5000;
    console.log(`[electron] Waiting for backend on port ${backendPort}...`);
    await waitForBackend(backendPort);
    console.log("[electron] Backend is ready!");
  } catch (err) {
    console.error("[electron] Failed to start backend:", err.message);
    killBackend();
    app.quit();
    return;
  }

  console.log("[electron] Starting frontend server...");
  await startFrontendServer();

  createWindow();
});

// Quit when all windows are closed
app.on("window-all-closed", () => {
  killBackend();
  stopFrontendServer();
  app.quit();
});

// Clean up if the app is about to quit
app.on("before-quit", () => {
  killBackend();
  stopFrontendServer();
});

// Ensure backend is stopped even if app is quitting by other means
app.on("will-quit", () => {
  killBackend();
  stopFrontendServer();
});
