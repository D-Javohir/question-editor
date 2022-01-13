import '../styles/Account.css'
import { NavLink } from 'react-router-dom';
const AccountMenu = () => {
    const menu = [
    
        {
            id: 2,
            name: "Malaka oshirish",
            icon: "fas fa-graduation-cap",
            link: "/"
        },
      
        {
            id: 5,
            name: "SavolJavob",
            icon: "far fa-file-alt",
            link: "/savoljavob"
        },
        {
            id: 4,
            name: "Search img",
            icon: "far fa-image",
            link: "/unsplash"
        },
    ]
    return (<>
        <div className="accontmenu">
            <ul>

                {menu.map((item, index) => (
                    <NavLink exact className={({ isActive }) => (isActive ? 'inactive' : 'link')} to={item.link} key={index}>
                        <li> <i className={item.icon}></i> {item.name}</li>
                    </NavLink>
                ))}
            </ul>
        </div>
    </>);
}

export default AccountMenu;