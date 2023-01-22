import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import Book from "./Book";
import Loader from "../layout/Loader"
import { Link } from "react-router-dom";

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
        <section className="flex flex-col gap-4 bg-slate-50 py-8">
            <h2 className="text-4xl">Explore</h2>
            { isLoading && <Loader />}

            { isFetched && 
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[350px]">
                    { exploreBooks && exploreBooks.map( (book: { title:string, id:number }) => {
                        return <Book 
                            id={book.id}
                            title={book.title} 
                            showInfo={true} 
                            key={book.id} 
                        />
                    })}
                </div>
            }

            <Link to="/explore">Explore the community</Link>
        </section>
    )
}