import { logEvent } from "../core/logger.js";

export function requestFullscreen() {
  const elem = document.documentElement;

  logEvent("FULLSCREEN_REQUESTED", {});

  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) {
    elem.webkitRequestFullscreen();
  } else {
    logEvent("FULLSCREEN_BLOCKED", {
      reason: "Fullscreen API not supported"
    });
  }
}

function handleFullscreenChange() {
  const fullscreenElement =
    document.fullscreenElement ||
    document.webkitFullscreenElement;

  if (fullscreenElement) {
    logEvent("FULLSCREEN_ENTERED", {});
    removeBlockingOverlay();
  } else {
    logEvent("FULLSCREEN_EXITED", {
      reason: "User exited fullscreen"
    });
    showBlockingOverlay();
  }
}

function showBlockingOverlay() {
  if (document.getElementById("fullscreen-blocker")) return;

  const overlay = document.createElement("div");
  overlay.id = "fullscreen-blocker";
  overlay.innerHTML = `
    <div class="fs-card">
      <div class="fs-icon">⛶</div>
      <h1>Fullscreen Required</h1>
      <p class="fs-desc">
        This assessment must be taken in fullscreen mode to ensure fairness
        and maintain assessment integrity.
      </p>

      <button id="reenterFullscreen" class="fs-primary-btn">
        Enter Fullscreen
      </button>

      <p class="fs-hint">
        Please do not exit fullscreen during the assessment.
      </p>
    </div>
  `;

  document.body.appendChild(overlay);

  document
    .getElementById("reenterFullscreen")
    .addEventListener("click", requestFullscreen);
}


function removeBlockingOverlay() {
  const overlay = document.getElementById("fullscreen-blocker");
  if (overlay) overlay.remove();
}

export function initFullscreenEnforcement() {
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
}
