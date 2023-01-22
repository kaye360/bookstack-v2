import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../App";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";

interface Iprops {
    defaultComponent : string
}

export default function AccountCard({defaultComponent} : Iprops) {

    const [isShown, setIsShown] = useState(defaultComponent)


    return (
        <section className="p-4 w-full max-w-xl mx-auto rounded-xl border border-slate-300 bg-slate-50 bg-opacity-80">
            {isShown === 'login' ? <Login /> : <Register /> }

            <p className="mt-8">
            {isShown === 'login' &&
                <>
                Don't have an acount yet? 
                <button onClick={ () => setIsShown('register')}>Register</button>
                </>
            }
            
            {isShown === 'register' &&
                <>
                Already have an account?
                <button onClick={ () => setIsShown('login')}>Sign In</button>
                </>
            }
            </p>

        </section>
    )

}




function Login() {

    const {setUser, setIsLoggedIn } = useContext(UserContext)

    /**
     * Form state control
     */
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    /**
     * Query functions
     */
    async function loginUser() {
        const postData = {
            'username' : username,
            'password' : password
        }
        const res = await httpReq.post(API_BASE_URL + '/user/login', postData )

        if(res.success) {
            const timeout = setTimeout( () => {}, 2000)
            localStorage.setItem('token', res.uuid)
            setIsLoggedIn(true)
            setUser({
                id: res.id,
                username: res.username,
                token: res.uuid
            })
        } else {
            throw new Error(res.message)
        }

        return res
    }

    const {isSuccess, refetch, isLoading, error, isError } = useQuery('login', loginUser, {enabled: false})

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

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')


    async function handleRegister(e: any) {
        e.preventDefault()
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
                    <input type="confirm_password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormRow>

                <input type="submit" value="Sign In" 
                    className="px-4 py-2 rounded-lg bg-cyan-700 text-cyan-100 cursor-pointer"/>

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