// Replace moment with dayjs under a common API surface used by the app
import dayjs from "dayjs";

export function formatISO(date) {
  return dayjs(date).toISOString();
}

export function formatDate(date, pattern = "YYYY-MM-DD") {
  return dayjs(date).format(pattern);
}

export function addDays(date, n) {
  return dayjs(date).add(n, "day").toDate();
}
