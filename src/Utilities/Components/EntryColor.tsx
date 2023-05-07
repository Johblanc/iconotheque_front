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
export function EntryColor(props: {

  /** L'identifiant unique permetant de lier le label et l'input */
  accecibilityId : string ;

  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  defaultValue?: string;

  /** CallBack de réglage de la valeur */
  setValue?: (value?: string) => void;

}): JSX.Element {
  const { accecibilityId, name, defaultValue, setValue } = props;


  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: string) => { 
    setValue && setValue([
      "#",
      ...Array(7 - value.length).map((_) => "0"),
      ...value.split("").filter((_, i) => i !== 0),
    ].join(""));
  };

  return (
    <div className={APP_STYLE.APP.ENTRY.CADRE}>
      <div className={APP_STYLE.APP.ENTRY.BOX}>
        <label htmlFor={accecibilityId} className={APP_STYLE.APP.ENTRY.LABEL}>{name}</label>

        <input
          id={accecibilityId}
          type="color"
          style={{ height: "3em" }}
          className={APP_STYLE.APP.ENTRY.INPUT}
          onChange={(e) => handleVerificator(e.target.value)}
          defaultValue={defaultValue}
        />
      </div>
    </div>
  );
}
