import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Loader from "../components/layout/Loader";
import AddBookModal from "../components/library/AddBookModal";
import Book from "../components/library/Book";
import { useLibrary } from "../utils/useLibrary";
import iconAddBook from "../assets/img/icon-add-book.png"

export default function Library({isUserAddingBook = false}) {
    console.log(isUserAddingBook)
    const { user } = useContext(UserContext)

    const {library, isLoading, refetchLibrary} = useLibrary(user.id)

    const [showModal, setShowModal] = useState(isUserAddingBook)

    return(<>
    
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

        { isLoading && <Loader /> }

            { library.length === 0
                ? <div className="p-4 rounded bg-orange-100">
                    There are no books in your library. Click the +Add Book icon to get started!
                </div>
                : <section className="grid gap-x-4 gap-y-6 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 auto-rows-[250px]">
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
                </section>
            }

        { showModal && <AddBookModal setShowModal={setShowModal} refetchLibrary={refetchLibrary} /> }
    </>)

}