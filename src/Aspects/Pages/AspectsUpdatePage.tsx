import { useContext, useEffect, useState } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { APP_STYLE } from "../../App/Style/App.bootstrap.style";
import { EntryNumber } from "../../Utilities/Components/EntryNumber";
import { EntryString } from "../../Utilities/Components/EntryString";
import { DEFAULT_ASPECT } from "../../Utilities/Constants/Aspect.defaut";
import { AspectContext } from "../../Utilities/Contexts/Aspect.context";
import { Form } from "react-router-dom";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { Requester } from "../../Utilities/Requester/Requester";
import { UserContext } from "../../Utilities/Contexts/User.context";
import { TransitionContext } from "../../Utilities/Contexts/Transition.context";
import { Aspect } from "../Class/Aspect.class";
import { IconPublicContext } from "../../Utilities/Contexts/IconPublic.context";
import { IconPrivateContext } from "../../Utilities/Contexts/IconPrivate.context";

export function AspectsUpdatePage(props: { aspectId: number }) {
  const { aspectId } = props;
  const { aspects, setAspects } = useContext(AspectContext);
  const { user } = useContext(UserContext);
  const { iconPublic, setIconPublic } = useContext(IconPublicContext);
  const { iconPrivate, setIconPrivate } = useContext(IconPrivateContext);
  
  const { setTransition } = useContext(TransitionContext);

  const [aspect, setAspect] = useState(
    aspects.filter((item) => item.id === aspectId).length > 0
      ? aspects.filter((item) => item.id === aspectId)[0]
      : DEFAULT_ASPECT
  );

  useEffect(()=>{setAspect(
    aspects.filter((item) => item.id === aspectId).length > 0
      ? aspects.filter((item) => item.id === aspectId)[0]
      : DEFAULT_ASPECT
    )},[aspectId])

  const handleAspect = (
    key:
      | "fill_color"
      | "fill_opacity"
      | "stroke_color"
      | "stroke_opacity"
      | "stroke_width"
      | "name",
    value: string | number
  ) => {
    const newAspect = new Aspect(aspect);
    if (
      (key === "fill_color" || key === "stroke_color") &&
      typeof value === "string"
    ) {
      newAspect[key] = [
        "#",
        ...Array(7 - value.length).map((_) => "0"),
        ...value.split("").filter((_, i) => i !== 0),
      ].join("");
    }
    if (key === "name" && typeof value === "string") {
      newAspect[key] = value;
    }
    if (
      (key === "fill_opacity" ||
        key === "stroke_opacity" ||
        key === "stroke_width") &&
      typeof value === "number"
    ) {
      newAspect[key] = value;
    }
    setAspect(newAspect);
  };

  /** Déclenchement d'une modification ou d'une création */

  const handleRequest = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (aspect.id === -1) {
      const newAspect = await Requester.aspect.new(aspect,user.token) ;
      const newAspects = [new Aspect(newAspect), ...aspects] ;
      setAspects(newAspects) ;
    }
    else
    {
      const newAspect = await Requester.aspect.update(aspect,user.token,aspect.id) ;
      const newAspects = aspects.map(item => {
        if (item.id === newAspect.id){
          return new Aspect(newAspect)
        }
        return item
      }) ;
      setAspects(newAspects) ;

      setIconPublic(
        iconPublic.map((item) => {
          item.figures = item.figures.map((jtem) => {
            if (jtem.aspect.id === newAspect.id) {
              jtem.aspect = new Aspect(newAspect);
            }
            return jtem;
          });
          return item;
        })
      );
      setIconPrivate(
        iconPrivate.map((item) => {
          item.figures = item.figures.map((jtem) => {
            if (jtem.aspect.id === newAspect.id) {
              jtem.aspect = new Aspect(newAspect);
            }
            return jtem;
          });
          return item;
        })
      );

    }

    setTransition({
      to: `/aspects/view/${aspect.id}`,
      message: "Enregistrement réussi",
    });
  };

  return (
    <>
      <AppHeader actif={ aspect.id === -1 ? "aspectsNew" : ""} />
      <svg
        width="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
        height="min(calc((1.375rem + 1.5vw)*6),10em,40vw)"
        viewBox={"0 0 100 100"}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="50"
          cy="50"
          r="20"
          style={aspect.style }
        />
      </svg>
      <Form
        method="post"
        onSubmit={handleRequest}
        className={APP_STYLE.PATH.VIEW.CADRE}
      >
        <EntryString
          name="Nom"
          defaultValue={aspect.name}
          setValue={(value?: string) => {
            handleAspect("name", value!);
          }}
        />
        <div>
          <label className={APP_STYLE.APP.ENTRY.LABEL}>Couleur du fond</label>
          <input
            style={{ height: "3em" }}
            className={APP_STYLE.APP.ENTRY.INPUT}
            type="color"
            onChange={(e) => {
              handleAspect("fill_color", e.target.value);
            }}
            defaultValue={aspect.fill_color}
          />
        </div>
        <div>
        <label className={APP_STYLE.APP.ENTRY.LABEL}>
          Transparence du fond
        </label>
        <input
          className={APP_STYLE.APP.ENTRY.INPUT}
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={aspect.fill_opacity}
          onChange={(e) => {
            handleAspect("fill_opacity", Number(e.target.value));
          }}
        />
        </div>
        <div>
        <label className={APP_STYLE.APP.ENTRY.LABEL}>
          Couleur de la bordure
        </label>
        <input
          style={{ height: "3em" }}
          className={APP_STYLE.APP.ENTRY.INPUT}
          type="color"
          defaultValue={aspect.stroke_color}
          onChange={(e) => {
            handleAspect("stroke_color", e.target.value);
          }}
        />
        </div>
        <div>
        <label className={APP_STYLE.APP.ENTRY.LABEL}>
          Transparence de la bordure
        </label>
        <input
          className={APP_STYLE.APP.ENTRY.INPUT}
          type="range"
          min="0"
          max="1"
          step="0.01"
          defaultValue={aspect.stroke_opacity}
          onChange={(e) => {
            handleAspect("stroke_opacity", Number(e.target.value));
          }}
        />
        <EntryNumber
          name="Epaisseur de la bordure"
          min={0}
          step={0.1}
          value={aspect.stroke_width}
          setValue={(value?: number) => {
            handleAspect("stroke_width", value!);
          }}
        />
        </div>
        <div>
        <button
          type="submit"
          //disabled={!isValid || inAdvance}
          className={APP_STYLE.APP.BTN_GOOD}
        >
          {aspectId !== -1
            ? "Enregistrer les modification"
            : "Enregistrer le path"}
        </button>

        <LinkCustom
          className={APP_STYLE.APP.BTN_BAD}
          name={
            aspectId !== -1 ? "Annuler les modification" : "Annuler le création"
          }
          to={
            aspectId !== -1 ? `/aspects/view/${aspectId}` : `/aspects/privates`
          }
        />
        </div>
      </Form>
    </>
  );
}
