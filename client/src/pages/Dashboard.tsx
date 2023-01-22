import React, { useContext } from "react";
import PreviewUsersLibrary from "../components/library/PreviewUsersLibrary";
import Explore from "../components/library/Explore";
import { UserContext } from "../App";
import { useNotifications } from "../utils/useNotifications";
import { Link } from "react-router-dom";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import { useQuery } from "react-query";
import Loader from "../components/layout/Loader";



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




function DashboardCommunityFeed() {

    const { user } = useContext(UserContext)

    async function getFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community')
        const data = await res.json()
        return data
    }

    const { data, isLoading, isError } = useQuery('getCommunityFeed', getFeed)

    if(isError) { 
        return <div>
            Error community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    
    return <>
    <ul className="flex flex-col">
        { data.map( feedItem => (
            <li key={feedItem.id} className="py-4 border-b border-slate-200 last:border-0">
                
                <span className="inline-block mx-4">
                    {feedItem.type === 'upload' && '📖' }
                    {feedItem.type === 'like' && '💟' }
                    {feedItem.type === 'comment' && '💬' }
                </span>
                <span className="mx-4">
                    {feedItem.message}
                </span>
                <Link to={feedItem.link}>View</Link>
            </li>
        ))

        }
    </ul>

    <Link to="/feed">View more activity</Link>

    </>
}