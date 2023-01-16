/**
 * 
 * Book Stack User Interface
 * 
 */

// Dependencies
import React from "react"
import { useQuery } from "react-query"
import { Route, Routes } from "react-router-dom"
import httpReq from "./utils/httpReq"
import { API_BASE_URL } from "./config"

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



function App() {

	const isLoggedIn: boolean = true

	// Notifications
	 const { data, isError, isLoading } = useQuery(
		'notifications',
		() => httpReq.get(API_BASE_URL + '/notifications/new/21')
	)

	return (
		<div className="w-100 max-w-6xl border mx-auto border-slate-300 ">
		<Header /> 

		<main className="flex flex-col gap-8 py-8 px-2">
		<Routes>
			{/* Public Routes */}
			<Route path="/"			element={<Home />} />
			<Route path="/explore" 	element={<Explore />} />
			<Route path="/about" 	element={<About />} />
			<Route path="/account"	element={<Account />} />

			{/* User Routes */}
			<Route path="/dashboard"		element={ isLoggedIn ? <Dashboard />		: <ProtectedPage />} />
			<Route path="/library" 			element={ isLoggedIn ? <Library />			: <ProtectedPage />} />
			<Route path="book/:id" 			element={ isLoggedIn ? <Book />				: <ProtectedPage />} />
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
