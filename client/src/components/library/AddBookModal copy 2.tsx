import React, { useState } from "react"
import { API_BASE_URL, GOOGLE_KEY } from "../../config"
import httpReq from "../../utils/httpReq"
import Loader from "../layout/Loader"


interface propType {
    setShowModal: Function
}

export default function AddBookModal({setShowModal} : propType) {


    /**
     * @todo clean this up
     */
    const [isSearchFormSubmitted, setIsSearchFormSubmitted] = useState(false)
    const [isbnField, setIsbnField] = useState(false) 

    const [isSearchError, setIsSearchError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [title, setTitle] = useState(false)
    const [author, setAuthor] = useState(false)
    const [cover, setCover] = useState('notfound.png')
    const [pages, setPages] = useState(false)
    const [isRead, setIsread] = useState(false)

    const [isAddError, setIsAddError] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const [isAdded, setIsAdded] = useState(false)

    /**
     * @todo make this with useQuery
     */
    async function handleSearch(e: any) {
        e.preventDefault()
        if(!isbnField) return

        setTitle(false)
        setAuthor(false)
        setCover('notfound.png')
        setIsSearchError(false)
        
        setIsLoading(true)
        setIsSearchFormSubmitted(true)

        const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnField}&key=${GOOGLE_KEY}`)
        const data = await res.json()

        if( res.totalItems !== 0) {
            // Book was found

            setTitle(data.items[0].volumeInfo.title)
            setAuthor(data.items[0].volumeInfo.authors[0])
            setCover(
                (data.items[0].volumeInfo.imageLinks !== undefined) 
                ? data.items[0].volumeInfo.imageLinks.thumbnail 
                : false
            )
            setIsSearchError(false)
        } else {
            // Book Not found
            setIsSearchError(true)
        }

        setIsLoading(false)

    }

    async function handleAdd(e: any) {
        e.preventDefault()

        setIsAdding(true)

        const postData =  {
            isbn : isbnField,
            title : title,
            author : author,
            is_read : isRead ? "true" : "false",
            cover_url : cover,
            user_id : 21
        }

        const res = await httpReq.post(API_BASE_URL + '/book', postData)
        const data = await res.json()
        console.log(data)

        if(!data.success) {
            setIsAdding(false)
            setIsAddError(true)
        }
        
        setIsAdded(true)
        setIsAdding(false)
    }

    function clearSearch() {
        setIsSearchFormSubmitted(false)
        setTitle(false)
        setAuthor(false)
        setCover('notfound.png')
        setIsread(false)
    }

    return(
        <div className="fixed inset-0 grid items-center px-3 bg-slate-700 z-50 bg-opacity-95">

            <div className="relative flex flex-col gap-8 bg-slate-200 w-full max-w-xl mx-auto p-4">
                <h2 className="text-md font-bold">
                    Add Book
                </h2>

                <button 
                    className="absolute right-4 top-2"
                    onClick={ () => setShowModal(false) }>
                    ✖
                </button>

                <div>
                    <form onSubmit={handleSearch}>

                        <label> 
                            Enter an ISBN number:

                            <div className="flex gap-2 w-full p-4 rounded border border-slate-300  bg-white">

                                <input 
                                    className="w-full focus:outline-none"
                                    type="text" 
                                    onChange={ (e:any) => {
                                        setIsbnField(e.target.value) 
                                        clearSearch()
                                    }} 
                                />

                                <input type="reset" value="✖" className="cursor-pointer opacity-40" />
                                <input type="submit" value='Search' 
                                    className="rounded cursor-pointer hover:bg-slate-400" />
                            </div>
                        </label>

                    </form>
                </div>

                { isSearchFormSubmitted && <>

                    <div>
                        {isLoading && <Loader /> }
                        {isSearchError && <div className="pt-4 pb-8 px-2">No books were found with that ISBN. Please try another one.</div>}
                    </div>


                    {!isSearchError && <>
                    <div className="flex items-center gap-4 mt-4">
                        {cover !=='notfound.png' && <img src={cover} /> }

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

                    { isAdding && <div>Adding Book...</div>}

                    { isAddError && <div>There was a problem adding the book.</div> }

                    { isAdded && <div>{title} was successfully added to your library.</div> }


                    </>
                    }
                </>
                }

            </div>
        </div>
    )
}