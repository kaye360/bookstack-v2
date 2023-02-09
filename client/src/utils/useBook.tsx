import httpReq from "./httpReq"
import { API_BASE_URL, GOOGLE_KEY } from "../config"
import { useQuery } from "react-query"



export const useBook = (bookID: number | undefined) => {


    async function getBook() {
        const res = await httpReq.get(API_BASE_URL + '/book/' + bookID)
        return res
    }

    async function getGoogleBook() {
        if(bookQuery.data.isbn) {
            const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookQuery.data.isbn}&key=${GOOGLE_KEY}`)
            return res
        }
        return false
    }

    const bookQuery = useQuery(['getbook', bookID], getBook )
    const googleQuery = useQuery('getGoogleBookData', getGoogleBook, { 
        enabled : bookQuery.isSuccess
    })

    return { bookQuery, googleQuery }
}
