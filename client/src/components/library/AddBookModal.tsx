import React, { useContext, useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { API_BASE_URL, GOOGLE_KEY } from "../../config"
import httpReq from "../../utils/httpReq"
import Modal from "../layout/Modal"
import Loader from "../layout/Loader"
import { UserContext } from "../../main"

import IconCloseDark from "../../assets/img/icon-close-dark.svg"


interface propType {
    setShowModal: Function,
    refetchLibrary: Function
}

export default function AddBookModal({setShowModal, refetchLibrary} : propType) {

    const { user } = useContext(UserContext)

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
        return res
    }

    function handleSearch(e: any) {
        queryClient.removeQueries('searchGoogleBooksAPI', { exact : true } )
        queryClient.removeQueries('addBook', { exact : true } )
        e.preventDefault()
        setIsSearchFormSubmitted(true)
        refetchSearch()
    }

    let title: string = ''
    let author: string = ''
    let cover: string = ''
    
    if (searchResult && searchResult.totalItems > 0) {
        console.log()
        title = searchResult.items[0].volumeInfo.title || ''
        author = Array.isArray(searchResult.items[0].volumeInfo.authors)
            ? searchResult.items[0].volumeInfo.authors[0]
            :  ''
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
            user_id : user.id,
            username: user.username
        }

        const res = await httpReq.post(API_BASE_URL + '/book', postData)
        refetchLibrary()
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
            { searchIsError && 
                <div className="pt-4 pb-8 px-2 text-primary-800">
                    Something went wrong with your search
                </div>
            }

            {/* NO BOOKS FOUND IN SEARCH*/}
            { searchIsSuccess && searchResult.totalItems === 0 &&
                <div className="pt-4 pb-8 px-2 text-primary-800">
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
            { addIsLoading && 
                <div className="pt-4 pb-8 px-2 text-primary-800">
                    Adding Book...
                </div>
            }

            {/* ERROR ADDING BOOK */}
            { addIsError && 
                <div className="pt-4 pb-8 px-2 text-primary-800">
                    There was an error, please try again.
                </div>
            }

            {/* BOOK IS ADDED */}
            { addIsSuccess && 
                <div className="pt-0 pb-8 px-2 text-primary-800">
                    {title} was added successfully!
                </div>
            }

        </Modal>
    )
}




function Header({setShowModal, handleSearch, isbnField, setIsbnField, clearSearch}) {

    return (<>
        <h2 className="text-md font-bold text-primary-800">
            Add Book
        </h2>

        <button 
            className="absolute right-4 top-2 bg-transparent"
            onClick={ () => setShowModal(false) }
        >
            <img src={IconCloseDark} />    
        </button>

        <div className="text-primary-800">
            <form onSubmit={ handleSearch }>

                <label className="cursor-text"> 
                    <span className="inline-block my-2 cursor-default ">
                        Enter an ISBN number:
                    </span>

                    <div className="flex gap-2 w-full p-4 rounded border border-primary-400  bg-primary-50">

                        <input 
                            className="w-full focus:outline-none bg-primary-50"
                            type="text" 
                            value={ isbnField }
                            onChange={ (e:any) => {
                                setIsbnField(e.target.value) 
                            }} 
                        />

                        <button
                            className="cursor-pointer bg-primary-50"
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
            <div className="flex items-center gap-4 mt-4 text-primary-800">
                {cover 
                    ? <img src={cover} /> 
                    : 'Book cover not available'
                }

                <div>
                    <span className="block text-2xl">{title}</span>
                    <span className="block">{author}</span>
                </div>
                    
            </div>

            <div className="text-primary-800">
                <form onSubmit={ handleAdd }>
                    <label className="block">
                        I have read this book: &nbsp;
                        <input type="checkbox" defaultChecked={false} onChange={() => setIsRead(!isRead)} />
                    </label>

                    <input type="submit" value="Add To Library" 
                        className="rounded cursor-pointer font-bold
                        my-4 mr-4 px-4 py-2 
                        bg-primary-300 hover:bg-transparent border hover:border-primary-300" />

                    <button onClick={clearSearch}
                        className="rounded cursor-pointer font-bold
                        my-4 mr-4 px-4 py-2 
                        bg-secondary-200 hover:bg-transparent border hover:border-secondary-300"
                    >
                        Clear Search
                    </button>
                </form>
            </div>
        </>
    )
}