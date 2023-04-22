import { useEffect, useState } from "react";
import { GraphiGroup } from "../class/GraphiGroup";
import { EntryNumber } from "../../Utilities/Components/EntryNumber";
import { GraphiFormOptions } from "../class/GraphiFormOptions";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { GraphiPoint } from "../class/GraphiPoint";

/**
 * Modification des propriété d'un groupe de point
 * 
 * @param props.graphyPoints    Ensemble des points
 * @param props.setGraphyPoints Modification des points
 * @param props.inModif         Les indexs en cours de modif
 * @param props.setInModif      Réglage des indexs en cours de modification
 * @param props.formOptions     Les Options de la forme
 * 
 * @version v2
 */
export function PathGraphicGroupHandler(props: {
  graphyPoints: GraphiGroup[];
  setGraphyPoints: (data: GraphiGroup[]) => void;
  inModif: { groupe: number; item: number };
  setInModif: (data: { groupe: number; item: number }) => void;
  formOptions: GraphiFormOptions;
}) {
  const { graphyPoints, inModif, setInModif, setGraphyPoints, formOptions } =
    props;
  const [pointHover, setPointHover] = useState(false);

  
  const [current, setCurrent] = useState( new GraphiPoint({x:0,y:0,ax:0,ay:0,bx:0,by:0}));

  /** Sélection du point en cours de modification */
  useEffect(()=>{
    if (inModif.groupe !== -1 && inModif.item !== -1){
      
      setCurrent(formOptions.translateGraphiPoint( graphyPoints[inModif.groupe].points[inModif.item]))
    }
    else
    {
      setCurrent( new GraphiPoint({x:0,y:0,ax:0,ay:0,bx:0,by:0}))
    }
  },[inModif,graphyPoints,formOptions]) ;

  /** Modification des coordonnées du point en cours de modification */
  const handleCurrent = (key : "x" | "y" | "dax" | "day" | "dbx" | "dby" , value : number) => {

    const newCurrent = current.copy ;

    newCurrent[key] = value ;

    setCurrent(newCurrent)
    
    const newPoints = [...graphyPoints].map(item => item.copy);
    newPoints[inModif.groupe].points[inModif.item] = formOptions.untranslateGraphiPoint( newCurrent)
    setGraphyPoints(newPoints);
  } ;

  /** Modification du status du point en cours de modification */
  const handleStatus = (value : "dur" | "symétrique" | "doux" ) => {

    const newCurrent = current.copy ;

    newCurrent.status = value ;

    setCurrent(newCurrent)
    const newPoints = [...graphyPoints].map(item => item.copy);
    newPoints[inModif.groupe].points[inModif.item] = formOptions.untranslateGraphiPoint( newCurrent)
    setGraphyPoints(newPoints);
  } ;
  
  const formPosUp = ( e : React.MouseEvent ) => {
    e.preventDefault()
    const newPoints = [...graphyPoints].map(item => item.copy) ;
    const temp = newPoints[inModif.groupe].copy ;
    newPoints[inModif.groupe] = newPoints[inModif.groupe - 1].copy ;
    newPoints[inModif.groupe - 1] = temp ;
    setGraphyPoints(newPoints) ;
    setInModif({groupe : inModif.groupe - 1 , item : inModif.item})
  } ;
  
  const formPosDown = () => {

  } ;
  
  const formCopy = () => {

  } ;
  
  const formRemove = () => {

  } ;
  
  const formLinkUp = () => {

  } ;
  
  const formLinkDown = () => {

  } ;
  

  const pointPosUp = () => {

  } ;
  
  const pointPosDown = () => {

  } ;
  
  const pointCopy = () => {

  } ;
  
  const pointRemove = () => {

  } ;
  
  const pointToGroupOrigin = () => {

  } ;
  
  const pointToFormOrigin = () => {

  } ;
  
  const pointUnlick = () => {

  } ;

  return (
    <div>
      <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.CADRE}>
        {graphyPoints.map((group, i) => (
          <div
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BOX}
            key={i}
            onMouseDown={() =>
              !pointHover && setInModif({ groupe: i, item: -1 })
            }
          >
            <h5>Groupe {i + 1}</h5>
            <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.LIMITED}>
              <svg
                className={APP_STYLE.PATH.GRAPH.GROUPHAND.GROUPVIEW}
                height="4em"
                viewBox={`0 0 ${group.points.length * 20} 20`}
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d={`m 7 7 h ${group.points.length * 20 - 14}${
                      group.isClose
                        ? ` c 7 0 7 10 0 10 h ${
                            group.points.length * -20 + 14
                          } c -7 0 -7 -10 0 -10 z`
                        : ""
                    }`}
                    className={ 
                      inModif.groupe === i ?
                      APP_STYLE.PATH.GRAPH.GROUPHAND.GROUPSELECTED : 
                      APP_STYLE.PATH.GRAPH.GROUPHAND.GROUPNOTSELECTED 
                    }
                    style={{
                      strokeWidth: inModif.groupe === i ? 2 : 1,
                    }}
                  />
                  <g>
                    {group.points.map((point, j) => (
                      <path
                        key={j}
                        onMouseDown={() => setInModif({ groupe: i, item: j })}
                        onMouseEnter={() => setPointHover(true)}
                        onMouseLeave={() => setPointHover(false)}
                        d={
                          point.status === "dur"        ? GraphiPoint.losange(j * 20 + 10 , 7 , 10, 10) : 
                          point.status === "symétrique" ? GraphiPoint.circle(j * 20 + 10 , 7 , 10, 10)  : 
                                                          GraphiPoint.doux(j * 20 + 10 , 7 , 10, 10) 
                        }
                        className={ 
                          inModif.groupe === i && inModif.item === j ?
                          APP_STYLE.PATH.GRAPH.GROUPHAND.POINTSELECTED : 
                          APP_STYLE.PATH.GRAPH.GROUPHAND.POINTNOTSELECTED 
                        }
                        style={{ strokeWidth: inModif.groupe === i && inModif.item === j ? 1 : 0.4 }}
                      />
                    ))}
                  </g>
                </g>
              </svg>
            </div>
          </div>
        ))}
      </div>
      <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.GROUPBOX}>
        <h4 className={`${inModif.groupe === -1 ? APP_STYLE.APP.VISUALDISABLED : "" }`} > 
          {inModif.item === -1 ? `Pas de Groupe sélectionné` : `Modification du Groupe ${inModif.groupe + 1}` }
        </h4>
        <input
          type="checkbox"
          id="closeGroupe"
          name="closeGroupe"
          checked={
            inModif.groupe === -1 ? false : graphyPoints[inModif.groupe].isClose
          }
          onClick={() => {
            if (inModif.groupe !== -1) {
              const newPoints = [...graphyPoints].map(item => item.copy);
              newPoints[inModif.groupe].isClose =
                !newPoints[inModif.groupe].isClose;
              setGraphyPoints(newPoints);
            }
          }}
          disabled={inModif.groupe === -1}
          readOnly
        />
        <label htmlFor="closeGroupe" 
          className={`${inModif.groupe === -1 ? APP_STYLE.APP.VISUALDISABLED : "" } ${APP_STYLE.PATH.GRAPH.GROUPHAND.CHECKLABEL}`}>
          Fermer ce groupe
        </label>
        <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTONBOX}>
          <button 
            onClick={formPosUp}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1 || inModif.groupe === 0 }
          >
            Déplacer vers l'amont
          </button>
          <button 
            onClick={formPosDown}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Déplacer vers l'aval
          </button>
          <button 
            onClick={formCopy}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Copier
          </button>
          <button 
            onClick={formRemove}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Supprimer
          </button>
          <button 
            onClick={formLinkUp}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Raccoder au groupe précédent
          </button>
          <button 
            onClick={formLinkDown}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Raccoder au groupe suivant
          </button>
        </div>
      </div>
      <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.GROUPBOX}>
        <h4 className={`${inModif.item === -1 ? APP_STYLE.APP.VISUALDISABLED : "" }`} > 
          {inModif.item === -1 ? `Pas de Point sélectionné` : `Modification du Point ${inModif.item + 1}` }
        </h4>
        <div className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTONBOX}>
          <button 
            onClick={pointPosUp}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Déplacer vers l'amont
          </button>
          <button 
            onClick={pointPosDown}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Déplacer vers l'aval
          </button>
          <button 
            onClick={pointCopy}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Copier
          </button>
          <button 
            onClick={pointRemove}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Supprimer
          </button>
          <button 
            onClick={pointToGroupOrigin}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Définir comme Origine du Groupe
          </button>
          <button 
            onClick={pointToFormOrigin}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Définir comme Origine de la Forme
          </button>
          <button 
            onClick={pointUnlick}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
            disabled={inModif.groupe === -1}
          >
            Séparer du groupe
          </button>
        </div>
        <div className={APP_STYLE.APP.DROPDOWN.BASE}>
          <button
            className={`${APP_STYLE.APP.DROPDOWN.BUTTON} ${inModif.item === -1 ? APP_STYLE.APP.VISUALDISABLED : "" }`}
            type="button"
            id="dropdownMenuButton1"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            disabled={inModif.item === -1}
          >
            Point {current.status}
          </button>
          <ul className={APP_STYLE.APP.DROPDOWN.MENU} aria-labelledby="dropdownMenuButton1">
            <li>
              <p className={APP_STYLE.APP.DROPDOWN.ITEM} onClick={()=> handleStatus("dur")}>
                Point Dur
              </p>
            </li>
            <li>
              <p className={APP_STYLE.APP.DROPDOWN.ITEM} onClick={()=> handleStatus("symétrique")}>
                Point Symétrique
              </p>
            </li>
            <li>
              <p className={APP_STYLE.APP.DROPDOWN.ITEM} onClick={()=> handleStatus("doux")}>
                Point Souple
              </p>
            </li>
          </ul>
        </div>
        <div className={APP_STYLE.APP.XXXLFLEX}>
          <div>
            <h6 className={`${inModif.item === -1 ? APP_STYLE.APP.VISUALDISABLED : "" }`} >Point</h6>
            <div className={APP_STYLE.APP.ENTRY.DOUBLE.BOX}>
              <EntryNumber
                name="x"
                value={formOptions.round(current.x)}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.LEFT}
                disabled={inModif.item === -1}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("x", value)}}}
              />
              <EntryNumber
                name="y"
                value={formOptions.round(current.y)}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.RIGHT}
                disabled={inModif.item === -1}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("y", value)}}}
              />
            </div>
          </div>
          <div>
            <h6 className={`${inModif.item === -1 || current.status === "dur" ? APP_STYLE.APP.VISUALDISABLED : "" }`} >Vecteur aval</h6>
            <div className={APP_STYLE.APP.ENTRY.DOUBLE.BOX}>
              <EntryNumber
                name="dx"
                value={formOptions.round( current.dbx )}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.LEFT}
                disabled={inModif.item === -1 || current.status === "dur"}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("dbx", value)}}}
              />
              <EntryNumber
                name="dy"
                value={formOptions.round(current.dby)}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.RIGHT}
                disabled={inModif.item === -1 || current.status === "dur"}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("dby", value)}}}
              />
            </div>
          </div>
          <div>
            <h6 className={`${inModif.item === -1 || current.status !== "doux" ? APP_STYLE.APP.VISUALDISABLED : "" }`} >Vecteur amont</h6>
            <div className={APP_STYLE.APP.ENTRY.DOUBLE.BOX}>
              <EntryNumber
                name="dx"
                value={formOptions.round(current.dax)}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.LEFT}
                disabled={inModif.item === -1 || current.status !== "doux"}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("dax", value)}}}
              />
              <EntryNumber
                name="dy"
                value={formOptions.round(current.day)}
                step={formOptions.rounder}
                className={APP_STYLE.APP.ENTRY.DOUBLE.RIGHT}
                disabled={inModif.item === -1 || current.status !== "doux"}
                setValue={(value? : number) => {if(value !== undefined){handleCurrent("day", value)}}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
