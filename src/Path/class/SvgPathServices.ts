
import { FormatServices } from "./FormatServices";

/**
 * Un objet representant un path Svg
 *
 * @version v2
 * */
export class SvgPathServices {

  /**
   * Permet la découpe d'un tracé de path.
   *
   * @param path le tracé à découper
   * @returns une liste contenant chaque moceau du tracé (type ou paramètre de point)
   *
   * @example "M-.1.2-.3 1" => [ "M", "-0.1", "0.2", "-0.3", "1" ]
   *
   * @version v2
   */
  static pathSpliter(path: string): string[] {
    let lastSeparator = " ";
    return path
      .split("")
      .map((item) => {
        if (FormatServices.convert(item)) {
          lastSeparator = " ";
          return ` ${item} `;
        }
        if (item === "-") {
          lastSeparator = " ";
          return ` ${item}`;
        }
        if (item === "." && lastSeparator === ".") {
          return ` 0${item}`;
        }
        if (item === "," || item === " " || item === "\n" || item === ".") {
          lastSeparator = item;
        }
        return item;
      })
      .join("")
      .trim()
      .split(/,| |\n/)
      .filter((item) => item !== "");
  }

  /**
   * Vérification d'un tracé de path
   *
   * @version v2
   * */
  static findErrors(path: string): string {
    let result = "";
    let splitPath = SvgPathServices.pathSpliter(path);

    let curItem: string = "";
    let curValue: string | undefined = "";
    while (splitPath.length > 0) {
      if (FormatServices.isFormat(splitPath[0])) {
        curItem = splitPath.shift()!;
        result += curItem + " ";
      }
      if (FormatServices.isFormat(curItem)) {
        let targetLength = FormatServices.keysLength(curItem);
        for (let i = 0; i < targetLength; i += 1) {
          curValue = splitPath.shift();

          if (!curValue) {
            return `d vérifié jusqu'à : ${result}\nLe point ${curItem} doit avoir ${targetLength} attribut(s)`;
          }
          if (FormatServices.isFormat(curValue)) {
            return `d vérifié jusqu'à : ${result}\n${curItem} ne contient pas le bon nombre de points (${targetLength} attribut(s) / points)`;
          }
          if (isNaN(Number(curValue))) {
            return `d vérifié jusqu'à : ${result}\n${curValue} n'est pas un nombre ou un format`;
          }
          result += curValue + " ";
        }
      } else {
        return `d vérifié jusqu'à : ${result}\n${curValue} : Les points doivent commencer par M, m, L, l, H, h, V, v, C, c, S, s, Q, q, T, t, A, a, Z ou z`;
      }
    }
    return "";
  }

}
