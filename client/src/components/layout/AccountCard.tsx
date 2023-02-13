import { useContext, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import { UserContext } from "../app/UserContextWrapper";
import { ButtonPrimaryOutlined } from "../elements/buttons";
import Icon from "../elements/Icon";
import TextBlock from "../elements/TextBlock";
import TextFlex from "../elements/TextFlex";
import TextInline from "../elements/TextInline";

interface AccountCardProps {
    defaultComponent : string
}

export default function AccountCard({defaultComponent} : AccountCardProps) {

    const { isLoggedIn } = useContext(UserContext)

    const [isShown, setIsShown] = useState(defaultComponent)


    return (
        <section className="p-4 w-full max-w-xl mx-auto">

            {!isLoggedIn && isShown === 'login' && <Login /> }
            
            {!isLoggedIn && isShown === 'register' && <Register /> }


            {!isLoggedIn && isShown === 'login' &&
                <p className="mt-8">
                    <TextFlex>
                        Don't have an acount yet? 
                        <ButtonPrimaryOutlined onClick={ () => setIsShown('register')}>
                            Register
                        </ButtonPrimaryOutlined>
                    </TextFlex>
                </p>
            }
            
            {!isLoggedIn && isShown === 'register' &&
                <p className="mt-8">
                    <TextFlex>
                        Already have an account?
                        <ButtonPrimaryOutlined onClick={ () => setIsShown('login')}>
                            Sign In
                        </ButtonPrimaryOutlined>
                    </TextFlex>
                </p>
            }

        </section>
    )

}





interface IResponse {
    success : boolean,
    id: number,
    username: string,
    uuid: string,
    message: string
}


function Login() {

    const { 
        username, setUserName, 
        password, setPassword, 
        login, isLoginError, isLoginLoading, isLoginSuccess, loginError
    } = useContext(UserContext)

    const navigate = useNavigate()


    /**
     * Query functions
     */

    async function handleLogin(e: any) {
        e.preventDefault()
        login()
        if ( isLoginSuccess ) navigate('/dashboard')
    }

    
    return(
        <>
            <h2 className="text-xl font-bold">
                <TextInline>
                    Sign In
                </TextInline>
            </h2>
     
            <p className="my-4">
                <TextInline>
                    Please enter your information below
                </TextInline>
            </p>

            <form onSubmit={handleLogin}>

                <FormRow>
                    Username: 
                    <input type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="p-2 bg-primary-100 dark:bg-primary-200 text-primary-800 rounded"
                    />
                </FormRow>

                <FormRow>
                    Password:
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 bg-primary-100 dark:bg-primary-200 text-primary-800 rounded"
                    />
                </FormRow>

                <div className="flex items-center gap-4 my-6">
                    <input type="submit" value="Sign In" 
                        className="px-4 py-2 rounded-lg bg-secondary-400 text-primary-800 cursor-pointer font-bold"/>

                    {isLoginSuccess && (
                        <TextBlock>
                            <Icon icon="login" />
                            Sign in successful. Redirecting...
                        </TextBlock> 
                    )}

                    {isLoginLoading && (
                        <TextFlex className="animate-pulse">
                            <Icon icon="loop" />
                            Logging in, please wait...
                        </TextFlex> 
                        
                    )}

                    {isLoginError && (
                        <TextFlex>
                            <Icon icon="warning" />
                            {loginError.message}
                        </TextFlex> 
                    )}
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
        const res : IResponse = await httpReq.post(API_BASE_URL + '/user', postData)
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
            <h2 className="text-xl font-bold">
                <TextInline>
                    Register
                </TextInline>
            </h2>

            <p className="my-4">
                <TextInline>
                    Please enter your information below
                </TextInline>
            </p>

            <form onSubmit={handleRegister}>

                <FormRow>
                    Username: 
                    <input type="text"
                        value={username}
                        onChange={(e) => setUserName(e.target.value)}
                        className="p-2 bg-primary-100 dark:bg-primary-200 text-primary-800 rounded"
                    />
                </FormRow>

                <FormRow>
                    Password:
                    <input type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="p-2 bg-primary-100 dark:bg-primary-200 text-primary-800 rounded"
                    />
                </FormRow>

                <FormRow>
                    Confirm Password:
                    <input type="password" 
                        value={confirm_password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="p-2 bg-primary-100 dark:bg-primary-200 text-primary-800 rounded"
                    />
                </FormRow>

                <div className="flex items-center gap-4 my-6">
                    <input type="submit" value="Register" className="px-4 py-2 rounded-lg bg-secondary-400 text-primary-800 cursor-pointer font-bold"/>

                    {isLoading && (
                        <TextBlock>
                            <Icon icon="loop" />
                            'Creating your account...'
                        </TextBlock>
                    )}


                    {isError && (
                        <TextBlock>
                            <Icon icon="warning" />
                            There was an error
                        </TextBlock>
                    )}

                    <TextBlock>
                        {message}
                    </TextBlock>
                </div>

            </form>
        </>
    )
}




function FormRow({children}) {

    return(
        <label className="
            grid sm:grid-cols-[1fr_350px] items-center gap-4
            p-4 my-4 rounded-lg 
            bg-primary-200 dark:bg-primary-700 text-primary-800 dark:text-primary-100 font-semibold">
            {children}
        </label>
    )
}