import React from "react";
import { useParams } from "react-router-dom";
import { useBook } from "../utils/useBook";
import Loader from "../components/layout/Loader";
import { Link } from "react-router-dom";


export default function Book() {

    const { id } : any = useParams()
    const bookID: number | undefined = parseInt(id)

    const { bookQuery, googleQuery } = useBook( bookID )
    console.log(googleQuery)

    if(bookQuery.isError) {
        return <div>Error Getting Book</div>
    }

    if(bookQuery.isLoading) {
        return <Loader />
    }


    const likes = JSON.parse(bookQuery.data.likes) || []

    return <>

        <div>
            <Link to="/library">Back to Library</Link>
        </div>
    
        <h1 className="relative text-center py-20">
            <img 
                src={bookQuery.data.cover_url} alt="Book Cover" 
                className="absolute inset-0 z-10 object-cover object-center w-full h-full blur-lg opacity-30"
            />
            <span className="relative z-20">{bookQuery.data.title}</span>
        </h1>

        <div className="">
            <img src={bookQuery.data.cover_url} alt="Book Cover" className="mx-auto" />
        </div>

        <div className="text-center">
            <h3 className="font-bold">App Data</h3>
            <p>Author: {bookQuery.data.author} </p>
            <p>Is read? {bookQuery.data.is_read} </p>
            <p>Likes: {likes.length}</p>
            
            <h3 className="font-bold mt-4">Google Data</h3>
            {
            googleQuery.data.items[0] &&
            <>
                <p>Sub Title:   {googleQuery.data.items[0].volumeInfo.subtitle}</p>
                <p>Rating:      {googleQuery.data.items[0].volumeInfo.averageRating}</p>
                <p>Categories:  {googleQuery.data.items[0].volumeInfo.categories}</p>
                <p>Pages:       {googleQuery.data.items[0].volumeInfo.pageCount}</p>
                <p>Date Pubbed: {googleQuery.data.items[0].volumeInfo.publishedDate}</p>
                <div className="text-left max-w-lg mx-auto">Description: {googleQuery.data.items[0].volumeInfo.description}</div>
            </>
            } 
        </div>



    </>


}


