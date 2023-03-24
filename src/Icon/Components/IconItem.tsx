import { useContext } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
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

  const {path} = props

  const {setTransition} = useContext(TransitionContext)
  
  return (
    <div className={`${APP_STYLE.PATH.SELECT.ITEM} ${path.status === "public" ?  "bg-secondary" : "bg-warning icon-item-bad"}`}>
    <svg
      onClick={()=> setTransition({to : `/paths/view/${path.id}`})}
      width="min(calc((1.375rem + 1.5vw)*1.5),3.75rem)"
      viewBox={props.path.viewbox}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Path : {path.name}</title>
      <path className={`${APP_STYLE.PATH.SELECT.DROWN}`} d={path.d} />
    </svg>
    </div>
  );
}
