
/**
 * @todo Remove this component and make a separate one for dashboard
 */

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

    return <li className="bg-primary-750">
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