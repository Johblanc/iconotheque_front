

/** 
 * Noms des points en coordonnées Absolues 
 * 
 * @version v2
 * */
export type TFormatAbs = string & ( "M" | "L" | "H" | "V" | "C" | "S" | "Q" | "T" | "A" | "Z" ) ;

/** 
 * Noms des points en coordonnées Relatives 
 * 
 * @version v2
 * */
export type TFormatRel = string & ( "m" | "l" | "h" | "v" | "c" | "s" | "q" | "t" | "a" | "z" ) ;

/** 
 * Noms des points en coordonnées Relatives 
 * - M, m, L, l, H, h, V, v, C, c, S, s, Q, q, T, t, A, a, Z, z
 * 
 * @version v2
 * */
export type TFormat = TFormatAbs | TFormatRel ;

/** 
 * Relatif ou Absolu 
 * - "rel" , "abs"
 * 
 * @version v2
 * */
export type TFormatB = "rel" | "abs" ;
