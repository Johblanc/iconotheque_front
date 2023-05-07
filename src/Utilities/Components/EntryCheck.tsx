import { useEffect, useState } from "react";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";


export function EntriesCheck( props : {

  /** L'identifiant unique permetant de lier le label et l'input */
  accecibilityId : string ;
  name : string,
  defaultValue : boolean,
  setValue?: (value: boolean ) => void,
  disabled? : boolean
}
){
  const {accecibilityId,defaultValue,setValue,name,disabled} = props ;
  
  const [check,setCheck] =useState(defaultValue)

  useEffect(()=>{setValue && setValue(check)},[check])

  return (
    
      <div className="d-flex p-1 align-items-center" >
        <input 
          id={accecibilityId}
          type="checkbox"
          className="m-2"
          checked={check}
          onClick={() => setCheck(!check)}
          readOnly
          disabled={disabled}
        />
        <label 
          htmlFor={accecibilityId}
          className={` ${disabled ? APP_STYLE.APP.VISUALDISABLED : "cursered" } ${APP_STYLE.PATH.GRAPH.GROUPHAND.CHECKLABEL}`}
        >
        {name}
        </label>
        
      </div>
  )
}