import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import { useNotifications } from "../../utils/useNotifications";

import iconDashboard from "../../assets/img/icon-dashboard.png"
import iconLibrary from "../../assets/img/icon-library.png"
import iconCommunity from "../../assets/img/icon-community.png"
import iconNotifications from "../../assets/img/icon-notifications.png"
import iconProfile from "../../assets/img/icon-profile.png"
import iconAdd from "../../assets/img/icon-add-book.png"


export default function SideBar() {

    const {user } = useContext(UserContext)

    const { amount: notificationsAmount } = useNotifications(user.id)

    return <nav>
        <ul className="
            fixed bottom-0 left-0 right-0 w-full z-50
            flex justify-between
            md:relative md:flex-col md:gap-10 md:justify-start
            p-4 md:px-6 md:py-12 rounded-xl
            bg-primary-700 text-primary-200 
        ">
            <NavLink to="/dashboard" icon={iconDashboard}>Dashboard</NavLink>
            <NavLink to="/library" icon={iconLibrary}>Library</NavLink>
            <NavLink to="/feed" icon={iconCommunity}>Community</NavLink>
            <NavLink to="/notifications" icon={iconNotifications}>
                Notifications
                {notificationsAmount.recent > 0 &&
                    <NotificationBubble>{notificationsAmount.recent}</NotificationBubble>
                }
            </NavLink>
            <NavLink to={`/user/${user.username}`} icon={iconProfile}>Profile</NavLink>
            <NavLink to="/library/add" icon={iconAdd}>Add</NavLink>
        </ul>
</nav>
}


function NavLink({to, icon, children}) {

    // If on active page, to === location.pathname

    const location = useLocation()

    return <li>
        <Link to={to} className={`
            grid gap-2 items-center
            md:grid-cols-[40px_1fr] md:justify-start
            px-4 py-2
            font-bold text-primary-100 text-center md:text-left
            ${to === location.pathname && 
                'rounded bg-primary-600 '
            }
            `}>
            <img src={icon} className="mx-auto md:mx-0"/>
            <div className="hidden sm:block">{children}</div>
        </Link>
    </li>
}



function NotificationBubble({children}) {

    return <span className="inline-flex items-center justify-center mx-1 bg-rose-500 rounded-full aspect-square w-6">
        {children}
    </span>
}