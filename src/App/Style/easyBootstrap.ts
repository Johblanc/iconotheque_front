

export type TBsBreakPoint = "sm" | "md" | "lg" | "xl" | "xxl"

export type TBsFlexJustify = "start" | "end" | "center" | "between" | "around" | "evenly"

export type TBsFlexAlign = "start" | "end" | "center" | "baseline" | "stretch" 

export type TBsFlexWrapAlign = "start" | "end" | "center" | "between" | "around" | "stretch"



export type TBsCardial =
  | "top"
  | "bottom"
  | "start"
  | "end"
  | "horizontal"
  | "vertical"
  | ["top" | "bottom" | "horizontal", "start" | "end" | "vertical"];

export type TBsCardiMini =
  | "t"
  | "b"
  | "s"
  | "e"
  | "x"
  | "y"
  | ["t" | "b" | "y", "s" | "e" | "x"];

export type TBsCardi4 = "top" | "bottom" | "start" | "end";

export type TBs0to5 = 0 | 1 | 2 | 3 | 4 | 5;

export type TBsColor = 
| "primary"
| "secondary"
| "success"
| "danger"
| "warning"
| "info"
| "light"
| "dark"

export type TBsColorAdd = 
| TBsColor
| "black"
| "white"

export type TBsColorBorder = 
| TBsColorAdd
| "primary-subtle"
| "secondary-subtle"
| "success-subtle"
| "danger-subtle"
| "warning-subtle"
| "info-subtle"
| "light-subtle"
| "dark-subtle"

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
| "white-50"

export type TBsColorBackground = 
| TBsColorBorder
| "body-secondary"
| "body-tertiary"
| "body"
| "transparent"

export const BS = {
  FLEX: {
    CONTAINER : {
      flexBehavior : ( 
          inline?:  boolean ,
          breakPoint? : TBsBreakPoint ,
      ) =>
      {
        const addInline = inline ? "-inline" : "" ;
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `d${addBP}${addInline}-flex`
      },
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
      flexJustify : (
        name : TBsFlexJustify,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `justify-content${addBP}-${name}`
      },
      flexAlign : (
        name : TBsFlexAlign,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `align-items${addBP}-${name}`
      },
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
    ITEM : {
      align : (
        name : TBsFlexAlign,
        breakPoint? : TBsBreakPoint 
      ) => 
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `align-self${addBP}-${name}`
      },
      fill : (
        name : "fill" | "grow-1" | "grow-0" | "shrink-1" | "shrink-0" = "fill" ,
        breakPoint? : TBsBreakPoint 
      ) =>
      {
        const addBP = breakPoint ? `-${breakPoint}` : "" ;
        return `flex${addBP}-${name}` ;
      },
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

  background: (
    color: TBsColorBackground,
    gradient : boolean = false
  ) => {
    return `bg-${color}${gradient ? " bg-gradient" : ""}`
  },

  color: (
    color: TBsColorText
  ) => {
    return `text-${color}`
  },

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

};
