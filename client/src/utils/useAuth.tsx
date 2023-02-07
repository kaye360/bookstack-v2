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
     * User Auth Data
     */

    const defaultUser: IdefaultUser = {
        id: 0,
        username : '',
        token : ''
    }
    const [user, setUser] = useState( defaultUser )
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const localToken = localStorage.getItem('token') || false

    /**
     * Check if Token is stored and preserve login status Query
     */
    const { isError: isGetUserError } = useQuery('getUser', getUser)

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

    /**
     * Login Query
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

        const res = await httpReq.post(API_BASE_URL + '/user/login', postData )

        if(res.success) {
            setTimeout( () => {
                localStorage.setItem('token', res.uuid)
                setIsLoggedIn(true)
                setUser({
                    id: Number(res.id),
                    username: res.username,
                    token: res.uuid
                })
                queryClient.removeQueries('login', { exact : true } )
            }, 1500)
        } else {
            throw new Error(res.message)
        }

        return res
    }

    /**
     * Logout Query
     */
    async function logout() {
        localStorage.removeItem('token')
        setIsLoggedIn(false)
        setUser(defaultUser)

        const postData = {
            id: user.id
        }
        const res = await httpReq.post(API_BASE_URL + '/user/logout', postData)
    }
    
    return {
        user, setUser, 
        isLoggedIn, setIsLoggedIn, 
        username, setUserName, 
        password, setPassword,
        login, logout,
        isLoginLoading, isLoginSuccess, isLoginError, loginError
    }
}