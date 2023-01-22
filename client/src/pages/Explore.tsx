import { useQuery } from "react-query";
import Book from "../components/library/Book";
import { Link } from "react-router-dom";
import Loader from "../components/layout/Loader";
import { API_BASE_URL } from "../config";
import httpReq from "../utils/httpReq";

export default function Explore() {
    
    async function getBooks() {
        const res = await httpReq.get(API_BASE_URL + '/books/all')
        const data = await res.json()
        return data
    }

    const { data, isLoading, isError, isFetched} = useQuery(
        'usersBooks', getBooks
    )
    let exploreBooks = data
    console.log(data)

    return(
        <section className="flex flex-col gap-4 bg-slate-50 py-8">
            <h2 className="text-4xl">Explore</h2>
            { isLoading && <Loader />}

            { isFetched && 
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4 auto-rows-[350px]">
                    { exploreBooks && exploreBooks.map( 
                        (book: { title:string, id:number, cover_url:string }) => {
                        return <Book 
                            id={book.id}
                            title={book.title} 
                            showInfo={true} 
                            key={book.id} 
                            cover={book.cover_url}
                        />
                    })}
                </div>
            }
        </section>
    )
}