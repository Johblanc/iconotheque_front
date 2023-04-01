import { BS, TBsColor } from "./easyBootstrap";

/** Mes Class perso pour CSS */
export const PERSO = {
  ALT_FONT : "alt-font",
  S_100: `s-100`,
  S_90: `s-90`,
  W_LIMIT_SM: `width-limited-sm`,
  W_LIMIT_MD: `width-limited-md`,
  H_MIN: `h-min`,
  COLO: `colo-auto`,

  NAV_SHAD : "nav-shad",
  IN_SHAD_P: `inner-shad-pos`,
  IN_SHAD_N: `inner-shad-neg`,

  BTN_BAD : "btn-bad",
  BTN_BIG : "btn-big",

  FILL : (color : TBsColor) => `fill-${color}`,
  TRANSITION : `transition`,

  ICON_LARGE : "icon-large" ,
  ICON_LARGE_BAD : "icon-large-bad" ,
  ICON_ITEM : "icon-item" ,
  ICON_ITEM_BAD : "icon-item-bad" ,
};

/** Combina */
export const BS_COMBO = {
  BTN_LARGE: `${BS.button()} w-100`,
  
  NAV_CADRE: `navbar navbar-expand-md container-fluid`,
  NAV_TITLE: `navbar-brand`, // titre
  NAV_BUTTON: `navbar-toggler`, // Icon
  NAV_ICON: `navbar-toggler-icon`, // Icon-dessin
  NAV_BOX_A: `collapse navbar-collapse`, // 
  NAV_BOX_B: `navbar-nav`,

  INNER_SHAD_POS: `${BS.spacing( "both", 3 )} ${BS.round( 4 )} ${BS.background( "primary" )} ${PERSO.IN_SHAD_P}`,
  INNER_SHAD_NEG: `${BS.spacing( "both", 3 )} ${BS.round( 4 )} ${BS.background( "secondary" )} ${PERSO.IN_SHAD_N}`,
};
export const APP_STYLE = {
  APP: {
    PAGE: PERSO.S_100,
    MESSAGE_BAD: BS.color('danger') ,
    BTN_LARGE: `${BS_COMBO.BTN_LARGE}`,
    BTN_GOOD: `${BS_COMBO.BTN_LARGE} ${BS.spacing("both", 2, "y")}`,
    BTN_BAD: `${BS_COMBO.BTN_LARGE} ${BS.spacing("both", 2, "y")} ${PERSO.BTN_BAD}`,
    ENTRY: {
      CADRE: BS.spacing("both", 2, "y"),
      BOX: `input-group ${BS.round()}`,
      TA_BOX: `${BS.round()}`,
      LABEL: `w-100 ${BS.spacing( "p", 2 )} ${BS.background( "secondary" )} ${BS.color( "dark" )} ${PERSO.IN_SHAD_P} ${BS.round(1,"top")}`,
      INPUT: `w-100 ${BS.spacing( "p", 2 )} ${BS.background( "light" )} ${BS.color( "dark" )} ${BS.round(1,"bottom")} ${PERSO.ALT_FONT}`,
      TA: `w-100 ${BS.spacing( "p", 2 )}  ${BS.background( "light" )} ${BS.color( "dark" )} ${BS.round(1,"bottom")} ${PERSO.H_MIN} ${PERSO.ALT_FONT}`,
    },
    NAV: {
      CADRE: `${BS_COMBO.NAV_CADRE} ${BS.background( "secondary" )} ${PERSO.NAV_SHAD}`,
      TITLE: `${BS_COMBO.NAV_TITLE} ${BS.spacing("both", 2)} ${BS.color( "dark" )}`,
      BUTTON: `${BS_COMBO.NAV_BUTTON}`,
      ICON: `${BS_COMBO.NAV_ICON}`,
      BOX_A: `${BS_COMBO.NAV_BOX_A}`,
      BOX_B: `${BS_COMBO.NAV_BOX_B}`,
      ITEM: `${BS.spacing("both", 2)} ${BS.button()}`,
    },
  },
  USER: {
    LOGIN: {
      CADRE_A: `${BS.FLEX.CONTAINER.flex({justify : {name : "evenly"}, align :{name : "center"},wrap : {}})} ${PERSO.S_90}`,
      CADRE_B: `${BS.FLEX.CONTAINER.flex({justify : {name : "evenly"}, align :{name : "center"},wrap : {}})} ${BS_COMBO.INNER_SHAD_NEG}`,
      BOX: `${PERSO.W_LIMIT_MD} ${BS_COMBO.INNER_SHAD_POS}`,
      SUBMIT: `${BS.button("dark")} w-100`,
      TITLE : BS.spacing("both" , 2),
      LINK_BOX : `${BS.FLEX.CONTAINER.flex()} ${BS.spacing("m", 3)}` ,
      LINK : BS.button() ,
      NAME : BS.spacing("both" , 1),

    },
    VIEW: {
      CADRE: BS.FLEX.CONTAINER.flexBehavior( true , "sm" ) ,
      COLO: `${PERSO.W_LIMIT_SM}`,
      BOX: `${BS_COMBO.INNER_SHAD_NEG}`,
      BOX_SELECT: BS.FLEX.CONTAINER.flex({wrap : {}}),
      BOX_BUTTON: `${BS.spacing("both", 2)} ${BS_COMBO.BTN_LARGE}`,
      BOX_BUTTON_BAD: `${BS.spacing("both", 2)} ${BS_COMBO.BTN_LARGE} ${PERSO.BTN_BAD}`,
    },
  },
  PATH: {
    SELECT: {
      CADRE: `${BS_COMBO.INNER_SHAD_NEG}`,
      TITLE: BS.spacing("both", 2),
      BOX: BS.FLEX.CONTAINER.flex({wrap : {}}),
      ITEM: `${PERSO.ICON_ITEM} ${BS.spacing("p", 3)} ${BS.spacing("m", 2)} ${BS.round("pill")}`,
      DROWN: PERSO.FILL("dark"),
    },
    VIEW: {
      CADRE: BS.FLEX.CONTAINER.flexBehavior( true , "md" ),
      COLO: `${PERSO.W_LIMIT_SM}`,
      BOX_A: `${BS_COMBO.INNER_SHAD_NEG}`,
      BOX_B: `${BS_COMBO.INNER_SHAD_NEG} ${PERSO.COLO}`,
      NO_CADRE: BS.spacing("both", 2),
      ICON_CENTER: BS.FLEX.CONTAINER.flex({align :{name : "center"}, wrap : {}}),
      ICON_BG: `${BS.round("pill")} ${BS.spacing("p", 5)} ${BS.spacing("m", 2)}`,
      P: `${BS.spacing("both", 2)} ${BS.round()} ${BS.background( "primary" )} ${PERSO.ALT_FONT}`,
      DROWN: PERSO.FILL("dark"),
    }
  },
  TRANSITION : {
    PAGE : PERSO.TRANSITION ,
    CADRE : `${PERSO.TRANSITION} ${BS.FLEX.CONTAINER.flex({wrap : {} , align : {name : "center"} , justify : {name : "evenly"}})}`,
    MESSAGE : {
      PAGE : `${PERSO.S_100} ${BS.FLEX.CONTAINER.flex({wrap:{},align : {name : "center"}, justify : {name : "center"}})} ${BS.background("warning")}` ,
      CADRE : `w-100 ${BS.FLEX.CONTAINER.flex({direction:{name:"colomn"},align : {name : "center"}, justify : {name : "center"}})} ${BS.FLEX.CONTAINER.flexDirection("row", "md")}` ,
      BTN_GOOD : `${BS.button()} ${PERSO.BTN_BIG} ${BS.spacing("m" , 5)} ${BS.spacing("p" , 3)} ${BS.round( 5 )} ${BS.border( 2 , "" , "info" )}`,
      BTN_BAD : `${BS.button()} ${PERSO.BTN_BIG} ${PERSO.BTN_BAD} ${BS.spacing("m" , 5)} ${BS.spacing("p" , 3)} ${BS.round( 5 )} ${BS.border( 2 , "" , "warning" )}`,
      PATH : PERSO.FILL("dark")
    },
  },
  ERROR_PAGE : {
    PAGE : `${PERSO.S_100} ${BS.FLEX.CONTAINER.flex({align : {name : "center"}, justify : {name : "center"}})} ${BS.background("warning")}`
  }
};
