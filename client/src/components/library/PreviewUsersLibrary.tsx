import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import Book from "./Book";
import Loader from "../layout/Loader";

export default function PreviewUsersLibrary() {

    const { data, isLoading, isError} = useQuery(
        'usersBooks',
        () => httpReq.get(API_BASE_URL + '/books/21')
    )
    let previewUsersBooks = data?.data.slice(0, 6)

    return(
        <section className="flex flex-col gap-4 bg-slate-50 py-8">
            <h2 className="text-4xl">Your Library</h2>
            { isLoading && <Loader />}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                { previewUsersBooks && previewUsersBooks.map( (book: {title:string, id:number}) => {
                    return <Book title={book.title} showInfo={true} key={book.id} />
                })}
            </div>

            <Link to="/library">View your library</Link>

        </section>
    )
}