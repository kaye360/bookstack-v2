import { createContext } from "react"
import useAuth from "../../utils/useAuth"


interface Iuser {
	id : number,
	username : string
}

interface IDefaultUserContext {
	isLoggedIn? : boolean,
	setIsLoggedIn? : Function,
	user? : Iuser,
	setUser? : Function,
	username? : string,
	setUserName? : Function,
	password? : string,
	setPassword? : Function,
	login? : Function,
	logout? : Function,
	isLoginLoading? : boolean,
	isLoginSuccess? : boolean,
	isLoginError? : boolean,
	loginError? : {
		message? : string
	}
}

const defaultUserContext: IDefaultUserContext = {
	isLoggedIn : false,
}

export const UserContext = createContext( defaultUserContext )


export default function UserContextWrapper({children}) {

	const Auth = useAuth()

	return <UserContext.Provider value={Auth}>
		{children}
	</UserContext.Provider>
}