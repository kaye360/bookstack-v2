import { useParams } from "react-router-dom";
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
        const data = await res.json()
        return data
    }

    const { data : user, isSuccess, isLoading } = useQuery('getUserId', getUser)
    console.log(user)

    return(<>
        
        <section className="min-h-screen">
            <h1>{username}</h1>

            <div>
                Currently reading: //TODO
            </div>

            {
                isLoading && <Loader />
            }
            {
                isSuccess &&
                <>
                    <LibraryPreview userID={user.id} username={username} />
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
        <h2 className="text-xl font-semibold">{username} has {amount} books in their library.</h2>
        <p>Here's just a few:</p>
        

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

    return(
        <div>
            TODO User's comments, likes, and new books from community Feed. {userID}
        </div>
    )
}