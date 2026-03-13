import { createBrandIconResponse } from "@/lib/seo/image-response";

export const size = {
  width: 512,
  height: 512,
};

export const contentType = "image/png";

export default function Icon() {
  return createBrandIconResponse(size.width, size.height);
}
