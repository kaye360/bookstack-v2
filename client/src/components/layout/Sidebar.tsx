import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../../utils/useNotifications";

import iconDashboard from "../../assets/img/icon-dashboard.png"
import iconLibrary from "../../assets/img/icon-library.png"
import iconCommunity from "../../assets/img/icon-community.png"
import iconNotifications from "../../assets/img/icon-notifications.png"
import iconProfile from "../../assets/img/icon-profile.png"
import iconAdd from "../../assets/img/icon-add-book.png"
import { UserContext } from "../app/UserContextWrapper";


export default function SideBar() {

    const { user } = useContext(UserContext)

    const { amount: notificationsAmount } = useNotifications(user.id)

    return <nav className="">
        <ul className="
            fixed bottom-0 left-0 right-0 w-full z-50
            flex justify-between
            md:relative md:flex-col md:gap-10 md:justify-start
            p-4 md:px-6 md:py-12 rounded-xl
            bg-primary-800 text-primary-200 border-t-4 border-primary-750 md:border-0
             drop-shadow-sidebar
        ">
            <NavLink to="/dashboard" icon={iconDashboard}>Dashboard</NavLink>
            <NavLink to="/library" icon={iconLibrary}>Library</NavLink>
            <NavLink to="/feed" icon={iconCommunity}>Community</NavLink>
            <NavLink to="/notifications" icon={iconNotifications}>
                Notifications
                <NotificationBubble amount={notificationsAmount.recent}>{notificationsAmount.recent}</NotificationBubble>
            </NavLink>
            <NavLink to={`/user/${user.username}`} icon={iconProfile}>Profile</NavLink>
            <NavLink to="/library/add" icon={iconAdd}>Add</NavLink>
        </ul>
</nav>
}


function NavLink({to, icon, children}) {

    // If on active page, to === location.pathname
    
    let linkText: string = Array.isArray(children) ? children[0] : children
    let notificationBubble = Array.isArray(children) && children[1] ? children[1] : false

    const location = useLocation()

    return <li>
        <Link to={to} className={`
            grid gap-2 items-center
            md:grid-cols-[40px_1fr] md:justify-start
            relative px-4 py-2
            font-bold text-primary-100 text-center md:text-left
            ${to === location.pathname && 
                'rounded bg-primary-600 '
            }
            `}>
            <img src={icon} className="mx-auto md:mx-0"/>
            <div>
                <span className="hidden sm:inline">{linkText}</span>
                { notificationBubble && notificationBubble }
            </div>
        </Link>
    </li>
}



function NotificationBubble({children, amount}) {

    if(amount > 0) {
        return <span 
            className="
                absolute top-0 left-1/2
                md:static md:left-0
                inline-flex items-center justify-center 
                mx-1 aspect-square w-6
                bg-rose-500 rounded-full 
            ">
            {children}
        </span>
    }

    return <></>
}