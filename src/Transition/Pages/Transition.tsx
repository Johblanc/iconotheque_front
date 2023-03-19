
import { TransitionMessage } from "./TransitionMessage";
import { TransitionSlide } from "./TransitionSlide";



/**
 * Page de transition standard
 * 
 * @version v1
 */
export function Transition(props:{
  to : string ,
  children : JSX.Element | JSX.Element[] | null ,
  message? : string ,
  isBad? : boolean ,
  delay? : number ,
}) : JSX.Element
{

  const { children , to ,message, isBad} = props
  const delay  = (props.delay !== undefined ) ? props.delay : 800 ;
  const transitionElement = ()=> {
    if (message === undefined){
      return (
        <TransitionSlide to={to} delay={delay}>
          {children}
        </TransitionSlide>
      )
    }

    return (
      <TransitionMessage to={to} message={message} delay={delay} isBad={isBad} >
      {children}
      </TransitionMessage>
    )
  }
  return (
    <div>
      {transitionElement()}
    </div>
  )
}