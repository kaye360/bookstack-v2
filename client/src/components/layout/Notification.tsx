import { Link } from "react-router-dom"


export default function Notification({type, url, children}) {

    const icons = {
        'upload' : '📖',
        'comment' : '💬',
        'like' : '💟'
    }

    return <li className="border-b border-slate-200 last:border-0">
        <span className="inline-block mr-4 py-2">
            { icons[type] }
        </span>
        { children }
        <Link to={ url } className="ml-4">View</Link>
    </li>
}