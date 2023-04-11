import { useContext, useEffect, useState } from "react"
import { PAGES_CONFIG } from "../../App/Routes/router"
import { useNavigate } from "react-router-dom";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";



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

      let altElem : JSX.Element | undefined = undefined ;
      const nextRoute = PAGES_CONFIG.filter(item => {
        const [path , ...params] = item.path.split("/:")
        if (params.length > 0) {
          const splitedTo = to
          .split('/')

          const newTo = splitedTo
          .filter((_,i,arr)=> i < arr.length - params.length)
          .join('/') ;
          if (path === newTo && item.loader) {
            
            altElem = item.loader({params : {id : splitedTo[splitedTo.length-1]}}) as JSX.Element
          }
          return path === newTo
        }
        
        return path === to
      })[0]
      
      if (nextRoute) {
        if (altElem){
          setNextPage(altElem)
        }
        else {
          setNextPage(nextRoute.element)
        }
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
  },[transition,delay,inTransition,navigate,setTransition,to])



  return (
    <div>
      <div 
        className={APP_STYLE.TRANSITION.PAGE}
        style={{opacity : nextOpacity , transition : `opacity ${ delay / 1000 }s`  } }
        >
        {nextPage}
      </div>
      <div 
        className={APP_STYLE.TRANSITION.PAGE}
        style={{opacity : 1 - nextOpacity , transition : `opacity ${ delay / 1000 }s`  } }
      >
        {children}
      </div>
    </div>
  )
}