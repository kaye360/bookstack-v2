import { useInfiniteQuery, useQuery } from "react-query";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";
import { Link, useLocation } from "react-router-dom"
import bookNoCover from  "../assets/img/book-no-cover.png"
import React from "react";




interface IfeedItem {
    [key: string] : string | number
}

export default function Feed() {

    const perPage = 10

    async function getFeed({pageParam = 1}) {
        const res = await httpReq.get(API_BASE_URL + `/community?perpage=${perPage}&page=${pageParam}`)
        return res
    }

    const { 
        data: feed, 
        isLoading, 
        isError,
        isFetchingNextPage,
        hasNextPage,
        fetchNextPage
    } = useInfiniteQuery(
        ['getCommunityFeed'], 
        getFeed,
        {
            getNextPageParam : (lastPage, pages) => {
                const pageCount: number = Math.ceil(lastPage?.count / perPage)
                return pages.length < pageCount ? pages.length + 1 : undefined
            }
        } 
    )

    
    if(isError) { 
        return <div>
            Error loading community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    
    return <div className="w-full max-w-2xl">

        <h1 className="mb-8 text-3xl">Community Feed</h1>

        <ul className="flex flex-col gap-12 w-full max-w-xl">
            { feed.pages.map( (page, i) => (
                <React.Fragment key={i}>
                    { page.data.map( (feedItem : IfeedItem ) => (
                        <FeedItem key={feedItem.id} feedItem={feedItem} />
                     ))}
                </React.Fragment>
            ))}
        </ul>

        { hasNextPage &&
            <button
                className="block w-full max-w-xl my-4 py-4 text-center bg-transparent text-primary-200 hover:border-primary-200"
                onClick={ () => {
                    fetchNextPage()
                }}
            >
                {isFetchingNextPage ? 'Loading...' : 'Load More' }
            </button>
        }



    </div>

}






interface Iicons {
    [key: string] : string
}


function FeedItem({feedItem}) {

    const location = useLocation()

    const icons: Iicons = {
        upload : '📖',
        comment : '💬',
        like : '💟',
    }

    return <li className="flex flex-col gap-6 px-4 py-8 rounded-xl bg-primary-750">

        <span className="flex items-start gap-2 mr-4 italic font-light">

            <span>{ icons[feedItem.type] }</span>
            <span>{ feedItem.message }:</span>

        </span>



        { feedItem.comment && <><blockquote className="flex flex-wrap items-start gap-2">
            <span className="inline-block rounded-3xl px-4 py-1 bg-primary-900">
                {feedItem.username}
            </span>

            <p className=" max-w-md">
                {feedItem.comment}
            </p>
        </blockquote>

        <div className="border border-primary-600"></div>
        </>
        }

        <img 
            src={feedItem.image_url ? feedItem.image_url : bookNoCover} 
            className={`
                ${ feedItem.image_url ? 'aspect-square object-cover object-top w-full' : 'w-10/12'} mx-auto `} 
            alt="Book Cover"
        />

        <Link 
            to={ feedItem.link } state={ {from : location.pathname } } 
            className="px-4 py-2 border border-primary-600 hover:border-secondary-300 text-primary-100 rounded text-center"
        >
            View
        </Link>

    </li>
}
