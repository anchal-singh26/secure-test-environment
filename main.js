import { enforceBrowser } from "./core/browser.js";
import { initFocusTracking } from "./controls/focus.js";
import { initFullscreenEnforcement, requestFullscreen } from "./controls/fullscreen.js";
import { initTimer } from "./controls/timer.js";
import { initClipboardProtection } from "./controls/clipboard.js";

(function init() {
  enforceBrowser();
  initFocusTracking();
  initFullscreenEnforcement();
  initClipboardProtection();

  const startBtn = document.getElementById("startBtn");

  startBtn.addEventListener("click", () => {
    requestFullscreen();
    document.getElementById("start-screen").remove();
    document.getElementById("app").style.display = "block";
    initTimer(300);
  });
})();
