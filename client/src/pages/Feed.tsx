import { useQuery } from "react-query";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";
import { Link, useLocation } from "react-router-dom"
import bookNoCover from  "../assets/img/book-no-cover.png"




interface Inotification {
    [key: string] : string | number
}

export default function Feed() {

    async function getFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community')
        return res
    }

    const { data, isLoading, isError } = useQuery('getCommunityFeed', getFeed)

    // console.log(Array.isArray(data) ? data[0] : 'no data')

    if(isError) { 
        return <div>
            Error loading community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    


    return <div className="w-full max-w-2xl">

        <h1 className="mb-4 text-3xl">Community Feed</h1>

        <ul className="flex flex-col gap-12 w-full max-w-xl ">
            { data.map( (notification : Inotification ) => (
                <Notification key={notification.id} notification={notification} />
            ))}
        </ul>

    </div>

}






interface Iicons {
    [key: string] : string
}


function Notification({notification}) {

    const location = useLocation()
    console.log(notification)

    const icons: Iicons = {
        upload : '📖',
        comment : '💬',
        like : '💟',
    }

    return <li className="flex flex-col gap-6 px-4 py-8 rounded-xl bg-primary-750">

        <span className="flex items-start gap-2 mr-4 py-2 italic font-light">

            <span>{ icons[notification.type] }</span>
            <span>{ notification.message }</span>

        </span>

        <img 
            src={notification.image_url ? notification.image_url : bookNoCover} 
            className={`
                ${ notification.image_url ? 'aspect-square object-cover object-top w-full' : 'w-10/12'} mx-auto `} 
            alt="Book Cover"
        />

        { notification.comment && <blockquote className="flex flex-wrap items-start gap-2">
            <span className="inline-block rounded-3xl px-4 py-1 bg-primary-900">
                {notification.username}
            </span>

            <p className=" max-w-md">
                {notification.comment}
            </p>
        </blockquote>
        }

        <Link 
            to={ notification.link } state={ {from : location.pathname } } 
            className="px-4 py-2 border border-primary-600 hover:border-secondary-300 text-primary-100 rounded text-center"
        >
            View
        </Link>

    </li>
}
