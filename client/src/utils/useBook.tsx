/**
 * 
 * custom hook @function useBook()
 * 
 * This custom hook retrieves and individual book's data
 * both from the local database and the Google Books API.
 * 
 * The google book query is dependant on the local book 
 * query.
 * 
 */

import httpReq from "./httpReq"
import { API_BASE_URL, GOOGLE_KEY } from "../config"
import { useQuery } from "react-query"



export const useBook = (bookID: number | undefined) => {

    /**
     * 
     * Get book data from local database
     * 
     */
    async function getBook() {
        const res = await httpReq.get(API_BASE_URL + '/book/' + bookID)
        return res
    }

    /**
     * 
     * Get book data from Google Books API
     * 
     */
    async function getGoogleBook() {
        if(bookQuery.data.data.isbn) {
            const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookQuery.data.data.isbn}&key=${GOOGLE_KEY}`)
            return res
        }
        return false
    }

    /**
     * 
     * Book queries
     * 
     */
    const bookQuery = useQuery(['getbook', bookID], getBook )
    const googleQuery = useQuery('getGoogleBookData', getGoogleBook, { 
        enabled : bookQuery.isSuccess
    })

    return { bookQuery, googleQuery }
}
