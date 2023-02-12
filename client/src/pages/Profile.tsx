import { Link, useParams } from "react-router-dom";
import { useLibrary  } from "../utils/useLibrary";
import Loader from '../components/layout/Loader'
import Book from  '../components/library/Book'
import { useQuery } from "react-query";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import LibraryGrid from "../components/library/LibraryGrid";
import bookNoCover from "../assets/img/book-no-cover.png"
import PageHeading from "../components/elements/PageHeading";
import Icon from "../components/elements/Icon";
import Separator from "../components/layout/Separator";
import TextBlock from "../components/elements/TextBlock";
import TextInline from "../components/elements/TextInline";
import TextFlex from "../components/elements/TextFlex";
import { ButtonPrimaryOutlined } from "../components/elements/buttons";

export default function Profile() {

    const { username } = useParams()

    async function getUser() {
        const res = await httpReq.get(API_BASE_URL + '/username/' + username)
        return res
    }

    const { data : user, isSuccess, isLoading } = useQuery('getUserId', getUser)

    return(
        
        <section className="min-h-screen">

            <PageHeading>
                <div className="flex items-center gap-2">
                    <Icon icon="account_circle" className="text-4xl" />
                    {username}
                </div>
            </PageHeading>

            {
                isLoading && <Loader />
            }
            {
                isSuccess &&
                <>
                    <LibraryPreview userID={user.id} username={username} />

                    <Separator className="my-8" />

                    <h2 className="my-6 text-xl">
                        <TextInline>
                            {user.username}'s recent activity
                        </TextInline>
                    </h2>

                    <UsersPublicFeed userID={user.id} />
                </>
            }

        </section>
    
    )

}




function LibraryPreview({userID, username}) {

    const {library, amount, isError, isLoading} = useLibrary(userID)
    const libraryPreview = library.slice(0,12)

    if(isError) {
        return <TextBlock>Error loading user's library</TextBlock>
    }

    if(isLoading) {
        return <Loader />
    }

    return (
        <div>
            <h2 className="my-6 text-lg font-medium">
                <TextInline>
                    {username} has {amount} {amount === 1 ? 'book' : 'books'} in their library.
                    { amount !== 0 && (
                        <span> Here's just a few:</span>
                    )}        
                </TextInline>
            </h2>


            <LibraryGrid>
                { libraryPreview.map( book => (
                    <Book 
                        id={book.id} 
                        title={book.title} 
                        cover={book.coverUrl}
                        key={book.id}
                    />
                ))}
            </LibraryGrid>
        
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

interface Iicons {
    [key: string] : string
}


function UsersPublicFeed({userID}) {

    async function getUsersFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community/' + userID)
        return res
    }

    const { data: feed, isLoading, isError } = useQuery('getUsersFeed', getUsersFeed, {
        initialData : {
            count : 0,
            data : []
        }
    })


    if(isError) { 
        return (
            <TextBlock>Error community feed.</TextBlock>
        )
    }

    if(isLoading) {
        return <Loader />
    }

    const icons: Iicons = {
        upload : 'book',
        comment : 'chat_bubble',
        like : 'favorite',
    }
    
    return (
        <ul className="flex flex-col gap-8">
            { feed.data.length !== 0 ? (
                feed.data.slice(0,10).map( (feedItem : IfeedItem) => (

                    <li key={feedItem.id} className="grid grid-cols-[1fr_2fr] gap-6 p-8 bg-primary-150 dark:bg-primary-750 rounded-2xl">
                        <img src={feedItem.image_url ? feedItem.image_url : bookNoCover} alt="Book Cover"
                            className={` ${feedItem.image_url ? '' : 'opacity-20' } hi dark:opacity-100 `}
                        />

                        <div className="flex flex-col justify-between gap-6">
                            <TextFlex>
                                <Icon icon={ icons[feedItem.type] } className="text-primary-300 translate-y-[2px]" />
                                {feedItem.message}
                            </TextFlex>

                            {feedItem.comment && (
                                <p className="italic">
                                    <TextInline>
                                        "{feedItem.comment}"
                                    </TextInline>
                                </p>
                            )}

                            <Link to={feedItem.link}>
                                <ButtonPrimaryOutlined>
                                    <Icon icon="bookmark" />
                                    View
                                </ButtonPrimaryOutlined>
                            </Link>
                        </div>
                    </li>
                ))
                
            ) : ( 
                
                <TextBlock>
                    This user has no recent activity.
                </TextBlock>

            )}
        </ul>
    )
}