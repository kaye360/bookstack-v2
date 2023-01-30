import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Logo from "./Logo";
import IconMenu from "../../assets/img/icon-menu.svg"
import { useState } from "react";

export default function Header() {

    const { isLoggedIn, logout } = useContext(UserContext)


    const baseMenuCss = 'md:relative md:flex md:flex-row items-center md:gap-8 md:px-4 md:max-h-[1000px] md:py-0 transition-all duration-300 ease-in-out'

    const menuHiddenCss = `max-h-[0px] overflow-hidden absolute right-0 top-full flex flex-col gap-4 bg-primary-900 bg-opacity-90 rounded px-16 py-0 ${baseMenuCss}`

    const menuShownCss = `max-h-[600px] absolute right-0 top-full flex flex-col gap-4 bg-primary-900 bg-opacity-90 rounded px-16 py-4 ${baseMenuCss}`

    const [currentMenuCss, setCurrentMenuCss] = useState(menuHiddenCss)

    function toggleMenuCss() {
         if(currentMenuCss === menuShownCss) {
            setCurrentMenuCss(menuHiddenCss)
            return
         }
         if(currentMenuCss === menuHiddenCss) {
            setCurrentMenuCss(menuShownCss)
            return
         }
         setCurrentMenuCss(menuHiddenCss)
    }

    return(
        <header className="relative z-50 bg-primary-900 bg-opacity-80 rounded-xl px-1 py-4">

            <nav className="relative flex items-center justify-between p-2">

                <Logo/>

                <ul className={currentMenuCss} >
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/explore">Explore</NavLink>
                    <NavLink to="/about">About</NavLink>
                    { isLoggedIn
                        ? <NavLink to="/" event={ () => logout() }>Logout</NavLink>
                        : <NavLink to="/account">Account</NavLink>
                     }
                </ul>

                <button 
                    className="bg-transparent outline-0 border-0 focus:border-0 focus:outline-0 md:hidden"
                    onClick={toggleMenuCss}
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

    return <li>
        <Link to={to} onClick={event} className="text-primary-100 font-semibold">{children}</Link>
    </li>
}