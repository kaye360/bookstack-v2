import { useContext } from "react";
import { UserContext } from "../App";
import { useNotifications } from "../utils/useNotifications";
import Notification from "../components/layout/Notification";

export default function Notifications() {

    const { user } = useContext(UserContext)

    const { notifications, amount, clearRecentNotifications } = useNotifications(user.id)

    return <>

        <h1 className="text-4xl">Notifications</h1>

        <section>
            <h2 className="text-xl font-bold my-0">New</h2>

            { notifications.recent.length === 0 
                ? <div>You are up to date!</div>
                : <>
                    <ul className="animate-notification-flash">
                        { notifications.recent.map( 
                            (notification: { message:string, url:string, type:string }, index: number) => {
                                return(
                                    <Notification type={notification.type} url={notification.url} key={index}>
                                        {notification.message}
                                    </Notification>
                            )
                        } )}
                    </ul>
                    <button onClick={ () => clearRecentNotifications() }>Mark as Read</button>
                </>
            }
        </section>

        <section>
            <h2 className="text-xl font-bold my-0">Old</h2>

            { notifications.old.length === 0 
                ? <div>You have no notifications.</div>
                : <ul>
                    { notifications.old.map( 
                        (notification: { message:string, url:string, type:string }, index: number) => {
                            return(
                                <Notification type={notification.type} url={notification.url} key={index}>
                                    {notification.message}
                                </Notification>
                            )
                    } )}
                </ul>
            }
        </section>

    </>

}

