import { useQuery } from "react-query";
import Book from "../components/library/Book";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";
import LibraryGrid from "../components/library/LibraryGrid";

export default function Explore() {
    
    async function getBooks() {
        const res = await httpReq.get(API_BASE_URL + '/books/explore')
        return res
    }

    const { data, isLoading, isError, isFetched} = useQuery(
        'usersBooks', getBooks
    )

    return(
        <section className="flex flex-col gap-4 py-8">
            <h2 className="text-4xl">Explore</h2>

            <p className="p-4 rounded-xl bg-primary-900 my-8">
                Check out some books of the books in the community
            </p>

            { isLoading && <Loader />}

            { isError && <div className="py-4">Error loading books</div> }

            { isFetched && 
                <LibraryGrid>
                    { data && data.map( (book: Ibook ) => {

                        const likes = JSON.parse(book.likes)

                        return <Book 
                            id={book.id}
                            title={book.title} 
                            showInfo={true} 
                            key={book.id} 
                            cover={book.cover_url}
                            likes={likes.length}
                            commentCount={book.comment_count}
                        />
                    })}
                </LibraryGrid>
            }
        </section>
    )
}



interface Ibook {
    title: string,
    id: number,
    cover_url: string, 
    likes : string,
    comment_count: number
}