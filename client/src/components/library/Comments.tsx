import { useState, useContext } from "react"
import { useQueryClient, useQuery } from "react-query"
import { Link } from "react-router-dom"
import { UserContext } from "../../App"
import { API_BASE_URL } from "../../config"
import httpReq from "../../utils/httpReq"

export function Comments({isLoading, isError, book}) {

    if(isLoading) {
        return <div>Comments are loading</div>
    }

    if(isError) {
        return <div>Error Loading Comments</div>
    }

    if(book.comments.success === false) {
        return <div>No comments were found on this book. Be the first!</div>
    }

    return (
        <ul className="flex flex-col gap-8 text-left" id="comments">
            { 
            book.comments.map( comment => {
                return(
                    <li key={comment.id}>
                        <h3 className="w-fit px-4 py-2 rounded-2xl font-bold text-xl bg-primary-900">
                            <Link to={`/user/${comment.username}`}>
                                {comment.username}
                            </Link>
                        </h3>
                        <p className="m-[1rem_0_1rem_1rem] px-4 border-l-4 border-primary-600">
                            {comment.comment}
                        </p>
                    </li>
            )})
            }
        </ul>
    )
}



export function CommentForm({username, userID, bookID, bookTitle, updateComments}) {

    const [userComment, setUserComment] = useState('')
    const queryClient = useQueryClient()
    const { isLoggedIn } = useContext(UserContext)

    async function postComment() {
        

        const comment = {
            username : username,
            user_id : userID,   
            book_id : bookID,
            book_title : bookTitle,
            comment : userComment
        }

        const res = await httpReq.post(API_BASE_URL + '/comment', comment)

        if (!res.success) throw new Error(res.message)
        
        updateComments()

        setTimeout( () => {
            queryClient.resetQueries('submitComment', { exact : true } )
        }, 2000)

        return res
    }

    const {data, error, isError, isLoading, refetch, isSuccess} = useQuery('submitComment', postComment, { enabled:false, retry: false })

    async function handleSubmit(e: any) {
        e.preventDefault()
        refetch()
    }

    return(
        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4 text-left max-w-lg my-4 p-4 rounded-md bg-primary-600">

                <h4 className="font-bold">
                    { isLoggedIn 
                        ? <>
                            Commenting as: { username } &nbsp;
                            <span className="text-sm font-normal">
                                ({userComment.length}/200 characters)
                            </span>
                        </>
                        : <span className="inline-block ml-2 font-normal">Please sign in to post a comment</span>
                    }
                </h4>

                { isLoggedIn && <>
                    <textarea 
                        className="resize-none rounded p-2 w-full h-32 bg-primary-300 text-primary-800"
                        onChange={ (e) => setUserComment(e.target.value) }
                        value={userComment}
                    ></textarea>

                    <div className="flex items-center gap-4">
                        <input type="submit" value="Post Comment" className="rounded-md px-4 py-2 bg-primary-200 text-primary-900 font-bold w-fit cursor-pointer" />
                        { isSuccess && 'Comment Posted!'}
                        { isLoading && 'Please wait...'}
                        { isError && error.message }
                    </div>
                </>
                }

            </div>
        </form>
    )
}