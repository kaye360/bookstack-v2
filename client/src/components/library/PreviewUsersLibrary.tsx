import { useContext } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import Loader from "../layout/Loader";
import { useLibrary } from "../../utils/useLibrary";
import { UserContext } from "../../App";

export default function PreviewUsersLibrary() {

    const { user } = useContext(UserContext)
    
    const {library, isLoading } = useLibrary( user.id )
    let previewUsersBooks = library.slice(0, 6)

    return(
        <section className="flex flex-col gap-4 bg-slate-50 py-8">
            <h2 className="text-4xl">Your Library</h2>
            { isLoading && <Loader />}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[350px]">
                { previewUsersBooks && previewUsersBooks.map( book => {
                    return <Book 
                        id={book.id}
                        title={book.title} 
                        cover={book.coverUrl}
                        showInfo={true} 
                        commentCount={book.commentCount}
                        likes={book.likes.length}
                        isRead={book.isRead}
                        key={book.id} 
                    />
                })}
            </div>

            <Link to="/library">View your library</Link>

        </section>
    )
}