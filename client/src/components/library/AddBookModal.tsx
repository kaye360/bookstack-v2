import React, { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { API_BASE_URL, GOOGLE_KEY } from "../../config"
import httpReq from "../../utils/httpReq"
import Modal from "../layout/Modal"
import Loader from "../layout/Loader"


interface propType {
    setShowModal: Function
}

export default function AddBookModal({setShowModal} : propType) {

    /**
     * Form States
     */
    const [isSearchFormSubmitted, setIsSearchFormSubmitted] = useState(false)
    const [isbnField, setIsbnField] = useState('') 
    const [isRead, setIsRead] = useState(false)

    /**
     * useQuery functions
     */
    const queryClient = useQueryClient()

    // Search query
    const { 
        data: searchResult, 
        isLoading: searchIsLoading, 
        isError: searchIsError,
        isSuccess: searchIsSuccess,
        refetch : refetchSearch
    } = useQuery('searchGoogleBooksAPI', searchBooks, { 
        enabled : false,
        refetchOnWindowFocus: false,
    })

    // Add query
    const {
        data: addResult,
        isLoading: addIsLoading,
        isError: addIsError,
        isSuccess: addIsSuccess,
        refetch: addRefetch
    } = useQuery('addBook', addBook, { 
        enabled : false,
        refetchOnWindowFocus: false,
    })

    /**
     * Search Logic
     */
    async function searchBooks() {
        const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnField}&key=${GOOGLE_KEY}`)
        const data = await res.json()
        return data
    }

    function handleSearch(e: any) {
        queryClient.removeQueries('searchGoogleBooksAPI', { exact : true } )
        queryClient.removeQueries('addBook', { exact : true } )
        e.preventDefault()
        setIsSearchFormSubmitted(true)
        refetchSearch()
    }

    let title: string = ''
    let author:string = ''
    let cover:string = ''
    
    if (searchResult && searchResult.totalItems > 0) {
        title = searchResult.items[0].volumeInfo.title
        author = searchResult.items[0].volumeInfo.authors[0]
        cover = searchResult.items[0].volumeInfo.imageLinks !== undefined
            ? searchResult?.items[0]?.volumeInfo.imageLinks.thumbnail 
            : false
    }

    function clearSearch(e) {
        e.preventDefault()
        setIsSearchFormSubmitted(false)
        setIsbnField('')
        queryClient.removeQueries('searchGoogleBooksAPI', { exact : true } )
        queryClient.removeQueries('addBook', { exact : true } )
    }

    /**
     * Add logic
     */
    async function addBook() {

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
    }

    function handleAdd(e: any) {
        e.preventDefault()
        addRefetch()
    }

    return(
        <Modal>

            <Header 
                setShowModal={setShowModal} 
                handleSearch={handleSearch}
                isbnField={isbnField}
                setIsbnField={setIsbnField}
                clearSearch={clearSearch}
            />

            {/* SEARCH IS LOADING */}
            { searchIsLoading && <Loader /> }

            {/* SEARCH ERROR */}
            { searchIsError && <div className="pt-4 pb-8 px-2">Something went wrong with your search</div> }

            {/* NO BOOKS FOUND IN SEARCH*/}
            { searchIsSuccess && searchResult.totalItems === 0 &&
                <div className="pt-4 pb-8 px-2">
                    No books were found with that ISBN. Please try another one.
                </div>
            }

            {/* BOOKS ARE FOUND */}
            { isSearchFormSubmitted && searchIsSuccess && searchResult.totalItems > 0 &&
                <BookPreview 
                    cover={cover} 
                    title={title} 
                    author={author} 
                    isRead={isRead} 
                    setIsRead={setIsRead} 
                    handleAdd={handleAdd} 
                    clearSearch={clearSearch}
                />
            }
                  
            {/* BOOK IS ADDING */}
            { addIsLoading && <div className="pt-4 pb-8 px-2">Adding Book...</div> }

            {/* ERROR ADDING BOOK */}
            { addIsError && <div className="pt-4 pb-8 px-2">There was an error, please try again.</div> }

            {/* BOOK IS ADDED */}
            { addIsSuccess && <div className="pt-0 pb-8 px-2"> {title} was added successfully!</div> }

        </Modal>
    )
}




function Header({setShowModal, handleSearch, isbnField, setIsbnField, clearSearch}) {

    return (<>
        <h2 className="text-md font-bold">
            Add Book
        </h2>

        <button 
            className="absolute right-4 top-2"
            onClick={ () => setShowModal(false) }>
            ✖
        </button>

        <div>
            <form onSubmit={ handleSearch }>

                <label> 
                    Enter an ISBN number:

                    <div className="flex gap-2 w-full p-4 rounded border border-slate-300  bg-white">

                        <input 
                            className="w-full focus:outline-none"
                            type="text" 
                            value={ isbnField }
                            onChange={ (e:any) => {
                                setIsbnField(e.target.value) 
                            }} 
                        />

                        <button
                            className="cursor-pointer opacity-40"
                            onClick={ clearSearch }
                        >
                            ✖
                        </button>
                        <input type="submit" value='Search' 
                            className="rounded cursor-pointer hover:bg-slate-400" />
                    </div>
                </label>

            </form>
        </div>
    </>
    )
}




function BookPreview({cover, title, author, isRead, setIsRead, handleAdd, clearSearch }) {

    return(
        <>
            <div className="flex items-center gap-4 mt-4">
                {cover !=='notfound.png' && <img src={cover} /> }

                <div>
                    <span className="block text-2xl">{title}</span>
                    <span className="block">{author}</span>
                </div>
                    
            </div>

            <div>
                <form onSubmit={ handleAdd }>
                    <label className="block">
                        I have read this book: &nbsp;
                        <input type="checkbox" defaultChecked={false} onChange={() => setIsRead(!isRead)} />
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
    )
}