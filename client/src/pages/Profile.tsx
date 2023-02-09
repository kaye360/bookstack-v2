import { Link, useParams } from "react-router-dom";
import { useLibrary  } from "../utils/useLibrary";
import Loader from '../components/layout/Loader'
import Book from  '../components/library/Book'
import { useQuery } from "react-query";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import LibraryGrid from "../components/layout/LibraryGrid";
import iconProfile from "../assets/img/icon-profile.png"
import bookNoCover from "../assets/img/book-no-cover.png"

export default function Profile() {

    const { username } = useParams()

    async function getUser() {
        const res = await httpReq.get(API_BASE_URL + '/username/' + username)
        return res
    }

    const { data : user, isSuccess, isLoading } = useQuery('getUserId', getUser)

    return(<>
        
        <section className="min-h-screen">
            <h1 className="flex items-center gap-4 text-2xl">
                <img src={iconProfile} />
                {username}
            </h1>

            {
                isLoading && <Loader />
            }
            {
                isSuccess &&
                <>
                    <LibraryPreview userID={user.id} username={username} />

                    <div className="my-4 border border-primary-600"></div>

                    <h2 className="my-6 text-xl">
                        {user.username}'s recent activity
                    </h2>

                    <UsersPublicFeed userID={user.id} />
                </>
            }

        </section>
    
    </>
        
    )

}




function LibraryPreview({userID, username}) {

    const {library, amount, isError, isLoading} = useLibrary(userID)
    const libraryPreview = library.slice(0,12)

    if(isError) {
        return <div>Error loading user's library</div>
    }

    if(isLoading) {
        return <Loader />
    }

    return <div>
        <h2 className="my-6 text-lg font-medium">
            {username} has {amount} {amount === 1 ? 'book' : 'books'} in their library.
        </h2>

        { amount !== 0 && <p className="mb-4">Here's just a few:</p> }        

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

}


interface IfeedItem {
    id: number,
    type : 'upload' | 'like' | 'comment',
    message : string,
    comment : string,
    link : string,
    image_url : string,
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
    console.log(feed)

    if(isError) { 
        return <div>
            Error community feed.
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