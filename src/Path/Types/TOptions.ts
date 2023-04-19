
/**
 * Options d'écriture du path
 * 
 * @version v2
 */
export type TOptions = {
    withComma       : boolean ,
    withBreak       : boolean ,
    surNumFormat    : boolean ,
    surNumSpace     : boolean ,
    surNumZero      : boolean ,
    convertToLine   : boolean ,
    rounder         : number  ,
    forceFormat     : number  
}

/**
 * Les Options au format booléen
 * 
 * @version v2
 */
export type TOptionKeyBool = "withComma" | "withBreak" | "surNumFormat" | "surNumSpace" | "surNumZero" | "convertToLine" ;

/**
 * Les Options au format numérique
 * 
 * @version v2
 */
export type TOptionKeyNum = "rounder" | "forceFormat";

/**
 * Ensemble des Options
 * 
 * @version v2
 */
export type TOptionKey = TOptionKeyBool | TOptionKeyNum ;



