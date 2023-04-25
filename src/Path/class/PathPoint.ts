import { TFormat } from "../Types/TFormat";
import { TOptions } from "../Types/TOptions";
import { TPointKey } from "../Types/TPointKey";
import { Format } from "./Format";
import { FormatServices } from "./FormatServices";
import { Options } from "./Options";


/**
 * Objet Representant un point dans un path
 *
 * @version v2
 * */
export class PathPoint {
  private __format: Format; // M, L, H, V, C, S, Q, T, A, Z

  private __previousPoint?: PathPoint;
  private __options: Options;

  private __x: number; // M, L, H, _, C, S, Q, T, A, _
  private __y: number; // M, L, _, V, C, S, Q, T, A, _
  private __x1: number; // _, _, _, _, C, _, Q, _, _, _
  private __y1: number; // _, _, _, _, C, _, Q, _, _, _
  private __x2: number; // _, _, _, _, C, S, _, _, _, _
  private __y2: number; // _, _, _, _, C, S, _, _, _, _

  private __dx: number; // m, l, h, _, c, s, q, t, a, _
  private __dy: number; // m, l, _, v, c, s, q, t, a, _
  private __dx1: number; // _, _, _, _, c, _, q, _, _, _
  private __dy1: number; // _, _, _, _, c, _, q, _, _, _
  private __dx2: number; // _, _, _, _, c, s, _, _, _, _
  private __dy2: number; // _, _, _, _, c, s, _, _, _, _

  private __rx: number; // _, _, _, _, _, _, _, _, A, _
  private __ry: number; // _, _, _, _, _, _, _, _, A, _
  private __angle: number; // _, _, _, _, _, _, _, _, A, _
  private __largeArcFlag: number; // _, _, _, _, _, _, _, _, A, _
  private __sweepFlag: number; // _, _, _, _, _, _, _, _, A, _

  constructor(
    format: TFormat,
    previousPoint?: PathPoint,
    previousMPoint?: PathPoint,
    options?: Options | Partial<TOptions>
  ) {
    this.__format         = new Format(format);
    this.__previousPoint  = previousPoint;
    this.__x                = previousMPoint?.x || 0;
    this.__y                = previousMPoint?.y || 0;
    this.__x1               = 0;
    this.__y1               = 0;
    this.__x2               = 0;
    this.__y2               = 0;

    this.__dx               = 0;
    this.__dy               = 0;
    this.__dx1              = 0;
    this.__dy1              = 0;
    this.__dx2              = 0;
    this.__dy2              = 0;

    this.__rx               = 0;
    this.__ry               = 0;
    this.__angle            = 0;
    this.__largeArcFlag     = 0;
    this.__sweepFlag        = 0;

    this.__options = new Options(options);
  }

  /**
   * Point précédent dans le path
   * 
   * @version v2
   */
  get previousPoint() {
    return this.__previousPoint;
  }

  /**
   * Coordonnée x du point
   * 
   * @version v2
   */
  get x () {
    return this.__x ;
  }

