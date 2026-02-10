import { getTimestamp } from "../utils/time.js";
import { getAttemptId } from "../utils/uuid.js";

const LOG_KEY = "SECURE_TEST_LOGS";
const LOCK_KEY = "SECURE_TEST_LOCKED";
const MAX_BATCH_SIZE = 10;
const EVENT_QUEUE = [];

const subscribers = [];

export function subscribeToLogs(fn) {
  subscribers.push(fn);
}

function notifySubscribers(event) {
  subscribers.forEach(fn => fn(event));
}

function isLocked() {
  return localStorage.getItem(LOCK_KEY) === "true";
}

export function lockLogs() {
  localStorage.setItem(LOCK_KEY, "true");
}

function getStoredLogs() {
  const raw = localStorage.getItem(LOG_KEY);
  return raw ? JSON.parse(raw) : [];
}

function persistLogs(event) {
  const existing = getStoredLogs();
  existing.push(event);
  localStorage.setItem(LOG_KEY, JSON.stringify(existing));
}

export function logEvent(eventType, metadata = {}) {
  if (isLocked()) return;

  const event = {
    eventType,
    timestamp: getTimestamp(),
    attemptId: getAttemptId(),
    questionId: metadata.questionId || null,
    metadata
  };

  EVENT_QUEUE.push(event);
  persistLogs(event);
  notifySubscribers(event);

  if (EVENT_QUEUE.length >= MAX_BATCH_SIZE) {
    flushLogs();
  }
}

function flushLogs() {
  EVENT_QUEUE.length = 0;
}
