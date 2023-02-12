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
import { ButtonPrimaryOutlined, ButtonPrimaryPlain } from "../components/elements/buttons";
import PageHeading from "../components/elements/PageHeading";
import TextInline from "../components/elements/TextInline";
import Icon from "../components/elements/Icon";
import TextFlex from "../components/elements/TextFlex";
import TextBlock from "../components/elements/TextBlock";


export default function Dashboard() {

    const { user } = useContext(UserContext)
    
    return(
        <div className="flex flex-col gap-16">
            <PageHeading>
                Dashboard
            </PageHeading>

            <TextFlex className="text-2xl font-medium">
                <Icon icon="bookmark" />
                Welcome back, {user.username}
            </TextFlex>

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
        <section className="
            flex flex-col gap-8 rounded-xl p-8
            bg-gradient-to-r from-primary-100 to-primary-50
            dark:bg-gradient-to-r dark:from-primary-750 dark:to-primary-800
        ">
            <h2>
                <TextInline className="text-2xl font-semibold">
                    Notifications
                </TextInline>
            </h2>


            { amount.recent === 0 &&
                <p>
                    <TextInline>
                        You have no new notifications.
                    </TextInline>
                </p>
            }

            <ul>
                {
                    notifications.recent.slice(0, 5).map( 
                        (notification : { message:string, url:string, type:string }, index) => (
                            <Notification key={index} type={notification.type} url={notification.url} >
                                {notification.message}
                            </Notification>
                        )
                    )
                }
            </ul>

            <Link to="/notifications">
                <ButtonPrimaryOutlined>
                    <Icon icon="notifications" />
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
            <h2 className="text-3xl">
                <TextInline>
                    Community Feed
                </TextInline>
            </h2>

            <ul className="flex flex-col gap-8">
            { feed.data.length !== 0 ? (
                feed.data.slice(0,10).map( (feedItem : IfeedItem) => {

                    const iconTypes = {
                        upload : 'book',
                        comment : 'chat_bubble',
                        like : 'favorite',
                    }

                    return (

                        <li key={feedItem.id} className="grid grid-cols-[1fr_2fr] gap-4 p-8 rounded-2xl bg-gradient-to-l dark:from-primary-900 dark:to-primary-750 from-primary-100 to:primary-200 ">

                            <div>
                                <img src={feedItem.image_url ? feedItem.image_url : bookNoCover} alt="Book Cover" />
                            </div>

                            <div className="flex flex-col justify-between gap-6">
                                <h3 className="inline-block">
                                    <TextFlex>
                                        <Icon icon={iconTypes[feedItem.type]} className="text-primary-300" />
                                        {feedItem.message}
                                    </TextFlex>
                                </h3>

                                { feedItem.comment && 
                                    <TextBlock>
                                        <p className="italic">"{feedItem.comment}"</p> 
                                    </TextBlock>
                                }

                                <Link to={feedItem.link}>
                                    <ButtonPrimaryOutlined>
                                        View
                                    </ButtonPrimaryOutlined>
                                </Link>
                            </div>
                        </li>
                    )
                })

            ) : ( 
                <div className="p-4 rounded bg-primary-700">
                    This user has no recent activity.
                </div>
            )}

            </ul>
        </section>
    )
}