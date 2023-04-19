import { TOptions, TOptionKeyBool, TOptionKeyNum, TOptionKey } from "../Types/TOptions";


export class OptionsServices {
  
    static booleankeys() : TOptionKeyBool[]
    {
        return [ "withComma" , "withBreak" , "surNumFormat" , "surNumSpace" , "surNumZero" ]
    }

    static numberkeys() : TOptionKeyNum[]
    {
        return [ "rounder" , "forceFormat" ]
    }

    static keys() : TOptionKey[]
    {
        return [ ...OptionsServices.booleankeys() , ...OptionsServices.numberkeys() ]
    }

}