import { useEffect, useState } from "react";

/**
 * Une entrée utilisateur textuelle en plusieurs ligne
 * 
 * @version v1
 */
export function TextArea(props: {
  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  defaultValue?: string;

  /** CallBack de réglage de la valeur */
  setValue?: (value ?: string , valid ? : boolean) => void;

  /** Conditions de validations */
  validators?: { validator: (value: string) => boolean; message?: string }[];

  /** L'entry contient-elle un mot de passe */
  isPass?: boolean;
}): JSX.Element {
  const { name, defaultValue, setValue, validators, isPass } =
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
    
    if (message !== newMessage){
      setValue && setValue(defaultValue || "",newMessage === "");
      setMessage(newMessage);
    }

  }, [validators, defaultValue]);

  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: string) => {
    const newMessage = validate(value);
    setMessage(newMessage);
    setValue && setValue(value,newMessage === "");
  };


  return (
    <div className="">
      <label className="">{name}</label>

      <textarea
        className=""
        onChange={(e) => handleVerificator(e.target.value)}
        defaultValue={defaultValue}
      />
      <p>{message}</p>
    </div>
  );
}