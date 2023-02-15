/**
 * 
 * custom hook @function useAuth()
 * 
 * This is the user authentication logic and is used as the as a global
 * useContext hook UserContext.
 * 
 */

import { useState } from "react"
import { useQuery, useQueryClient } from "react-query"
import { API_BASE_URL } from "../config"
import httpReq from "./httpReq"


interface IdefaultUser {
    id: number,
    username: string,
    token: string
}


export default function useAuth() {

    /**
     * 
     * User Auth State
     * 
     */

    const defaultUser: IdefaultUser = {
        id: 0,
        username : '',
        token : ''
    }
    const [user, setUser] = useState( defaultUser )
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const localToken: string | false = localStorage.getItem('token') || false

    /**
     * 
     * Check if Token is stored in Local Storage and 
     * validate against token in Database
     * 
     */
    const { isError: isGetUserError } = useQuery('getUser', getUser)

    async function getUser() {
        if(!localToken) return

        const res = await httpReq.get(API_BASE_URL + '/session/' + localToken)
        console.log(res)

        if(res.success) {
            setIsLoggedIn(true)
            setUser({
                id: res.data.id,
                username: res.data.username,
                token: localToken
            })
        } else {
            logout()
        }
        return res
    }

    /**
     * 
     * Login query and logic
     * 
     */

    const [username, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const queryClient = useQueryClient()

    const {
        isSuccess: isLoginSuccess,
        isLoading: isLoginLoading,
        isError: isLoginError,
        error : loginError,
        refetch: login, 
    } = useQuery('login', loginQuery, { enabled: false, retry: 1 })

    async function loginQuery() {

        const postData = { username, password }
        const res = await httpReq.put(API_BASE_URL + '/login', postData )
        console.log(res)

        if(res.success) {
            setTimeout( () => {
                localStorage.setItem('token', res.data.uuid)
                setIsLoggedIn(true)
                setUser({
                    id: Number(res.data.id),
                    username: res.data.username,
                    token: res.data.uuid
                })
                queryClient.removeQueries('login', { exact : true } )
            }, 1500)
        } else {
            throw new Error(res.message)
        }

        return res
    }

    /**
     * 
     * Logout query and logic
     * 
     */

    async function logout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(defaultUser)

        const postData = {
            id: user.id
        }
        const res = await httpReq.put(API_BASE_URL + '/logout', postData)
    }

    /**
     * 
     * @returns an object of values and functions to be used
     * 
     */
    
    return {
        user, setUser, 
        isLoggedIn, setIsLoggedIn, 
        username, setUserName, 
        password, setPassword,
        login, logout,
        isLoginLoading, isLoginSuccess, isLoginError, loginError
    }
}