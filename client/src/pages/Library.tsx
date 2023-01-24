import React, { useContext, useState } from "react";
import { UserContext } from "../App";
import Loader from "../components/layout/Loader";
import AddBookModal from "../components/library/AddBookModal";
import Book from "../components/library/Book";
import { useLibrary } from "../utils/useLibrary";

export default function Library() {

    const { user } = useContext(UserContext)

    const {library, isError, isLoading} = useLibrary(user.id)

    const [showModal, setShowModal] = useState(false)

    return(<>
    
        <div className="flex justify-between">
            <h1 className="text-4xl">Library</h1>

            <div>
                <button onClick={ () => setShowModal(true) }>➕ Add Book</button>
            </div>
        </div>

        { isLoading && <Loader /> }

            { library.length === 0
                ? <div className="p-4 rounded bg-orange-100">
                    There are no books in your library. Click the +Add Book icon to get started!
                </div>
                : <section className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 auto-rows-[250px]">
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

        { showModal && <AddBookModal setShowModal={setShowModal} /> }
    </>)

}