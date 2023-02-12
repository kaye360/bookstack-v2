import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNotifications } from "../../utils/useNotifications";

import { UserContext } from "../app/UserContextWrapper";
import Separator from "./Separator";
import Icon from "../elements/Icon";
import TextInline from "../elements/TextInline";
import TextFlex from "../elements/TextFlex";


export default function SideBar() {

    const { user } = useContext(UserContext)

    const { amount: notificationsAmount } = useNotifications(user.id)

    return <nav className="
        fixed bottom-0 left-0 right-0 w-full z-50
        md:relative p-4 md:px-2 md:py-8 md:max-w-[250px]
        dark:bg-primary-750 bg-primary-100
        bg-starsVertical bg-repeat-space
        text-primary-200 border-t-4 border-primary-200 dark:border-primary-750 md:border-0
        drop-shadow-sidebar-light dark:drop-shadow-sidebar-dark
        rounded-xl
    ">
        <ul className="relative z-50 flex justify-between md:flex-col md:gap-6 md:justify-start">
            <User username={user.username} />
            <NavLink to="/dashboard" icon="dashboard">Dashboard</NavLink>
            <NavLink to="/library" icon="library_books">Library</NavLink>
            <NavLink to="/feed" icon="groups">Community</NavLink>
            <NavLink to="/notifications" icon="notifications">
                Notifications
                <NotificationBubble amount={notificationsAmount.recent}>{notificationsAmount.recent}</NotificationBubble>
            </NavLink>
            <NavLink to={`/user/${user.username}`} icon="account_circle">Profile</NavLink>
            <NavLink to="/library/add" icon="library_add">Add</NavLink>

        </ul>

    </nav>
}




interface UserProptype {
    username: string
}

function User({username}: UserProptype) {

    return <li className="hidden md:block px-4">
                
        <TextInline className="text-sm"> 
            Logged in as:<br />
        </TextInline>

        <TextFlex className="my-2 text-xl font-medium text-primary-800 dark:text-primary-100 bg-primary-100 dark:bg-primary-750 overflow-hidden hover:overflow-visible">
            <Icon icon="person" />
            {username}
        </TextFlex>

        <Separator className="mt-2" />
    </li>
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
            font-bold text-center md:text-left transition-all duration-[50ms]
            text-primary-800 hover:text-primary-600 hover:bg-primary-150
            dark:text-primary-100 dark:hover:text-primary-100 dark:hover:bg-primary-700
            ${to === location.pathname && 
                'rounded bg-primary-250 dark:bg-primary-600'
            }
            `}>
            <Icon icon={icon} />
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
                bg-secondary-500 rounded-full text-primary-800 text-sm font-bold
            ">
            {children}
        </span>
    }

    return <></>
}