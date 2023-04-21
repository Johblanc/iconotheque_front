import { useState } from "react";
import { EntryNumber } from "./EntryNumber";


export function EntriesViewBox( props : {
  defaultValue : string,
  setValue?: (value?: string, valid?: boolean) => void,
  setActive?: (value : "" | "x" | "y" | "width" | "height" ) => void
  className? : string
}
){
  const [vbValues , setVbValues] = useState(props.defaultValue.split(" "))

  const handleViewBox = (index : number, value? : number , valid? : boolean) => {
    const newVb = [...vbValues] ;
    newVb[index] = String(value) ;
    setVbValues(newVb) ;
    if (props.setValue) props.setValue(newVb.join(' '),true)
  }



  return (
    <div className={props.className} onMouseLeave={() => props.setActive && props.setActive("")}>
      <div onMouseEnter={() => props.setActive && props.setActive("x")}>
      <EntryNumber 
        name="X Origine"
        value={Number(vbValues[0])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(0,value,valid)}
      />
      </div>
      <div onMouseEnter={() => props.setActive && props.setActive("y")}>
      <EntryNumber 
        name="Y Origine"
        value={Number(vbValues[1])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(1,value,valid)}
      />
      </div>
      <div onMouseEnter={() => props.setActive && props.setActive("width")}>
      <EntryNumber 
        name="Largeur"
        value={Number(vbValues[2])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(2,value,valid)}
      />
      </div>
      <div onMouseEnter={() => props.setActive && props.setActive("height")}>
      <EntryNumber 
        name="Hauteur"
        value={Number(vbValues[3])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(3,value,valid)}
      />
      </div>
    </div>
  )
}