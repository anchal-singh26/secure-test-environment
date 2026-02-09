const LOG_KEY = "SECURE_TEST_LOGS";
const LOCK_KEY = "SECURE_TEST_LOCKED";

export function isLocked() {
  return localStorage.getItem(LOCK_KEY) === "true";
}

export function lockLogs() {
  localStorage.setItem(LOCK_KEY, "true");
}

export function saveEvent(event) {
  if (isLocked()) return;

  const raw = localStorage.getItem(LOG_KEY);
  const existing = raw ? JSON.parse(raw) : [];
  existing.push(event);

  localStorage.setItem(LOG_KEY, JSON.stringify(existing));
}

export function getAllEvents() {
  const raw = localStorage.getItem(LOG_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function clearLogs() {
  if (isLocked()) return;
  localStorage.removeItem(LOG_KEY);
}
