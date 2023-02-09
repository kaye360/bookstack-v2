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
import bookNoCover from "../assets/img/book-no-cover.png"


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


interface IfeedItem {
    id: number,
    type : 'upload' | 'like' | 'comment',
    message : string,
    comment : string,
    link : string,
    image_url : string,
}


function DashboardCommunityFeed() {

    async function getFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community?perpage=10&page=1')
        return res
    }

    const { data: feed, isLoading, isError } = useQuery('getDashCommunityFeed', getFeed)

    if(isError) { 
        return <div>
            Error loading community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    
    return <ul className="flex flex-col gap-8">
        { feed.data.length !== 0
            ? feed.data.slice(0,10).map( (feedItem : IfeedItem) => (
                <li key={feedItem.id} className="grid grid-cols-[1fr_2fr] gap-4 p-8 bg-primary-750 rounded-2xl">

                    <div>
                        <img src={feedItem.image_url ? feedItem.image_url : bookNoCover} alt="Book Cover" />
                    </div>

                    <div className="flex flex-col justify-between gap-6">
                        <h3 className="inline-block">
                            {feedItem.type === 'upload' && '📖' }
                            {feedItem.type === 'like' && '💟' }
                            {feedItem.type === 'comment' && '💬' }
                            &nbsp;
                            {feedItem.message}
                        </h3>

                        {feedItem.comment && <p className="italic">"{feedItem.comment}"</p> }

                        <div>
                            <Link to={feedItem.link} 
                                className="inline-block px-2 border rounded-md border-primary-400 px1 py-2 text-primary-200 hover:border-secondary-300"
                            >
                                View
                            </Link>
                        </div>
                    </div>
                </li>
            ))
            : <div className="p-4 rounded bg-primary-700">
                This user has no recent activity.
            </div>
        }
    </ul>
}