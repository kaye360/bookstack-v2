import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import Book from "./Book";
import Loader from "../layout/Loader"
import { Link } from "react-router-dom";
import LibraryGrid from "../layout/LibraryGrid";

export default function Explore() {
    
    async function getBooks() {
        const res = await httpReq.get(API_BASE_URL + '/books/all')
        return res
    }

    const { data, isLoading, isError, isFetched} = useQuery(
        'usersBooks', getBooks
    )
    let exploreBooks = data?.slice(-6).reverse()

    return(
        <section className="flex flex-col gap-4 py-8">
            <h2 className="text-4xl">Explore</h2>
            { isLoading && <Loader />}

            { isFetched && 
                <LibraryGrid>
                    { exploreBooks && exploreBooks.map( (book: { title:string, id:number }) => {
                        return <Book 
                            id={book.id}
                            title={book.title} 
                            showInfo={true} 
                            key={book.id} 
                        />
                    })}
                </LibraryGrid>
            }

            <Link to="/explore">Explore the community</Link>
        </section>
    )
}