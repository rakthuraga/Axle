import { NavLink } from 'react-router-dom';
import styles from '../css/NavItem.module.css'

function NavItem({route}) {
    return (
        <NavLink to={route.path} className={({ isActive }) => isActive ? `${styles.navitem} ${styles.navactive}` : styles.navitem}>
            <img src={route.icon} alt={`${route.name} icon`} />
        </NavLink>
    )
}

export default NavItem;