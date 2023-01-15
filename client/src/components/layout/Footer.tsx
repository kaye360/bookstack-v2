import React from "react";
import Logo from "./Logo"
import { Link } from "react-router-dom";

export default function Footer() {

    const footerNavLink = 'text-slate-200'
    
    return(
        <nav className="flex items-center justify-between px-2 py-12 bg-slate-700 text-slate-200">

            <Logo/>

            <ul className="flex items-center gap-4">
                <li><Link to="/" className={ footerNavLink }>Home</Link></li>
                <li><Link to="/explore" className={ footerNavLink }>Explore</Link></li>
                <li><Link to="/about" className={ footerNavLink }>About</Link></li>
                <li><Link to="/account" className={ footerNavLink }>Login/Sign Up</Link></li>
            </ul>

        </nav>
    )
}