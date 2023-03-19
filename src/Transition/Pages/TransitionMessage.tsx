import { useEffect, useState } from "react"
import { ROUTER_CONFIG } from "../../App/Routes/router"
import { useNavigate } from "react-router-dom";




/**
 * Page de transition avec un message
 * 
 * @version v1
 */
export function TransitionMessage(props:{
  to : string ,
  children : JSX.Element | JSX.Element[] | null ,
  message : string ,
  isBad? : boolean ,
  delay? : number ,
}) : JSX.Element
{

  const { children , to , message, isBad } = props

  const delay  = (props.delay !== undefined ) ? props.delay : 800 ;

  const navigate = useNavigate();

  const [nextOpacity , setNextOpacity] = useState(0)
  const [transitionOpacity , setTransitionOpacity] = useState(0)
  const [nextPage , setNextPage] = useState(<></>)

  useEffect(()=>{
    setNextOpacity(0)
    const nextRoute = ROUTER_CONFIG.filter(item => item.path === to)[0]
    if (nextRoute) {
      setNextPage(nextRoute.element)
      setTimeout(() => setTransitionOpacity(1), 1); 
      setTimeout(() => setNextOpacity(1), delay * 2); 
      setTimeout(() => setTransitionOpacity(0), delay * 2); 
      setTimeout(() => navigate(to), delay * 3); 
    }
    else {
      setNextPage(<></>)
    }
  },[to])


  return (
    <div>
      { to !== "" &&
        <div 
          className="transition"
          style={{opacity : nextOpacity , transition : `opacity ${ delay / 1000 }s`  } }
          >
          {nextPage}
        </div>
      }
      <div 
        className="transition"
        style={{opacity : to !== "" ? 0 : 1 , transition : `opacity ${ delay / 1000 }s`   } }
      >
        {children}
      </div>
      
      { to !== "" &&
        <div 
          className={`transition ${isBad ? "bg-warning" : "bg-success"}`}
          style={{
            opacity : transitionOpacity , 
            transition : `opacity ${ delay / 1000 }s` 
          } }
          >
          {message}
        </div>
      }
    </div>
  )
}