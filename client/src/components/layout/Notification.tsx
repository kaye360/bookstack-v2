/**
 * 
 * Single notification LI component
 * 
 */

import { Link, useLocation } from "react-router-dom"

import iconLike from "../../assets/img/icon-like.png"
import iconAdd from "../../assets/img/book-no-cover.png"
import iconComment from "../../assets/img/icon-chat.png"


interface Iicons {
    [key: string] : string
}


export default function Notification({type, url, children}) {

    const location = useLocation()

    const icons: Iicons = {
        upload : iconAdd,
        comment : iconComment,
        like : iconLike,
    }

    return <li className="flex items-center gap-4 py-4 border-b border-primary-700 text-primary-100">
        <span className="inline-block mr-4 py-2 min-w-[30px]">
            <img src={ icons[type] } className="opacity-30" />
        </span>

        <div>
            <p>{ children }</p>
            <Link 
                to={ url } state={ {from : location.pathname } } 
                className="text-primary-300 underline"
            >
                View
            </Link>

        </div>
    </li>
}