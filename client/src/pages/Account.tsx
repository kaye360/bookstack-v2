import { useParams } from "react-router-dom";
import AccountCard from "../components/layout/AccountCard";

export default function Account() {

    const { action } = useParams()
    console.log(action)
    
    const defaultComponent = action === 'register' ? 'register' : 'login'

    return(
    <>

        <h1 className="p-4 w-full max-w-xl mx-auto">Sign In or Register</h1>

        <AccountCard defaultComponent={defaultComponent} />

    </>
    ) 
}