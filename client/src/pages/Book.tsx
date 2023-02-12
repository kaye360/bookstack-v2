import { useContext, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";

import { API_BASE_URL } from "../config";
import { useBook } from "../utils/useBook";
import httpReq from "../utils/httpReq";
import { textToParagraphs } from "../utils/formatText";

import Loader from "../components/layout/Loader";
import Modal from "../components/layout/Modal";
import { Comments, CommentForm } from "../components/library/Comments";
import { UserContext } from "../components/app/UserContextWrapper";
import bookNoCover from "../assets/img/book-no-cover.png"
import Icon from "../components/elements/Icon";
import PageHeading from "../components/elements/PageHeading";
import TextInline from "../components/elements/TextInline";
import TextFlex from "../components/elements/TextFlex";
import Separator from "../components/layout/Separator";
import TextBlock from "../components/elements/TextBlock";
import { ButtonBasic, ButtonPrimaryPlain } from "../components/elements/buttons";


export default function Book() {

    
    const { user, isLoggedIn } = useContext(UserContext)
    const { id } : any = useParams()
    const bookID: number | undefined = parseInt(id)
    const { bookQuery, googleQuery } = useBook( bookID )
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    
    

    if(bookQuery.isError) {
        return <div>Error Getting Book</div>
    }

    if(bookQuery.isLoading) {
        return <Loader />
    }

    if(bookQuery.data.success === false) {
        return <div>Book not found</div>
    }

    /**
     * 
     * Type Definitions and instantiations
     * 
     * Don't need a loading/error state here, already covered above
     * 
     */

    // BookStack API Data
    let title : string
    let author : string
    let likes: number[] = []
    let isRead : boolean
    let coverUrl : string
    let commentCount : number
    let isLikedByUser: boolean = false
    let bookUserID : number

    // Google Books API Data
    let subtitle : string = ''
    let category : string = ''
    let pageCount : number | string = ''
    let rating : number | string = ''
    let description: string[] = []
    
    /**
     * 
     * Local BookStack API data formating
     * 
     */
    
    title = bookQuery.data.title
    author = bookQuery.data.author
    isRead = bookQuery.data?.is_read === 'true'
    coverUrl = bookQuery.data.cover_url || bookNoCover
    commentCount = bookQuery.data.comment_count
    bookUserID = bookQuery.data.user_id
    
    if(bookQuery.data.likes) {
        likes = JSON.parse(bookQuery.data.likes) || []
        isLikedByUser = Array.isArray(likes) && likes.includes(user.id)
    }
    
    /**
     * 
     * Google Books API data formating
     * 
     */

    // If Google Books API isLoading
    if( googleQuery.isLoading ) {
        [subtitle, category, pageCount, rating] = Array(4).fill(<Loader size="small" />)
    }
    
    // If Google Books API isError
    if( googleQuery.isError ) {
        [subtitle, category, pageCount, rating] = Array(4).fill('Not Available')
    }

    // If Google Books API isSuccess
    // 2nd and 3rd conditions are to check if a book was found
    if( 
        googleQuery.isSuccess &&
        googleQuery.data.totalItems > 0 &&
        Array.isArray(googleQuery.data.items)
    ) {
        author = googleQuery.data.items[0].volumeInfo.author || 'Not Available'
        subtitle = googleQuery.data.items[0].volumeInfo.subtitle || 'Not Available'
        category = googleQuery.data.items[0].volumeInfo.categories || 'Not Available'
        pageCount = googleQuery.data.items[0].volumeInfo.pageCount || 'Not Available'
        rating = googleQuery.data.items[0].volumeInfo.averageRating || 'Not Available'
        description = textToParagraphs(
            googleQuery.data.items[0].volumeInfo.description
        )
        description = description.length === 0 ? ['Not Available'] : description
    }  


    console.log(description)




    return <>

        <BackBtn />

        { showDeleteModal && 
            <DeleteModal 
                bookID={bookID} 
                setShowDeleteModal={setShowDeleteModal} 
            />
        }

        <div className="relative grid sm:grid-cols-[3fr_1.5fr] gap-16 sm:gap-8">

            {/* Header blur Background */}
            <img 
                src={coverUrl} alt="Book Cover" 
                className="absolute top-0 left-0 right-0 z-10 object-cover object-center w-full h-[50vh] blur-lg opacity-[15%]"
            />

            {/* Book Info Header */}
            <div className="relative z-20 flex flex-col gap-8">

                <PageHeading>
                    {title}
                </PageHeading>

                <Separator />

                <TextBlock>
                    {subtitle !== 'Not Available' && 
                        <p className="my-4 font-semibold">
                            {subtitle}
                        </p>
                    }

                    <p>By: {author}</p>
                    
                    <p>Category: {category}</p>

                    <p>Pages: {pageCount}</p>

                    <p>Google Rating: {rating}/5</p>
                </TextBlock>

            </div>

            {/* Book Cover */}
            <div className="relative z-20">

                <img 
                    src={coverUrl} 
                    alt="Book Cover" 
                    className="mx-auto w-full rounded-lg opacity-50 dark:opacity-100" 
                />

                { user.id === bookQuery.data.user_id &&

                    <TextFlex className="justify-center w-full my-4">

                        <ToggleIsReadBtn 
                            isRead={isRead} 
                            bookID={ bookID } 
                            bookQuery={bookQuery} 
                        /> 

                        {isRead ? (
                            <span>Read</span>
                        ) : (
                            <span>Not Read</span> 
                        )}

                    </TextFlex>
                }

                <div className="w-full flex items-center justify-between font-bold">

                    <a href="#comments">
                        <TextFlex>
                            <Icon icon="chat_bubble" className="translate-y-1" />
                            { commentCount }
                        </TextFlex>
                    </a>

                    <TextFlex>
                        { isLoggedIn && <LikeBtn 
                            isLikedByUser={isLikedByUser} 
                            user={user}
                            bookID={id}
                            bookCover={coverUrl}
                            bookQuery={bookQuery}
                            />
                        }
                        {likes.length}
                    </TextFlex>

                    {user.id === bookUserID &&
                        <DeleteBtn setShowDeleteModal={setShowDeleteModal} />
                    }

                </div>

            </div>

            {/* Book Description */}
            <TextBlock>
                <h2 className="font-bold">Description</h2>
                
                { description.length > 0 ? (

                    description.map( (paragraph, index) => (
                        <p key={index}> {paragraph} </p>
                    ))

                ) : (

                    <Loader />

                )}

            </TextBlock>
        </div>

        <Separator />

        <section id="comments" className="flex flex-col gap-6">
            <TextBlock>
                <h2 className="text-2xl font-bold">Comments</h2>
            </TextBlock>

            <Comments 
                isLoading={bookQuery.isLoading}
                isError={bookQuery.isError}
                book={bookQuery.data}
            />

            <CommentForm 
                username={user.username}
                userID={user.id}
                bookID={bookID}
                bookTitle={title}
                updateComments={bookQuery.refetch}
                bookCoverUrl={coverUrl}
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

    return(
        <Link to={refferer} className="flex items-center gap-2">
            <TextFlex>
                <Icon icon="keyboard_backspace" />
                {titles.hasOwnProperty(titlesKey) ? titles[titlesKey] : 'Back'}
            </TextFlex>
        </Link>
    )
}




function ToggleIsReadBtn({isRead, bookID, bookQuery}) {

    const putBody = { id: bookID }

    async function toggleIsRead() {
        const res = await httpReq.put(API_BASE_URL + '/book/read', putBody)
        bookQuery.refetch()
    }

    const { refetch } = useQuery('toggleIsRead', toggleIsRead, {enabled: false})

    return <button onClick={ () => refetch() } className='p-0 mx-2 cursor-pointer bg-transparent outline-0 border-0 focus:outline-0 hover:border-0'>
        {isRead ? (
            <Icon icon="check_box" />
        ) : (
            <Icon icon="check_box_outline_blank" />
        )}
    </button>
}




function LikeBtn({isLikedByUser, user, bookID, bookCover, bookQuery}) {

    async function toggleLikeBook() {
        const body = {
            id: bookID,
            user_id: user.id,
            username: user.username,
            image_url: bookCover
        }
        const res = await httpReq.put(API_BASE_URL + '/book/like', body)
        bookQuery.refetch()
    }

    const {refetch} = useQuery('toggleLikeBook', toggleLikeBook, {
        enabled : false
    })

    return (
        <button 
            onClick={ () => {refetch()} } 
            className={`p-0 bg-transparent outline-0 border-0 focus:outline-0 hover:border-0 translate-y-1 ${isLikedByUser ? 'text-red-400' : ''} `}
        >

            <Icon icon="favorite" />
            
        </button>
    )

}




function DeleteBtn({setShowDeleteModal}) {

    return (
        <ButtonBasic
            onClick={() => setShowDeleteModal(true)} 
            className="bg-transparent no-underline translate-y-1"
        >
            
            <Icon icon="delete" />

        </ButtonBasic>
    )
}




function DeleteModal({bookID, setShowDeleteModal}) {

    const [message, setMessage] = useState<boolean | string>(false)

    async function handleDelete() {
        const res = await httpReq.delete(API_BASE_URL + '/book', {
            id: bookID
        })
        if(res.success) {
            setMessage('Deleted succesfully')
        }
    }


    return <Modal setModalState={setShowDeleteModal}>

        {!message && <p>
            Are you sure you want to delete this book?
        </p>}

        {message && <p>
            {message} &nbsp;
            <Link to="/library" className="text-primary-500">Back to your library</Link>
        </p>}

        {!message && <>
            <button 
                onClick={handleDelete}
                className="hover:bg-primary-300 border-0"
                >
                Yes, I'm sure.
            </button>
            <button 
                onClick={ () => setShowDeleteModal(false)} 
                className="hover:bg-primary-300 border-0"
            >
                No, close this.
            </button>
        </>}
        
    </Modal>
}