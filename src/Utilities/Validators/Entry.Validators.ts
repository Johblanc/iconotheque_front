
/**
 * Ensemble des validateurs pour l'Entry
 * 
 * * **notNull**        : Le champ ne peut être vide
 * * **isMail**         : Le champ doit être un mail
 * * **minLenght**      : Le champ doit avoir au moins ? charactères
 * * **maxLenght**      : Le champ doit avoir au maximum ? charactères
 * * **samePasswords**  : Les deux champs mot de passe doivent être identique
 * 
 * @version v1
 */
export class EntryValidators {
  
  /** Le champ ne peut être vide */
  static notNull()
  {
    return {
      validator : (value : string ) => value !== "" ,
      message : "Le champ ne peut être vide"
    }
  }

  /** Le champ doit être un mail */
  static isMail()
  {
    return {
      validator : (value : string ) => Boolean(value.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i) ),
      message : "Le champ doit être un mail"
    }
  }

  /** Le champ doit avoir au moins ? charactères */
  static minLenght( minLenght : number)
  {
    return {
      validator : (value : string ) => value.length >= minLenght ,
      message : `Le champ doit avoir au moins ${minLenght} charactère${minLenght > 1 && "s"}`
    }
  }

  /** Le champ doit avoir au maximum ? charactères */
  static maxLenght( maxLenght : number)
  {
    return {
      validator : (value : string ) => value.length <= maxLenght ,
      message : `Le champ doit avoir au maximum ${maxLenght} charactère${maxLenght > 1 && "s"}`
    }
  }

  /** Les deux champs mot de passe doivent être identiques */
  static samePasswords( otherPassword : string)
  {
    return {
      validator : (value : string ) => value === otherPassword ,
      message : `Les deux Mots des passe de sont pas concordants`
    }
  }
}