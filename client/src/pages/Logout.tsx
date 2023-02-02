import { useEffect } from "react"
import { useState } from "react"
import booksGlobe from "../assets/img/books-globe.png"

export default function Logout() {

    // Timer code found here:
    // https://stackoverflow.com/questions/36299174/setinterval-in-a-react-app
    const [timer, setTimer] = useState(5)

    function interval() {
        if (timer === 0) return
        setTimeout( () => {
            setTimer(timer-1)
        }, 1000)
    } 

    useEffect( () => interval(), [timer])

    return <div className="flex items-center flex-wrap sm:flex-nowrap gap-8 rounded-xl my-12 mx-auto p-4 bg-primary-700">

        <div className="text-center sm:text-left mx-auto sm:mx-0">
            <p className="text-2xl my-4 md:max-w-[20ch]">
                You have successfully been logged out. 
            </p>

            <p>
                Redirecting to home page in {timer}
            </p>
        </div>

        <img src={booksGlobe} className="
            w-2/3 mx-auto
            sm:w-1/2
        " />

    </div>
}