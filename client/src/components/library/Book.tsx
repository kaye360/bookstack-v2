import React from "react"

type propTypes = {
    title: string,
    username?: string,
    cover?: string,
    likes?: number,
    commentCount?: number,
    isRead?: boolean,
    showInfo?: boolean,
}

export default function Book({ 
    title = '', 
    username, 
    cover,
    likes,
    commentCount,
    isRead,
    showInfo = false
} : propTypes) {

    return (
        <div className="text-sm">
            <div className="relative rounded-xl bg-slate-200 h-52">
                {cover?.startsWith('http') &&
                    <img src={cover} className="w-100 w-full h-full object-cover rounded-xl" />
                }

                { showInfo && 
                    <div className="absolute left-0 right-0 bottom-0 flex justify-between p-1 bg-slate-900 text-slate-200">
                        <span>💖{likes}</span>
                        <span>💬{commentCount}</span>
                        <span>{isRead ? '☑️' : '🔲' }</span>
                    </div> }
            </div>
            <div>{title}</div>
            { username && <div>{username}</div>}
        </div>
        
    )
}