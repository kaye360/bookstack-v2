import React from "react";
import { useNotifications } from "../../utils/useNotifications";
import { Link } from "react-router-dom";

type propTypes = {
    user: number
}

export default function DashboardNotifications({user} : propTypes) {


    const { notifications, amount } = useNotifications()

    return(
        <div>
            <h3 className="text-lg font-bold">Notifications</h3>


            { amount.recent === 0 &&
                <p>You have no new notifications.</p>
            }

            <ul>
                {
                    notifications.recent.map( 
                        (notification : { message:string, url:string }, index) => {
                            return <li key={index}>{notification.message}</li>
                    } )
                }
            </ul>

            <Link to="/notifications">View your recent notifications</Link>

        </div>
    )
}