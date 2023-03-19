import { useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { Transition } from "../../Transition/Pages/Transition";
import { LogInBox } from "../Components/LogInBox";
import { SignInBox } from "../Components/SignInBox";



/**
 * Page de Log In et du Register
 * 
 * @version v1
 */
export function UserLogInPage() : JSX.Element
{
  const [transitionTo,setTransitionTo] = useState("")
  return (
    <Transition to={transitionTo}>
      <AppHeader/>
      <div>
        <LogInBox setTransitionTo={setTransitionTo}/>
        <SignInBox setTransitionTo={setTransitionTo}/>
      </div>
    </Transition>
  )
}