import Logo from "./Logo"

export default function Footer() {

    
    return(
        <nav className="
            flex items-center justify-between 
            mt-auto px-4 py-12 
            rounded-xl bg-slate-700 text-slate-200
            ">

            <Logo/>

            <a href="#top">Top</a>

        </nav>
    )
}