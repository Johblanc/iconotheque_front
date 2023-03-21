import { useContext } from "react";
import { AppHeader } from "../../App/Components/AppHeader";
import { AppNav } from "../../App/Components/AppNav";
import { IconItem } from "../../Icon/Components/IconItem";
import { LinkCustom } from "../../Utilities/Components/LinkCustom";
import { PathPrivateContext } from "../../Utilities/Contexts/PathPrivate.context";
import { PathPublicContext } from "../../Utilities/Contexts/PathPublic.context";
import { UserContext } from "../../Utilities/Contexts/User.context";

/**
 * Page de Consultation de profil
 *
 * @version v1
 */
export function UserViewPage(): JSX.Element {
  const { user } = useContext(UserContext);
  const { pathPrivate } = useContext(PathPrivateContext);
  const { pathPublic } = useContext(PathPublicContext);

  const SumPublished = pathPublic.filter(
    (item) => item.user.name === user.name
  ).length;
  const SumCreated = SumPublished + pathPrivate.length;

  const icons = [
    ...pathPublic.filter((item) => item.user.name === user.name),
    ...pathPrivate,
  ];
  return (
    <div>
      <AppHeader />
      <AppNav actif={"profil"} />
      <h2>Profile</h2>
      <div>
        <p>Pseudo : {user.name}</p>
        <p>Mail : {user.mail}</p>
        {SumCreated !== 0 && (
          <p>
            Icônes créée{SumCreated > 1 && "s"} : {SumCreated}{" "}
          </p>
        )}
        {SumPublished !== 0 && (
          <p>
            Icônes publiée{SumPublished > 1 && "s"} : {SumPublished}{" "}
          </p>
        )}
      </div>
      <div>
        <LinkCustom name={"Modifier mon profile"} to={"/user/update"} />
      </div>
      <div>
        <LinkCustom
          name={"Modifier mon mot de passe"}
          to={"/user/passupdate"}
        />
      </div>
      <div>
        <LinkCustom name={"Créer un nouvelle icône"} to={"/paths/new"} />
      </div>
      <h3>Mes Icônes</h3>
      <div>
        {icons.map((item, i) => (
          <IconItem path={item} key={i} />
        ))}
      </div>

      <div>
        <LinkCustom name={"Déconnection"} to={"/user/login"} />
      </div>
    </div>
  );
}
