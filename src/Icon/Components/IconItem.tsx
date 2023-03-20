import { useContext } from "react";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { TPath } from "../../Utilities/Types/Path.type";

/**
 * Permet l'affichage d'un path
 * 
 * @param props.path les données sur le path
 * 
 * @version v1
 */
export function IconItem(props: { path: TPath }) {

  const {setTransition} = useContext(TransitionContext)
  return (
    <svg
      onClick={()=> setTransition({to : "/paths/view"})}
      className=""
      width="10mm"
      viewBox={props.path.viewbox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={props.path.d} />
    </svg>
  );
}
