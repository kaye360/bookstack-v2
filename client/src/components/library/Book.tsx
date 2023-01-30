import { Link, useLocation } from "react-router-dom"

type propTypes = {
    id: number
    title: string,
    username?: string,
    cover?: string,
    likes?: number,
    commentCount?: number,
    isRead?: boolean,
    showInfo?: boolean,
}

export default function Book({ 
    id,
    title = '', 
    username, 
    cover,
    likes,
    commentCount,
    isRead,
    showInfo = false
} : propTypes) {

    const location = useLocation()

    return (
        <Link to={`/book/${id}`} state={ {from : location.pathname } }>
        <div className="flex flex-col justify-end relative bg-primary-200 text-sm h-full rounded-xl overflow-hidden">
                {cover?.startsWith('http') 
                    ? <img src={cover} className="absolute inset-0 z-10 object-cover h-full" />
                    : <span className="absolute block inset-0 text-2xl text-slate-400 text-center">Cover not available</span>
                }

                { showInfo && 
                    <div className="relative z-20 flex justify-between p-1 bg-primary-900 bg-opacity-75 text-slate-200">
                        <span>💖{likes}</span>
                        <span>💬{commentCount}</span>
                        <span>{isRead ? '☑️' : '🔲' }</span>
                    </div>
                }

                <div className="relative z-20 px-2 py-1 text-center bg-primary-900 text-primary-200 h-12 overflow-hidden">
                    {title}
                </div>
            { username && <div>{username}</div>}
        </div>
        </Link>
    )
}