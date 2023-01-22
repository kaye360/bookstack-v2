import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { useBook } from "../utils/useBook";
import Loader from "../components/layout/Loader";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import httpReq from "../utils/httpReq";
import { API_BASE_URL } from "../config";
import { UserContext } from "../App";


export default function Book() {

    
    const { user } = useContext(UserContext)
    const { id } : any = useParams()
    const bookID: number | undefined = parseInt(id)
    const { bookQuery, googleQuery } = useBook( bookID )
    const isRead = bookQuery.data?.is_read === 'true' ? true : false

    if(bookQuery.isError) {
        return <div>Error Getting Book</div>
    }

    if(bookQuery.isLoading) {
        return <Loader />
    }

    const likes = JSON.parse(bookQuery.data.likes) || []
    const isLikedByUser = likes.includes(user.id)

    return <>

        <div>
            <Link to="/library">Back to Library</Link>
        </div>
    
        <h1 className="relative flex flex-col gap-16 py-20">
            <img 
                src={bookQuery.data.cover_url} alt="Book Cover" 
                className="absolute inset-0 z-10 object-cover object-center w-full h-full blur-lg opacity-20"
            />
            <span className="relative z-20 text-center">{bookQuery.data.title}</span>
            <img src={bookQuery.data.cover_url} alt="Book Cover" className="mx-auto" />
        </h1>


        <div className="text-center">
            <h3 className="font-bold">App Data</h3>
            <p>Author: {bookQuery.data.author} </p>
            <p>
                Is read? 
                <ToggleIsReadBtn isRead={isRead} bookID={ bookID } bookQuery={bookQuery} /> 
            </p>
            <p>
                <a href="#comments">Comments:</a> &nbsp; 
                { bookQuery.data.comment_count }</p>
            <p>
                Likes: {likes.length} | &nbsp;
                <LikeBtn 
                    isLikedByUser={isLikedByUser} 
                    user={user}
                    bookID={id}
                    bookQuery={bookQuery}
                />
            </p>
            <p>User ID: {bookQuery.data.user_id}</p>
            
            <h3 className="font-bold mt-4">Google Data</h3>
            {
            googleQuery.data && googleQuery.data.items 
                ? <>
                    <p>Sub Title:   {googleQuery.data.items[0].volumeInfo.subtitle}</p>
                    <p>Rating:      {googleQuery.data.items[0].volumeInfo.averageRating}</p>
                    <p>Categories:  {googleQuery.data.items[0].volumeInfo.categories}</p>
                    <p>Pages:       {googleQuery.data.items[0].volumeInfo.pageCount}</p>
                    <p>Date Pubbed: {googleQuery.data.items[0].volumeInfo.publishedDate}</p>
                    <p className="text-left max-w-lg mx-auto">Description: {googleQuery.data.items[0].volumeInfo.description}</p>
                </>
                : <p className="my-8 py-4 rounded border border-slate-300">Error: Google book data not found.</p>
            } 
        </div>

        <section className="w-full max-w-lg mx-auto" id="comments">
            <h2 className="my-4 py-4 text-2xl font-bold border-t border-slate-200">Comments</h2>

            <Comments 
                isLoading={bookQuery.isLoading}
                isError={bookQuery.isError}
                book={bookQuery.data}
            />

            <CommentForm 
                username={user.username}
                userID={user.id}
                bookID={bookID}
                bookTitle={bookQuery.data.title}
                updateComments={bookQuery.refetch}
            />

        </section>

    </>
}




function ToggleIsReadBtn({isRead, bookID, bookQuery}) {

    const putBody = { id: bookID }

    async function toggleIsRead() {
        const res = await httpReq.put(API_BASE_URL + '/book/read', putBody)
        bookQuery.refetch()
    }

    const { refetch } = useQuery('toggleIsRead', toggleIsRead, {enabled: false})

    return <button onClick={ () => refetch() } className='p-0 mx-2 bg-transparent outline-0 border-0 focus:outline-0 hover:border-0'>
        {isRead ? '☑️' : '🔲' }
    </button>
}




function LikeBtn({isLikedByUser, user, bookID, bookQuery}) {

    async function toggleLikeBook() {
        const body = {
            id: bookID,
            user_id: user.id,
            username: user.username
        }
        const res = await httpReq.put(API_BASE_URL + '/book/like', body)
        bookQuery.refetch()
    }

    const {refetch} = useQuery('toggleLikeBook', toggleLikeBook, {
        enabled : false
    })

    return <button onClick={ () => {refetch()} } className='p-0 bg-transparent outline-0 border-0 focus:outline-0 hover:border-0'>
        { isLikedByUser ? '❤️' : '🤍' }
    </button>

}





function Comments({isLoading, isError, book}) {

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
                        <h3><Link to={`/user/${comment.username}`}>{comment.username}</Link></h3>
                        <p>{comment.comment}</p>
                    </li>
            )})
            }
        </ul>
    )
}




function CommentForm({username, userID, bookID, bookTitle, updateComments}) {

    const [userComment, setUserComment] = useState('')
    const queryClient = useQueryClient()

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

    const {data, error, isError, isLoading, refetch, isSuccess} = useQuery('submitComment', postComment, { enabled:false })

    async function handleSubmit(e: any) {
        e.preventDefault()
        refetch()
    }

    return(
        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4 text-left max-w-lg mx-auto mt-4 p-4 rounded-md border border-slate-400 bg-slate-200">

                <h4 className="font-bold">
                    Commenting as {username} &nbsp;
                    <span className="text-sm font-normal">(Max 200 characters)</span>
                </h4>


                <textarea 
                    className="resize-none rounded p-2 w-full h-32 border border-slate-300 bg-white"
                    onChange={ (e) => setUserComment(e.target.value) }
                    value={userComment}
                ></textarea>

                <div className="flex items-center gap-4">
                    <input type="submit" value="Post Comment" className="rounded-md px-4 py-2 bg-slate-500 text-slate-200 w-fit cursor-pointer" />
                    { isSuccess && 'Comment Posted!'}
                    { isLoading && 'Please wait...'}
                    { isError && error.message }
                </div>



            </div>
        </form>
    )
}