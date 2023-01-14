import React from "react";
import Logo from "./Logo";

export default function Header() {

    let userNavlink: string = 'text-slate-200'

    return(
        <header className="fixed bottom-0 left-0 right-0 sm:relative">

            <nav className="flex items-center justify-between p-2 border border-slate-400">

                <Logo/>

                <ul className="flex items-center gap-4">
                    <li><a href="/">Home</a></li>
                    <li><a href="/explore">Explore</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/account">Login/Sign Up</a></li>
                </ul>

            </nav>

            <nav>
                <ul className="flex items-center justify-end gap-4 bg-slate-700 text-slate-200 p-2">
                    <li><a className={userNavlink} href="/library">Library</a></li>
                    <li><a className={userNavlink} href="/feed">Feed</a></li>
                    <li><a className={userNavlink} href="/notifications">Notifs</a></li>
                    <li><a className={userNavlink} href="/user/username">Profile</a></li>
                </ul>
            </nav>

        </header>
    )
}