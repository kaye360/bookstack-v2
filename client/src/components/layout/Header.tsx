import React from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../../utils/useNotifications";
import Logo from "./Logo";

export default function Header() {

    const { amount: notificationsAmount } = useNotifications()

    let userNavlink: string = 'text-slate-200'

    return(
        <header className="fixed bottom-0 left-0 right-0 z-40 sm:relative bg-white">

            <nav className="flex items-center justify-between p-2 border border-slate-400">

                <Logo/>

                <ul className="flex items-center gap-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/account">Login/Sign Up</Link></li>
                </ul>

            </nav>

            <nav>
                <ul className="flex items-center justify-end gap-4 bg-slate-700 text-slate-200 p-2">
                    <li><Link className={userNavlink} to="/dashboard">Dashboard</Link></li>
                    <li><Link className={userNavlink} to="/library">Library</Link></li>
                    <li><Link className={userNavlink} to="/feed">Feed</Link></li>
                    <li>
                        <Link className={userNavlink} to="/notifications">
                            Notifications
                            {notificationsAmount.recent > 0 &&
                            
                                <span className="inline-flex items-center justify-center mx-1 bg-rose-500 rounded-full aspect-square w-6">
                                    {notificationsAmount.recent}
                                </span>
                            }
                        </Link>
                    </li>
                    <li><Link className={userNavlink} to="/user/username">Profile</Link></li>
                </ul>
            </nav>

        </header>
    )
}