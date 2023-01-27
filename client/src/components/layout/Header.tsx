import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Logo from "./Logo";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserContext)

    return(
        <header className="fixed bottom-0 left-0 right-0 z-40 sm:relative bg-white">

            <nav className="flex items-center justify-between p-2 border border-slate-400">

                <Logo/>

                <ul className="flex items-center gap-4">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/about">About</Link></li>
                    { isLoggedIn
                        ? <li><Link to="/" onClick={ () => logout() }>Logout</Link></li>
                        : <li><Link to="/account">Account</Link></li>
                     }
                    
                </ul>

            </nav>

        </header>
    )
}