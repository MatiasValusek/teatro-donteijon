import { createBrandImageResponse } from "@/lib/seo/image-response";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "Imagen institucional de Vamos de Nuevo";

export default function OpenGraphImage() {
  return createBrandImageResponse({
    ...size,
    eyebrow: "VdN",
    title: "Teatro independiente",
    description:
      "Obras, funciones y novedades de Vamos de Nuevo con una presencia digital lista para compartirse.",
  });
}
