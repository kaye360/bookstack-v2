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
import { ButtonPrimaryOutlined } from "../components/elements/buttons";


export default function Dashboard() {

    const { user } = useContext(UserContext)
    
    return(
        <div className="flex flex-col gap-20">
            <h1 className="text-4xl">Dashboard</h1>

            <div className="text-2xl">
                Welcome back, {user.username}
            </div>

            <DashboardNotifications />

            <PreviewUsersLibrary />

            <Explore />

            <DashboardCommunityFeed />
                
        </div>
    )

}





function DashboardNotifications() {

    const { user } = useContext(UserContext)

    const { notifications, amount } = useNotifications(user.id)


    return(
        <section className="flex flex-col gap-8 rounded-xl bg-gradient-to-r from-primary-750 to bg-primary-800  p-8">
            <h2 className="text-3xl">Notifications</h2>


            { amount.recent === 0 &&
                <p>You have no new notifications.</p>
            }

            <ul>
                {
                    notifications.recent.slice(0, 3).map( 
                        (notification : { message:string, url:string, type:string }, index) => (
                            <Notification key={index} type={notification.type} url={notification.url} >
                                {notification.message}
                            </Notification>
                        )
                    )
                }
            </ul>

            <Link to="/notifications">
                <ButtonPrimaryOutlined >
                    View your recent notifications
                </ButtonPrimaryOutlined>
            </Link>

        </section>
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
        const res = await httpReq.get(API_BASE_URL + '/community?perpage=5&page=1')
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
    
    return (
        <section className="flex flex-col gap-8">
            <h2 className="text-3xl mb-6">Community Feed</h2>

            <ul className="flex flex-col gap-8">
            { feed.data.length !== 0
                ? feed.data.slice(0,10).map( (feedItem : IfeedItem) => (
                    <li key={feedItem.id} className="grid grid-cols-[1fr_2fr] gap-4 p-8 rounded-2xl bg-gradient-to-l from-primary-900 to-primary-750 ">

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
        </section>
    )
}