import { createBrandImageResponse } from "@/lib/seo/image-response";

export const size = {
  width: 1200,
  height: 600,
};

export const contentType = "image/png";
export const alt = "Tarjeta social de Vamos de Nuevo";

export default function TwitterImage() {
  return createBrandImageResponse({
    ...size,
    eyebrow: "Vamos de Nuevo",
    title: "Escena, repertorio y noticias",
    description:
      "Base SEO y visual del grupo preparada para compartir obras, funciones y novedades con criterio.",
  });
}
