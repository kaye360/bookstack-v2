/**
 * 
 * Single notification LI component
 * 
 */

import { Link, useLocation } from "react-router-dom"
import { ButtonSecondaryOutlined } from "../elements/buttons"
import Icon from "../elements/Icon"
import TextBlock from "../elements/TextBlock"
import TextInline from "../elements/TextInline"



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

    return (
        <li className="flex items-start md:items-center gap-6 py-6 border-b border-primary-600 text-primary-100 last:border-0 last:pb-0 first:pt-0">
        
            <span className="text-primary-400">
                <Icon icon={ icons[type] } />
            </span>

            <TextBlock>
                <p className="-translate-y-2 md:-translate-y-0">{ children }</p>
            </TextBlock>

            <Link 
                to={ url } state={ {from : location.pathname } } 
            >
                <ButtonSecondaryOutlined>
                    View
                </ButtonSecondaryOutlined>
            </Link>

    </li>
    )
}