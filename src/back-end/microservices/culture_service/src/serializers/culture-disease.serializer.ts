import { CultureDiseaseAdvice } from "../models";

function serializeCultureDisease(
  culture: void | CultureDiseaseAdvice | CultureDiseaseAdvice[]
): any {
  const serializeSingleCulture = (c: CultureDiseaseAdvice) => {
    return {
      ...c.toJSON(),
      image: c.imageUrl,
    };
  };

  if (Array.isArray(culture)) {
    return culture.map(serializeSingleCulture);
  }
  if (typeof culture == "undefined") {
    return null;
  }

  return serializeSingleCulture(culture);
}

export default serializeCultureDisease;
