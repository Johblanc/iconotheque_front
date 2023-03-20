import { useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { Transition } from "../../Transition/Pages/Transition";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";


/**
 * Page de visualisation d'un icône
 * 
 * @version v1
 */
export function IconViewPage() : JSX.Element
{
  return (
    <>
      <AppHeader/>
      <AppNav actif={""} />
      <h2>IconViewPage</h2>
  <div>
  <LinkCustom name={"Modifier"} to={"/paths/update"}/>
  </div>
  <div>
  <LinkCustom name={"Publier"} to={"/paths/publics"}/>
  </div>
  <div>
  <LinkCustom name={"Supprimer"} to={"/paths/publics"}/>
  </div>
    </>
    )
}