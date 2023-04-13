

/**
 * Convertion d'une couleur en hexadécimal en rgb
 * 
 * @param hex #rrggbb
 * 
 * @returns [red, green, blue]
 * 
 * @version v2
 */
export function hexToRgb (hex: string) {
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let c = hex.substring(1).split("");
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    const result = Number("0x" + c.join(""));
    return [(result >> 16) & 255, (result >> 8) & 255, result & 255];
  }
  throw new Error("Bad Hex");
};

/**
 * Convertion d'une couleur en rgb en hexadécimal
 * 
 * @param r rouge 0 à 255
 * @param g vert 0 à 255
 * @param b bleu 0 à 255
 * 
 * @returns #rrggbb
 * 
 * @version v2
 */
export function rgbToHex (r: number, g: number, b: number) {
  const twoLetters = (value: number) => {
    let result = value.toString(16);
    if (result.length === 1) {
      return "0" + result;
    }
    return result;
  };
  return `#${twoLetters(r)}${twoLetters(g)}${twoLetters(b)}`;
};
