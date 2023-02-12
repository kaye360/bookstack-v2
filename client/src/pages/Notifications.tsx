import { useContext } from "react";
import { useNotifications } from "../utils/useNotifications";
import Notification from "../components/layout/Notification";
import { UserContext } from "../components/app/UserContextWrapper";
import PageHeading from "../components/elements/PageHeading";
import TextInline from "../components/elements/TextInline";
import TextBlock from "../components/elements/TextBlock";
import { ButtonPrimaryOutlined } from "../components/elements/buttons";


interface Inotification {
    message:string, 
    url:string, 
    type:string 
}

export default function Notifications() {

    const { user } = useContext(UserContext)

    const { notifications, clearRecentNotifications } = useNotifications(user.id)

    return <>

        <PageHeading>
            Notifications
        </PageHeading>

        <section>
            <h2 className="text-xl font-bold my-4">
                <TextInline>
                    New Notifications
                </TextInline>
            </h2>

            { notifications.recent.length === 0 ? (

                <TextBlock>You are up to date!</TextBlock>

            ) : (
                <>
                    <ButtonPrimaryOutlined
                        onClick={ () => clearRecentNotifications() }
                        className="inline-block mb-8 mt-4 px-4 py-2 rounded bg-transparent border border-primary-500"
                    >
                        Mark all as Read
                    </ButtonPrimaryOutlined>

                    <ul className="animate-notification-flash-light dark:animate-notification-flash-dark">
                        { notifications.recent.map( 
                            (notification: Inotification, index: number) => {
                                return(
                                    <Notification 
                                        type={notification.type} 
                                        url={notification.url} 
                                        key={index}
                                    >
                                        {notification.message}
                                    </Notification>
                                )
                        } )}
                    </ul>
                </>
            )}
        </section>

        <section>
            <h2 className="text-xl font-bold my-4">
                <TextInline>
                    Old Notifications
                </TextInline>
            </h2>

            { notifications.old.length === 0 
                ? <div>You have no notifications.</div>
                : <ul>
                    { notifications.old.map( 
                        (notification: Inotification, index: number) => {
                            return(
                                <Notification type={notification.type} url={notification.url} key={index}>
                                    {notification.message}
                                </Notification>
                            )
                    })}
                </ul>
            }
        </section>

    </>

}

