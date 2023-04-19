import { TOptions, TOptionKeyBool, TOptionKeyNum, TOptionKey } from "../Types/TOptions";


export class Options {
    withComma       : boolean ;
    withBreak       : boolean ;
    surNumFormat    : boolean ;
    surNumSpace     : boolean ;
    surNumZero      : boolean ;
    convertToLine   : boolean ;
    rounder         : number  ;
    /**
     * Permet l'éventuel forçage du format :
     * * 0 : Pas de Forçage
     * * 1 : En Absolu
     * * 2 : En relatif
     */
    forceFormat     : number  ;

    constructor(options? : Options | Partial<TOptions> )
    {
        this.withComma       = true  ;
        this.withBreak       = true  ;
        this.surNumFormat    = true  ;
        this.surNumSpace     = true  ;
        this.surNumZero      = true  ;
        this.convertToLine   = true  ;
        this.rounder         = 1     ;
        this.forceFormat     = 0     ;

        if (options) this.set(options)
    }

    set(options : Options | Partial<TOptions> )
    {
        if (options)
        {
            if ( options.withComma !== undefined ) 
            {
                this.withComma = options.withComma
            }

            if ( options.withBreak !== undefined ) 
            {
                this.withBreak = options.withBreak
            }

            if ( options.surNumFormat !== undefined ) 
            {
                this.surNumFormat = options.surNumFormat
            }

            if ( options.surNumSpace !== undefined ) 
            {
                this.surNumSpace = options.surNumSpace
            }

            if ( options.surNumZero !== undefined ) 
            {
                this.surNumZero = options.surNumZero
            }

            if ( options.convertToLine !== undefined ) 
            {
                this.convertToLine = options.convertToLine
            }

            if ( options.rounder !== undefined ) 
            {
                this.rounder = options.rounder
            }

            if ( options.forceFormat !== undefined ) 
            {
                this.forceFormat = options.forceFormat
            }
        }
    }

    keyValue(optionName : TOptionKey , value? : boolean | number) : boolean | number
    {
        if ( value !== undefined )
        {
            if ( 
                typeof value === "number" && 
                (
                    optionName === "rounder"        ||
                    optionName === "forceFormat" 
                )
            )
            {
                this[ optionName ] = value ;
            }
            else if ( 
                typeof value === "boolean" && 
                (
                    optionName === "withComma"      ||
                    optionName === "withBreak"      ||
                    optionName === "surNumFormat"   ||
                    optionName === "surNumSpace"    ||
                    optionName === "surNumZero"     ||
                    optionName === "convertToLine"
                )
            )
            {
                this[ optionName ] = value ;
            }
        }
        return this[optionName]
    }
}