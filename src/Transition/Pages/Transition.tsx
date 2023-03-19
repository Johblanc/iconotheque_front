
import { useContext, useEffect } from "react";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { TransitionMessage } from "./TransitionMessage";
import { TransitionSlide } from "./TransitionSlide";



/**
 * Gestion des transitions
 * 
 * @version v1
 */
export function Transition(props:{ children : JSX.Element | JSX.Element[] | null }) : JSX.Element
{

  const { children}  = props

  const { transition , setTransition} = useContext(TransitionContext) 

  const { message , inTransition } = transition ;

  useEffect(()=>{

    if (transition.to !== "" && !transition.inTransition ){
      const newItem = {...transition} ;
      newItem.inTransition = true
      setTransition(newItem)
    }
  },[transition])

  const transitionElement = ()=> {
    if (inTransition){
      if (message === undefined){
        return (
          <TransitionSlide>
            {children}
          </TransitionSlide>
        )
      }
      
      return (
        <TransitionMessage >
        {children}
        </TransitionMessage>
      )
    }
    return <>{children}</>
  }
  return (
    <div>
      {transitionElement()}
    </div>
  )
}