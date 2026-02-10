import { logEvent } from "./logger.js";

function detectBrowser() {
  const ua = navigator.userAgent || "";
  const vendor = navigator.vendor || "";
  const isChromium = !!window.chrome;

  const isGoogleVendor = vendor === "Google Inc.";

  const isEdge = /\bEdg\//i.test(ua);
  const isOpera = /\bOPR\//i.test(ua);
  const isFirefox = /\bFirefox\//i.test(ua);
  const isSamsung = /\bSamsungBrowser\//i.test(ua);

  const isBrave =
    navigator.brave !== undefined ||
    ua.toLowerCase().includes("brave");

  const isRealChrome =
    isChromium &&
    isGoogleVendor &&
    !isEdge &&
    !isOpera &&
    !isFirefox &&
    !isSamsung &&
    !isBrave;

  let name = "Unknown";
  let version = "Unknown";

  if (isRealChrome) {
    name = "Google Chrome";
    const match = ua.match(/Chrome\/([\d.]+)/);
    version = match ? match[1] : "Unknown";
  } else if (isBrave) {
    name = "Brave Browser";
  } else if (isEdge) {
    name = "Microsoft Edge";
  } else if (isSamsung) {
    name = "Samsung Internet";
  } else if (isOpera) {
    name = "Opera";
  } else if (isFirefox) {
    name = "Mozilla Firefox";
  } else if (/Safari\//.test(ua)) {
    name = "Safari";
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
      reason: "Only Google Chrome is permitted"
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
