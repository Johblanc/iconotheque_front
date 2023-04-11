
import { useContext, useEffect } from "react";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { TransitionMessage } from "../Components/TransitionMessage";
import { TransitionSlide } from "../Components/TransitionSlide";



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
  },[transition,setTransition])

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
    <>
      {transitionElement()}
    </>
  )
}