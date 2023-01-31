/**
 * 
 * Book Stack User Interface
 * 
 */

// Dependencies
import { createContext } from "react"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import useAuth from "./utils/useAuth"

// Components
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"

// Pages
import About from "./pages/About"
import Account from "./pages/Account"
import Dashboard from "./pages/Dashboard"
import Explore from "./pages/Explore"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"
import ProtectedPage from "./pages/ProtectedPage"
import Book from "./pages/Book"
import SideBar from "./components/layout/Sidebar"


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

/**
 * Logged In User data
 */
export const UserContext = createContext( UserContextDefault )




function App() {


	/**
	 * User Authentication
	 */
	const Auth: any = useAuth()

	const location = useLocation()

	const isSidebarShown = Auth.isLoggedIn && location.pathname !== '/'

	return (
		<UserContext.Provider value={ Auth } >
		<div id="top" className={`w-100 max-w-6xl mx-auto pb-20 px-[2vw] ${ isSidebarShown ? 'md:pt-8' : ''}`}>

			{location.pathname !== '/' && <Header /> }

			<div className={`
				grid
				${ isSidebarShown ? 'md:grid-cols-content md:gap-8 py-8' : ''} 
			`}>


				{ isSidebarShown && <SideBar /> }

				<main id="#content" className="flex flex-col gap-8 px-2">
				<Routes>
					{/* Public Routes */}
					<Route path="/"	element={<Home />} />
					<Route path="/explore" element={<Explore />} />
					<Route path="/about" element={<About />} />
					<Route path="book/:id" element={ <Book /> } />


					{/* Account Public/Protected Routes */}
					<Route path="/account"
						element={ Auth.isLoggedIn ? <Dashboard /> : <Account />} />

					<Route path="/account/:action"
						element={ Auth.isLoggedIn ? <Dashboard /> : <Account />} />


					{/* Protected User Routes */}
					<Route path="/dashboard"
						element={ Auth.isLoggedIn ? <Dashboard /> : <ProtectedPage />} />

					<Route path="/library"
						element={ Auth.isLoggedIn ? <Library />	: <ProtectedPage />} />

					<Route path="/library/add"		
						element={ Auth.isLoggedIn ? <Library isUserAddingBook={true} />	: <ProtectedPage />} />

					<Route path="/feed"
						element={ Auth.isLoggedIn ? <Feed /> : <ProtectedPage />} />

					<Route path="/notifications" 	
						element={ Auth.isLoggedIn ? <Notifications />	: <ProtectedPage />} />

					<Route path="/user"
						element={ Auth.isLoggedIn ? <Profile /> : <ProtectedPage />} />

					<Route path="/user/:username"
					 	element={ Auth.isLoggedIn ? <Profile /> : <ProtectedPage />} />

				</Routes>
				</main>

			</div>

			<Footer />

		</div>
		</UserContext.Provider>
)
}

export default App
