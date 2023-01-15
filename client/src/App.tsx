/**
 * 
 * Book Stack User Interface
 * 
 */

// Dependencies
import React from "react"
import { Route, Routes } from "react-router-dom"
import Footer from "./components/layout/Footer"

// Components
import Header from "./components/layout/Header"

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



function App() {

	const isLoggedIn: boolean = true

	return (
		<div className="w-100 max-w-6xl border mx-auto border-slate-300 ">
		<Header /> 

		<main>
		<Routes>
			{/* Public Routes */}
			<Route path="/"			element={<Home />} />
			<Route path="/explore" 	element={<Explore />} />
			<Route path="/about" 	element={<About />} />
			<Route path="/account"	element={<Account />} />

			{/* User Routes */}
			<Route path="/dashboard"		element={ isLoggedIn ? <Dashboard />		: <ProtectedPage />} />
			<Route path="/library" 			element={ isLoggedIn ? <Library />			: <ProtectedPage />} />
			<Route path="/feed" 			element={ isLoggedIn ? <Feed /> 			: <ProtectedPage />} />
			<Route path="/notifications" 	element={ isLoggedIn ? <Notifications />	: <ProtectedPage />} />
			<Route path="/user" 			element={ isLoggedIn ? <Profile /> 			: <ProtectedPage />} />
			<Route path="/user/:username" 	element={ isLoggedIn ? <Profile /> 			: <ProtectedPage />} />
		</Routes>
		</main>

		<Footer />
		</div>
)
}

export default App
