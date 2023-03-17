import { useEffect, useState } from "react";

/**
 * Une entrée utilisateur textuelle en une ligne
 *
 * @param name          Nom de l'entry
 * @param defaultValue  Valeur par défaut
 * @param setValue      CallBack de réglage de la valeur
 * @param validators    Conditions de validations
 * @param setValidity   CallBack de réglage de la validité
 * @param isPass        L'entry contient-elle un mot de passe
 *
 * @version v1
 */
export function EntryString(props: {
  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  defaultValue?: string;

  /** CallBack de réglage de la valeur */
  setValue?: (value: string) => void;

  /** Conditions de validations */
  validators?: { validator: (value: string) => boolean; message?: string }[];

  /** CallBack de réglage de la validité */
  setValidity?: (value: boolean) => void;

  /** L'entry contient-elle un mot de passe */
  isPass?: boolean;
}): JSX.Element {
  const { name, defaultValue, setValue, validators, setValidity, isPass } =
    props;

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
          if (!item.validator(value)) 
            return item.message || "Erreur";
      return "";
    };
    const newMessage = validate(defaultValue || "");
    setMessage(newMessage);
    setValidity && setValidity(newMessage === "");
  }, [validators, defaultValue, setValidity]);

  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: string) => {
    const newMessage = validate(value);
    setMessage(newMessage);
    setValidity && setValidity(newMessage === "");
    setValue && setValue(value);
  };

  return (
    <div className="">
      <label className="">{name}</label>

      <input
        type={isPass ? "password" : "text"}
        className=""
        onChange={(e) => handleVerificator(e.target.value)}
        defaultValue={defaultValue}
      />
      <p>{message}</p>
    </div>
  );
}
