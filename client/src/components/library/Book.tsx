import React from "react"

type propTypes = {
    title: string,
    username?: string,
    likes?: number,
    commentCount?: number,
    isRead?: boolean,
    showInfo?: boolean,
}

export default function Book({ 
    title = '', 
    username, 
    likes,
    commentCount,
    isRead,
    showInfo = false
} : propTypes) {

    return (
        <div className="text-sm">
            <div className="relative rounded bg-slate-200 h-52">
                Book Cover
                { showInfo && 
                    <div className="absolute left-2 bottom-2">
                        💖{likes} 💬{commentCount} {isRead ? '☑️' : '🔲' }
                    </div> }
            </div>
            <div>{title}</div>
            { username && <div>{username}</div>}
        </div>
        
    )
}