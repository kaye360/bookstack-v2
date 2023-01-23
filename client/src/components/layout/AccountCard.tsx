import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../App";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";

interface Iprops {
    defaultComponent : string
}

export default function AccountCard({defaultComponent} : Iprops) {

    const { isLoggedIn, user } = useContext(UserContext)

    const [isShown, setIsShown] = useState(defaultComponent)


    return (
        <section className="p-4 w-full max-w-xl mx-auto rounded-xl border border-slate-300 bg-slate-50 bg-opacity-80">

            {isLoggedIn && <Welcome user={user.username} /> }

            {!isLoggedIn && isShown === 'login' && <Login /> }
            
            {!isLoggedIn && isShown === 'register' && <Register /> }


            {!isLoggedIn && isShown === 'login' &&
                <p>
                Don't have an acount yet? 
                <button onClick={ () => setIsShown('register')}>Register</button>
                </p>
            }
            
            {!isLoggedIn && isShown === 'register' &&
                <p>
                Already have an account?
                <button onClick={ () => setIsShown('login')}>Sign In</button>
                </p>
            }

        </section>
    )

}




function Welcome({user}) {

    return <>
        <p>
            Welcome back, {user.username}
        </p>

        <Link to="/dashboard">View your dashboard</Link>
    </>
}




function Login() {

    const {setUser, setIsLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    /**
     * Form state control
     */
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    /**
     * Query functions
     */
    const {
        isSuccess, 
        refetch, 
        isLoading, 
        error, 
        isError 
    } = useQuery('login', loginUser, { enabled: false })

    async function loginUser() {
        const postData = {
            'username' : username,
            'password' : password
        }
        const res = await httpReq.post(API_BASE_URL + '/user/login', postData )

        if(res.success) {
            setTimeout( () => {
                localStorage.setItem('token', res.uuid)
                setIsLoggedIn(true)
                setUser({
                    id: res.id,
                    username: res.username,
                    token: res.uuid
                })
                queryClient.removeQueries('login', { exact : true } )
                navigate('/dashboard')
            }, 1500)
        } else {
            throw new Error(res.message)
        }

        return res
    }



    async function handleLogin(e: any) {
        e.preventDefault()
        refetch()
    }

    
    return(
        <>
            <h2 className="text-xl font-bold text-cyan-600">Sign In</h2>
     
            <p>Please enter your information below</p>

            <form onSubmit={handleLogin}>

                <FormRow>
                    Username: 
                    <input type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </FormRow>

                <FormRow>
                    Password:
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormRow>

                <div className="flex items-center gap-4">
                    <input type="submit" value="Sign In" 
                        className="px-4 py-2 rounded-lg bg-cyan-700 text-cyan-100 cursor-pointer"/>

                    {isSuccess && <div>Sign in successful. Redirecting...</div> }
                    {isLoading && <div className="animate-pulse">Logging in, please wait...</div> }
                    {isError && <div className="text-red-400">{error.message}</div> }
                </div>

            </form>
        </>
    )
}




function Register() {

    const queryClient = useQueryClient()
    const navigate = useNavigate()
    const {setUser, setIsLoggedIn} = useContext(UserContext)

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirm_password, setConfirmPassword] = useState('')
    const [message, setMessage] = useState('')

    /**
     * Query functions
     */
    const {
        isError,
        isLoading,
        isSuccess,
        refetch,
        data
    } = useQuery('register', registerUser, {enabled: false})

    async function registerUser() {

        // Attempt Register
        const postData = { username, password, confirm_password }
        const res = await httpReq.post(API_BASE_URL + '/user', postData)
        if(res.success) {
            setMessage('')

            // login and set token
            const loginPostData = { username, password }
            const loginRes = await httpReq.post(API_BASE_URL + '/user/login', postData )
            console.log(loginRes)

            localStorage.setItem('token', loginRes.uuid)
            setIsLoggedIn(true)
            setUser({
                id: loginRes.id,
                username: loginRes.username,
                token: loginRes.uuid
            })

            setTimeout( () => {

                // Clear Query
                queryClient.removeQueries('register', {exact : true})

                // Set UI success message
                setMessage('Register successful. Redirecting to your dashboard...')

                //redirect
                navigate('/dashboard')
            })
        } else {

            //Error with register
            setMessage(res.message)
        }
    }


    async function handleRegister(e: any) {
        e.preventDefault()
        setMessage('')
        refetch()
    }


    return(
        <>
            <h2 className="text-xl font-bold text-cyan-600">Register</h2>

            <p>Please enter your information below</p>

            <form onSubmit={handleRegister}>

                <FormRow>
                    Username: 
                    <input type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </FormRow>

                <FormRow>
                    Password:
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormRow>

                <FormRow>
                    Confirm Password:
                    <input type="password" 
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </FormRow>

                <div className="flex items-center gap-4">
                    <input type="submit" value="Sign In" className="px-4 py-2 rounded-lg bg-cyan-700 text-cyan-100 cursor-pointer"/>
                    <span>
                        {isLoading && 'Creating your account...' }
                        {isError && 'There was an error' }
                        {message}
                    </span>
                </div>

            </form>
        </>
    )
}




function FormRow({children}) {

    return(
        <label className="grid grid-cols-[1fr_2fr] p-4 my-4 rounded-lg bg-slate-100">
            {children}
        </label>
    )
}