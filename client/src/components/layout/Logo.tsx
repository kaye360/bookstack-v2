import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png"


export default function Logo() {


    return(
        <Link to="/" className="flex items-center gap-[2px] text-2xl font-bold text-primary-100 hover:text-primary-100 border-b-2 border-transparent hover:border-secondary-400">
            <img src={logo} className="-translate-y-[1px]" />
            <span>
                Book    
                <span className="text-secondary-500 font-normal text-2xl">
                    Stack
                </span>
            </span>
        </Link>
    )
}