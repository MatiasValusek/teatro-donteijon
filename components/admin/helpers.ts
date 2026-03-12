import { toArgentinaDateTimeLocalValue } from "@/lib/queries/shared";

export function toTextareaValue(items: string[] | null | undefined) {
  return items?.join("\n") ?? "";
}

export function toCommaSeparatedValue(items: string[] | null | undefined) {
  return items?.join(", ") ?? "";
}

export function toDateTimeLocalValue(value: string | null | undefined) {
  if (!value) {
    return "";
  }

  return toArgentinaDateTimeLocalValue(value);
}
