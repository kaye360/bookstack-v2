import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQuery } from "react-query"



export const useLibrary = (userId: number) => {

    async function getLibrary() {
        const res = await httpReq.get(API_BASE_URL + '/books/' + userId)
        const data = await res.json()
        return data
    }

    const { data, isError, isLoading } = useQuery('library', getLibrary)

    interface Library {
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

    let library: Library[] = []

    if(data) {

        library = data.map( 
            (book: { 
                author: string, 
                comment_count: number,
                cover_url: string,
                id: number,
                is_read: boolean | string,
                isbn: string,
                likes: string,
                title: string,
                user_id: number
            }) => {
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

    return {library, amount, isError, isLoading}


}