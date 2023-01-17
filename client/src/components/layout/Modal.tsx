import React from "react"

export default function Modal(props: any) {

    return(
        <div className="fixed inset-0 grid items-center px-3 bg-slate-700 z-50 bg-opacity-95">
            <div className="relative rounded-xl flex flex-col gap-8 bg-slate-200 w-full max-w-xl mx-auto p-4">
                {props.children}
            </div>
        </div>
    )
}