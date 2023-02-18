/**
 * 
 * Custom hook @function useLibrary()
 * 
 * This hook retrieves a user's personal library from the 
 * local DB.
 * 
 */

import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQuery } from "react-query"

interface IBook {
    author: string,
    commentCount : number,
    coverUrl: string,
    id: number,
    isRead: boolean,
    isbn: string, 
    likes: [],
    title: string,
    userId: number
}

interface IBookAPI {
    author: string,
    comment_count : number,
    cover_url: string,
    id: number,
    is_read: boolean | string,
    isbn: string, 
    likes: string,
    title: string,
    user_id: number
}


export const useLibrary = (userId: number) => {

    /**
     * 
     * Get library query and function
     * 
     */

    async function getLibrary() {
        const res = await httpReq.get(API_BASE_URL + '/books/' + userId)
        return res
    }

    const { data, isError, isLoading, refetch: refetchLibrary } = useQuery('library', getLibrary)

    /**
     * 
     * Create an array in @var library and format the
     * data and keys to be used in the app
     * 
     */

    let library: IBook[] = []

    if(data?.data) {

        library = data?.data.map( (book: IBookAPI) => {
            return {
                author : book.author,
                commentCount : book.comment_count,
                coverUrl: book.cover_url,
                id: book.id,
                isRead: book.is_read === "true" ? true : false,
                isbn: book.isbn,
                likes: JSON.parse(book.likes),
                title: book.title,
                userId: book.user_id
            }
        })
    }
        
    let amount: number = library.length

    return {library, amount, isError, isLoading, refetchLibrary}


}