import { APP_STYLE, PERSO } from "../../App/Style/App.bootstrap.style";
import { ExtendVB } from "../class/ExtendVB";
import { GraphiFormOptions } from "../class/GraphiFormOptions";
import { GraphiGroup } from "../class/GraphiGroup";
import { GraphiPoint } from "../class/GraphiPoint";

/**
 * Visualisation d'un groupe de points
 *
 * @param props.graphyPoints  Ensemble des points
 * @param props.formOptions   Options de la forme
 * @param props.viewbox       La ViewBox
 * @param props.inModif       Les index en cours de modification
 * @param props.setInModif    Réglage des index en cours de modification
 * @param props.setIsClicking Réglages de l'entité cliqué
 *
 * @version v2
 */
export function PathGraphicGroupView(props: {
  graphyPoints: GraphiGroup[];
  formOptions: GraphiFormOptions;
  viewbox: ExtendVB;
  inModif: { groupe: number; item: number };
  setInModif: (data: { groupe: number; item: number }) => void;
  setIsClicking: (data: {
    valid: boolean;
    key: string;
    event?: MouseEvent | TouchEvent;
  }) => void;
}) {
  const {
    graphyPoints,
    formOptions,
    viewbox,
    inModif,
    setInModif,
    setIsClicking,
  } = props;

  return (
    <g>
      {graphyPoints.map((groupe, i) => {
        return (
          <g key={i}>
            <path
              onMouseDown={(e) => {
                setInModif({ groupe: i, item: -1 });
                setIsClicking({
                  valid: true,
                  key: "group",
                  event: e.nativeEvent,
                });
              }}
              onTouchStart={(e) => {
                setInModif({ groupe: i, item: -1 });
                setIsClicking({
                  valid: true,
                  key: "group",
                  event: e.nativeEvent,
                });
              }}
              d={groupe.asString(formOptions)}
              className={inModif.groupe === i
                  ? APP_STYLE.PATH.GRAPH.GROUPVIEW.LINESELECT
                  : APP_STYLE.PATH.GRAPH.GROUPVIEW.LINE
              }
              style={{
                strokeWidth: viewbox.sizeRef / 100,
              }}
            />
            <g>
              {groupe.points.map((point, j) => {
                const item = formOptions.allOptionsGraphiPoint(point);
                return (
                  <path
                    key={j}
                    onMouseDown={(e) => {
                      setInModif({ groupe: i, item: j });
                      setIsClicking({
                        valid: true,
                        key: "",
                        event: e.nativeEvent,
                      });
                    }}
                    onTouchStart={(e) => {
                      setInModif({ groupe: i, item: j });
                      setIsClicking({
                        valid: true,
                        key: "",
                        event: e.nativeEvent,
                      });
                    }}
                    d={
                      point.status === "dur" ?
                      GraphiPoint.losange(item.x,item.y,viewbox.sizeRef / 50,viewbox.sizeRef / 50) :
                      point.status === "doux" ?
                      GraphiPoint.doux(item.x,item.y,viewbox.sizeRef / 50,viewbox.sizeRef / 50) :
                      GraphiPoint.circle(item.x,item.y,viewbox.sizeRef / 50,viewbox.sizeRef / 50)
                    }
                    className={
                      inModif.groupe === i
                        ? inModif.item === j
                          ? APP_STYLE.PATH.GRAPH.GROUPVIEW.POINTSELECTED
                          : APP_STYLE.PATH.GRAPH.GROUPVIEW.POINTINCLUDE
                        : APP_STYLE.PATH.GRAPH.GROUPVIEW.POINT
                    }
                    style={{
                      fillOpacity : 0.3,
                      strokeWidth: viewbox.sizeRef / 250,
                    }}
                  />
                );
              })}
            </g>
          </g>
        );
      })}
    </g>
  );
}
