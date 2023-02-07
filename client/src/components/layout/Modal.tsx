import {  ReactNode } from "react"

interface IModalProps {
    setModalState : Function,
    children: ReactNode
}

/**
 * @todo fix id type
 */

export default function Modal({setModalState, children} : IModalProps) {

        return <div 
            className="fixed inset-0 grid items-center px-3 bg-primary-900 z-[1000] bg-opacity-75"
            id="modal"
            onClick={(e) => {
                console.log(e.target)
                if (e.target.id === 'modal') setModalState(false)}
            }
        >

            <div className="relative z-[2000] rounded-xl flex flex-col gap-8 bg-primary-200 w-full max-w-xl mx-auto p-4 text-primary-800">

                {children}

            </div>

        </div>

}