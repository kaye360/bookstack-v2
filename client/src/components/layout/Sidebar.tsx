import { useContext } from "react";
import { Link } from "react-router-dom";
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
        <ul className="flex flex-col gap-12 bg-primary-700 text-primary-200 px-4 py-12 rounded-xl">
            <NavLink to="/dashboard" icon={iconDashboard}>Dashboard</NavLink>
            <NavLink to="/library" icon={iconLibrary}>Library</NavLink>
            <NavLink to="/feed" icon={iconCommunity}>Feed</NavLink>
            <NavLink to="/notifications" icon={iconNotifications}>
                Notifications
                {notificationsAmount.recent > 0 &&
                    <NotificationBubble>{notificationsAmount.recent}</NotificationBubble>
                }
            </NavLink>
            <NavLink to={`/user/${user.username}`} icon={iconProfile}>Profile</NavLink>
            <NavLink to="/add" icon={iconAdd}>Add</NavLink>
        </ul>
</nav>
}


function NavLink({to, icon, children}) {

    return <li>
        <Link to={to} className='grid grid-cols-[40px_1fr] items-center font-bold text-primary-100'>
            <img src={icon} />
            {children}
        </Link>
    </li>
}


function NotificationBubble({children}) {

    return <span className="inline-flex items-center justify-center mx-1 bg-rose-500 rounded-full aspect-square w-6">
        {children}
    </span>
}