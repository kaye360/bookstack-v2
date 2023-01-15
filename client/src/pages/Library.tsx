import React from "react";
import Loader from "../components/layout/Loader";
import AddBookModal from "../components/library/AddBookModal";
import Book from "../components/library/Book";
import { useLibrary } from "../utils/useLibrary";

export default function Library() {

    const {library, isError, isLoading} = useLibrary(21)

    return(<>
    
        <div className="flex justify-between">
            <h2 className="text-4xl">Library</h2>

            <div>
                <button>Add Book</button>
            </div>
        </div>

        { isLoading && <Loader /> }

        <section className="grid gap-4 grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
            { library.map( book => {
                return <Book 
                    title={book.title} 
                    likes={book.likes.length}
                    commentCount={book.commentCount}
                    isRead={book.isRead}
                    showInfo={true}
                />
            })}
        </section>

        <AddBookModal />
    </>)

}