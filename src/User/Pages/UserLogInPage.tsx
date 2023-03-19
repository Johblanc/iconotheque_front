import { useContext, useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { Transition } from "../../Transition/Pages/Transition";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { LogInBox } from "../Components/LogInBox";
import { SignInBox } from "../Components/SignInBox";



/**
 * Page de Log In et du Register
 * 
 * @version v1
 */
export function UserLogInPage() : JSX.Element
{
  const {user} = useContext(UserContext)
  const [transitionTo,setTransitionTo] = useState("")

  return (
    <Transition to={transitionTo} message={`Hello ${user.name} !`}>
      <AppHeader/>
      <div>
        <LogInBox setTransitionTo={setTransitionTo}/>
        <SignInBox setTransitionTo={setTransitionTo}/>
      </div>
    </Transition>
  )
}