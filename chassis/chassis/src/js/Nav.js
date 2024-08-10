import { Navbar } from "react-bootstrap";
import styles from '../css/Nav.module.css'
import NavItem from "../components/js/NavItem";
import logo from "../img/logo.svg";

function Nav({routes}) {
    return (
        <Navbar className={`nav-bar ${styles.nav}`}>
            <img src={logo} alt="Logo" className={styles.logo} />

            {routes.map((route, index) => 
                <NavItem route={route} key={index} />
            )}
        </Navbar>
    )
}

export default Nav;