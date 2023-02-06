/**
 * 
 * Book Stack User Interface
 * 
 */

// Dependencies
import { Route, Routes, useLocation } from "react-router-dom"

// Components
import Header from "./components/layout/Header"
import SideBar from "./components/layout/Sidebar"
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
import Logout from "./pages/Logout"
import { useContext } from "react"
import { UserContext } from "./components/app/UserContextWrapper"





function App() {


	/**
	 * User Authentication
	 */

	const location = useLocation()

	const { isLoggedIn } = useContext(UserContext)

	const isSidebarShown: boolean = isLoggedIn && location.pathname !== '/'
	console.log(isLoggedIn)

	return <>

		<div id="top" className={`
			flex flex-col
			w-100 max-w-6xl min-h-screen mx-auto pb-20 md:pb-0 px-[2vw]
			${ isSidebarShown ? 'md:pt-8' : ''}
		`}>

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
						element={ isLoggedIn ? <Dashboard /> : <Account />} />

					<Route path="/account/:action"
						element={ isLoggedIn ? <Dashboard /> : <Account />} />

					<Route path="/logout" element={<Logout />} />


					{/* Protected User Routes */}
					<Route path="/dashboard"
						element={ isLoggedIn ? <Dashboard /> : <ProtectedPage />} />

					<Route path="/library"
						element={ isLoggedIn ? <Library />	: <ProtectedPage />} />

					<Route path="/library/add"		
						element={ isLoggedIn ? <Library isUserAddingBook={true} />	: <ProtectedPage />} />

					<Route path="/feed"
						element={ isLoggedIn ? <Feed /> : <ProtectedPage />} />

					<Route path="/notifications" 	
						element={ isLoggedIn ? <Notifications />	: <ProtectedPage />} />

					<Route path="/user"
						element={ isLoggedIn ? <Profile /> : <ProtectedPage />} />

					<Route path="/user/:username"
					 	element={ isLoggedIn ? <Profile /> : <ProtectedPage />} />

				</Routes>
				</main>

			</div>

			<Footer />

		</div>
	</>
}

export default App
