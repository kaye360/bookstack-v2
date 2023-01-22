import { useState } from "react"
import { useQuery } from "react-query"
import { API_BASE_URL } from "../config"
import httpReq from "./httpReq"



export default function useAuth() {

    /**
     * User Auth Data
     */

    const [user, setUser] = useState( {} )
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const localToken = localStorage.getItem('token') || false

    /**
     * User Auth Queries
     */
    const { isError } = useQuery('getUser', getUser)

    async function getUser() {
        if(!localToken) return

        const res = await httpReq.get(API_BASE_URL + '/session/' + localToken)

        if(res.success) {
            setIsLoggedIn(true)
            setUser({
                id: res.id,
                username: res.username,
                token: localToken
            })
        } else {
            logout()
        }
        return res
    }

    async function logout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser({})

        const postData = {
            id: user.id
        }
        const res = await httpReq.post(API_BASE_URL + '/user/logout', postData)
    }
    
    return {user, setUser, isLoggedIn, setIsLoggedIn, logout }
}