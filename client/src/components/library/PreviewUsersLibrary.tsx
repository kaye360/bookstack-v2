import { useContext } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import Loader from "../layout/Loader";
import { useLibrary } from "../../utils/useLibrary";
import { UserContext } from "../../App";
import LibraryGrid from "../layout/LibraryGrid";

export default function PreviewUsersLibrary() {

    const { user } = useContext(UserContext)
    
    const {library, isLoading } = useLibrary( user.id )
    let previewUsersBooks = library.slice(0, 6)

    return(
        <section className="flex flex-col gap-4 p-8 bg-primary-900 rounded-xl">
            <h2 className="text-4xl">Your Library</h2>
            { isLoading && <Loader />}
            <LibraryGrid>
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
            </LibraryGrid>

            <Link to="/library" className="text-primary-100">View your library</Link>

        </section>
    )
}