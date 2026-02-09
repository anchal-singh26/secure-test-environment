let attemptId = null;

export function getAttemptId() {
  if (!attemptId) {
    attemptId = crypto.randomUUID();
  }
  return attemptId;
}
