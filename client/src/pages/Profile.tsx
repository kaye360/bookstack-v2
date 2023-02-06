import { Link, useParams } from "react-router-dom";
import { useLibrary  } from "../utils/useLibrary";
import Loader from '../components/layout/Loader'
import Book from  '../components/library/Book'
import { useQuery } from "react-query";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import LibraryGrid from "../components/layout/LibraryGrid";
import iconProfile from "../assets/img/icon-profile.png"

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

                    <div className="border border-primary-600"></div>

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




function UsersPublicFeed({userID}) {

    async function getUsersFeed() {
        const res = await httpReq.get(API_BASE_URL + '/community/' + userID)
        return res
    }

    const { data, isLoading, isError } = useQuery('getUsersFeed', getUsersFeed, {
        initialData : []
    })

    if(isError) { 
        return <div>
            Error community feed.
        </div>
    }

    if(isLoading) {
        return <Loader />
    }
    
    return <ul className="flex flex-col">
        { data.length !== 0
            ? data.slice(0,10).map( feedItem => (
                <li key={feedItem.id} className="py-8 border-b border-primary-500 last:border-0">

                    <span className="inline-block mx-4">
                        {feedItem.type === 'upload' && '📖' }
                        {feedItem.type === 'like' && '💟' }
                        {feedItem.type === 'comment' && '💬' }
                    </span>

                    <span className="mx-4">
                        {feedItem.message}
                    </span>

                    <Link to={feedItem.link} className="text-primary-400">
                        View
                    </Link>
                </li>
            ))
            : <div className="p-4 rounded bg-primary-700">
                This user has no recent activity.
            </div>
        }
    </ul>
}