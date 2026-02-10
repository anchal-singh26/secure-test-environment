import { logEvent } from "./logger.js";

function detectBrowser() {
  const ua = navigator.userAgent;
  const vendor = navigator.vendor || "";

  const isRealChrome =
    /Chrome\/\d+/.test(ua) &&
    vendor === "Google Inc." &&
    !/Edg|OPR|Brave|Chromium/i.test(ua);

  let name = "Unknown";
  let version = "Unknown";

  if (isRealChrome) {
    name = "Google Chrome";
    version = ua.match(/Chrome\/(\d+\.\d+\.\d+\.\d+)/)?.[1] || "Unknown";
  } else if (/Edg\//.test(ua)) {
    name = "Microsoft Edge";
    version = ua.match(/Edg\/(\S+)/)?.[1] || "Unknown";
  } else if (/OPR\//.test(ua)) {
    name = "Opera";
    version = ua.match(/OPR\/(\S+)/)?.[1] || "Unknown";
  } else if (/Firefox\//.test(ua)) {
    name = "Mozilla Firefox";
    version = ua.match(/Firefox\/(\S+)/)?.[1] || "Unknown";
  } else if (/Brave/i.test(ua) || vendor.includes("Brave")) {
    name = "Brave Browser";
  } else if (/Safari\//.test(ua)) {
    name = "Safari";
    version = ua.match(/Version\/(\S+)/)?.[1] || "Unknown";
  }

  return { name, version, isAllowed: isRealChrome };
}

export function enforceBrowser() {
  const { name, version, isAllowed } = detectBrowser();

  logEvent("BROWSER_DETECTED", {
    browserName: name,
    browserVersion: version
  });

  if (!isAllowed) {
    logEvent("ACCESS_BLOCKED", {
      reason: "Only Google Chrome is allowed"
    });

    blockAccess(name, version);
    return;
  }

  logEvent("BROWSER_ALLOWED", {});
}

function blockAccess(name, version) {
  document.body.innerHTML = `
    <div class="blocked-screen">
      <div class="block-card">
        <div class="block-icon">🚫</div>
        <h1>Access Restricted</h1>
        <p class="block-desc">
          This assessment is strictly restricted to
          <strong>Google Chrome</strong>.
        </p>
        <p class="block-meta">
          Detected browser: ${name} ${version}
        </p>
        <p class="block-hint">
          Please reopen this link using Google Chrome only.
        </p>
      </div>
    </div>
  `;
}
