import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../UserContext";
import styles from "./Navbar.module.css"

function Navbar(props) {
  const user = useContext(UserContext);

  return (
    <>
    <nav  className={styles.navbarmain}>
        <div className={styles.link}>
          {
            user ?
            <div className={styles.containerlink}>
            <h3>vous êtes connecté sur le compte : {user.email}</h3>
            <Link className={styles.linknav} to={''} onClick={() => {
              props.onTokenChange()
            }}>Déconnexion</Link>
            </div>
            :
            <>
            <Link className={styles.linknav} to={'/signup'}>Inscription</Link>
            <Link className={styles.linknav} to={'/signin'}>Connexion</Link>
            </>
          }
          
        </div>
    </nav>
    <hr className="mb-0" style={{ color: "black" }} />
    </>

  );
}

export default Navbar;
