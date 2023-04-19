import { TFormat, TFormatRel, TFormatAbs } from "../Types/TFormat";
import { PointKeys } from "./PointKey";

/**
 * Lot de methodes static permetent le contrôle des Format de Point Svg.
 *
 * @version v2
 */
export class FormatServices {


  /**
   * Ensembles des Formats relatifs
   *
   * @returns ["m" , "l" , "h" , "v" , "c" , "s" , "q" , "t" , "a" , "z" ]
   *
   * @version v2
   */
  static get relFormats(): TFormatRel[] {
    return ["m", "l", "h", "v", "c", "s", "q", "t", "a", "z"];
  }

  /**
   * Ensembles des Formats absolues
   *
   * @returns ["M" , "L" , "H" , "V" , "C" , "S" , "Q" , "T" , "A" , "Z" ]
   *
   * @version v2
   */
  static get absFormats(): TFormatAbs[] {
    return ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"];
  }

  /**
   * Ensembles des Formats
   *
   * @returns ["m" , "l" , "h" , "v" , "c" , "s" , "q" , "t" , "a" , "z" , "M" , "L" , "H" , "V" , "C" , "S" , "Q" , "T" , "A" , "Z" ]
   *
   * @version v2
   */
  static get formats(): TFormat[] {
    return [...FormatServices.relFormats, ...FormatServices.absFormats];
  }

  /**
   * Convertion d'un string en TFormatRel
   * @param txt   Le string à convertir
   * @returns     la convertion si possible, sinon undifined
   *
   * @version v2
   */
  static convertToRel(txt?: string | TFormat): TFormatRel | undefined {
    let result: TFormatRel | undefined;
    if (txt !== undefined) {
      FormatServices.relFormats
        .filter((item) => item === txt.toLowerCase())
        .forEach((item) => (result = item));
    }

    return result;
  }

  /**
   * Convertion d'un string en TFormatAbs
   * @param txt   Le string à convertir
   * @returns     la convertion si possible, sinon undifined
   *
   * @version v2
   */
  static convertToAbs(txt?: string | TFormat): TFormatAbs | undefined {
    let result: TFormatAbs | undefined;
    if (txt !== undefined) {
      FormatServices.absFormats
        .filter((item) => item === txt.toUpperCase())
        .forEach((item) => (result = item));
    }
    return result;
  }

  /**
   * Convertion d'un string en TFormat
   *
   * @param txt   Le string à convertir
   * @returns     la convertion si possible, sinon undifined
   *
   * @version v2
   */
  static convert(txt?: string | TFormat): TFormat | undefined {
    let result: TFormat | undefined;
    FormatServices.formats
      .filter((item) => item === txt)
      .forEach((item) => (result = item));

    return result;
  }

  /**
   * Permet de determiner si le point est en coordonnées absolues.
   *
   * @param item  le texte à vérifier.
   * @return      item est-il une de ces lettre :
   * - M , L , H , V , C , S , Q , T , A , Z
   *
   * @version v2
   * */
  static isAbs(item: string): boolean {
    return ["M", "L", "H", "V", "C", "S", "Q", "T", "A", "Z"].includes(item);
  }

  /**
   * Permet de determiner si le point est en coordonnées relatives.
   *
   * @param item      le texte à vérifier.
   * @return          item est-il une de ces lettre :
   * - m , l , h , v , c , s , q , t , a , z
   *
   * @version v2
   * */
  static isRel(item: string): boolean {
    return ["m", "l", "h", "v", "c", "s", "q", "t", "a", "z"].includes(item);
  }

  /**
   * Permet de determiner si le point est un format.
   *
   * @param item  le texte à vérifier.
   * @return      item est-il une de ces lettre :
   * - m , l , h , v , c , s , q , t , a , z , M , L , H , V , C , S , Q , T , A , Z
   *
   * @version v2
   * */
  static isFormat(item: string): boolean {
    return FormatServices.isAbs(item) || FormatServices.isRel(item);
  }

  /**
   * Permet de determiner le nombre de coordonnées d'un point en fonction de son format.
   *
   * @param format    le format dont on cherche le nombre de coordonnées.
   * @returns         le nombre de coordonnées du format :
   *
   * - m, M : 2 : Move To
   * - l, L : 2 : Line To
   * - h, H : 1 : Horizontal Line To
   * - v, V : 1 : Vertical Line To
   * - c, C : 6 : Cubic Bézier Curve
   * - s, S : 4 : Smooth Cubic Bézier Curve
   * - q, Q : 4 : Quadratic Bézier Curve
   * - t, T : 2 : Smooth Quadratic Bézier Curve
   * - a, A : 7 : Elliptical Arc Curve
   * - z, Z : 0 : Close Path
   *
   * @version v2
   * */
  static keysLength(format: string): number {
    return PointKeys[FormatServices.convert(format) || "z"].length;
  }
}
