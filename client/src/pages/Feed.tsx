import { useQuery } from "react-query";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";
import Notification from "../components/layout/Notification";

interface IFeedItem {
    id: number,
    type: string,
    link: string,
    message: string
}

export default function Feed() {

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
    


    return <div className="w-full max-w-2xl mx-auto">
    <h1 className="mb-4">Community Feed</h1>
    <ul>
        { data.map( (feedItem : IFeedItem ) => (
            <Notification key={feedItem.id} type={feedItem.type} url={feedItem.link} >
                {feedItem.message}
            </Notification>
        ))

        }
    </ul>
    </div>

}
