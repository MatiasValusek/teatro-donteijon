export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function toDateTime(date: string, time = "00:00") {
  return new Date(`${date}T${time}:00`);
}

export function isFutureDateTime(date: string, time = "00:00") {
  return toDateTime(date, time).getTime() >= Date.now();
}

export function sortFunctionEvents<T extends { date: string; time: string }>(
  events: T[],
) {
  return [...events].sort(
    (left, right) =>
      toDateTime(left.date, left.time).getTime() -
      toDateTime(right.date, right.time).getTime(),
  );
}

export function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatAgendaDate(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatDayNumber(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(`${date}T00:00:00`));
}

export function formatShortMonth(date: string) {
  return new Intl.DateTimeFormat("es-AR", {
    month: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(`${date}T00:00:00`));
}
