import Logo from "./Logo"

export default function Footer() {

    
    return(
        <nav className="
            flex items-center justify-between 
            mt-auto px-4 py-12 
            rounded-xl bg-slate-700 text-slate-200
            ">

            <div className="flex flex-col gap-2">
                <p>
                    <Logo/> by Josh Kaye
                </p>
                <p>
                    <a href="https://joshkaye.ca" 
                        target="_blank" 
                        className="text-secondary-400"
                    >
                        Portfolio
                    </a>
                </p>
                <p>
                    <a href="https://github.com/kaye360/bookstack-v2" 
                        target="_blank" 
                        className="text-secondary-400"
                    >
                        GitHub Repo
                    </a> 
                </p>
            </div>

            <a href="#top">Top</a>

        </nav>
    )
}
