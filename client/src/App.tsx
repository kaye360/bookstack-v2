import React from "react"
import { Route, Routes } from "react-router-dom"
import Header from "./components/layout/Header"
import About from "./pages/About"
import Account from "./pages/Account"
import Explore from "./pages/explore"
import Feed from "./pages/Feed"
import Home from "./pages/Home"
import Library from "./pages/Library"
import Notifications from "./pages/Notifications"
import Profile from "./pages/Profile"



function App() {


  return (
      <div className="w-100 max-w-6xl border mx-auto border-slate-300 ">
        <Header /> 

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/about" element={<About />} />
          <Route path="/account" element={<Account />} />

          {/* User Routes */}
          <Route path="/library" element={<Library />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/user" element={<Profile />} />
          <Route path="/user/:username" element={<Profile />} />
        </Routes>
      </div>
  )
}

export default App
