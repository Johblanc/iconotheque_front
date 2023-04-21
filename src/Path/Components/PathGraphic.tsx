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
import { APP_STYLE, BS_COMBO, PERSO } from "../../App/Style/App.bootstrap.style";
import { GraphiGroup } from "../class/GraphiGroup";

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
  };
  actif?: "" | "x" | "y" | "width" | "height";
}) {
  const { path, actif } = props;
  const { name, viewbox, d } = path;

  const [inModif, setInModif] = useState({ groupe: -1, item: -1 });
  const [vb, setVB] = useState(new ExtendVB(viewbox, actif))


  const [graphyPoints, setGraphyPoints] = useState(
    new SvgPath(d, { rounder: 0.1 }).asGraphi
  );

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
  useEffect(()=>{setVB(new ExtendVB(viewbox, actif))},[viewbox, actif])

  /** Mise à jour des GraphiPoints */
  useEffect(() => {
    setGraphyPoints(
      new SvgPath(d, { rounder: formOptions.rounder }).asGraphi
    );
  }, [d,formOptions]);

  /** Captation du mouvement de la souris ou du doigt */
  useEffect(() => {
    
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
          const newPoints = [...graphyPoints];

          const delta = {
            x: newPos.x - lastMousePos.x,
            y: newPos.y - lastMousePos.y,
          };

          if (
            isClicking.key === "" ||
            isClicking.key === "b" ||
            isClicking.key === "a"
          ) {
            const newPoint = formOptions.roundGraphiPoint(
              newPoints[inModif.groupe].points[inModif.item]
            );

            if (isClicking.key === "") {

              newPoint.x = newPos.x - formOptions.translateX;
              newPoint.y = newPos.y - formOptions.translateY;

            } else if (isClicking.key === "b") {
              newPoint.bx = newPos.x - formOptions.translateX;
              newPoint.by = newPos.y - formOptions.translateY;
              if (newPoint.status === "symétrique") {
                newPoint.dax = - newPoint.dbx;
                newPoint.day = - newPoint.dby;
              }
            } else {
              newPoint.ax = newPos.x - formOptions.translateX;
              newPoint.ay = newPos.y - formOptions.translateY;
              if (newPoint.status === "symétrique") {
                newPoint.dbx = - newPoint.dax;
                newPoint.dby = - newPoint.day;
              }
            }

            newPoints[inModif.groupe].points[inModif.item] = newPoint;
          } else if (isClicking.key === "group") {
            newPoints[inModif.groupe].points = newPoints[
              inModif.groupe
            ].points.map((_, j) => {
              const newPoint = tempGP[inModif.groupe].points[j].copy;

              newPoint.x += delta.x;
              newPoint.y += delta.y;

              return formOptions.roundGraphiPoint(newPoint);
            });
          } else if (isClicking.key === "form") {
            newPoints.forEach((group, i) => {
              group.points = group.points.map((_, j) => {
                const newPoint = tempGP[i].points[j].copy;

                newPoint.x += delta.x;
                newPoint.y += delta.y;

                return formOptions.roundGraphiPoint(newPoint);
              });
            });
          }
          setGraphyPoints(newPoints);
        }
      }
    };
    let lastMousePos = { x: 0, y: 0 };

    let tempGP = [...graphyPoints].map((item) => item.copy);

    if (isClicking.valid) {
      if (imageBox !== null) {
        if (imageBox.current !== null) {
          if (isClicking.event) {
            /** Les coordonnées de la viewbox sur l'écran */
            const { x, y, height, width } =
              imageBox.current.getBoundingClientRect();
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
        }
      }
      if (imageBox.current) {
        if (isClicking.event instanceof MouseEvent) {
          imageBox.current.addEventListener("mousemove", handleMouseMove);
        } else if (isClicking.event instanceof TouchEvent) {
          imageBox.current.addEventListener("touchmove", handleTouchMove);
        }
      }
      if (isClicking.event instanceof MouseEvent) {
        window.addEventListener("mouseup", () => {
          if (inModif.groupe !== -1 && inModif.item !== -1){
            const newPoints = [...graphyPoints] ;
            newPoints[inModif.groupe].points[inModif.item] = formOptions.roundGraphiPoint(newPoints[inModif.groupe].points[inModif.item])
            setGraphyPoints(newPoints)
          }
          
          setIsClicking({ valid: false, key: "" });
          if (imageBox.current) {
            imageBox.current.removeEventListener("mousemove", handleMouseMove);
          }
        });
      } else if (isClicking.event instanceof TouchEvent) {
        window.addEventListener("touchend", () => {
          if (inModif.groupe !== -1 && inModif.item !== -1){
            const newPoints = [...graphyPoints] ;
            newPoints[inModif.groupe].points[inModif.item] = formOptions.roundGraphiPoint(newPoints[inModif.groupe].points[inModif.item])
            setGraphyPoints(newPoints)
          }
          setIsClicking({ valid: false, key: "" });
          if (imageBox.current) {
            imageBox.current.removeEventListener("touchmove", handleTouchMove);
          }
        });
      }
    } else {
      if (imageBox.current) {
        if (isClicking.event instanceof MouseEvent) {
          imageBox.current.removeEventListener("mousemove", handleMouseMove);
        } else if (isClicking.event instanceof TouchEvent) {
          imageBox.current.removeEventListener("touchmove", handleTouchMove);
        }
      }
    }
  }, [isClicking,formOptions,vb,inModif]);

  return (
      <div className={APP_STYLE.PATH.GRAPH.BASE.CADRE} >
        <div className={APP_STYLE.PATH.GRAPH.BASE.BIGBOX}>
          <div className={APP_STYLE.PATH.GRAPH.BASE.SMALLBOX}>
            <h4>Sur toute la forme</h4>
            <PathGraphicFormHandler
              formOptions={formOptions}
              setFormOptions={setFormOptions}
            />
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
        <div className={APP_STYLE.PATH.GRAPH.BASE.SVGBOX}>     {/* //------------------------------------------------------------------- */}
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
                fillOpacity : 0.3,
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
        </div>
      </div>
  );
}
