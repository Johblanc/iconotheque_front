import { useEffect, useState } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";

/**
 * Une entrée utilisateur textuelle en une ligne
 *
 * @param name          Nom de l'entry
 * @param defaultValue  Valeur par défaut
 * @param setValue      CallBack de réglage de la valeur
 * @param min           Valeur minimale
 * @param max           Valeur maximale
 * @param step          Ecart entre deux valeurs
 * @param validators    Conditions de validations
 *
 * @version v1
 */
export function EntryNumber(props: {
  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  value?: number;

  /** CallBack de réglage de la valeur */
  setValue?: (value?: number, valid?: boolean) => void;

  /** Les Class HTML */
  className? : string ;

  /** Valeur minimale */
  min?: number;

  /** Valeur maximale */
  max?: number;

  /** Ecart entre deux valeurs */
  step?: number;

  /** Conditions de validations */
  validators?: { validator: (value: number) => boolean; message?: string }[];

  /** Conditions de desactivation */
  disabled? : boolean

}): JSX.Element {
  const { name, value, setValue, validators,min,max,step,disabled,className } = props;

  /**
   * Contrôle de l'Entry avec les validateurs
   *
   * @param value la valeur en cours
   * @returns un string vide si OK, sinon un message d'erreur
   */
  const validate = (value: number) => {
    if (validators)
      for (const item of validators)
        if (!item.validator(value)) return item.message || "Erreur";

    return "";
  };

  /** Gestion du message d'erreur */
  const [message, setMessage] = useState(validate(value || 0));

  /** Permet le refresh du composant lorsque les validateurs changent (pour samePassword par exemple)*/
  useEffect(() => {
    const validate = (value: number) => {
      if (validators)
        for (const item of validators)
          if (!item.validator(value)) return item.message || "Erreur";
      return "";
    };
    const newMessage = validate(value || 0);

    if (message !== newMessage) {
      setValue && setValue(value || 0, newMessage === "");
      setMessage(newMessage);
    }
  }, [validators, value,message,setValue]);

  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: number) => { 
    const newMessage = validate(value);
    setMessage(newMessage);
    setValue && setValue(value, newMessage === "");
  };

  return (
    <div className={`${APP_STYLE.APP.ENTRY.CADRE} ${className}`}>
      <div className={APP_STYLE.APP.ENTRY.BOX}>
        <label className={`${APP_STYLE.APP.ENTRY.LABEL} ${disabled ? "visual-disabled" : "" }`} >{name}</label>

        <input
          type="number"
          className={APP_STYLE.APP.ENTRY.INPUT}
          onChange={(e) => handleVerificator(Number(e.target.value))}
          value={value}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
        />
      </div>
      <em className={APP_STYLE.APP.MESSAGE_BAD}>{message}</em>
    </div>
  );
}
