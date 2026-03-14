import { imageUrls } from "../config/imageUrls";

export const BRAND_LOGOS = {
  lexus: imageUrls.lexus,
  toyota: imageUrls.toyota,
  ford: imageUrls.ford,
  mercedes: imageUrls.mercedes,
  bmw: imageUrls.bmw,
  hyundai: imageUrls.hyundai,
  kia: imageUrls.kia,
};

export const getBrandLogo = (vehicleName) => {
  const lower = vehicleName?.toLowerCase();
  for (const brand of Object?.keys(BRAND_LOGOS)) {
    if (lower?.startsWith(brand)) return BRAND_LOGOS[brand];
  }
  return null;
};
