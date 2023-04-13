import { useState } from "react";
import { EntryNumber } from "./EntryNumber";


export function EntriesViewBox( props : {
  defaultValue : string
  setValue?: (value?: string, valid?: boolean) => void;
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
    <div className="d-lg-flex">
      <EntryNumber 
        name="X Origine"
        defaultValue={Number(vbValues[0])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(0,value,valid)}
      />
      <EntryNumber 
        name="Y Origine"
        defaultValue={Number(vbValues[1])}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(1,value,valid)}
      />
      <EntryNumber 
        name="Largeur"
        defaultValue={Number(vbValues[2])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(2,value,valid)}
      />
      <EntryNumber 
        name="Hauteur"
        defaultValue={Number(vbValues[3])}
        min={0}
        setValue={(value? : number , valid? : boolean)=>handleViewBox(3,value,valid)}
      />
    </div>
  )
}