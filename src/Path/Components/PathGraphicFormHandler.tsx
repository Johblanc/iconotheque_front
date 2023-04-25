import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntryNumber } from "../../Utilities/Components/EntryNumber";
import { GraphiFormOptions } from "../class/GraphiFormOptions";


/**
 * Permet la modification de Options de la forme
 * 
 * @param props.formOptions La valeur des Options de la forme
 * @param props.setFormOptions Réglage des options de la forme
 * 
 * @version v2
 */
export function PathGraphicFormHandler(props: {
  formOptions: GraphiFormOptions;
  setFormOptions: (value: GraphiFormOptions) => void;
}) {
  const { formOptions, setFormOptions } = props;

  /** Modification d'une option */
  const handleFormOptions = (
    key: "rounder" | "translateX" | "translateY",
    value: number
  ) => {

    const newOptions = formOptions.copy;
    newOptions[key] = value;
    setFormOptions(newOptions);
  };

  return (
    <div className={APP_STYLE.APP.XXXLFLEX}>
      <div>
        <h6>Arrondi</h6>
        <div className={APP_STYLE.APP.ENTRY.DOUBLE.BOX}>
          <EntryNumber
            name={"valeur"}
            value={formOptions.rounder}
            setValue={(value) => handleFormOptions("rounder", value!)}
            min={0}
            step={0.1}
            className={APP_STYLE.APP.ENTRY.DOUBLE.RIGHT}
          />
        </div>
      </div>
      <div>
        <h6>Translation</h6>
        <div className={APP_STYLE.APP.ENTRY.DOUBLE.BOX}>
          <EntryNumber
            name={"x"}
            value={formOptions.translateX}
            setValue={(value) => handleFormOptions("translateX", value!)}
            step={formOptions.rounder}
            className={APP_STYLE.APP.ENTRY.DOUBLE.LEFT}
          />
          <EntryNumber
            name={"y"}
            value={formOptions.translateY}
            setValue={(value) => handleFormOptions("translateY", value!)}
            step={formOptions.rounder}
            className={APP_STYLE.APP.ENTRY.DOUBLE.RIGHT}
          />
        </div>
      </div>
    </div>
  );
}
