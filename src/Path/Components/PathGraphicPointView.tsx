import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { GraphiFormOptions } from "../class/GraphiFormOptions";
import { GraphiPoint } from "../class/GraphiPoint";

/**
 * Permet l'affichage et la modification graphique d'un point
 *
 * @param props.point           Le point à visualiser
 * @param props.sizeRef         La dimention de référence
 * @param props.formOptions     Les option de la forme
 * @param props.setIsClicking   CallBack de mémorisation de l'entité cliqué
 * 
 * @version v2
 */
export function PathGraphicPointView(props: {
  point: GraphiPoint;
  sizeRef: number;
  formOptions: GraphiFormOptions;
  setIsClicking: (value: {
    valid: boolean;
    key: string;
    event?: MouseEvent | TouchEvent;
  }) => void;
}) {
  const { point: pt, sizeRef, formOptions, setIsClicking } = props;
  const point = formOptions.allOptionsGraphiPoint(pt);

  return (
    <g>
      {point.status !== "dur" && (
        <g>
          {/* Manette de modifiction du vecteur Aval */}
          <path
            className={APP_STYLE.PATH.GRAPH.POINTVIEW.LINE}
            style={{
              strokeWidth: sizeRef / 250,
            }}
            d={`M ${point.x} ${point.y} ${point.bx} ${point.by}`}
          />
          <path
            onMouseDown={(e) => {
              setIsClicking({ valid: true, key: "b", event: e.nativeEvent });
            }}
            onTouchStart={(e) => {
              setIsClicking({ valid: true, key: "b", event: e.nativeEvent });
            }}
            d={
              point.status === "doux"
                ? GraphiPoint.doux(
                    point.bx,
                    point.by,
                    sizeRef / 20,
                    sizeRef / 20
                  )
                : GraphiPoint.circle(
                    point.bx,
                    point.by,
                    sizeRef / 20,
                    sizeRef / 20
                  )
            }
            className={APP_STYLE.PATH.GRAPH.POINTVIEW.SIDE}
            style={{
              fillOpacity: 0.3,
              strokeWidth: sizeRef / 250,
            }}
          />
          {/* Manette de modifiction du vecteur Amont */}
          <path
            className={APP_STYLE.PATH.GRAPH.POINTVIEW.LINE}
            style={{
              strokeWidth: sizeRef / 250,
            }}
            d={`M ${point.x} ${point.y} ${point.ax} ${point.ay}`}
          />
          <path
            className={APP_STYLE.PATH.GRAPH.POINTVIEW.SIDE}
            onMouseDown={(e) => {
              setIsClicking({ valid: true, key: "a", event: e.nativeEvent });
            }}
            onTouchStart={(e) => {
              setIsClicking({ valid: true, key: "a", event: e.nativeEvent });
            }}
            d={
              point.status === "doux"
                ? GraphiPoint.doux(
                    point.ax,
                    point.ay,
                    -sizeRef / 20,
                    sizeRef / 20
                  )
                : GraphiPoint.circle(
                    point.ax,
                    point.ay,
                    sizeRef / 20,
                    sizeRef / 20
                  )
            }
            style={{
              fillOpacity: 0.3,
              strokeWidth: sizeRef / 250,
            }}
          />
        </g>
      )}
      {/* Manette de modifiction du Point */}
      <path
        onMouseDown={(e) => {
          setIsClicking({ valid: true, key: "", event: e.nativeEvent });
        }}
        onTouchStart={(e) => {
          setIsClicking({ valid: true, key: "", event: e.nativeEvent });
        }}
        d={GraphiPoint.losange(point.x, point.y, sizeRef / 30, sizeRef / 30)}
        className={APP_STYLE.PATH.GRAPH.POINTVIEW.POINT}
        style={{
          strokeWidth: sizeRef / 250,
          fillOpacity: 0.3,
        }}
      />
    </g>
  );
}
