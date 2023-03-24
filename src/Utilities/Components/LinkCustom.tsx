
import { useContext } from "react";
import { Link } from "react-router-dom";
import { TransitionContext } from "../Contexts/Transition.context";
import { TTransition } from "../Types/TTransition";

/**
 * Ancre permetant le routage retardé le temps de la transition
 * 
 * @param props.name le texte dans l'ancre
 * @param props.to path de routage
 * @param className la class html
 * 
 * @returns une ancre
 * 
 * @version v1
 */
export function LinkCustom(props : {name :string, to : string | TTransition, className? : string }){
  const {name,to,className} = props

  const {setTransition} = useContext(TransitionContext)

  const handleNavigation = (event:React.MouseEvent)=> {

      event.preventDefault();
      if (typeof to === "string")
      { 
        setTransition({ to: to })
      }
      else 
      {
        setTransition(to)
      }
    }
  

  return (
    
    <Link 
    className={`${className}`} to={typeof to === "string" ? to : to.to} onClick={(e)=> handleNavigation(e)}>
    {name}
  </Link>
  )
}