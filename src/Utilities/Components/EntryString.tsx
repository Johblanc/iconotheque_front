/**
 * Une entrée utilisateur textuelle en une ligne
 *
 * @param name          Nom de l'entry
 * @param defaultValue  Valeur par défaut
 * @param setter        CallBack de réglage
 * @param isPass        *option* — L'entry contient-elle un mot de passe
 *
 * @version v1
 */
export function EntryString(props: {

  /** Nom de l'entry */
  name: string;

  /** Valeur par défaut */
  defaultValue: string;

  /** CallBack de réglage */
  setter: (value: string) => void;

  /** L'entry contient-elle un mot de passe */
  isPass?: boolean;

}): JSX.Element {

  const { name, defaultValue, setter, isPass } = props;

  return (
    <div className="">

      <label className="">{name}</label>

      <input
        type={isPass ? "password" : "text"}
        className=""
        placeholder={name}
        aria-label="search"
        onChange={(e) => setter(e.target.value)}
        defaultValue={defaultValue}
      />
      
    </div>
  );
}
