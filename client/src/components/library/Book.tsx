import React from "react"

type propTypes = {
    title: string,
    username?: string,
    showInfo?: boolean,
}

export default function Book({ 
    title = '', 
    username, 
    showInfo = false
} : propTypes) {

    return (
        <div className="text-sm">
            <div className="relative rounded bg-slate-200 h-52">
                Book Cover
                { showInfo && 
                    <div className="absolute left-2 bottom-2">
                        💖17 💬5
                    </div> }
            </div>
            <div>{title}</div>
            { username && <div>{username}</div>}
        </div>
        
    )
}