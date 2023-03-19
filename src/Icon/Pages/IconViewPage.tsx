import { useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { Transition } from "../../Transition/Pages/Transition";


/**
 * Page de visualisation d'un icône
 * 
 * @version v1
 */
export function IconViewPage() : JSX.Element
{
  const [transitionTo,setTransitionTo] = useState("")
  return (
    <>
      <AppHeader/>
      <AppNav actif={""} />
      <h2>IconViewPage</h2>
    </>
    )
}