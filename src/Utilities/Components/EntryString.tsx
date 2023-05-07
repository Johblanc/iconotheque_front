import { useEffect, useState } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";

/**
 * Une entrée utilisateur textuelle en une ligne
 *
 * @param name          Nom de l'entry
 * @param defaultValue  Valeur par défaut
 * @param setValue      CallBack de réglage de la valeur
 * @param validators    Conditions de validations
 * @param isPass        L'entry contient-elle un mot de passe
 *
 * @version v1
 */
export function EntryString(props: {

  /** L'identifiant unique permetant de lier le label et l'input */
  accecibilityId : string ;

  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  defaultValue?: string;

  /** CallBack de réglage de la valeur */
  setValue?: (value?: string, valid?: boolean) => void;

  /** Conditions de validations */
  validators?: { validator: (value: string) => boolean; message?: string }[];

  /** L'entry contient-elle un mot de passe */
  isPass?: boolean;
}): JSX.Element {
  const { accecibilityId, name, defaultValue, setValue, validators, isPass } = props;

  /**
   * Contrôle de l'Entry avec les validateurs
   *
   * @param value la valeur en cours
   * @returns un string vide si OK, sinon un message d'erreur
   */
  const validate = (value: string) => {
    if (validators)
      for (const item of validators)
        if (!item.validator(value)) return item.message || "Erreur";

    return "";
  };

  /** Gestion du message d'erreur */
  const [message, setMessage] = useState(validate(defaultValue || ""));

  /** Permet le refresh du composant lorsque les validateurs changent (pour samePassword par exemple)*/
  useEffect(() => {
    const validate = (value: string) => {
      if (validators)
        for (const item of validators)
          if (!item.validator(value)) return item.message || "Erreur";
      return "";
    };
    const newMessage = validate(defaultValue || "");

    if (message !== newMessage) {
      setValue && setValue(defaultValue || "", newMessage === "");
      setMessage(newMessage);
    }
  }, [validators, defaultValue,message,setValue]);

  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: string) => { 
    const newMessage = validate(value);
    setMessage(newMessage);
    setValue && setValue(value, newMessage === "");
  };

  return (
    <div className={APP_STYLE.APP.ENTRY.CADRE}>
      <div className={APP_STYLE.APP.ENTRY.BOX}>
        <label htmlFor={accecibilityId} className={APP_STYLE.APP.ENTRY.LABEL}>{name}</label>

        <input
          id={accecibilityId}
          type={isPass ? "password" : "text"}
          className={APP_STYLE.APP.ENTRY.INPUT}
          onChange={(e) => handleVerificator(e.target.value)}
          defaultValue={defaultValue}
        />
      </div>
      <em className={APP_STYLE.APP.MESSAGE_BAD}>{message}</em>
    </div>
  );
}
