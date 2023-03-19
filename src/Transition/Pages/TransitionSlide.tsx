import { useContext, useEffect, useState } from "react"
import { PAGES_CONFIG } from "../../App/Routes/router"
import { useNavigate } from "react-router-dom";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";



/**
 * Page de transition standard
 * 
 * @version v1
 */
export function TransitionSlide(props:{
  children : JSX.Element | JSX.Element[] | null 
}) : JSX.Element
{

  const { children } = props

  const { setTransition, transition } = useContext(TransitionContext) 
  const { to , inTransition } = transition
  const delay  = (transition.delay !== undefined ) ? transition.delay : 800 ;

  const navigate = useNavigate();

  const [nextOpacity , setNextOpacity] = useState(0)
  const [nextPage , setNextPage] = useState(<></>)


  useEffect(()=>{
    
    if(to !== "" && inTransition){
      setNextOpacity(0)
      const nextRoute = PAGES_CONFIG.filter(item => item.path === to)[0]
      if (nextRoute) {
        setNextPage(nextRoute.element)
        setTimeout(() =>   setNextOpacity(1), 1); 
        setTimeout(() => {
          navigate(to);
          setNextOpacity(0)
          setTransition({to : ""})
        }, delay); 
      }
      else {
        setNextPage(<></>)
      } 
      setTransition({to : "", inTransition: true})
    }
  },[transition])



  return (
    <div>
      <div 
        className="transition"
        style={{opacity : nextOpacity , transition : `opacity ${ delay / 1000 }s`  } }
        >
        {nextPage}
      </div>
      <div 
        className="transition"
        style={{opacity : 1 - nextOpacity , transition : `opacity ${ delay / 1000 }s`  } }
      >
        {children}
      </div>
    </div>
  )
}