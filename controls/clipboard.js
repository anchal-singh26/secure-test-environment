import { logEvent } from "../core/logger.js";

function handleCopy(e) {
  e.preventDefault();
  logEvent("COPY_ATTEMPT", {});
}

function handlePaste(e) {
  e.preventDefault();
  logEvent("PASTE_ATTEMPT", {});
}

function handleCut(e) {
  e.preventDefault();
  logEvent("CUT_ATTEMPT", {});
}

function handleContextMenu(e) {
  e.preventDefault();
  logEvent("RIGHT_CLICK_ATTEMPT", {});
}

function handleKeydown(e) {
  const key = e.key.toLowerCase();

  const blocked =
    e.key === "F12" ||
    (e.ctrlKey && e.shiftKey && key === "i") ||
    (e.ctrlKey && e.shiftKey && key === "j") ||
    (e.ctrlKey && key === "u");

  if (blocked) {
    e.preventDefault();
    logEvent("DEVTOOLS_DETECTED", {
      key: e.key,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      meta: e.metaKey
    });
  }
}

export function initClipboardProtection() {
  document.addEventListener("copy", handleCopy);
  document.addEventListener("paste", handlePaste);
  document.addEventListener("cut", handleCut);
  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("keydown", handleKeydown);

  logEvent("CLIPBOARD_PROTECTION_INITIALIZED", {});
}
