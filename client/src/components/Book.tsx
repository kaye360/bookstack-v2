import React from "react"

type propTypes = {
    title: string
}

export default function Book({ title = '' } : propTypes) {

    return (
        <div className="rounded bg-slate-200 h-52">
             {title}
        </div>
        
    )
}