import Logo from "./Logo"

export default function Footer() {

    
    return(
        <nav className="flex items-center justify-between px-2 py-12 bg-slate-700 text-slate-200">

            <Logo/>

            <a href="#top">Top</a>

        </nav>
    )
}