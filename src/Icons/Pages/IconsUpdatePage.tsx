import { Form } from "react-router-dom";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { useContext, useState } from "react";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";
import { DEFAULT_ICON } from "../../Utilities/Constants/Icon.defaut";
import { EntryString } from "../../Utilities/Components/EntryString";
import { EntriesViewBox } from "../../Utilities/Components/EntriesViewBox";
import { EntryValidators } from "../../Utilities/Validators/Entry.Validators";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { Figure } from "../Classes/Figure.class";
import { Aspect } from "../../Aspects/Class/Aspect.class";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";

export function IconsUpdatePage(props: { iconId: number }) {
  const { iconId } = props;

  /** Récupération des contexts */
  const { user } = useContext(UserContext);
  const { pathPublic, setPathPublic } = useContext(PathPublicContext);
  const { pathPrivate, setPathPrivate } = useContext(PathPrivateContext);
  const { aspects , setAspects } = useContext(AspectContext);
  const { iconPublic, setIconPublic } = useContext(IconPublicContext);
  const { iconPrivate, setIconPrivate } = useContext(IconPrivateContext);
  
  const userPath = [
    ...pathPublic.filter((item) => item.user.id === user.id),
    ...pathPrivate,
  ];

  const defautPath = userPath[0]
  const defautAspect = aspects[0]

  const [currentFigure, setCurrentFigure] = useState<Figure>();

  /** Récupération du path */
  const icon =
    [...iconPublic, ...iconPrivate].filter((item) => item.id === iconId)[0] ||
    DEFAULT_ICON;

  const handleRequest = () => {};

  /** Prépartion du message d'alerte */

  /** Préparation du body pour la requête LogIn */
  const [updateBody, setUpdateBody] = useState({
    name: icon.name,
    viewbox: icon.viewbox,
    figures : [...icon.figures].sort((a,b)=> a.order - b.order)
  });
  const [updateValid, setUpdateValid] = useState({
    name: icon.id !== -1,
    viewbox: true,
  });

  const handleUpdateBody = (
    key: "name" | "viewbox",
    value?: string,
    valid?: boolean
  ) => {
    const newBody = { ...updateBody };
    const newValid = { ...updateValid };
    if (value !== undefined) {
      newBody[key] = value;
    }
    if (valid !== undefined) {
      newValid[key] = valid;
    }
    setUpdateBody(newBody);
    setUpdateValid(newValid);
  };

  const figuresSvg = updateBody.figures.map((figure, i) => (
    <path key={i} style={figure.aspect.style} d={figure.path.d} />
  ));

  const isValid = updateValid.name && updateValid.viewbox;

  const addFigure = () => {
    const newBody  = {...updateBody} ;
    const newFigures = newBody.figures.map(item => new Figure(item)) ;
    newFigures.push(new Figure({
      id : -1,
      order : newFigures.length + 1,
      aspect : defautAspect,
      path : defautPath
    }))

    newBody.figures = newFigures ;
    setUpdateBody(newBody)
    setCurrentFigure(newFigures[newFigures.length-1])
  };


  /** Déplacer vers l'Amont */
  const moveUp = () => {
    const newBody  = {...updateBody} ;
    const newFigures = newBody.figures.map(item => new Figure(item)) ;
    const temp = new Figure(currentFigure!)
    newFigures[temp.order-1] = new Figure(newFigures[temp.order-2])
    newFigures[temp.order-1].order += 1
    newFigures[temp.order-2] = temp
    newFigures[temp.order-2].order -= 1

    newBody.figures = newFigures ;
    setUpdateBody(newBody)
    setCurrentFigure(newFigures[currentFigure!.order-2])
  };

  /** Déplacer vers l'Aval */
  const moveDown = () => {
    const newBody  = {...updateBody} ;
    const newFigures = newBody.figures.map(item => new Figure(item)) ;
    const temp = new Figure(currentFigure!)
    newFigures[temp.order-1] = new Figure(newFigures[temp.order])
    newFigures[temp.order-1].order -= 1
    newFigures[temp.order] = temp
    newFigures[temp.order].order += 1

    newBody.figures = newFigures ;
    setUpdateBody(newBody)
    setCurrentFigure(newFigures[currentFigure!.order])
  };


  /** Copie d'une figure */
  const copyFigure = () => {
    const newBody  = {...updateBody} ;
    const newFigures : Figure[] = [] ;
    updateBody.figures.forEach(elm => {
      if (elm.order < currentFigure!.order ){
        newFigures.push( new Figure(elm)) ;
      }
      else if (elm.order > currentFigure!.order) {
        newFigures.push( new Figure(elm)) ;
        newFigures[newFigures.length-1].order += 1 ;
      }
      else {
        newFigures.push( new Figure(elm)) ;
        newFigures.push( new Figure(elm)) ;
        newFigures[newFigures.length-1].order += 1 ;
        setCurrentFigure(newFigures[newFigures.length-1])
      }
    })
    newBody.figures = newFigures ;
    
    setUpdateBody(newBody)
  };

  /** Supprimer une Figure */
  const deleteFigure = () => {
    const newBody  = {...updateBody} ;
    const newFigures : Figure[] = [] ;
    updateBody.figures.forEach(elm => {
      if (elm.order < currentFigure!.order ){
        newFigures.push( new Figure(elm)) ;
      }
      else if (elm.order > currentFigure!.order) {
        newFigures.push( new Figure(elm)) ;
        newFigures[newFigures.length-1].order -= 1 ;
      }
    })
    newBody.figures = newFigures ;
    setUpdateBody(newBody)
    
    setCurrentFigure(undefined)
  };

  const figuresDetail = updateBody.figures.map((figure, i) => (
    <div
      key={i}
      className={`d-flex ${
        currentFigure && currentFigure.order === figure.order
          ? APP_STYLE.APP.BTN_BAD
          : APP_STYLE.APP.BTN_GOOD
      }`}
      onClick={() => setCurrentFigure(figure)}
    >
      <h5>{figure.order}</h5>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox={figure.path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Path : {figure.path.name}</title>
        <path className={`${APP_STYLE.PATH.SELECT.DROWN}`} d={figure.path.d} />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 5 5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Plus</title>
        <path
          className={`${APP_STYLE.PATH.SELECT.DROWN}`}
          d="M 1 2 2 2 2 1 3 1 3 2 4 2 4 3 3 3 3 4 2 4 2 3 1 3 Z"
        />
      </svg>
      <svg
        /* onClick={()=>setTransition({to : `/aspects/view/${figure.aspect.id}`})} */
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 100 100"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Aspect : {figure.aspect.name}</title>
        <circle cx="50" cy="50" r="20" style={figure.aspect.style} />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox="0 0 5 5"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Equal</title>
        <path
          className={`${APP_STYLE.PATH.SELECT.DROWN}`}
          d="M 1 1 4 1 4 2 1 2 Z M 1 3 4 3 4 4 1 4 Z"
        />
      </svg>
      <svg
        className="m-2"
        width="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        height="min(calc((1.375rem + 1.5vw)*3),5em,20vw)"
        viewBox={figure.path.viewbox}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>
          Figure : Path {figure.path.name} + Aspect {figure.aspect.name}
        </title>
        <path style={figure.aspect.style} d={figure.path.d} />
      </svg>
    </div>
  ));

  return (
    <>
      <AppHeader actif={iconId === -1 ? "iconsNew" : ""} />
      <Form
        method="post"
        onSubmit={handleRequest}
        className={APP_STYLE.PATH.VIEW.CADRE}
      >
        <span className={APP_STYLE.PATH.VIEW.COLO}>
          <div className={APP_STYLE.PATH.VIEW.BOX_A}>
            <div className={APP_STYLE.PATH.VIEW.ICON_CENTER}>
              <div
                className={`${APP_STYLE.PATH.VIEW.ICON_BG} ${
                  icon.status === "public"
                    ? "bg-primary icon-large"
                    : "bg-warning icon-large-bad"
                }`}
              >
                <svg
                  width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
                  viewBox={icon.viewbox}
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <title>Icône : {updateBody.name}</title>
                  {figuresSvg}
                </svg>
              </div>
            </div>
            <em>Créée par {icon.user.name}</em>
          </div>
          <div className={APP_STYLE.PATH.VIEW.NO_CADRE}>
            <EntryString
              name={"Nom"}
              defaultValue={updateBody.name}
              setValue={(value, valid) =>
                handleUpdateBody("name", value, valid)
              }
              validators={[EntryValidators.minLenght(4)]}
            />
            <EntriesViewBox
              defaultValue={updateBody.viewbox}
              setValue={(value, valid) =>
                handleUpdateBody("viewbox", value, valid)
              }
            />
            <button
              type="submit"
              disabled={!isValid}
              className={APP_STYLE.APP.BTN_GOOD}
            >
              {icon.id !== -1
                ? "Enregistrer les modification"
                : "Enregistrer le path"}
            </button>

            <LinkCustom
              className={APP_STYLE.APP.BTN_BAD}
              name={
                icon.id !== -1
                  ? "Annuler les modification"
                  : "Annuler le création"
              }
              to={icon.id !== -1 ? `/icons/view/${icon.id}` : `/icons/publics`}
            />
          </div>
        </span>
        <div className={APP_STYLE.PATH.VIEW.BOX_B}>
          <h2>
            {icon.id !== -1 ? "Modication d'une icône" : "Création d'une icône"}
          </h2>
          <button
            className={APP_STYLE.APP.BTN_GOOD}
            onClick={(e) => {
              e.preventDefault()
              addFigure();
            }}
          >
            Ajouter une Figure
          </button>
          <div>{figuresDetail}</div>
            <div>
              <h4>{currentFigure ? `Modification de la Figure ${currentFigure.order}` : "Pas de Figure sélectionnée"}</h4>
              
              <button
                className={APP_STYLE.APP.BTN_GOOD}
                onClick={(e) => {
                  e.preventDefault()
                  moveUp();
                }}
                disabled={!currentFigure || currentFigure.order === 1}
              >
                Déplacer vers l'Amont
              </button>
              <button
                className={APP_STYLE.APP.BTN_GOOD}
                onClick={(e) => {
                  e.preventDefault()
                  moveDown();
                }}
                disabled={!currentFigure || currentFigure.order === updateBody.figures.length}
              >
                Déplacer vers l'Aval
              </button>
              <button
                className={APP_STYLE.APP.BTN_GOOD}
                onClick={(e) => {
                  e.preventDefault()
                  copyFigure();
                }}
                disabled={!currentFigure}
              >
                Copier
              </button>
              <button
                className={APP_STYLE.APP.BTN_GOOD}
                onClick={(e) => {
                  e.preventDefault()
                  deleteFigure();
                }}
                disabled={!currentFigure}
              >
                Supprimer
              </button>
            </div>
        </div>
      </Form>
    </>
  );
}
