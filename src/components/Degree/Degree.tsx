import { NavLink } from 'react-router-dom';
import style from './Degree.module.css';

const Degree = () => {
    return (
        <nav className={style.headerNav}>
            <NavLink
                to="/masters"
                className={({ isActive }) =>
                    isActive
                        ? `${style.navElement} ${style.active}`
                        : style.navElement
                }
            >
                Магістри
            </NavLink>
            <NavLink
                to="/bachelors"
                className={({ isActive }) =>
                    isActive
                        ? `${style.navElement} ${style.active}`
                        : style.navElement
                }
            >
                Бакалаври
            </NavLink>
        </nav>
    );
};

export default Degree;
