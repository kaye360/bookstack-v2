import React, { useState } from "react";

interface Iprops {
    defaultComponent : string
}

export default function AccountCard({defaultComponent} : Iprops) {

    const [isShown, setIsShown] = useState(defaultComponent)


    return (
        <section className="p-4 w-full max-w-xl mx-auto rounded-xl border border-slate-300">
            {isShown === 'login' ? <Login /> : <Register /> }

            <p>
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

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    async function handleLogin(e: any) {
        e.preventDefault()
        console.log(username, password)
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

                <input type="submit" value="Sign In" 
                    className="px-4 py-2 rounded-lg bg-cyan-700 text-cyan-100 cursor-pointer"/>

            </form>
        </>
    )
}




function Register() {

    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    async function handleRegister(e: any) {
        e.preventDefault()
        console.log(username, password)
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