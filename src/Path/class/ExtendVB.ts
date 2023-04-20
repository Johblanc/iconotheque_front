


/**
 * Référencement de toutes les coordonnées pour créer une viewbox étendue
 * 
 * @version v2
 */
export class ExtendVB {

  x         : number ;
  y         : number ;
  width     : number ;
  height    : number ;

  actif : "" | "x" | "y" | "width" | "height" | undefined


  constructor(viewbox : string , actif? :"" | "x" | "y" | "width" | "height" )
  {
    const [vbX, vbY, vbWidth, vbHeight] = viewbox.split(" ") ;
    this.x        = Number(vbX) ;
    this.y        = Number(vbY) ;
    this.width    = Number(vbWidth) ;
    this.height   = Number(vbHeight) ;
    this.actif    = actif ;

  }
  

  /**
   * Dimention de référence de la viewbox
   * 
   * @version v2
   */
  get sizeRef (){ 
    return Math.max(this.width, this.height) 
  } ;

  /**
   * Coordonnées x de la viewbox étendu
   * 
   * @version v2
   */
  get exX (){ 
    return  (this.actif !== "" ? Math.min(this.x, 0) : this.x) - this.sizeRef * 0.1 
  } ;


  /**
   * Coordonnées y de la viewbox étendu
   * 
   * @version v2
   */
  get exY (){ 
    return (this.actif !== "" ? Math.min(this.y, 0) : this.y) - this.sizeRef * 0.1 
  } ;


  /**
   * Coordonnées width de la viewbox étendu
   * 
   * @version v2
   */
  get exWidth (){
    return (this.actif !== "" ? Math.max(this.width, this.width + this.x, - this.x) : this.width) + this.sizeRef * 0.2 
  } ;


  /**
   * Coordonnées height de la viewbox étendu
   * 
   * @version v2
   */
  get exHeight (){ 
    return (this.actif !== "" ? Math.max(this.height, this.height + this.y, - this.y) : this.height) + this.sizeRef * 0.2
  } ;


  /**
   * Réglage de la valeur de la viewbox
   * 
   * @version v2
   */
  set value (value : string)
  {
    const [vbX, vbY, vbWidth, vbHeight] = value.split(" ") ;
    this.x        = Number(vbX) ;
    this.y        = Number(vbY) ;
    this.width    = Number(vbWidth) ;
    this.height   = Number(vbHeight) ;
  } ;


  /**
   * Valeur de la viewbox
   * 
   * @version v2
   */
  get value (){ 
    return `${this.x} ${this.y} ${this.width} ${this.height}`
  } ;


  /**
   * Valeur de la viewbox étendue
   * 
   * @version v2
   */
  get exValue (){ 
    return `${this.exX} ${this.exY} ${this.exWidth} ${this.exHeight}`
  } ;


  /**
   * Convertion des coordonnées écran en coordonnées viewbox
   * 
   * @version v2
   */
  convertToVbCoords(
    mouseCoords : {x : number , y : number},
    viewBoxCoords : {x : number , y : number , width : number , height : number}
  ){

    let realWidth = viewBoxCoords.width;
    let marginX = 0;

    const quantumX = viewBoxCoords.width / this.exWidth;
    const quantumY = viewBoxCoords.height / this.exHeight;

    if (quantumX > quantumY) {
      realWidth = quantumY * this.exHeight;
      marginX = (viewBoxCoords.width - viewBoxCoords.height) / 2 / quantumY;
    }
    return {
      x : -marginX + this.exX + (this.exWidth * (mouseCoords.x - viewBoxCoords.x)) / realWidth,
      y : this.exY + (this.exHeight * (mouseCoords.y - viewBoxCoords.y)) / viewBoxCoords.height
    }

  }
}