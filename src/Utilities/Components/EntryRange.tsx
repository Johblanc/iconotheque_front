
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
export function EntryRange(props: {
  /** L'identifiant unique permetant de lier le label et l'input */
  accecibilityId: string;

  /** Valeur minimale */
  min: number;

  /** Valeur maximale */
  max: number;

  /** Ecart entre deux valeurs */
  step: number;

  /** Nom de l'entry */
  name?: string;

  /** Valeur par défaut */
  value?: number;

  /** CallBack de réglage de la valeur */
  setValue?: (value?: number, valid?: boolean) => void;

  /** Les Class HTML */
  className?: string;
}): JSX.Element {
  const { accecibilityId, name, value, setValue, min, max, step, className } =
    props;

  /**
   * Losrque l'utilisateur change la valeur de l'Entry
   *
   * @param value la nouvelle valeur
   */
  const handleVerificator = (value: number) => {
    setValue && setValue(value);
  };

  return (
    <div className={`${APP_STYLE.APP.ENTRY.CADRE} ${className}`}>
      <div className={APP_STYLE.APP.ENTRY.BOX}>
        <label
          htmlFor={accecibilityId}
          className={`${APP_STYLE.APP.ENTRY.LABEL}`}
        >
          {name}
        </label>

        <input
          id={accecibilityId}
          type="range"
          className={APP_STYLE.APP.ENTRY.INPUT}
          onChange={(e) => handleVerificator(Number(e.target.value))}
          value={value}
          min={min}
          max={max}
          step={step}
        />
      </div>
    </div>
  );
}
