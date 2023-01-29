import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";

import { API_BASE_URL } from "../config";
import { UserContext } from "../App";
import { useBook } from "../utils/useBook";
import httpReq from "../utils/httpReq";
import { textToParagraphs } from "../utils/formatText";

import Loader from "../components/layout/Loader";
import Modal from "../components/layout/Modal";
import iconBack from "../assets/img/icon-back.png"
import iconLike from "../assets/img/icon-like.png"
import iconLiked from "../assets/img/icon-liked.png"
import iconChat from "../assets/img/icon-chat.png"
import iconDelete from "../assets/img/icon-delete.png"


export default function Book() {

    
    const { user, isLoggedIn } = useContext(UserContext)
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

    const description = textToParagraphs(
        googleQuery.data.items[0].volumeInfo.description
    )
    const likes = JSON.parse(bookQuery.data.likes) || []
    const isLikedByUser = likes.includes(user.id)

    return <>

        <BackBtn />

        <div className="relative grid grid-cols-[3fr_1.5fr] gap-8">

            {/* Header blur Background */}
            <img 
                src={bookQuery.data.cover_url} alt="Book Cover" 
                className="absolute top-0 left-0 right-0 z-10 object-cover object-center w-full h-[50vh] blur-lg opacity-20"
            />

            {/* Book Info Column */}
            <div className="relative z-20 flex flex-col gap-8">

                <h1 className="text-3xl">
                    {bookQuery.data.title}
                </h1>

                <div className="border border-primary-400"></div>

                <p className="font-semibold">
                    {googleQuery.data.items[0].volumeInfo.subtitle}
                </p>

                <div>
                    <p>
                        By: {bookQuery.data.author}
                    </p>
                    <p>
                        Category: {googleQuery.data.items[0].volumeInfo.categories}
                    </p>
                    <p>
                        Pages: {googleQuery.data.items[0].volumeInfo.pageCount}
                    </p>
                    <p>
                        Google Rating: {googleQuery.data.items[0].volumeInfo.averageRating}/5
                    </p>
                </div>

                { description.map( (paragraph, index) => (
                    <p className="text-lg" key={index}>{paragraph}</p>
                ))}


            </div>

            {/* Book Cover Column */}
            <div className="relative z-20">
                <img 
                    src={bookQuery.data.cover_url} 
                    alt="Book Cover" 
                    className="mx-auto w-full rounded-lg" 
                />

                { user.id === bookQuery.data.user_id &&
                    <p className="text-center ">
                        <ToggleIsReadBtn 
                            isRead={isRead} 
                            bookID={ bookID } 
                            bookQuery={bookQuery} 
                        /> 
                        {isRead ? 'I have read this book' : 'I haven\'t read this book'}
                    </p>
                }

                <div className="w-full flex items-center justify-between font-bold">
                        <p className="flex items-center gap-2">
                            <a href="#comments">
                                <img src={iconChat} />
                            </a>
                            { bookQuery.data.comment_count }
                        </p>
                        <p className="flex items-center gap-2">
                            { isLoggedIn && <LikeBtn 
                                isLikedByUser={isLikedByUser} 
                                user={user}
                                bookID={id}
                                bookQuery={bookQuery}
                                />
                            }
                            {likes.length}
                        </p>

                        {user.id === bookQuery.data.user_id &&
                           <DeleteBtn bookID={bookID} />
                        }
                </div>

            </div>
        </div>
    
        <section className="" id="comments">
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




function BackBtn() {

    const location = useLocation()
    const refferer = location.state?.from || '/'
    const titlesKey = refferer.slice(1)

    const titles = {
        library : 'Back to your Library',
        explore : 'Back to explore page',
        dashboard : 'Back to your dashboard',
        notifications : 'Back to your notifications'
    }

    return  <div>
        <Link to={refferer} className="flex items-center gap-2">
            <img src={iconBack} />
            {titles.hasOwnProperty(titlesKey) ? titles[titlesKey] : 'Back'}
        </Link>
    </div>
}




function ToggleIsReadBtn({isRead, bookID, bookQuery}) {

    const putBody = { id: bookID }

    async function toggleIsRead() {
        const res = await httpReq.put(API_BASE_URL + '/book/read', putBody)
        bookQuery.refetch()
    }

    const { refetch } = useQuery('toggleIsRead', toggleIsRead, {enabled: false})

    return <button onClick={ () => refetch() } className='p-0 mx-2 cursor-pointer bg-transparent outline-0 border-0 focus:outline-0 hover:border-0'>
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
        { isLikedByUser 
            ? <img src={iconLiked} /> 
            : <img src={iconLike} />
        }
    </button>

}




function DeleteBtn({bookID}) {

    const [showModal, setShowModal] = useState(false)

    return ( <>
        <button onClick={() => setShowModal(true)} className="bg-transparent">
            <img src={iconDelete} />
        </button>
        { showModal && <DeleteModal bookID={bookID} setShowModal={setShowModal} /> }
    </>)
}




function DeleteModal({bookID, setShowModal}) {

    const [message, setMessage] = useState(false)

    async function handleDelete() {
        const res = await httpReq.delete(API_BASE_URL + '/book/' + bookID)
        if(res.success) {
            setMessage('Deleted succesfully')
        }
    }


    return(
        <Modal>
            {!message && <p>
                Are you sure you want to delete this book?
            </p>}

            {message && <p>
                {message} &nbsp;
                <Link to="/library">Back to your library</Link>
            </p>}

            {!message && <>
                <button onClick={handleDelete}>Yes, I'm sure.</button>
                <button onClick={ () => setShowModal(false)} >No, close this.</button>
            </>}
        </Modal>
    )
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



function CommentForm({username, userID, bookID, bookTitle, updateComments}) {

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

    const {data, error, isError, isLoading, refetch, isSuccess} = useQuery('submitComment', postComment, { enabled:false })

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