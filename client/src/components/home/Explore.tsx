import React from "react";
import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import Book from "../Book";
import Loader from "../layout/Loader"

export default function Explore() {

    const { data, isLoading, isError, isFetched} = useQuery(
        'usersBooks',
        () => httpReq.get(API_BASE_URL + '/books/all')
    )
    let exploreBooks = data?.data.slice(-6).reverse()

    return(
        <section className="flex flex-col gap-4 bg-slate-50 py-8">
            <h2 className="text-4xl">Explore</h2>
            { isLoading && <Loader />}

            { isFetched && 
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    { exploreBooks && exploreBooks.map( (book: { title:string }) => {
                        return <Book title={book.title} />
                    })}
                </div>
            }
        </section>
    )
}