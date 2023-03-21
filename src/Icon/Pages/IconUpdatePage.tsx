import { AppHeader } from "../../App/Components/AppHeader";
import { EntryString } from "../../Utilities/Components/EntryString";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";

/**
 * Page de mise à jour d'un icône
 *
 * @version v1
 */
export function IconUpdatePage(): JSX.Element {
  return (
    <div>
      <AppHeader />
      {/* 
    <EntryString
      name={"Pseudo"}
      defaultValue={logBody.name}
      setValue={(value, valid) => handleLogBody("name", value, valid)}
      validators={[EntryValidators.minLenght(4)]}
    />
    <EntryString
      name={"Pseudo"}
      defaultValue={logBody.name}
      setValue={(value, valid) => handleLogBody("name", value, valid)}
      validators={[EntryValidators.minLenght(4)]}
    />
     */}
      <div>
        <LinkCustom name={"Enregistrer les modification"} to={"/paths/view"} />
      </div>
      <div>
        <LinkCustom name={"Annuler les modification"} to={"/paths/publics"} />
      </div>
    </div>
  );
}
