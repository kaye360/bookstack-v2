import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Logo from "./Logo";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserContext)

    return(
        <header className="fixed bottom-0 left-0 right-0 z-40 sm:relative sm:mb-8 bg-primary-900 bg-opacity-90 rounded-xl px-1 py-4">

            <nav className="flex items-center justify-between p-2">

                <Logo/>

                <ul className="flex items-center gap-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/about">About</NavLink>
                    { isLoggedIn
                        ? <NavLink to="/" event={ () => logout() }>Logout</NavLink>
                        : <NavLink to="/account">Account</NavLink>
                     }
                    
                </ul>

            </nav>

        </header>
    )
}


interface INavLink {
    to : string,
    children : any,
    event? : any
}

function NavLink({to, children, event} : INavLink) {

    return <li>
        <Link to={to} onClick={event} className="text-primary-100 font-semibold">{children}</Link>
    </li>
}