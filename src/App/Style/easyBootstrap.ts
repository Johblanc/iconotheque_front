
/** 
 * Ensemble des BreakPoint Bootstrap 
 * 
 * @version v1
 * */
export type TBsBreakPoint = "sm" | "md" | "lg" | "xl" | "xxl" ;

/** 
 * Ensemble des justify-content Bootstrap 
 * 
 * @version v1
 * */
export type TBsFlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly" ;

/** 
 * Ensemble des align-item Bootstrap 
 * 
 * @version v1
 * */
export type TBsFlexAlign = "start" | "end" | "center" | "baseline" | "stretch" ;

/** 
 * Ensemble des align-content Bootstrap 
 * 
 * @version v1
 * */
export type TBsFlexWrapAlign = "start" | "end" | "center" | "between" | "around" | "stretch" ;

/** 
 * Ensemble des points cardinaux Bootstrap 
 * 
 * @version v1
 * */
export type TBsCardial =
  | "top"
  | "bottom"
  | "start"
  | "end"
  | "horizontal"
  | "vertical"
  | ["top" | "bottom" | "horizontal", "start" | "end" | "vertical"] ;

  /** 
   * Ensemble des initiales des points cardinaux Bootstrap 
   * 
   * @version v1
   * */
  export type TBsCardiMini =
  | "t"
  | "b"
  | "s"
  | "e"
  | "x"
  | "y"
  | ["t" | "b" | "y", "s" | "e" | "x"] ;

  /** 
   * Ensemble des 4 points cardinaux Bootstrap 
   * 
   * @version v1
   * */
export type TBsCardi4 = "top" | "bottom" | "start" | "end" ;

/** 
 * Ensemble des tailles Bootstrap 
 * 
 * @version v1
 * */
export type TBs0to5 = 0 | 1 | 2 | 3 | 4 | 5 ;

/** 
 * Ensemble des couleurs de base Bootstrap 
 * 
 * @version v1
 * */
export type TBsColor = 
| "primary"
| "secondary"
| "success"
| "danger"
| "warning"
| "info"
| "light"
| "dark" ;

/** 
 * Ensemble des couleurs enrichies Bootstrap 
 * 
 * @version v1
 * */
export type TBsColorAdd = 
| TBsColor
| "black"
| "white" ;

/** 
 * Ensemble des couleurs de bordure Bootstrap 
 * 
 * @version v1
 * */
export type TBsColorBorder = 
| TBsColorAdd
| "primary-subtle"
| "secondary-subtle"
| "success-subtle"
| "danger-subtle"
| "warning-subtle"
| "info-subtle"
| "light-subtle"
| "dark-subtle" ;

/** 
 * Ensemble des couleurs de texte Bootstrap 
 * 
 * @version v1
 * */
export type TBsColorText = 
| TBsColorAdd
| "primary-emphasis"
| "secondary-emphasis"
| "success-emphasis"
| "danger-emphasis"
| "warning-emphasis"
| "info-emphasis"
| "light-emphasis"
| "dark-emphasis"
| "body"
| "body-emphasis"
| "body-secondary"
| "body-tertiary"
| "black-50"
| "white-50" ;

/** 
 * Ensemble des couleurs de background Bootstrap 
 * 
 * @version v1
 * */
export type TBsColorBackground = 
| TBsColorBorder
| "body-secondary"
| "body-tertiary"
| "body"
| "transparent"

/**
 * Facilitateur pour l'utilisation des class Bootstrap
 * 
 * @version v1
 */
