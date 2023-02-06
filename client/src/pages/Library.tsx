import { useContext, useState } from "react";
import { UserContext } from "../main";
import Loader from "../components/layout/Loader";
import AddBookModal from "../components/library/AddBookModal";
import Book from "../components/library/Book";
import { useLibrary } from "../utils/useLibrary";
import iconAddBook from "../assets/img/icon-add-book.png"
import LibraryGrid from "../components/layout/LibraryGrid";
import booksMagical from "../assets/img/books-magical.png"




export default function Library({isUserAddingBook = false}) {
    
    const { user }  = useContext(UserContext)

    const {library, isLoading, refetchLibrary} = useLibrary(user.id)

    const [showModal, setShowModal] = useState(isUserAddingBook)

    const libraryProps = {showModal, setShowModal, refetchLibrary}


    if(isLoading) {
        return <LibraryTemplate {...libraryProps}>
            <Loader />
        </LibraryTemplate>
    }
    
    if(library.length === 0) {
        return <LibraryTemplate {...libraryProps}>
            <EmptyLibrary />
        </LibraryTemplate>
    }

    return <LibraryTemplate {...libraryProps}>
        <LibraryGrid>
            { library.map( book => {
                return <Book 
                    id={book.id}
                    title={book.title} 
                    cover={book.coverUrl}
                    likes={book.likes.length}
                    commentCount={book.commentCount}
                    isRead={book.isRead}
                    showInfo={true}
                    key={book.id}
                />
            })}
        </LibraryGrid>
    </LibraryTemplate>

}


function LibraryTemplate({showModal, setShowModal, refetchLibrary, children}) {


    return <>
        <div className="flex justify-between">
            <h1 className="text-4xl">Library</h1>

            <div>
                <button 
                    onClick={ () => setShowModal(true) }
                    className="flex items-center gap-2 border-2 border-primary-100 bg-transparent text-primary-100"
                >
                    <img src={iconAddBook} />
                    Add Book
                </button>
            </div>
        </div>

        {children}

        { showModal && <AddBookModal 
            setShowModal={setShowModal} 
            refetchLibrary={refetchLibrary} 
        /> }
    </>
}



function EmptyLibrary() {

    return <div className="
        grid md:grid-cols-2 md:items-center
        my-8 text-2xl leading-relaxed overflow-hidden h-full
    ">
        Your library is currently empty. Click the +Add Book icon to get started!
        <img src={booksMagical} 
            className=""
        />
    </div>
}