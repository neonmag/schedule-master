import { NavLink } from 'react-router-dom';

import style from './Menu.module.css';

const Menu = () => {
    return (
        <nav className={style.headerNav}>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `${style.navElement} ${style.active}`
                        : style.navElement
                }
                to="/"
            >
                Розклад
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    isActive
                        ? `${style.navElement} ${style.active}`
                        : style.navElement
                }
                to="/about"
            >
                Додаткова інформація
            </NavLink>
        </nav>
    );
};

export default Menu;
