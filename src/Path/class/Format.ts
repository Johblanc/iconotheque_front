import { TFormat, TFormatRel, TFormatB } from "../Types/TFormat";
import { TPointKey } from "../Types/TPointKey";
import { FormatServices } from "./FormatServices";
import { PointKeys } from "./PointKey";

/**
 * Objet representant un Format de point d'un path svg.
 *
 * @version v2
 */
export class Format {
  /** La valeur courante du Format */
  value: TFormat;

  /**
   * Création d'un nouveau Format
   * @param value     Possible valeur initial
   * @returns         Un nouveau Format
   *
   * @version v2
   */
  constructor(value: TFormat) {
    this.value = value;
  }

  /**
   * Permet de determiner si le point est en coordonnées absolues.
   *
   * @return      item est-il une de ces lettre :
   * - M , L , H , V , C , S , Q , T , A , Z
   *
   * @version v2
   * */
  get isAbs(): boolean {
    return FormatServices.isAbs(this.value || "");
  }

  /**
   * Permet de determiner si le point est en coordonnées relatives.
   *
   * @return item est-il une de ces lettre :
   * - m , l , h , v , c , s , q , t , a , z
   *
   * @version v2
   * */
  get isRel(): boolean {
    return FormatServices.isRel(this.value || "");
  }


  /**
   * Lecture de la valeur du FormatA
   *
   * @version v2
   */
  get formatA(): TFormatRel {
    return FormatServices.convertToRel(this.value) || "z";
  }

  /**
   * Modification de la valeur du FormatA
   *
   * @version v2
   */
  set formatA(value: TFormatRel) {
    if (this.isRel) {
      this.value = value;
    } else {
      this.value = FormatServices.convertToAbs(value)!;
    }
  }

  /**
   * Lecture de la valeur du FormatB
   *
   * @version v2
   */
  get formatB(): TFormatB {
    if (this.isAbs) {
      return "abs";
    } else {
      return "rel";
    }
  }

  /**
   * Modification et/ou lecture de la valeur du FormatB
   *
   * @version v2
   */
  set formatB(value: TFormatB) {
    if (value === "abs") {
      this.value = FormatServices.convertToAbs(this.value)!;
    } else {
      this.value = FormatServices.convertToRel(this.value)!;
    }
  }

  /**
   * Ensembles des parametères pour ce Format
   * @returns TPointKey[]
   */
  get keys(): TPointKey[] {
    return PointKeys[this.value || "z"];
  }

  /**
   * Permet de determiner le nombre de coordonnées d'un point en fonction de son format.
   *
   * @returns     le nombre de coordonnées du format :
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
   */
  get keysLength(): number {
    return this.keys.length;
  }

  /** @returns La dernière clé du Format  */
  get lastKeys(): TPointKey {
    return this.keys[this.keysLength - 1];
  }
}
