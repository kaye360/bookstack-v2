/**
 * 
 * Book Stack User Interface
 * 
 */

// Dependencies
import { createContext } from "react"
import { Route, Routes } from "react-router-dom"
import useAuth from "./utils/useAuth"

// Components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Pages
import About from "./pages/About"
import Account from "./pages/Account"
import Dashboard from "./pages/Dashboard"
import Explore from "./pages/explore"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import ProtectedPage from "./pages/ProtectedPage"
import Book from "./pages/Book"


/**
 * User Context Types and default state
 */
interface IUserContext {
	user : {
		username:string,
		id: number, 
		token: string
	},
	setUser?: Function,
	isLoggedIn : boolean,
	setIsLoggedIn? : Function,
	logout? : Function,
	verify? : Function
}

const UserContextDefault: IUserContext = {
	user : {
		username : '',
		id : 0,
		token : ''
	},
	isLoggedIn : false,
}

export const UserContext = createContext( UserContextDefault )




function App() {


	/**
	 * User Authentication
	 * 
	 * @var Auth : type object { user, isLoggedIn }
	 * gets passed into U
	 * 
	 */
	const Auth = useAuth()

	return (
		<UserContext.Provider value={ Auth } >
		<div className="w-100 max-w-6xl border mx-auto border-slate-300 ">
		<Header /> 

		<main className="flex flex-col gap-8 py-8 px-2">
		<Routes>
			{/* Public Routes */}
			<Route path="/"			element={<Home />} />
			<Route path="/explore" 	element={<Explore />} />
			<Route path="/about" 	element={<About />} />
			<Route path="/account"	element={ Auth.isLoggedIn ? <Dashboard /> : <Account />} />

			{/* Protected User Routes */}
			<Route path="/dashboard"		element={ Auth.isLoggedIn ? <Dashboard />		: <ProtectedPage />} />
			<Route path="/library" 			element={ Auth.isLoggedIn ? <Library />			: <ProtectedPage />} />
			<Route path="book/:id" 			element={ Auth.isLoggedIn ? <Book />			: <ProtectedPage />} />
			<Route path="/feed" 			element={ Auth.isLoggedIn ? <Feed /> 			: <ProtectedPage />} />
			<Route path="/notifications" 	element={ Auth.isLoggedIn ? <Notifications />	: <ProtectedPage />} />
			<Route path="/user"				element={ Auth.isLoggedIn ? <Profile /> 		: <ProtectedPage />} />
			<Route path="/user/:username" 	element={ Auth.isLoggedIn ? <Profile /> 		: <ProtectedPage />} />
		</Routes>
		</main>

		<Footer />
		</div>
		</UserContext.Provider>
)
}

export default App
