import { Link, useLocation } from "react-router-dom"


interface Iicons {
    [key: string] : string
}


export default function Notification({type, url, children}) {

    const location = useLocation()

    const icons: Iicons = {
        upload : '📖',
        comment : '💬',
        like : '💟',
    }

    return <li className="border-b border-primary-600 last:border-0 py-4">
        <span className="inline-block mr-4 py-2">
            { icons[type] }
        </span>
        { children }
        <Link 
            to={ url } state={ {from : location.pathname } } 
            className="ml-4 text-primary-300 underline"
        >
            View
        </Link>
    </li>
}