export const MAINTENANCE_START = new Date('2026-02-01T00:00:00+09:00');
export const MAINTENANCE_END = new Date('2026-02-01T23:59:00+09:00');

export const isInMaintenance = (now = new Date()) => {
  return now >= MAINTENANCE_START && now <= MAINTENANCE_END;
}
