import { useContext } from "react";
import PreviewUsersLibrary from "../components/library/PreviewUsersLibrary";
import Explore from "../components/library/Explore";
import { useNotifications } from "../utils/useNotifications";
import { Link } from "react-router-dom";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import { useQuery } from "react-query";
import Notification from "../components/layout/Notification";
import Loader from "../components/layout/Loader";
import { UserContext } from "../components/app/UserContextWrapper";


export default function Dashboard() {

    const { user } = useContext(UserContext)
    
    return(
        <>
            <h1 className="text-4xl">Dashboard</h1>

            <section className="grid gap-4 md:grid-cols-2">

                <div className="flex items-center text-xl">
                    Welcome back, {user.username}
                </div>

                <DashboardNotifications />
            </section>

            <PreviewUsersLibrary />

            <Explore />

            <section className="my-4">
                <h2 className="text-4xl">Community Feed</h2>
                
                <DashboardCommunityFeed />
                
            </section>
        </>
    )

}





function DashboardNotifications() {

    const { user } = useContext(UserContext)

    const { notifications, amount } = useNotifications(user.id)


    return(
        <div className="rounded-xl bg-primary-700 p-4">
            <h3 className="text-lg font-bold">Notifications</h3>


            { amount.recent === 0 &&
                <p>You have no new notifications.</p>
            }

            <ul>
                {
                    notifications.recent.map( 
                        (notification : { message:string, url:string, type:string }, index) => (
                            <Notification key={index} type={notification.type} url={notification.url} >
                                {notification.message}
                            </Notification>
                        )
                    )
                }
            </ul>

            <Link to="/notifications"
                className="inline-block my-6 px-4 py-2 rounded-lg border border-primary-200 hover:border-secondary-400"
            >
                View your recent notifications
            </Link>

        </div>
    )
}




function DashboardCommunityFeed() {

    async function getFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community')
        return res
    }

    const { data, isLoading, isError } = useQuery('getCommunityFeed', getFeed)

    if(isError) { 
        return <div>
            Error loading community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    
    return <>
    <ul className="flex flex-col">
        { data.slice(0,15).map( feedItem => (
            <Notification key={feedItem.id} type={feedItem.type} url={feedItem.link} >
                {feedItem.message}
            </Notification>
        ))

        }
    </ul>

    <Link to="/feed">View more activity</Link>

    </>
}