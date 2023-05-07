import { useState } from "react";
import { EntryNumber } from "./EntryNumber";


export function EntriesViewBox( props : {

  /** L'identifiant unique permetant de lier le label et l'input */
  accecibilityId : string ;

  defaultValue : string,
  setValue?: (value?: string, valid?: boolean) => void,
  setActive?: (value : "" | "x" | "y" | "width" | "height" ) => void
  className? : string
}
){
  const {accecibilityId,defaultValue,setValue,setActive,className} = props ;
  const [vbValues , setVbValues] = useState(defaultValue.split(" "))

  const handleViewBox = (index : number, value? : number , valid? : boolean) => {
    const newVb = [...vbValues] ;
    newVb[index] = String(value) ;
    setVbValues(newVb) ;
    if (setValue) setValue(newVb.join(' '),true)
  }



  return (
    <div className={className} onMouseLeave={() => setActive && setActive("")}>
      <div onMouseEnter={() => setActive && setActive("x")}>
      <EntryNumber 
        accecibilityId={`${accecibilityId}-x`}
        name="X Origine"
        value={Number(vbValues[0])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(0,value,valid)}
      />
      </div>
      <div onMouseEnter={() => setActive && setActive("y")}>
      <EntryNumber 
        accecibilityId={`${accecibilityId}-y`}
        name="Y Origine"
        value={Number(vbValues[1])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(1,value,valid)}
      />
      </div>
      <div onMouseEnter={() => setActive && setActive("width")}>
      <EntryNumber 
        accecibilityId={`${accecibilityId}-width`}
        name="Largeur"
        value={Number(vbValues[2])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(2,value,valid)}
      />
      </div>
      <div onMouseEnter={() => setActive && setActive("height")}>
      <EntryNumber 
        accecibilityId={"aspect-update-stroke-height"}
        name="Hauteur"
        value={Number(vbValues[3])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(3,value,valid)}
      />
      </div>
    </div>
  )
}