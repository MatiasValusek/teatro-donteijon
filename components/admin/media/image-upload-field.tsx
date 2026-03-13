"use client";

import { useEffect, useId, useMemo, useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import {
  isStoragePath,
  resolveStorageImageUrl,
  type StorageFolder,
  type StorageUploadResult,
} from "@/lib/supabase/storage";

type ImageUploadFieldProps = {
  name: string;
  label: string;
  folder: StorageFolder;
  defaultValue?: string | null;
  hint?: string;
  error?: string;
  previewAlt?: string;
};

async function parseUploadResponse(response: Response) {
  const payload = (await response.json().catch(() => null)) as
    | { error?: string }
    | StorageUploadResult
    | null;

  if (!response.ok) {
    throw new Error(
      payload && "error" in payload && payload.error
        ? payload.error
        : "No se pudo subir la imagen.",
    );
  }

  if (!payload || !("path" in payload) || typeof payload.path !== "string") {
    throw new Error("La respuesta de upload no fue valida.");
  }

  return payload;
}

export function ImageUploadField({
  name,
  label,
  folder,
  defaultValue,
  hint,
  error,
  previewAlt,
}: ImageUploadFieldProps) {
  const initialValue = defaultValue?.trim() ?? "";
  const inputId = useId();
  const [value, setValue] = useState(initialValue);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploading, startTransition] = useTransition();

  useEffect(() => {
    setValue(initialValue);
    setUploadError(null);
  }, [initialValue]);

  const previewUrl = useMemo(() => resolveStorageImageUrl(value), [value]);
  const currentValueLabel = value
    ? isStoragePath(value)
      ? "Se guardara el path interno del bucket."
      : "Se mantendra el valor manual cargado."
    : "Todavia no hay imagen cargada.";

  return (
    <div className="grid gap-2">
      <span className="text-sm font-medium text-white">{label}</span>

      <input name={name} type="hidden" value={value} />

      <div
        className={cn(
          "grid gap-4 rounded-[1.35rem] border bg-black/20 p-4 lg:grid-cols-[minmax(0,1fr),18rem]",
          error ? "border-red-400/50" : "border-white/10",
        )}
      >
        <div className="grid gap-3">
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setUploadError(null);
            }}
            placeholder={`Pega una URL o usa Storage en ${folder}/...`}
            className={cn(
              "min-h-12 rounded-[1.1rem] border bg-black/35 px-4 text-sm text-white placeholder:text-muted/55",
              error ? "border-red-400/60" : "border-white/10",
            )}
            aria-invalid={error ? true : undefined}
          />

          <div className="flex flex-wrap items-center gap-3">
            <label
              htmlFor={`${inputId}-file`}
              className={cn(
                "inline-flex min-h-11 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-medium transition",
                isUploading
                  ? "cursor-progress border-white/10 bg-white/5 text-muted"
                  : "border-white/15 bg-white/8 text-white hover:border-white/20 hover:bg-white/12",
              )}
            >
              {isUploading ? "Subiendo..." : "Subir imagen"}
            </label>
            <input
              id={`${inputId}-file`}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              className="sr-only"
              disabled={isUploading}
              onChange={(event) => {
                const input = event.currentTarget;
                const file = input.files?.[0];

                if (!file) {
                  return;
                }

                setUploadError(null);

                startTransition(async () => {
                  try {
                    const body = new FormData();
                    body.set("folder", folder);
                    body.set("file", file);

                    const response = await fetch("/api/admin/storage/upload", {
                      method: "POST",
                      body,
                    });

                    const payload = await parseUploadResponse(response);
                    setValue(payload.path);
                  } catch (uploadException) {
                    setUploadError(
                      uploadException instanceof Error
                        ? uploadException.message
                        : "No se pudo subir la imagen.",
                    );
                  } finally {
                    input.value = "";
                  }
                });
              }}
            />
            <span className="text-xs leading-6 text-muted">{currentValueLabel}</span>
          </div>

          <p className="text-xs leading-6 text-muted">
            {hint ??
              "Puedes subir un archivo nuevo o mantener una URL/path ya cargado. La base guarda un string consistente para reutilizarlo en todo el sitio."}
          </p>
        </div>

        <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/35">
          <div className="relative aspect-[4/3]">
            {previewUrl ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={previewAlt ?? label}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </>
            ) : (
              <div className="flex h-full items-center justify-center px-4 text-center text-xs uppercase tracking-[0.28em] text-muted">
                Sin preview
              </div>
            )}
          </div>
        </div>
      </div>

      {uploadError ? (
        <span className="text-xs leading-6 text-red-200">{uploadError}</span>
      ) : null}
      {error ? <span className="text-xs leading-6 text-red-200">{error}</span> : null}
    </div>
  );
}
