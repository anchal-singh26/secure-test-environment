import { getAttemptId } from "../utils/uuid.js";
import { subscribeToLogs } from "../core/logger.js";

const LOG_KEY = "SECURE_TEST_LOGS";

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString();
}

export function initAuditViewer() {
  const container = document.getElementById("auditLogs");
  if (!container) return;

  const attemptId = getAttemptId();

  function render() {
    const raw = localStorage.getItem(LOG_KEY);
    const logs = raw ? JSON.parse(raw) : [];

    const filtered = logs.filter(
      log => log.attemptId === attemptId
    );

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="audit-empty">
          No audit activity recorded yet.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered
      .slice(-100)
      .reverse()
      .map(log => `
        <div class="audit-log-row">
          <span class="audit-event">${log.eventType}</span>
          <span class="audit-time">${formatTime(log.timestamp)}</span>
        </div>
      `)
      .join("");
  }

  render();

  subscribeToLogs(() => {
    render();
  });
}
