import { useInfiniteQuery, useQuery } from "react-query";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";
import { Link, useLocation } from "react-router-dom"
import bookNoCover from  "../assets/img/book-no-cover.png"
import React from "react";
import Icon from "../components/elements/Icon";
import TextBlock from "../components/elements/TextBlock";
import PageHeading from "../components/elements/PageHeading";
import TextFlex from "../components/elements/TextFlex";
import Separator from "../components/layout/Separator";
import TextInline from "../components/elements/TextInline";
import { ButtonPrimaryFilled, ButtonPrimaryOutlined } from "../components/elements/buttons";




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
        return (
            <TextBlock>
                Error loading community feed.
            </TextBlock>
        )
    }

    if(isLoading) {
        return <Loader />
    }
    
    return (
        <div className="flex flex-col gap-8 w-full max-w-2xl">

            <PageHeading>
                Community Feed
            </PageHeading>

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
                <ButtonPrimaryFilled
                    className="justify-center max-w-xl"
                    onClick={ () => {
                        fetchNextPage()
                    }}
                >
                    {isFetchingNextPage ? 'Loading...' : 'Load More' }
                </ButtonPrimaryFilled>
            }

        </div>

    )
}






interface Iicons {
    [key: string] : string
}


function FeedItem({feedItem}) {

    const location = useLocation()

    const icons: Iicons = {
        upload : 'book',
        comment : 'chat_bubble',
        like : 'favorite',
    }

    return (
        <li className={`
            flex flex-col gap-6 px-4 py-8 rounded-xl 
            bg-gradient-to-r from-primary-150 to-primary-100
            dark:from-primary-900 dark:to-primary-750`}>

            <TextFlex>

                <Icon icon={ icons[feedItem.type] } className="text-primary-300 translate-y-[2px]" />

                <span className="italic">
                    { feedItem.message }:
                </span>

            </TextFlex>


            { feedItem.comment && (
                <>
                    <blockquote className="flex flex-wrap items-start gap-2">
                        <span className="inline-block rounded-3xl px-4 py-1 bg-primary-300 text-primary-800 font-semibold">
                            {feedItem.username}
                        </span>

                        <p className="max-w-md">
                            <TextInline>
                                {feedItem.comment}
                            </TextInline>
                        </p>
                    </blockquote>

                    <Separator />
                </>
            )}

            <img 
                src={feedItem.image_url ? feedItem.image_url : bookNoCover} 
                className={`
                    ${ feedItem.image_url ? 'aspect-square object-cover object-top w-full' : 'w-10/12  opacity-30 dark:opacity-100'} mx-auto`} 
                alt="Book Cover"
            />

            <Link to={ feedItem.link } state={ {from : location.pathname } }>
                <ButtonPrimaryOutlined className="w-full justify-center">
                    <Icon icon="bookmark" />
                    View
                </ButtonPrimaryOutlined>
            </Link>

        </li>
    )
}
