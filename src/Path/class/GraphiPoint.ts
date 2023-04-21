import { TGraphiPoint } from "../Types/TGraphiPoint";


/**
 * Un GraphiPoint pour la modification graphique
 * 
 * @version v2
 */
export class GraphiPoint {
  private __x: number;
  private __y: number;
  private __bx: number;
  private __by: number;
  private __ax: number;
  private __ay: number;
  private __status: "dur" | "symétrique" | "doux";

  constructor(data: TGraphiPoint | GraphiPoint) {
    this.__x = data.x;
    this.__y = data.y;
    this.__bx = data.bx;
    this.__by = data.by;
    this.__ax = data.ax;
    this.__ay = data.ay;
    if (data.status !== undefined) {
      this.__status = data.status;
    } else {
      this.__status = "doux";
      this.verifStatus();
    }
  }

  /**
   * Vérification du status du GraphiPoint en fonction de ses coordonnées
   * 
   * @version v2
   */
  verifStatus() {
    if (
      this.__x === this.__ax &&
      this.__x === this.__bx &&
      this.__y === this.__ay &&
      this.__y === this.__by
    ) {
      this.__status = "dur";
    } else if (this.dax === -this.dbx && this.day === -this.dby) {
      this.__status = "symétrique";
    } else {
      this.__status = "doux";
    }
  }

  /**
   * Réglage de la coordonnée x.
   * ax et bx sont modifiées automatiquement.
   * 
   * @version v2
   */
  set x(value: number) {
    const delta = value - this.__x;
    this.__x = value;
    this.__ax += delta;
    this.__bx += delta;
  }

  /**
   * La coordonnée x
   * 
   * @version v2
   */
  get x() {
    return this.__x;
  }

  /**
   * Réglage de la coordonnée y.
   * ay et by sont modifiées automatiquement.
   * 
   * @version v2
   */
  set y(value: number) {
    const delta = value - this.__y;
    this.__y = value;
    this.__ay += delta;
    this.__by += delta;
  }

  /**
   * La coordonnée y
   * 
   * @version v2
   */
  get y() {
    return this.__y;
  }

  /**
   * Réglage de la coordonnée bx.
   * 
   * @version v2
   */
  set bx(value: number) {
    this.__bx = value;
  }
  
  /**
   * La coordonnée bx
   * 
   * @version v2
   */
  get bx() {
    return this.__bx;
  }

  /**
   * Réglage de la coordonnée by.
   * 
   * @version v2
   */
  set by(value: number) {
    this.__by = value;
  }
  
  /**
   * La coordonnée by
   * 
   * @version v2
   */
  get by() {
    return this.__by;
  }

  /**
   * Réglage de la coordonnée ay.
   * 
   * @version v2
   */
  set ay(value: number) {
    this.__ay = value;
  }
  
  /**
   * La coordonnée ay
   * 
   * @version v2
   */
  get ay() {
    return this.__ay;
  }

  /**
   * Réglage de la coordonnée ax.
   * 
   * @version v2
   */
  set ax(value: number) {
    this.__ax = value;
  }
  
  /**
   * La coordonnée ax
   * 
   * @version v2
   */
  get ax() {
    return this.__ax;
  }

  /**
   * Réglage de la coordonnée dbx.
   * 
   * @version v2
   */
  set dbx(value: number) {
    this.__bx = this.__x + value;
    if (this.status === "symétrique") {
      this.dax = -this.dbx;
    }
  }
  
  /**
   * La coordonnée dbx
   * 
   * @version v2
   */
  get dbx() {
    return this.__bx - this.__x;
  }

  /**
   * Réglage de la coordonnée dby.
   * 
   * @version v2
   */
  set dby(value: number) {
    this.__by = this.__y + value;
    if (this.status === "symétrique") {
      this.day = -this.dby;
    }
  }
  /**
   * La coordonnée dby
   * 
   * @version v2
   */
  get dby() {
    return this.__by - this.__y;
  }

  /**
   * Réglage de la coordonnée dax.
   * 
   * @version v2
   */
  set dax(value: number) {
    this.ax = this.__x + value;
  }
  /**
   * La coordonnée dax
   * 
   * @version v2
   */
  get dax() {
    return this.__ax - this.__x;
  }

  /**
   * Réglage de la coordonnée day.
   * 
   * @version v2
   */
  set day(value: number) {
    this.__ay = this.__y + value;
  }
  /**
   * La coordonnée day
   * 
   * @version v2
   */
  get day() {
    return this.__ay - this.__y;
  }

  /**
   * Réglage du status avec mise à jour des coordonnées.
   * 
   * @version v2
   */
  set status(value: "dur" | "symétrique" | "doux") {
    this.__status = value;
    if (value === "dur") {
      this.dbx = 0;
      this.dby = 0;
      this.dax = 0;
      this.day = 0;
    } else if (value === "symétrique") {
      this.dax = -this.dbx;
      this.day = -this.dby;
    }
  }

  /**
   * Status du GraphiPoint
   * 
   * @version v2
   */
  get status() {
    return this.__status;
  }

  /**
   * Copie du GraphiPoint.
   * 
   * @version v2
   */
  get copy() {
    return new GraphiPoint(this);
  }

  static losange (xCentre: number, yCentre:number, width : number, height : number){

    const x = xCentre ;
    const y = yCentre ;

    /** demi largeur */
    const hw = width / 2 ;

    /** demi hauteu */
    const hh = height / 2 ;

    return `m ${x - hw} ${y} ${ hw} ${ - hh} ${ hw} ${ hh} ${ - hw} ${ hh } z `
  }

  static circle (xCentre: number, yCentre:number, width : number, height : number){

    const x = xCentre ;
    const y = yCentre ;

    /** demi largeur */
    const hw = width / 2 ;

    /** demi hauteur */
    const hh = height / 2 ;

    return `m ${x - hw} ${y} c 0 0 0 ${ - hh} ${ hw} ${ - hh} c ${ hw} 0 ${ hw} ${ hh} ${ hw} ${ hh} c 0 0 0 ${ hh } ${ - hw} ${ hh } c ${ -hw} 0 ${ -hw} ${ -hh} ${ -hw} ${ -hh} z `
  }

  static doux (xCentre: number, yCentre:number, width : number, height : number){

    const x = xCentre ;
    const y = yCentre ;

    /** demi largeur */
    const hw = width / 2 ;

    /** demi hauteur */
    const hh = height / 2 ;

    return `m ${x - hw} ${y} c 0 0 0 ${ - hh} ${ hw} ${ - hh} c 0 0 0 ${ hh} ${ hw} ${ hh} c 0 0 0 ${ hh } ${ - hw} ${ hh } c 0 0 0 ${ -hh} ${ -hw} ${ -hh} z `
  }
}