export const BS = {
  /** Pour les flex */
  FLEX: {
    /** Pour les flex container */
    CONTAINER : {

      /**
       * La base du d-flex
       * 
       * @param inline ou pas ?
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      flexBehavior : ( 
          inline?:  boolean ,
          breakPoint? : TBsBreakPoint ,
      ) =>
      {
        const addInline = inline ? "-inline" : "" ;
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `d${addBP}${addInline}-flex`
      },

      /**
       * Direction du d-flex
       * 
       * @param name "row" | "colomn" 
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @param reverse ou pas ?
       * @returns les class Bootstrap
       */
      flexDirection : (
        name:  "row" | "colomn"  ,
        breakPoint? : TBsBreakPoint ,
        reverse? : boolean ,
      ) =>
      {
        const addReverse = reverse ? "-reverse" : "" ;
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `flex${addBP}-${name}${addReverse}`
      },

      /**
       * Alignement horizontale du d-flex
       * 
       * @param name "start" | "end" | "center" | "between" | "around" | "evenly"
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      flexJustify : (
        name : TBsFlexJustify,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `justify-content${addBP}-${name}`
      },

      /**
       * Alignement verticale du d-flex
       * 
       * @param name "start" | "end" | "center" | "baseline" | "stretch"
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      flexAlign : (
        name : TBsFlexAlign,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `align-items${addBP}-${name}`
      },

      /**
       * Wrap pour le d-flex
       * 
       * @param noWrap ou wrap ?
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @param align Alignement verticale du wrap du d-flex
       * @param align.name "start" | "end" | "center" | "between" | "around" | "stretch"
       * @param align.breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      flexWrap : (
        noWrap?:  boolean ,
        breakPoint? : TBsBreakPoint ,
        align? : {
          name : TBsFlexWrapAlign ,
          breakPoint? : TBsBreakPoint
        }
      ) =>
      {
        const addWrapBP = breakPoint ? `-${breakPoint}` : "" ;
        let addAlign = ""
        if (align){
          const addAlignBP = align.breakPoint ? `-${align.breakPoint}` : "" ;
          addAlign = ` align-content${addAlignBP}-${align.name}`
        }
        return `flex${addWrapBP}-${noWrap ? "nowrap" : "wrap"}${addAlign}`
      },

      /**
       * Ensembles des methodes du FLEX.CONTAINER compilées
       * 
       * @param options 
       * @param options.behavior La base du d-flex
       * @param options.direction Direction du d-flex
       * @param options.justify Alignement horizontale du d-flex
       * @param options.align Alignement verticale du d-flex
       * @param options.wrap Wrap pour le d-flex
       * @returns les class Bootstrap
       */
      flex : ( 
        options? : {
          behavior? : {
            inline?:  boolean ,
            breakPoint? : TBsBreakPoint ,
          },
          direction? : {
            name:  "row" | "colomn"  ,
            breakPoint? : TBsBreakPoint ,
            reverse? : boolean ,
          },
          justify? : {
            name : TBsFlexJustify,
            breakPoint? : TBsBreakPoint ,
          },
          align? : {
            name : TBsFlexAlign ,
            breakPoint? : TBsBreakPoint //TBsFlexWrapAlign
          },
          wrap? : {
            noWrap?:  boolean ,
            breakPoint? : TBsBreakPoint ,
            align? : {
              name : TBsFlexWrapAlign ,
              breakPoint? : TBsBreakPoint
            }
        }
        
      }
    
      )=>{
        const {behavior,direction,justify,align,wrap} = options || {}

        let result = BS.FLEX.CONTAINER.flexBehavior(behavior?.inline, behavior?.breakPoint) ;
        if (direction) {
          result += " " + BS.FLEX.CONTAINER.flexDirection(direction.name,direction.breakPoint,direction.reverse) ; 
        } ;
        if (justify) {
          result += " " + BS.FLEX.CONTAINER.flexJustify(justify.name,justify.breakPoint) ; 
        } ;
        if (align) {
          result += " " + BS.FLEX.CONTAINER.flexAlign(align.name,align.breakPoint) ; 
        } ;
        if (wrap) {
          result += " " + BS.FLEX.CONTAINER.flexWrap(wrap.noWrap,wrap.breakPoint, wrap.align) ; 
        }
        return result
      },
    },
    
    /** Pour les flex item */
    ITEM : {

      /**
       * Alignement de l'item
       * 
       * @param name "start" | "end" | "center" | "baseline" | "stretch"
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      align : (
        name : TBsFlexAlign,
        breakPoint? : TBsBreakPoint 
      ) => 
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `align-self${addBP}-${name}`
      },

      /**
       * Comportement de remplissage de l'item
       * 
       * @param name "fill" | "grow-1" | "grow-0" | "shrink-1" | "shrink-0"
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      fill : (
        name : "fill" | "grow-1" | "grow-0" | "shrink-1" | "shrink-0" = "fill" ,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `flex${addBP}-${name}` ;
      },

      /**
       * Ordre des items
       * 
       * @param name 0 | 1 | 2 | 3 | 4 | 5 | "first" | "last"
       * @param breakPoint "sm" | "md" | "lg" | "xl" | "xxl"
       * @returns les class Bootstrap
       */
      order : (
        name : TBs0to5 | "first" | "last",
        breakPoint? : TBsBreakPoint 
      ) => 
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `order${addBP}-${name}`
      },

    }
  },

  /**
   * maggin et/ou padding Bootstrap
   * 
   * @param property "m" | "p" | "both"
   * @param size 0 | 1 | 2 | 3 | 4 | 5 | "auto"
   * @param sides "t" | "b" | "s" | "e" | "x" | "y" 
   * @param sides ["t" | "b" | "y", "s" | "e" | "x"]
   * @returns les class Bootstrap
   */
  spacing: (
    property: "m" | "p" | "both",
    size: TBs0to5 | "auto" = "auto",
    sides: "" | TBsCardiMini = ""
  ): string => {
    if (property !== "both") {
      if (typeof sides === "string") {
        return `${property}${sides}-${size}`;
      } else {
        return sides.map((item) => `${property}${item}-${size}`).join(" ");
      }
    } else {
      return `${BS.spacing("m", size, sides)} ${BS.spacing("p", size, sides)}`;
    }
  },

  /**
   * border Bootstrap
   * 
   * @param size 0 | 1 | 2 | 3 | 4 | 5
   * @param sides "start" | "end" | "top" | "bottom" | "horizontal" | "vertical"
   * @param sides ["top" | "bottom" | "horizontal", "start" | "end" | "vertical"]
   * @param color  "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"  | "black" | "white" | "primary-subtle" | "secondary-subtle" | "success-subtle" | "danger-subtle" | "warning-subtle" | "info-subtle" | "light-subtle" | "dark-subtle"
   * @returns les class Bootstrap
   */
  border: (
    size: TBs0to5 | undefined = undefined,
    sides: "" | TBsCardial = "",
    color: TBsColorBorder| undefined = undefined
  ): string => {
    let result = "border";
    let addSize = size === undefined ? "" : `border-${size}`;
    if (sides !== undefined) {
      let sidesArr = [];
      if (typeof sides === "string") {
        sidesArr = [sides];
      } else {
        sidesArr = sides;
      }
      sidesArr = sidesArr
        .map((item) => {
          if (item === "horizontal") {
            return "top,bottom";
          } else if (item === "vertical") {
            return "end,start";
          }
          return item;
        })
        .join(",")
        .split(",");

      if (sidesArr.length < 4) {
        result = sidesArr.map((item) => `border-${item}`).join(" ");
      }
    }
    if (addSize) {
      result += ` ${addSize}`;
    }

    if (color) {
      result += ` border-${color}`;
    }
    return result;
  },

  /**
   * Rounded Bootstrap
   * 
   * @param size 0 | 1 | 2 | 3 | 4 | 5 | "circle" | "pill" 
   * @param side "start" | "end" | "top" | "bottom"
   * @returns les class Bootstrap
   */
  round: (
    size: TBs0to5 | "circle" | "pill" | undefined = undefined,
    side: TBsCardi4 | undefined = undefined
  ) => {
    let result = "rounded";

    if (side) {
      result += `-${side}`;
    }
    if (size !== undefined) {
      result += `-${size}`;
    }
    return result;
  },

  /**
   * Couleur du background
   * 
   * @param color "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "black" | "white" | "primary-subtle" | "secondary-subtle" | "success-subtle" | "danger-subtle" | "warning-subtle" | "info-subtle" | "light-subtle" | "dark-subtle" | "body-secondary" | "body-tertiary" | "body" | "transparent"
   * @param gradient ou pas ?
   * @returns les class Bootstrap
   */
  background: (
    color: TBsColorBackground,
    gradient : boolean = false
  ) => {
    return `bg-${color}${gradient ? " bg-gradient" : ""}`
  },

  /**
   * Couleur du texte
   * 
   * @param color "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "black" | "white" | "primary-emphasis" | "secondary-emphasis" | "success-emphasis" | "danger-emphasis" | "warning-emphasis" | "info-emphasis" | "light-emphasis" | "dark-emphasis" | "body" | "body-emphasis" | "body-secondary" | "body-tertiary" | "black-50" | "white-50" 
   * @returns les class Bootstrap
   */
  color: (
    color: TBsColorText
  ) => {
    return `text-${color}`
  },

  /**
   * Bouton bootstrap
   * 
   * @param background "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link"
   * @param outline "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark"
   * @param size "sm" | "lg"
   * @param state "active" | "disabled"
   * @returns les class Bootstrap
   */
  button: (
    background? : TBsColor | "link", 
    outline?: TBsColor ,
    size? : "sm" | "lg" ,
    state? : "active" | "disabled"

  ) => {

    const addBackGroung = background ? ` btn-${background}` : "" ;
    const addOutline = outline ? ` btn-outline-${outline}` : "" ;
    const addSize = size ? ` btn-${size}` : "" ;
    const addState = state ? ` ${state}` : "" ;

    return `btn${addBackGroung}${addOutline}${addSize}${addState}`
  },

  dropdown : (target : "" | "toggle" | "menu" | "item") => {
    if (target === "") {
      return "dropdown" ;
    }
    else
    {
      return `dropdown-${target}`
    }
  }
};
