import React, { useState } from "react"
import { GOOGLE_KEY } from "../../config"
import httpReq from "../../utils/httpReq"
import Loader from "../layout/Loader"

export default function AddBookModal() {


    /**
     * @todo clean this up
     */
    const [isFormSubmitted, setIsFormSubmitted] = useState(false)
    const [isbnField, setIsbnField] = useState(false) 

    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(false)
    const [author, setAuthor] = useState(false)
    const [cover, setCover] = useState('notfound.png')
    const [pages, setPages] = useState(false)
    const [isRead, setIsread] = useState(false)

    /**
     * @todo make this with useQuery
     */
    async function handleSearch(e: any) {
        e.preventDefault()
        if(!isbnField) return

        setTitle(false)
        setAuthor(false)
        setCover('notfound.png')
        setIsError(false)
        
        setIsLoading(true)
        setIsFormSubmitted(true)

        const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnField}&key=${GOOGLE_KEY}`)


        if( res.data.totalItems !== 0) {
            // Book was found

            setTitle(res.data.items[0].volumeInfo.title)
            setAuthor(res.data.items[0].volumeInfo.authors[0])
            setCover(
                (res.data.items[0].volumeInfo.imageLinks !== undefined) 
                ? res.data.items[0].volumeInfo.imageLinks.thumbnail 
                : false
            )
            setIsError(false)
        } else {
            // Book Not found
            setIsError(true)
        }

        setIsLoading(false)

    }

    async function handleAdd(e: any) {
        e.preventDefault()
    }

    function clearSearch() {
        setIsFormSubmitted(false)
        setTitle(false)
        setAuthor(false)
        setCover('notfound.png')
        setIsread(false)
    }

    return(
        <div className="fixed inset-0 grid items-center px-3 bg-slate-700 z-50 bg-opacity-95">

            <div className="flex flex-col gap-8 bg-slate-200 w-full max-w-xl mx-auto p-4">
                <h2 className="text-md font-bold">
                    Add Book
                </h2>

                <div>
                    <form onSubmit={handleSearch}>

                        <label> 
                            Enter an ISBN number:

                            <div className="flex gap-2 w-full p-4 rounded border border-slate-300  bg-white">

                                <input 
                                    className="w-full focus:outline-none"
                                    type="text" 
                                    onChange={ (e:any) => setIsbnField(e.target.value) } 
                                />

                                <input type="reset" value="✖" className="cursor-pointer opacity-40" />
                                <input type="submit" value='Search' 
                                    className="rounded cursor-pointer hover:bg-slate-400" />
                            </div>
                        </label>

                    </form>
                </div>

                { isFormSubmitted && <>
                    <div className="flex items-center gap-4 mt-4">
                        {isLoading && <Loader /> }
                        {isError && 'No books were found with that ISBN. Please try another one.'}
                        {cover && <img src={cover} /> }

                        <div>
                            <span className="block text-2xl">{title}</span>
                            <span className="block">{author}</span>
                        </div>
                            
                    </div>

                    <div>
                        <form onSubmit={handleAdd}>
                            <label className="block">
                                I have read this book: &nbsp;
                                <input type="checkbox" defaultChecked={false} onChange={() => setIsread(!isRead)} />
                            </label>

                            <input type="submit" value="Add To Library" 
                                className="rounded cursor-pointer font-bold
                                my-4 mr-4 px-4 py-2 
                                bg-sky-300 hover:bg-transparent border hover:border-sky-300" />

                            <button onClick={clearSearch}
                                className="rounded cursor-pointer font-bold
                                my-4 mr-4 px-4 py-2 
                                bg-rose-200 hover:bg-transparent border hover:border-rose-300">Clear Search</button>
                        </form>
                    </div>
                </>
                }

            </div>
        </div>
    )
}