import React, { useContext, useState } from "react";
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
    console.log(bookQuery)

    if(bookQuery.isError) {
        return <div>Error Getting Book</div>
    }

    if(bookQuery.isLoading) {
        return <Loader />
    }


    const likes = JSON.parse(bookQuery.data.likes) || []

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
            <p>Is read? {bookQuery.data.is_read} </p>
            <p>Likes: {likes.length}</p>
            
            <h3 className="font-bold mt-4">Google Data</h3>
            {
            googleQuery.data &&
            <>
                <p>Sub Title:   {googleQuery.data.subtitle}</p>
                <p>Rating:      {googleQuery.data.averageRating}</p>
                <p>Categories:  {googleQuery.data.categories}</p>
                <p>Pages:       {googleQuery.data.pageCount}</p>
                <p>Date Pubbed: {googleQuery.data.publishedDate}</p>
                <p className="text-left max-w-lg mx-auto">Description: {googleQuery.data.description}</p>
            </>
            } 
        </div>

        <section className="w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-center">Comments</h2>

            <Comments 
                isLoading={bookQuery.isLoading}
                isError={bookQuery.isError}
                book={bookQuery.data}
            />

            <CommentForm 
                username={user.username}
                userID={user.id}
                bookID={bookID}
                updateComments={bookQuery.refetch}
            />

        </section>

    </>
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
        <ul className="flex flex-col gap-8 text-left">
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




function CommentForm({username, userID, bookID, updateComments}) {

    const [userComment, setUserComment] = useState('')
    const queryClient = useQueryClient()

    async function postComment() {
        

        const comment = {
            username : username,
            user_id : userID,   
            book_id : bookID,
            comment : userComment
        }

        const res = await httpReq.post(API_BASE_URL + '/comment', comment)
        const data = await res.json()

        if (!data.success) throw new Error(data.message)
        
        updateComments()

        setTimeout( () => {
            queryClient.resetQueries('submitComment', { exact : true } )
        }, 2000)

        return data
    }

    const {data, error, isError, isLoading, refetch, isSuccess} = useQuery('submitComment', postComment, { enabled:false })

    async function handleSubmit(e: any) {
        e.preventDefault()
        refetch()
        console.log(data)
    }

    return(
        <form onSubmit={handleSubmit} >
            <div className="flex flex-col gap-4 text-left max-w-lg mx-auto p-4 rounded-md border border-slate-400 bg-slate-200">

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