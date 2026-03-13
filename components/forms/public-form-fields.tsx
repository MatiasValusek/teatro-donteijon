import { cn } from "@/lib/utils";

type BaseFieldProps = {
  name: string;
  label: string;
  error?: string;
  hint?: string;
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  defaultValue?: string | number;
  min?: number;
  rows?: number;
};

const inputClassName =
  "mt-2 min-h-12 w-full rounded-[1.1rem] border bg-black/30 px-4 text-base text-white outline-none transition placeholder:text-muted/55 focus:border-orange-300/35 focus:bg-black/40";

export function PublicInputField({
  name,
  label,
  error,
  hint,
  type = "text",
  placeholder,
  defaultValue,
  min,
}: BaseFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        min={min}
        className={cn(
          inputClassName,
          error ? "border-red-400/60" : "border-white/10",
        )}
      />
      {hint ? <span className="mt-2 block text-xs leading-6 text-muted">{hint}</span> : null}
      {error ? <span className="mt-2 block text-xs leading-6 text-red-200">{error}</span> : null}
    </label>
  );
}

export function PublicTextareaField({
  name,
  label,
  error,
  hint,
  placeholder,
  defaultValue,
  rows = 6,
}: BaseFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <textarea
        name={name}
        rows={rows}
        placeholder={placeholder}
        defaultValue={defaultValue as string | undefined}
        className={cn(
          `${inputClassName} min-h-40 py-3`,
          error ? "border-red-400/60" : "border-white/10",
        )}
      />
      {hint ? <span className="mt-2 block text-xs leading-6 text-muted">{hint}</span> : null}
      {error ? <span className="mt-2 block text-xs leading-6 text-red-200">{error}</span> : null}
    </label>
  );
}

type PublicFormNoticeProps = {
  status?: "success" | "error";
  message?: string;
};

export function PublicFormNotice({
  status,
  message,
}: PublicFormNoticeProps) {
  if (!status || !message) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-[1.4rem] border px-4 py-3 text-sm leading-7",
        status === "success"
          ? "border-emerald-400/30 bg-emerald-500/10 text-emerald-100"
          : "border-red-400/40 bg-red-500/10 text-red-100",
      )}
    >
      {message}
    </div>
  );
}
