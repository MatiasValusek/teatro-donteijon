import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  clearAdminSessionCookies,
  getAdminSessionTokensFromStore,
  resolveAdminSession,
  setAdminSessionCookies,
} from "@/lib/auth/session";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  MEDIA_BUCKET_NAME,
  buildStorageObjectPath,
  isStorageFolder,
  resolveStorageImageUrl,
  type StorageUploadResult,
} from "@/lib/supabase/storage";

const maxUploadSizeBytes = 8 * 1024 * 1024;
const allowedMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
]);

function applySessionState(
  response: NextResponse,
  authState: Awaited<ReturnType<typeof resolveAdminSession>>,
) {
  if (authState.session?.accessToken && authState.session.refreshToken) {
    setAdminSessionCookies(response.cookies, authState.session);
  } else if (authState.shouldClear) {
    clearAdminSessionCookies(response.cookies);
  }

  return response;
}

function createErrorResponse(
  message: string,
  status: number,
  authState: Awaited<ReturnType<typeof resolveAdminSession>>,
) {
  return applySessionState(NextResponse.json({ error: message }, { status }), authState);
}

export async function POST(request: NextRequest) {
  const authState = await resolveAdminSession(
    getAdminSessionTokensFromStore(request.cookies),
  );

  if (!authState.user || !authState.session?.accessToken) {
    return createErrorResponse("Tu sesion expiro. Vuelve a iniciar sesion.", 401, authState);
  }

  const client = createSupabaseServerClient({
    accessToken: authState.session.accessToken,
  });

  if (!client) {
    return createErrorResponse(
      "Supabase no esta configurado para subir imagenes.",
      500,
      authState,
    );
  }

  const formData = await request.formData();
  const folderValue = String(formData.get("folder") ?? "").trim();
  const fileEntry = formData.get("file");

  if (!isStorageFolder(folderValue)) {
    return createErrorResponse("La carpeta de destino no es valida.", 400, authState);
  }

  if (!(fileEntry instanceof File)) {
    return createErrorResponse("Selecciona una imagen antes de subir.", 400, authState);
  }

  if (!allowedMimeTypes.has(fileEntry.type)) {
    return createErrorResponse(
      "Usa una imagen JPG, PNG, WEBP o AVIF.",
      400,
      authState,
    );
  }

  if (fileEntry.size <= 0) {
    return createErrorResponse("El archivo esta vacio.", 400, authState);
  }

  if (fileEntry.size > maxUploadSizeBytes) {
    return createErrorResponse(
      "La imagen supera el limite de 8 MB.",
      400,
      authState,
    );
  }

  const objectPath = buildStorageObjectPath(folderValue, fileEntry.name);
  const fileBuffer = new Uint8Array(await fileEntry.arrayBuffer());
  const { error } = await client.storage.from(MEDIA_BUCKET_NAME).upload(objectPath, fileBuffer, {
    cacheControl: "31536000",
    contentType: fileEntry.type,
    upsert: false,
  });

  if (error) {
    return createErrorResponse(error.message, 500, authState);
  }

  const payload: StorageUploadResult = {
    path: objectPath,
    publicUrl: resolveStorageImageUrl(objectPath),
  };

  return applySessionState(NextResponse.json(payload), authState);
}
