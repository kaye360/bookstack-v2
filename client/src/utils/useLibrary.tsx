import httpReq from "./httpReq"
import { API_BASE_URL } from "../config"
import { useQuery } from "react-query"



export const useLibrary = (userId) => {

    const { data, isError, isLoading } = useQuery(
		'library',
		() => httpReq.get(API_BASE_URL + '/books/' + userId)
	)

    interface Library {
        author: string,
        commentCount : number,
        cover_url: string,
        id: number,
        isRead: boolean,
        isbn: string, 
        likes: [],
        title: string,
        userId: number
    }

    let library: Library[] = []

    if(data?.data) {

        library = data.data.map( book => {
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