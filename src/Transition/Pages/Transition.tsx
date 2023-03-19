import { useEffect, useState } from "react"
import { ROUTER_CONFIG } from "../../App/Routes/router"
import { useNavigate } from "react-router-dom";



/**
 * Page de transition standard
 * 
 * @version v1
 */
export function Transition(props:{
  to : string ,
  children : JSX.Element | JSX.Element[] | null ,
  delay? : number ,
}) : JSX.Element
{

  const { children , to } = props
  let { delay } = props
  if (delay === undefined ) delay = 800

  const navigate = useNavigate();

  const [nextOpacity , setNextOpacity] = useState(0)
  const [nextPage , setNextPage] = useState(<></>)

  useEffect(()=>{
    setNextOpacity(0)
    const nextRoute = ROUTER_CONFIG.filter(item => item.path === to)[0]
    if (nextRoute) {
      setNextPage(nextRoute.element)
      setTimeout(() => setNextOpacity(1), 1); 
      setTimeout(() => navigate(1), delay); 
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
    </div>
  )
}