import React from "react";
import { useNotifications } from "../../utils/useNotifications";
import Loader from "../layout/Loader";

type propTypes = {
    user: number
}

export default function DashboardNotifications({user} : propTypes) {


    const {notifications = [], isLoading, isError} = useNotifications()
    console.log(notifications)

    return(
        <div>
            <h3 className="text-lg font-bold">Notifications</h3>

            { isLoading && <Loader /> }

            { isError && <p>Error loading notifications</p>}

            { notifications.length === 0 &&
                <p>You have no new notifications.</p>
            }

            <ul>
                {
                    notifications.map( 
                        (notification : { message:string, url:string }, index) => {
                            return <li key={index}>{notification.message}</li>
                    } )
                }
            </ul>

        </div>
    )
}