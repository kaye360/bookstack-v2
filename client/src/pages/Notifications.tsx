import React from "react";
import { useNotifications } from "../utils/useNotifications";

export default function Notifications() {

    const { notifications, amount, clearRecentNotifications } = useNotifications(21)


    return <>

        <h1 className="text-4xl">Notifications</h1>

        <section>
            <h2 className="text-xl font-bold my-0">New</h2>

            { notifications.recent.length === 0 
                ? <div>You are up to date!</div>
                : <>
                    <ul className="animate-notification-flash">
                        { notifications.recent.map( (notification: { message:string, url:string }, index) => {
                            return <li key={index}>{notification.message}, {notification.url}</li>
                        } )}
                    </ul>
                    <button onClick={ () => clearRecentNotifications() }>Mark as Read</button>
                </>
            }
        </section>

        <section>
            <h2 className="text-xl font-bold my-0">Old</h2>

            { notifications.old.length === 0 
                ? <div>You have no new notifications.</div>
                : <ul>
                    { notifications.old.map( (notification: { message:string, url:string }, index) => {
                        return <li key={index}>{notification.message}</li>
                    } )}
                </ul>
            }
        </section>



    </>

}