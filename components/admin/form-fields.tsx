import { cn } from "@/lib/utils";

type BaseFieldProps = {
  name: string;
  label: string;
  hint?: string;
  error?: string;
};

type AdminInputFieldProps = BaseFieldProps & {
  defaultValue?: string | number;
  type?: "text" | "email" | "url" | "number" | "datetime-local";
  placeholder?: string;
  min?: number;
  step?: number;
  required?: boolean;
};

export function AdminInputField({
  name,
  label,
  hint,
  error,
  defaultValue,
  type = "text",
  placeholder,
  min,
  step,
  required,
}: AdminInputFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-white">
        {label}
      </span>
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        min={min}
        step={step}
        required={required}
        className={cn(
          "min-h-12 rounded-[1.1rem] border bg-black/35 px-4 text-sm text-white placeholder:text-muted/55",
          error ? "border-red-400/60" : "border-white/10",
        )}
      />
      {hint ? <span className="text-xs leading-6 text-muted">{hint}</span> : null}
      {error ? <span className="text-xs leading-6 text-red-200">{error}</span> : null}
    </label>
  );
}

type AdminTextareaFieldProps = BaseFieldProps & {
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
};

export function AdminTextareaField({
  name,
  label,
  hint,
  error,
  defaultValue,
  placeholder,
  rows = 6,
}: AdminTextareaFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-white">
        {label}
      </span>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className={cn(
          "rounded-[1.1rem] border bg-black/35 px-4 py-3 text-sm leading-7 text-white placeholder:text-muted/55",
          error ? "border-red-400/60" : "border-white/10",
        )}
      />
      {hint ? <span className="text-xs leading-6 text-muted">{hint}</span> : null}
      {error ? <span className="text-xs leading-6 text-red-200">{error}</span> : null}
    </label>
  );
}

type AdminSelectFieldProps = BaseFieldProps & {
  defaultValue?: string;
  options: Array<{
    value: string;
    label: string;
  }>;
};

export function AdminSelectField({
  name,
  label,
  hint,
  error,
  defaultValue,
  options,
}: AdminSelectFieldProps) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-medium text-white">
        {label}
      </span>
      <select
        name={name}
        defaultValue={defaultValue}
        className={cn(
          "min-h-12 rounded-[1.1rem] border bg-black/35 px-4 text-sm text-white",
          error ? "border-red-400/60" : "border-white/10",
        )}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {hint ? <span className="text-xs leading-6 text-muted">{hint}</span> : null}
      {error ? <span className="text-xs leading-6 text-red-200">{error}</span> : null}
    </label>
  );
}

type AdminCheckboxFieldProps = {
  name: string;
  label: string;
  hint?: string;
  defaultChecked?: boolean;
};

export function AdminCheckboxField({
  name,
  label,
  hint,
  defaultChecked,
}: AdminCheckboxFieldProps) {
  return (
    <label className="flex items-start gap-3 rounded-[1.1rem] border border-white/10 bg-black/20 px-4 py-3">
      <input
        name={name}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 size-4 rounded border-white/20 bg-black/40"
      />
      <span className="min-w-0">
        <span className="block text-sm font-medium text-white">{label}</span>
        {hint ? <span className="mt-1 block text-xs leading-6 text-muted">{hint}</span> : null}
      </span>
    </label>
  );
}

type AdminFormNoticeProps = {
  error?: string;
  saved?: boolean;
};

export function AdminFormNotice({ error, saved }: AdminFormNoticeProps) {
  if (!error && !saved) {
    return null;
  }

  return (
    <div
      className={cn(
        "rounded-[1.2rem] border px-4 py-3 text-sm leading-7",
        error
          ? "border-red-400/40 bg-red-500/10 text-red-100"
          : "border-emerald-400/30 bg-emerald-500/10 text-emerald-100",
      )}
    >
      {error ?? "Cambios guardados correctamente."}
    </div>
  );
}
