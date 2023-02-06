import { createContext } from "react"
import useAuth from "../../utils/useAuth"


interface Iuser {
	id : number,
	username : string
}

interface IDefaultUserContext {
	isLoggedIn : boolean,
	user?: Iuser,
	setUser? : Function,
	setIsLoggedIn? : Function,
	logout? : Function,
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