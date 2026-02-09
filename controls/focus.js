import { logEvent } from "../core/logger.js";

function handleVisibilityChange() {
  if (document.hidden) {
    logEvent("TAB_HIDDEN", {
      reason: "User switched tab or minimized window",
      visibilityState: document.visibilityState
    });
  } else {
    logEvent("TAB_VISIBLE", {
      reason: "User returned to test tab",
      visibilityState: document.visibilityState
    });
  }
}

function handleWindowBlur() {
  logEvent("WINDOW_BLUR", {
    reason: "Window lost focus"
  });
}

function handleWindowFocus() {
  logEvent("WINDOW_FOCUS", {
    reason: "Window regained focus"
  });
}

export function initFocusTracking() {
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", handleWindowBlur);
  window.addEventListener("focus", handleWindowFocus);

  logEvent("FOCUS_TRACKING_INITIALIZED", {
    visibilityState: document.visibilityState
  });
}
