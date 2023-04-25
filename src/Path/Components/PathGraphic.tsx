import { useEffect, useRef, useState } from "react";
import { SvgPath } from "../class/SvgPath";
import { PathGraphicPointView } from "./PathGraphicPointView";
import { ExtendVB } from "../class/ExtendVB";
import { PathGraphicBackGround } from "./PathGraphicBackGround";
import { PathGraphicVbActif } from "./PathGraphicVbActif";
import { GraphiFormOptions } from "../class/GraphiFormOptions";
import { PathGraphicFormHandler } from "./PathGraphicFormHandler";
import { PathGraphicGroupView } from "./PathGraphicGroupView";
import { PathGraphicGroupHandler } from "./PathGraphicGroupHandler";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { GraphiGroup } from "../class/GraphiGroup";
import { GraphiPoint } from "../class/GraphiPoint";
import { log } from "console";
import { WriteOptions } from "./WriteOptions";
import { TWriteOptions } from "../Types/TWriteOptions";

/**
 * Permet la Modification de l'ensemble d'un path de manière graphique ou numérique
 *
 * @param props.path path de référence
 *
 * @version v2
 */
export function PathGraphic(props: {
  path: {
    name: string;
    viewbox: string;
    d: string;
  },
  actif?: "" | "x" | "y" | "width" | "height",
  setDValue : (value : string) => void,
}) {
  const { path, actif, setDValue } = props;
  const { name, viewbox, d } = path;

  const [inModif, setInModif] = useState({ groupe: -1, item: -1 });
  const [vb, setVB] = useState(new ExtendVB(viewbox, actif));

  const [graphyPoints, setGraphyPoints] = useState(new SvgPath(d).asGraphi);

  //const [finalValue, setFinalValue] = useState("");

  const [isClicking, setIsClicking] = useState<{
    valid: boolean;
    key: string;
    event?: MouseEvent | TouchEvent;
  }>({ valid: false, key: "" });

  const [formOptions, setFormOptions] = useState(
    new GraphiFormOptions({
      rounder: 1,
      translateX: 0,
      translateY: 0,
    })
  );

  const imageBox = useRef<SVGSVGElement>(null);

  /** Mise à jour de la viewBox */
  useEffect(() => {
    setVB(new ExtendVB(viewbox, actif));
  }, [viewbox, actif]);

  /** Déplacement d'un point */
  const movePoint = (newPos : { x: number, y: number }) => {
    
    const newPoints = [...tempGP].map(item => item.copy) ;

    const delta = {
      x: newPos.x - lastMousePos.x,
      y: newPos.y - lastMousePos.y,
    } ;

    const newPoint = newPoints[inModif.groupe].points[inModif.item] ;

    if (isClicking.key === "") {
      newPoint.x += delta.x;
      newPoint.y += delta.y;
    } else if (isClicking.key === "b") {
      newPoint.bx += delta.x;
      newPoint.by += delta.y;
      if (newPoint.status === "symétrique") {
        newPoint.dax = -newPoint.dbx;
        newPoint.day = -newPoint.dby;
      }
    } else {
      newPoint.ax += delta.x;
      newPoint.ay += delta.y;
      if (newPoint.status === "symétrique") {
        newPoint.dbx = -newPoint.dax;
        newPoint.dby = -newPoint.day;
      }
    }

    newPoints[inModif.groupe].points[inModif.item] = formOptions.roundGraphiPoint(newPoint);
    
    setGraphyPoints(newPoints);
  }

  /** Déplacement d'un groupe */
  const moveGroup = (newPos : { x: number, y: number }) => {
    
    const newPoints = [...tempGP].map(item => item.copy) ;
    
    const delta = {
      x: newPos.x - lastMousePos.x,
      y: newPos.y - lastMousePos.y,
    };

    newPoints[inModif.groupe].points = newPoints[
      inModif.groupe
    ].points.map((_, j) => {
      const newPoint = tempGP[inModif.groupe].points[j].copy;

      newPoint.x += delta.x;
      newPoint.y += delta.y;

      return formOptions.roundGraphiPoint(newPoint);
    });
    
    setGraphyPoints(newPoints);
  }

  /** Déplacement d'une forme */
  const moveForm = (newPos : { x: number, y: number }) => {
    
    const newPoints = [...tempGP].map(item => item.copy) ;
    
    const delta = {
      x: newPos.x - lastMousePos.x,
      y: newPos.y - lastMousePos.y,
    };

    newPoints.forEach((group, i) => {
      group.points = group.points.map((_, j) => {
        const newPoint = tempGP[i].points[j].copy;

        newPoint.x += delta.x;
        newPoint.y += delta.y;

        return formOptions.roundGraphiPoint(newPoint);
      });
    });

    setGraphyPoints(newPoints);
  }

  /** Mise à jour des coordonnées des Points en fonction de la sélection */
  const handleMove = (mx: number, my: number) => {
    if (imageBox !== null) {
      if (imageBox.current !== null) {
        /** Les coordonnées de la viewbox sur l'écran */
        const { x, y, height, width } =
          imageBox.current.getBoundingClientRect();

        const newPos = vb.convertToVbCoords(
          { x: mx, y: my },
          { x, y, height, width }
        );


        if (
          isClicking.key === "" ||
          isClicking.key === "b" ||
          isClicking.key === "a"
        ) {
          movePoint(newPos)


        } 
        else if (isClicking.key === "group") {
          moveGroup(newPos)
        } else if (isClicking.key === "form") {
          moveForm(newPos)
        }
      }
    }
  };

  let tempGP = [...graphyPoints].map((item) => item.copy);

  let lastMousePos = { x: 0, y: 0 };

  /** Le Doigt bouge */
  const handleTouchMove = (event: TouchEvent) => {
    event.preventDefault();
    const { clientX: mx, clientY: my } = event.touches[0];

    handleMove(mx, my);
  };

  /** La souris bouge */
  const handleMouseMove = (event: MouseEvent) => {
    const { clientX: mx, clientY: my } = event;
    handleMove(mx, my);
  };

  /** Récupération des coordonnées de la souris au moment du click */
  const verifyLastMousePos = () => {
    if (imageBox !== null && imageBox.current !== null && isClicking.event) {
      /** Les coordonnées de la viewbox sur l'écran */
      const { x, y, height, width } = imageBox.current.getBoundingClientRect();
      if (isClicking.event instanceof MouseEvent) {
        lastMousePos = vb.convertToVbCoords(
          { x: isClicking.event.clientX, y: isClicking.event.clientY },
          { x, y, height, width }
        );
      } else if (isClicking.event instanceof TouchEvent) {
        lastMousePos = vb.convertToVbCoords(
          {
            x: isClicking.event.touches[0].clientX,
            y: isClicking.event.touches[0].clientY,
          },
          { x, y, height, width }
        );
      }
    }
  };

  /** Le click est laché */
  const mouseUp = () => {
    setIsClicking({ valid: false, key: "" });
    if (imageBox.current) {
      imageBox.current.removeEventListener("mousemove", handleMouseMove);
    }
  };

  /** Le doigt est relevé */
  const touchEnd = () => {
    setIsClicking({ valid: false, key: "" });
    if (imageBox.current) {
      imageBox.current.removeEventListener("touchmove", handleTouchMove);
    }
  };

  /** Ajout des event listeners */
  const addEvents = async () => {
    verifyLastMousePos() ;
    if (imageBox.current) {
      if (isClicking.event instanceof MouseEvent) {
        imageBox.current.addEventListener("mousemove", handleMouseMove);
      } else if (isClicking.event instanceof TouchEvent) {
        imageBox.current.addEventListener("touchmove", handleTouchMove);
      }
    }
    if (isClicking.event instanceof MouseEvent) {
      window.addEventListener("mouseup", mouseUp);
    } else if (isClicking.event instanceof TouchEvent) {
      window.addEventListener("touchend", touchEnd);
    }
  };

  /** Retrait des event listener */
  const removeEvents = () => {
    if (imageBox.current) {
      if (isClicking.event instanceof MouseEvent) {
        imageBox.current.removeEventListener("mousemove", handleMouseMove);
      } else if (isClicking.event instanceof TouchEvent) {
        imageBox.current.removeEventListener("touchmove", handleTouchMove);
      }
    }
  };

  /** Captation du mouvement de la souris ou du doigt */
  useEffect(() => {
    if (isClicking.valid) {
      addEvents();
    } else {
      removeEvents();
    }
  }, [isClicking]);

  /** Ajout d'un groupe */
  const addGroup = () => {
    const newPoints = [...graphyPoints].map((item) => item.copy);
    newPoints.push(
      new GraphiGroup({
        isClose: false,
        points: [new GraphiPoint({ x: 0, y: 0, bx: 0, by: 0, ax: 0, ay: 0 })],
      })
    );
    setGraphyPoints(newPoints);
    setInModif({ groupe: newPoints.length - 1, item: 0 });
  };

  const validateAdvance = () => {
    setDValue(finalValue) ;
  }


  const [wOptions, setWOptions] = useState<TWriteOptions>({
    withComma    : true,
    withBreak    : false,
    surNumFormat : false,
    surNumSpace  : true,
    surNumZero   : true,
    toRelative   : false,
    notReduce    : false,
  })
  
  const finalValue = new SvgPath(
    GraphiGroup[wOptions.notReduce ? "fromGraphiToString" : "fromGraphiToStringReduce"](graphyPoints,formOptions),
    {
      withComma    : wOptions.withComma ,
      withBreak    : wOptions.withBreak ,
      surNumFormat : wOptions.surNumFormat ,
      surNumSpace  : wOptions.surNumSpace ,
      surNumZero   : wOptions.surNumZero ,
      rounder      : formOptions.rounder
    }
  )[ wOptions.toRelative ? "asRelativeString" : "asString" ]

  return (
    <div className={APP_STYLE.PATH.GRAPH.BASE.CADRE}>
      <div className={APP_STYLE.PATH.GRAPH.BASE.BIGBOX}>
        <div className={APP_STYLE.PATH.GRAPH.BASE.SMALLBOX}>
          <h4>Sur toute la forme</h4>
          <PathGraphicFormHandler
            formOptions={formOptions}
            setFormOptions={setFormOptions}
          />

          <button
            onClick={(e) => {
              e.preventDefault();
              addGroup();
            }}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
          >
            Ajoute un groupe
          </button>
        </div>
        {/* Visualisation des points et des groupe de points */}
        <PathGraphicGroupHandler
          graphyPoints={graphyPoints}
          setGraphyPoints={setGraphyPoints}
          inModif={inModif}
          setInModif={setInModif}
          formOptions={formOptions}
        />
      </div>
      <div className={APP_STYLE.PATH.GRAPH.BASE.SVGBOX}>
        {/* Box de modification graphique */}
        <svg
          className={APP_STYLE.PATH.GRAPH.BASE.SVG}
          ref={imageBox}
          viewBox={vb.exValue}
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Forme {name}</title>
          {/* Background Box*/}
          <PathGraphicBackGround viewbox={vb} />
          {/* Le dessin l'icône */}
          <path
            onMouseDown={(e) => {
              setInModif({ groupe: -1, item: -1 });
              setIsClicking({
                valid: true,
                key: "form",
                event: e.nativeEvent,
              });
            }}
            onTouchStart={(e) => {
              setInModif({ groupe: -1, item: -1 });
              setIsClicking({
                valid: true,
                key: "form",
                event: e.nativeEvent,
              });
            }}
            className={APP_STYLE.PATH.GRAPH.BASE.PATH}
            style={{
              fillOpacity: 0.3,
              strokeWidth: vb.sizeRef / 100,
            }}
            d={GraphiGroup.fromGraphiToString(graphyPoints, formOptions)}
          />

          {/* Visualisation de tous les point du path*/}
          <PathGraphicGroupView
            graphyPoints={graphyPoints}
            formOptions={formOptions}
            viewbox={vb}
            inModif={inModif}
            setInModif={setInModif}
            setIsClicking={setIsClicking}
          />

          {/* Visualisation du point selectionné */}
          {inModif.groupe !== -1 && inModif.item !== -1 && (
            <PathGraphicPointView
              point={graphyPoints[inModif.groupe].points[inModif.item]}
              sizeRef={vb.sizeRef}
              formOptions={formOptions}
              setIsClicking={setIsClicking}
            />
          )}
          {actif && <PathGraphicVbActif viewbox={vb} actif={actif} />}
        </svg>
        <WriteOptions wOptions={wOptions} setWOptions={setWOptions} />
        <div className={APP_STYLE.PATH.GRAPH.BASE.SMALLBOX}>
          <h4>Tracé final</h4>
          
          <div>
            {finalValue.split("\n").map(item => <p className={APP_STYLE.APP.ALT_FONT}>{item}</p>)}
          </div>
          <button 
            onClick={validateAdvance}
            className={APP_STYLE.PATH.GRAPH.GROUPHAND.BUTTON}
          >
            Valider les modifications avancées
          </button>
        </div>
      </div>
    </div>
  );
}
