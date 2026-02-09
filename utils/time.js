export function getNowISO() {
  return new Date().toISOString();
}

export function getTimestamp() {
  return getNowISO();
}
