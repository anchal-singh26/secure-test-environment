import { logEvent } from "./logger.js";

function detectBrowser() {
  const ua = navigator.userAgent;

  let name = "Unknown";
  let version = "Unknown";

  if (/Chrome\/(\S+)/.test(ua) && !/Edg|OPR/.test(ua)) {
    name = "Google Chrome";
    version = ua.match(/Chrome\/(\S+)/)[1];
  } else if (/Edg\/(\S+)/.test(ua)) {
    name = "Microsoft Edge";
    version = ua.match(/Edg\/(\S+)/)[1];
  } else if (/Firefox\/(\S+)/.test(ua)) {
    name = "Mozilla Firefox";
    version = ua.match(/Firefox\/(\S+)/)[1];
  } else if (/Safari\/(\S+)/.test(ua)) {
    name = "Safari";
    version = ua.match(/Version\/(\S+)/)?.[1] || "Unknown";
  }

  return { name, version };
}

export function enforceBrowser() {
  const { name, version } = detectBrowser();

  logEvent("BROWSER_DETECTED", {
    browserName: name,
    browserVersion: version
  });

  if (name !== "Google Chrome") {
    logEvent("ACCESS_BLOCKED", {
      reason: "Unsupported browser"
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
        This assessment can only be accessed using
        <strong>Google Chrome</strong>.
      </p>
      <p class="block-meta">
        Detected browser: ${name} ${version}
      </p>
      <p class="block-hint">
        Please reopen the assessment link in Chrome.
      </p>
    </div>
  </div>
`;

}
