import { Culture } from "../models";

function serializeCulture(culture: void | Culture | Culture[]): any {
  const serializeSingleCulture = (c: Culture) => {
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

export default serializeCulture;
