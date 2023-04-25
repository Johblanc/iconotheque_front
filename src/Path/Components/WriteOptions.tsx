
import { APP_STYLE } from "../../App/Style/App.bootstrap.style"
import { TWriteOptions } from "../Types/TWriteOptions"


export function WriteOptions(props : {
  wOptions : TWriteOptions,
  setWOptions : (value : TWriteOptions) => void
}){

  const {wOptions, setWOptions} = props ;

  const toggleOption = (key : "withComma" | "withBreak" | "surNumFormat" | "surNumSpace" | "surNumZero" | "toRelative" | "notReduce" ) => {
    const newOptions = {...wOptions} ;
    newOptions[key] = !newOptions[key] ;
    setWOptions(newOptions)
  }

  return (
    <div className={APP_STYLE.PATH.GRAPH.BASE.SMALLBOX}>
      <h4>Options d'écriture</h4>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathWithComma"
          name="pathWithComma"
          className="m-2"
          checked={wOptions.withComma}
          onClick={() => toggleOption("withComma")}
          readOnly
        />
        <label htmlFor="pathWithComma" >
          Ajouter une virgule entre les coordonnées
        </label>
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathWithBreak"
          name="pathWithBreak"
          className="m-2"
          checked={wOptions.withBreak}
          onClick={() => toggleOption("withBreak")}
          readOnly
        />
        <label htmlFor="pathWithBreak" >
          Ajouter un retour à la ligne apres chaque point
        </label>
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathSurNumFormat"
          name="pathSurNumFormat"
          className="m-2"
          checked={wOptions.surNumFormat}
          onClick={() => toggleOption("surNumFormat")}
          readOnly
        />
        <label htmlFor="pathSurNumFormat" >
          Supprimer les formats de point excedentaires
        </label>
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathSurNumSpace"
          name="pathSurNumSpace"
          className="m-2"
          checked={wOptions.surNumSpace}
          onClick={() => toggleOption("surNumSpace")}
          readOnly
        />
        <label htmlFor="pathSurNumSpace" >
          Supprimer les espaces excedentaires
        </label>
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathSurNumZero"
          name="pathSurNumZero"
          className="m-2"
          checked={wOptions.surNumZero}
          onClick={() => toggleOption("surNumZero")}
          readOnly
        />
        <label htmlFor="pathSurNumZero" >
          Supprimer les zeros excedentaires
        </label>
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathToRelative"
          name="pathToRelative"
          className="m-2"
          checked={wOptions.toRelative}
          onClick={() => toggleOption("toRelative")}
          readOnly
        />
        <label htmlFor="pathToRelative" >
          Passer en coordonnées relatives
        </label>
        
      </div>
      <div className="d-flex p-1" >
        <input 
          type="checkbox"
          id="pathNotReduce"
          name="pathNotReduce"
          className="m-2"
          checked={wOptions.notReduce}
          onClick={() => toggleOption("notReduce")}
          readOnly
        />
        <label htmlFor="pathNotReduce" >
          Conserver les points curviligne
        </label>
        
      </div>
    </div>
  )
}