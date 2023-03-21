import { LinkCustom } from "../../Utilities/Components/LinkCustom";



export function ErrorPage(){


  return (
    <div id="error-page">
      <h1>404 !</h1>
      <p>Cette page n'existe pas</p>
      <LinkCustom name={"Retour au site"} to={"/"} />
    </div>
  );
}