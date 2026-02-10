import { logEvent, lockLogs } from "../core/logger.js";
import { getNowISO } from "../utils/time.js";

let durationSeconds = 300;
let remainingSeconds = durationSeconds;
let timerInterval = null;

function saveTimerState() {
  localStorage.setItem(
    "secure_timer_state",
    JSON.stringify({
      remainingSeconds,
      lastUpdated: getNowISO()
    })
  );
}

function loadTimerState() {
  const saved = localStorage.getItem("secure_timer_state");
  if (!saved) return;

  try {
    const data = JSON.parse(saved);
    remainingSeconds = data.remainingSeconds;
  } catch {
    remainingSeconds = durationSeconds;
  }
}

function clearTimerState() {
  localStorage.removeItem("secure_timer_state");
}

function updateTimerUI() {
  const el = document.getElementById("timer");
  if (!el) return;

  const min = Math.floor(remainingSeconds / 60);
  const sec = remainingSeconds % 60;
  el.textContent = `${min}:${sec.toString().padStart(2, "0")}`;
}

function endAssessment() {
  clearInterval(timerInterval);
  clearTimerState();

logEvent("TIMER_EXPIRED", { remainingSeconds: 0 });

setTimeout(() => {
  lockLogs();  
}, 100);


  const app = document.getElementById("app");

app.innerHTML = `
  <div class="end-card">
    <div class="end-icon">⏱️</div>
    <h1>Assessment Completed</h1>
    <p>Time expired. Review the audit log below.</p>
  </div>

  <div id="auditLogs"></div>
`;
import("../controls/auditViewer.js").then(m => {
  m.initAuditViewer(); 
});
}

export function initTimer(seconds = 300) {
  durationSeconds = seconds;
  remainingSeconds = seconds;

  loadTimerState();

  logEvent("TIMER_STARTED", {
    totalSeconds: durationSeconds
  });

  updateTimerUI();

  timerInterval = setInterval(() => {
    remainingSeconds--;
    saveTimerState();
    updateTimerUI();

    if (remainingSeconds % 60 === 0 || remainingSeconds <= 10) {
      logEvent("TIMER_UPDATE", {
        remainingSeconds
      });
    }

    if (remainingSeconds === 60) {
      logEvent("TIMER_WARNING", { message: "1 minute remaining" });
    }

    if (remainingSeconds <= 0) {
      endAssessment();
    }
  }, 1000);
}
