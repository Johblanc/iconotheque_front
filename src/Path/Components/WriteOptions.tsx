import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntriesCheck } from "../../Utilities/Components/EntryCheck";
import { TWriteOptions } from "../Types/TWriteOptions";

export function WriteOptions(props: {
  wOptions: TWriteOptions;
  setWOptions: (value: TWriteOptions) => void;
}) {
  const { wOptions, setWOptions } = props;

  const toggleOption = (
    key:
      | "withComma"
      | "withBreak"
      | "surNumFormat"
      | "surNumSpace"
      | "surNumZero"
      | "toRelative"
      | "notReduce",
    value : boolean
  ) => {
    const newOptions = { ...wOptions };
    newOptions[key] = value;
    setWOptions(newOptions);
  };

  return (
    <div className={APP_STYLE.PATH.GRAPH.BASE.SMALLBOX}>
      <h4>Options d'écriture</h4>
      <EntriesCheck
        name="Ajouter un retour à la ligne après chaque point"
        accecibilityId="path-write-options-with-comma"
        defaultValue={wOptions.withComma}
        setValue={(value) => toggleOption("withComma", value)}
      />
      <EntriesCheck
        name="Ajouter un retour à la ligne après chaque point"
        accecibilityId="path-write-options-with-break"
        defaultValue={wOptions.withBreak}
        setValue={(value) => toggleOption("withBreak", value)}
      />
      <EntriesCheck
        name="Conserver les formats de point excedentaires"
        accecibilityId="path-write-options-sur-num-format"
        defaultValue={wOptions.surNumFormat}
        setValue={(value) => toggleOption("surNumFormat", value)}
      />
      <EntriesCheck
        name="Conserver les espaces excedentaires"
        accecibilityId="path-write-options-sur-num-space"
        defaultValue={wOptions.surNumSpace}
        setValue={(value) => toggleOption("surNumSpace", value)}
      />
      <EntriesCheck
        name="Conserver les zeros excedentaires"
        accecibilityId="path-write-options-sur-num-zero"
        defaultValue={wOptions.surNumZero}
        setValue={(value) => toggleOption("surNumZero", value)}
      />
      <EntriesCheck
        name="Passer en coordonnées relatives"
        accecibilityId="path-write-options-to-relative"
        defaultValue={wOptions.toRelative}
        setValue={(value) => toggleOption("toRelative", value)}
      />
      <EntriesCheck
        name="Conserver les points curviligne"
        accecibilityId="path-write-options-not-reduce"
        defaultValue={wOptions.notReduce}
        setValue={(value) => toggleOption("notReduce", value)}
      />
    </div>
  );
}
