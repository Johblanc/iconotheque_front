
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserLogInPage } from "../../User/Pages/UserLogInPage";
import { LogoDynamic } from "../Components/LogoDynamic";
import { TitreDynamic } from "../Components/TitreDynamic";


export function AccueilPage() {

  const [opa , setOpa] = useState(1)

  const navigate = useNavigate()
  

  setTimeout(() => setOpa(0), 3500);
  setTimeout(() => navigate("/user/login"), 4000);

  return (
    <div>
      <div className="transition s-100 d-flex flex-column justify-content-evenly align-items-center" style={{opacity : opa}}>
        <TitreDynamic/>
        <LogoDynamic/>
      </div>
      <div className="transition s-100" style={{opacity : 1- opa}}>
      <UserLogInPage/>
      </div>
    </div>
  )
}