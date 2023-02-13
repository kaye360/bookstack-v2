import { useParams } from "react-router-dom";
import PageHeading from "../components/elements/PageHeading";
import AccountCard from "../components/layout/AccountCard";

export default function Account() {

    const { action } = useParams()
    
    type TdefaultComponent = 'register' | 'login'
    const defaultComponent: TdefaultComponent = action === 'register' ? 'register' : 'login'

    return(
    <>

        <PageHeading className="w-full max-w-xl mx-auto my-4 px-4">
            Sign In/Register
        </PageHeading>

        <AccountCard defaultComponent={defaultComponent} />

    </>
    ) 
}