  /**
   * Réglage de la coordonnée x.
   * dx est modifié automatiquement.
   * 
   * @version v2
   */
  set x (value : number) {
    this.__x = value ;
    this.__dx = value - (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée y du point
   * 
   * @version v2
   */
  get y () {
    return this.__y ;
  }

  /**
   * Réglage de la coordonnée y.
   * dy est modifié automatiquement.
   * 
   * @version v2
   */
  set y (value : number) {
    this.__y = value ;
    this.__dy = value - (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée x1 du point
   * 
   * @version v2
   */
  get x1 () {
    return this.__x1 ;
  }

  /**
   * Réglage de la coordonnée x1.
   * dx1 est modifié automatiquement.
   * 
   * @version v2
   */
  set x1 (value : number) {
    this.__x1 = value ;
    this.__dx1 = value - (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée y1 du point
   * 
   * @version v2
   */
  get y1 () {
    return this.__y1 ;
  }

  /**
   * Réglage de la coordonnée y1.
   * dy1 est modifié automatiquement.
   * 
   * @version v2
   */
  set y1 (value : number) {
    this.__y1 = value ;
    this.__dy1 = value - (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée x2 du point
   * 
   * @version v2
   */
  get x2 () {
    return this.__x2 ;
  }

  /**
   * Réglage de la coordonnée x2.
   * dx2 est modifié automatiquement.
   * 
   * @version v2
   */
  set x2 (value : number) {
    this.__x2 = value ;
    this.__dx2 = value - (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée y2 du point
   * 
   * @version v2
   */
  get y2 () {
    return this.__y2 ;
  }

  /**
   * Réglage de la coordonnée y2.
   * dy2 est modifié automatiquement.
   * 
   * @version v2
   */
  set y2 (value : number) {
    this.__y2 = value ;
    this.__dy2 = value - (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée dx du point
   * 
   * @version v2
   */
  get dx () {
    return this.__dx ;
  }

  /**
   * Réglage de la coordonnée dx.
   * x est modifié automatiquement.
   * 
   * @version v2
   */
  set dx (value : number) {
    this.__dx = value ;
    this.__x = value + (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée dy du point
   * 
   * @version v2
   */
  get dy () {
    return this.__dy ;
  }

  /**
   * Réglage de la coordonnée dy.
   * y est modifié automatiquement.
   * 
   * @version v2
   */
  set dy (value : number) {
    this.__dy = value ;
    this.__y = value + (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée dx1 du point
   * 
   * @version v2
   */
  get dx1 () {
    return this.__dx1 ;
  }

  /**
   * Réglage de la coordonnée dx1.
   * x1 est modifié automatiquement.
   * 
   * @version v2
   */
  set dx1 (value : number) {
    this.__dx1 = value ;
    this.__x1 = value + (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée dy1 du point
   * 
   * @version v2
   */
  get dy1 () {
    return this.__dy1 ;
  }

  /**
   * Réglage de la coordonnée dy1.
   * y1 est modifié automatiquement.
   * 
   * @version v2
   */
  set dy1 (value : number) {
    this.__dy1 = value ;
    this.__y1 = value + (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée dx2 du point
   * 
   * @version v2
   */
  get dx2 () {
    return this.__dx2 ;
  }

  /**
   * Réglage de la coordonnée dx2.
   * x2 est modifié automatiquement.
   * 
   * @version v2
   */
  set dx2 (value : number) {
    this.__dx2 = value ;
    this.__x2 = value + (this.__previousPoint?.x || 0) ;
  }

  /**
   * Coordonnée dy2 du point
   * 
   * @version v2
   */
  get dy2 () {
    return this.__dy2 ;
  }

  /**
   * Réglage de la coordonnée dy2.
   * y2 est modifié automatiquement.
   * 
   * @version v2
   */
  set dy2 (value : number) {
    this.__dy2 = value ;
    this.__y2 = value + (this.__previousPoint?.y || 0) ;
  }

  /**
   * Coordonnée rx du point ( a ou A uniquement ).
   * 
   * @version v2
   */
  get rx () {
    return this.__rx ;
  }

  /**
   * Réglage de la coordonnée rx ( a ou A uniquement ).
   * 
   * @version v2
   */
  set rx (value : number) {
    this.__rx = value
  }

  /**
   * Coordonnée ry du point ( a ou A uniquement ).
   * 
   * @version v2
   */
  get ry () {
    return this.__ry ;
  }

  /**
   * Réglage de la coordonnée ry ( a ou A uniquement ).
   * 
   * @version v2
   */
  set ry (value : number) {
    this.__ry = value
  }

  /**
   * Coordonnée angle du point ( a ou A uniquement ).
   * 
   * @version v2
   */
  get angle () {
    return this.__angle ;
  }

  /**
   * Réglage de la coordonnée angle ( a ou A uniquement ).
   * 
   * @version v2
   */
  set angle (value : number) {
    this.__angle = value
  }

  /**
   * Coordonnée largeArcFlag du point ( a ou A uniquement ).
   * 
   * @version v2
   */
  get largeArcFlag () {
    return this.__largeArcFlag ;
  }

  /**
   * Réglage de la coordonnée largeArcFlag ( a ou A uniquement ).
   * 
   * @version v2
   */
  set largeArcFlag (value : number) {
    this.__largeArcFlag = value
  }

  /**
   * Coordonnée sweepFlag du point ( a ou A uniquement ).
   * 
   * @version v2
   */
  get sweepFlag () {
    return this.__sweepFlag ;
  }

  /**
   * Réglage de la coordonnée sweepFlag ( a ou A uniquement ).
   * 
   * @version v2
   */
  set sweepFlag (value : number) {
    this.__sweepFlag = value
  }

  /**
   * Le Format du Point.
   * 
   * @version v2
   */
  get format(): Format {
    return this.__format;
  }

  /**
   * Réglage du Format du Point.
   * 
   * @version v2
   */
  set format(value: Format | TFormat) {
    if (value instanceof Format) {
      this.__format = value;
    } else {
      this.__format.value = value;
    }
  }

  /**
   * Permet la configuration du point avec un pathSplit
   * 
   * @param remainingCoord Liste des Formats et Coordonnées restants dans le Path
   * 
   * @returns Liste des Formats et Coordonnées restants dans le Path après récupération de ceux nécéssaire à la création du Point
   * 
   * @version v2
   */
  setPath(remainingCoord: string[]) {
    let result = remainingCoord;
    let curFormat = this.__format.value;

    this.__format.keys.forEach((item) => {
      const next = result.shift();
      this[item] = Number(next!);
    });

    if (curFormat !== "a" && curFormat !== "A") {
      this.rx = 1;
      this.ry = 1;
      this.angle = 0;
      this.largeArcFlag = 0;
      this.sweepFlag = 0;
    }
    if (curFormat === "v" || curFormat === "V") {
      this.dx = 0;
    }
    if (curFormat === "h" || curFormat === "H") {
      this.dy = 0;
    }
    if (
      curFormat !== "c" &&
      curFormat !== "C" &&
      curFormat !== "q" &&
      curFormat !== "Q"
    ) {
      this.dx1 = 0;
      this.dy1 = 0;
    }
    if (
      curFormat !== "c" &&
      curFormat !== "C" &&
      curFormat !== "s" &&
      curFormat !== "S"
    ) {
      this.x2 = this.x;
      this.y2 = this.y;
    }
    return result;
  }

  /**
   * Valeur de la dernière Clé du Point.
   * 
   * @version v2
   */
  get lastKeyValue(): number {
    return this[this.__format.lastKeys];
  }

  /**
   * Valeur des Coordonnées du Point arondie pour les options
   * 
   * @param key la coordonnée visée
   * @returns la valeur de la coordonnée
   * 
   * @version v2
   */
  getByKeyRounded(key: TPointKey): string {
    const rounder = this.__options.rounder;
    let result = String(Math.round(this[key] / rounder) * rounder);
    if (result.includes(".")) {
      const int = result.split(".")[0];
      const dec = result.split(".")[1];
      if (dec.length > String(rounder).split(".")[1].length) {
        result =
          int + "." + dec.substring(0, String(rounder).split(".")[1].length);
      }
    }
    return result;
  }

  /**
   * Convertion du Point en string
   * 
   * @version v2
   */
  get asString(): string {
    let result: string = this.__format.value;
    const curFormat = this.__format.value;

    if (!this.__options.surNumFormat && this.__previousPoint) {
      const prevFormat = this.__previousPoint.format.value;
      if (
        (prevFormat === "m" && curFormat === "l") ||
        (prevFormat === "M" && curFormat === "L") ||
        (prevFormat === curFormat && curFormat !== "m" && curFormat !== "M")
      ) {
        result = "";
      }
    }
    let prevItem = result;
    //****************
    if (this.__previousPoint && prevItem === "") {
      prevItem = String(this.__previousPoint.lastKeyValue);
    }

    result += this.__format.keys
      .map((item) => {
        let newItem: string = this.getByKeyRounded(item);
        let end = "";
        let start = " ";
        // ***********
        if (
          curFormat !== "h" &&
          curFormat !== "H" &&
          (String(item).substring(0, 1) === "x" ||
            String(item).substring(0, 2) === "dx")
        ) {
          end = this.__options.withComma ? "," : "";
        }
        // ***********
        if (!this.__options.surNumZero) {
          let [int, float] = newItem.split(".");
          if (float) {
            if (int === "0") {
              newItem = `.${float}`;
            }
            if (int === "-0") {
              newItem = `-.${float}`;
            }
          }
        }

        if (prevItem.slice(-1) === ",") {
          start = "";
        }

        if (
          !this.__options.surNumSpace &&
          (FormatServices.convert(prevItem.slice(-1)) ||
            newItem.substring(0, 1) === "-" ||
            (newItem.substring(0, 1) === "." && prevItem.split(".").length > 1))
        ) {
          start = "";
        }
        prevItem = `${start}${newItem}${end}`;
        return `${start}${newItem}${end}`;
      })
      .join("");

    if (this.__options.withBreak) {
      return result + "\n";
    } else if (this.__options.surNumSpace) {
      return result + " ";
    } else {
      return result;
    }
  }

  toRelative () {
    this.__format.value = FormatServices.convert(this.__format.value.toLowerCase())!
  }
}
