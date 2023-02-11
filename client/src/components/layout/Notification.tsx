/**
 * 
 * Single notification LI component
 * 
 */

import { Link, useLocation } from "react-router-dom"
import { ButtonSecondaryOutlined } from "../elements/buttons"
import Icon from "../elements/Icon"



interface Iicons {
    [key: string] : string
}


export default function Notification({type, url, children}) {

    const location = useLocation()

    const icons: Iicons = {
        upload : 'book',
        comment : 'chat_bubble',
        like : 'favorite',
    }

    return <li className="flex items-center gap-6 py-6 border-b border-primary-600 text-primary-100 last:border-0">
        
        <span className="text-primary-300"><Icon icon={ icons[type] } /></span>

        <p>{ children }</p>

        <Link 
            to={ url } state={ {from : location.pathname } } 
        >
            <ButtonSecondaryOutlined>
                View
            </ButtonSecondaryOutlined>
        </Link>

    </li>
}