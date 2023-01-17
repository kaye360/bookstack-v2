import httpReq from "./httpReq"
import { API_BASE_URL, GOOGLE_KEY } from "../config"
import { useQuery } from "react-query"



export const useBook = (bookID: number | string | undefined) => {


    async function getBook() {
        const res = await httpReq.get(API_BASE_URL + '/book/' + bookID)
        const data = await res.json()
        return data
    }

    async function getGoogleBook() {
        if(bookQuery.data.isbn) {
            const res: any = await httpReq.get(`https://www.googleapis.com/books/v1/volumes?q=isbn:${bookQuery.data.isbn}&key=${GOOGLE_KEY}`)
            const data = await res.json()
            return data
        }
        return false
    }

    const bookQuery = useQuery('getbook', getBook )
    const googleQuery = useQuery('getGoogleBookData', getGoogleBook, { 
        enabled : bookQuery.isSuccess,
        placeholderData : {
            items: [
                { 
                    volumeInfo : {
                        authors : 'Loading',
                        subtitle : 'Loading',
                        averageRating : 'Loading',
                        categories : 'Loading',
                        description : 'Loading',
                        pageCount : 'Loading',
                        publishedDate : 'Loading',
                    }
                }
            ]
        }
    })

    return { bookQuery, googleQuery }
}
