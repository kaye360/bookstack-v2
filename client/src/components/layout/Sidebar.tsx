import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import { useNotifications } from "../../utils/useNotifications";


export default function SideBar() {

    const {user } = useContext(UserContext)

    const { amount: notificationsAmount } = useNotifications(user.id)

    return <nav>
    <ul className="flex items-center justify-end gap-4 bg-slate-700 text-slate-200 p-2">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/library">Library</Link></li>
        <li><Link to="/feed">Feed</Link></li>
        <li>
            <Link to="/notifications">
                Notifications
                {notificationsAmount.recent > 0 &&
                    <span className="inline-flex items-center justify-center mx-1 bg-rose-500 rounded-full aspect-square w-6">
                        {notificationsAmount.recent}
                    </span>
                }
            </Link>
        </li>
        <li><Link to={`/user/${user.username}`}>Profile</Link></li>
    </ul>
</nav>
}