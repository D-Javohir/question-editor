import React from "react"
import "../styles/Header.css"
import { NavLink } from 'react-router-dom';
const Header = () => {
    const menu = [

        {
            id: 2,
            name: "Savol Yarating",
            icon: "fas fa-graduation-cap",
            link: "/"
        },

        {
            id: 5,
            name: "SavolJavob",
            icon: "far fa-file-alt",
            link: "/savoljavob"
        },
    ]
    return (
        <header className="Header">
            <nav className="nav1">
                <NavLink to={'/'}>
                    <div>
                        <img src="https://www.qtlms.uz/images/assets/logo.png" alt="logo" />
                    </div>
                </NavLink>


                <div className="d-flex align-items-center mt-3"><input type="search" placeholder="Nima o'rganishni hohlaysz" className="searchbar" /> <i className="fas fa-search"></i></div>

            </nav>
            <nav className="nav2">
                <ul>

                    {menu.map((item, index) => (
                        <NavLink exact className={({ isActive }) => (isActive ? 'inactive' : 'link')} to={item.link} key={index} >
                            <li> <i className={item.icon}></i> {item.name}</li>
                        </NavLink>
                    ))}
                </ul>
            </nav>
        </header>

    );
}
export default Header;