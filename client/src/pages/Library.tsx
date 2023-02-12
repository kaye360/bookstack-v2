import { useContext, useState } from "react";
import Loader from "../components/layout/Loader";
import AddBookModal from "../components/library/AddBookModal";
import Book from "../components/library/Book";
import { useLibrary } from "../utils/useLibrary";
import LibraryGrid from "../components/library/LibraryGrid";
import booksMagical from "../assets/img/books-magical.png"
import { UserContext } from "../components/app/UserContextWrapper";
import PageHeading from "../components/elements/PageHeading";
import { ButtonPrimaryOutlined } from "../components/elements/buttons";
import Icon from "../components/elements/Icon";




export default function Library({isUserAddingBook = false}) {
    
    const { user }  = useContext(UserContext)

    const {library, isLoading, refetchLibrary} = useLibrary(user.id)

    const [showModal, setShowModal] = useState(isUserAddingBook)

    const libraryProps = {showModal, setShowModal, refetchLibrary}


    if(isLoading) {
        return (
            <LibraryTemplate {...libraryProps}>
                <Loader />
            </LibraryTemplate>
        )
    }
    
    if(library.length === 0) {
        return (
            <LibraryTemplate {...libraryProps}>
                <EmptyLibrary />
            </LibraryTemplate>
        )
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


    return (
        <>
            <div className="flex justify-between">
                <PageHeading>
                    Library
                </PageHeading>

                <ButtonPrimaryOutlined onClick={ ()=> setShowModal(true) }>
                    <Icon icon="library_add" /> 
                    Add Book
                </ButtonPrimaryOutlined>
            </div>

            {children}

            { showModal && 
                <AddBookModal 
                    setShowModal={setShowModal} 
                    refetchLibrary={refetchLibrary} 
                /> 
            }
        </>
    )
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