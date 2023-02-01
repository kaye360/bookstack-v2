import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../App";
import Logo from "./Logo";
import IconMenu from "../../assets/img/icon-menu.svg"
import { useState } from "react";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserContext)


    const baseMenuCss = `
        absolute right-0 top-full 
        flex flex-col gap-4 
        md:relative md:px-4 md:max-h-[1000px] md:py-0 
        md:flex md:flex-row items-center md:gap-8 
        transition-all duration-300 ease-in-out
        bg-primary-900 bg-opacity-90 rounded`


    const menuHiddenCss = `max-h-[0px] overflow-hidden px-16 py-0`
    const menuShownCss = `max-h-[600px] px-16 py-4`
    const [isMenuOpen, setIsMenuOpen] = useState(false)


    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen)
    }

    return(
        <header className="relative z-50 bg-primary-900 bg-opacity-80 rounded-xl px-1 py-4">

            <nav className="relative flex items-center justify-between p-2">

                <Logo/>

                <ul className={`${baseMenuCss} ${isMenuOpen ? menuShownCss : menuHiddenCss}`} >
                    <NavLink to="/" event={toggleMenu}>Home</NavLink>
                    <NavLink to="/explore" event={toggleMenu}>Explore</NavLink>
                    <NavLink to="/about" event={toggleMenu}>About</NavLink>
                    { isLoggedIn
                        ? <NavLink to="/" event={ () => {
                            logout() 
                            toggleMenu()
                        }}>Logout</NavLink>
                        : <NavLink to="/account" event={toggleMenu}>Account</NavLink>
                     }
                </ul>

                <button 
                    className="bg-transparent outline-0 border-0 focus:border-0 focus:outline-0 md:hidden"
                    onClick={toggleMenu}
                >
                    <img src={IconMenu} />
                </button>
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

    const location = useLocation()


    return <li>
        <Link 
            to={to} 
            onClick={event} 
            className={`
                inline-block text-primary-100 font-semibold rounded px-4 py-2
                ${to === location.pathname && 'bg-primary-700'}
            `}>
                {children}
        </Link>
    </li>
}