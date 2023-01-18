import { useState } from "react"



export default function useAuth() {

    const [user, setUser] = useState({})
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    return {user, setUser, isLoggedIn, setIsLoggedIn }
}