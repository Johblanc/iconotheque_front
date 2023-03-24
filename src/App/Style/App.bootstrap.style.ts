export enum BS_COMBO {
  FLEX_WRAP = "d-flex flex-wrap",
  FLEX_CENTER = "d-flex flex-wrap align-items-center justify-content-evenly",
  FLEX_CENTER_H = "d-flex justify-content-center",
  S_100 = "s-100",
  S_90 = "s-90",
  W_LIMIT_SM = "width-limited-sm",
  W_LIMIT_MD = "width-limited-md",
  MP = "m-2 p-2",
  MPV = "mt-2 mb-2 pt-2 pb-2",
  ROUNDED = "rounded-4",
  BTN_LARGE = "btn w-100",
  MESSAGE_BAD = "text-danger",
  NAV_CADRE = "navbar navbar-expand-md container-fluid",
  NAV_TITLE = "navbar-brand",
  NAV_BUTTON = "navbar-toggler",
  NAV_ICON = "navbar-toggler-icon",
  NAV_BOX_A = "collapse navbar-collapse",
  NAV_BOX_B = "navbar-nav",
  NAV_ITEM = "nav-link",
  BORDER = "border border-2 border-info",
  INNER_SHAD_POS = "m-3 p-3 rounded-4 bg-primary border border-2 border-info inner-shad-pos",
  INNER_SHAD_NEG = "m-3 p-3 rounded-4 bg-secondary inner-shad-neg"
}
export const APP_STYLE = {
  APP: {
    PAGE: BS_COMBO.S_100,
    MESSAGE_BAD: BS_COMBO.MESSAGE_BAD,
    BTN_LARGE: `${BS_COMBO.BTN_LARGE} ${BS_COMBO.BORDER}`,
    BTN_GOOD: `${BS_COMBO.BTN_LARGE} ${BS_COMBO.BORDER} ${BS_COMBO.MPV}`,
    BTN_BAD: `${BS_COMBO.BTN_LARGE} ${BS_COMBO.BORDER} ${BS_COMBO.MPV} btn-bad`,
    ENTRY: {
      CADRE: BS_COMBO.MPV,
      BOX: `input-group rounded ${BS_COMBO.BORDER}`,
      TA_BOX: `rounded ${BS_COMBO.BORDER}`,
      LABEL: "input-group-text bg-secondary text-dark inner-shad-pos",
      INPUT: "form-control bg-light text-dark",
      TA : "form-control bg-light text-dark h-min"
    },
    NAV: {
      CADRE:  `${BS_COMBO.NAV_CADRE} bg-secondary nav-shad`,
      TITLE:  `${BS_COMBO.NAV_TITLE} ${BS_COMBO.MP} text-dark`,
      BUTTON: `${BS_COMBO.NAV_BUTTON}`,
      ICON:   `${BS_COMBO.NAV_ICON}`,
      BOX_A:  `${BS_COMBO.NAV_BOX_A}`,
      BOX_B:  `${BS_COMBO.NAV_BOX_B}`,
      ITEM:   `${BS_COMBO.NAV_ITEM} ${BS_COMBO.BORDER} ${BS_COMBO.MP} btn`,
    },
  },
  USER: {
    LOGIN: {
      CADRE_A: `${BS_COMBO.FLEX_CENTER} ${BS_COMBO.S_90}`,
      CADRE_B: `${BS_COMBO.FLEX_CENTER} ${BS_COMBO.INNER_SHAD_NEG}`,
      BOX:     `${BS_COMBO.W_LIMIT_MD} ${BS_COMBO.INNER_SHAD_POS}`,
    },
    VIEW : {
      CADRE: `d-sm-inline-flex`,
      COLO : `${BS_COMBO.W_LIMIT_SM}`,
      BOX:   `${BS_COMBO.INNER_SHAD_NEG}`,
      BOX_SELECT:   `${BS_COMBO.FLEX_WRAP}`,
      BOX_BUTTON:   `${BS_COMBO.BORDER} ${BS_COMBO.MP} ${BS_COMBO.BTN_LARGE}`,
      BOX_BUTTON_BAD:   `${BS_COMBO.BORDER} ${BS_COMBO.MP} ${BS_COMBO.BTN_LARGE} btn-bad`,
    }
  },
  PATH: {
    SELECT : {
      CADRE: `${BS_COMBO.INNER_SHAD_NEG}`,
      TITLE: `${BS_COMBO.MP}`,
      BOX:   `${BS_COMBO.FLEX_WRAP}`,
      ITEM:  `${BS_COMBO.BORDER} icon-item m-2 p-3 rounded-circle`,
      DROWN: `fill-dark`
    },
    VIEW : {
      CADRE: `d-md-inline-flex`,
      COLO : `${BS_COMBO.W_LIMIT_SM}`,
      BOX_A:   `${BS_COMBO.INNER_SHAD_NEG}`,
      BOX_B:   `${BS_COMBO.INNER_SHAD_NEG} colo-auto`,
      NO_CADRE: `${BS_COMBO.MP}`,
      ICON_CENTER : `${BS_COMBO.FLEX_CENTER_H}`,
      ICON_BG : `${BS_COMBO.BORDER} rounded-circle p-5 m-2`,
      P :  `${BS_COMBO.MP} rounded bg-primary`,
      DROWN: `fill-dark`
    }
  }
};
