
/**
 * Format des transitions
 * 
 * @version v1
 */
export type TTransition = {
    to : string , 
    message ? : string  ,
    isBad ? : boolean ,
    delay ? : number  ,
    inTransition ? : boolean , 
  }