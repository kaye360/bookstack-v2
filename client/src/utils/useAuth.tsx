import { useState } from "react"
import { useQuery } from "react-query"
import { API_BASE_URL } from "../config"
import httpReq from "./httpReq"



export default function useAuth() {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const localToken = localStorage.getItem('token') || false

    const { data } = useQuery('getUser', getUser)

    async function getUser() {
        if(!localToken) return

        const res = await httpReq.get(API_BASE_URL + '/session/' + localToken)
        const data = await res.json()

        if(data.success) {
            setIsLoggedIn(true)
            setUser({
                id: data.id,
                username: data.username,
                token: localToken
            })
        } else {
            logout()
        }
        return data
    }

    async function logout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser({})

        const postData = {
            id: user.id
        }
        const res = await httpReq.post(API_BASE_URL + '/user/logout', postData)
        const logoutData = await res.json()
        console.log(logoutData)
    }
    
    return {user, setUser, isLoggedIn, setIsLoggedIn, logout }
}