import { Link, useParams } from "react-router-dom";
import { useLibrary  } from "../utils/useLibrary";
import Loader from '../components/layout/Loader'
import Book from  '../components/library/Book'
import { useQuery } from "react-query";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";

export default function Profile() {

    const { username } = useParams()

    async function getUser() {
        const res = await httpReq.get(API_BASE_URL + '/username/' + username)
        return res
    }

    const { data : user, isSuccess, isLoading } = useQuery('getUserId', getUser)

    return(<>
        
        <section className="min-h-screen">
            <h1>{username}</h1>

            {
                isLoading && <Loader />
            }
            {
                isSuccess &&
                <>
                    <LibraryPreview userID={user.id} username={username} />

                    <h2 className="my-8 text-xl font-bold">{user.username}'s recent activity</h2>
                    <UsersPublicFeed userID={user.id} />
                </>
            }

        </section>
    
    </>
        
    )

}




function LibraryPreview({userID, username}) {

    const {library, amount, isError, isLoading} = useLibrary(userID)
    const libraryPreview = library.slice(0,6)

    if(isError) {
        return <div>Error loading user's library</div>
    }

    if(isLoading) {
        return <Loader />
    }

    return <div>
        <h2 className="my-4 text-xl font-semibold">{username} has {amount} books in their library.</h2>

        { amount !== 0 && <p>Here's just a few:</p> }        

        <div className="grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[350px]">
        { libraryPreview.map( book => (
            <Book 
                id={book.id} 
                title={book.title} 
                cover={book.coverUrl}
                key={book.id}
            />
        ))
        }
        </div>
    
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
        { data.success
            ? data.slice(0,10).map( feedItem => (
                <li key={feedItem.id} className="py-4 border-b border-slate-200 last:border-0">
                    <span className="inline-block mx-4">
                        {feedItem.type === 'upload' && '📖' }
                        {feedItem.type === 'like' && '💟' }
                        {feedItem.type === 'comment' && '💬' }
                    </span>
                    <span className="mx-4">
                        {feedItem.message}
                    </span>
                    <Link to={feedItem.link}>View</Link>
                </li>
            ))
            : <div className="p-4 rounded bg-slate-100">
                This user has no recent activity.
            </div>
        }
    </ul>
}