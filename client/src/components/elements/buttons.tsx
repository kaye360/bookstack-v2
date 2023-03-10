import { MouseEventHandler } from "react";
import { ReactNode } from "react";

interface ButtonProps {
    className?: string,
    onClick? : MouseEventHandler,
    children: ReactNode
}




export function ButtonBasic({className, children, onClick} : ButtonProps) {

    return (
        <button
            className={`border-none outline-none bg-transparent text-primary-750 dark:text-primary-100 ${className}`}
            onClick={onClick}
        >

            {children}
            
        </button>
    )
}





export function ButtonPrimaryOutlined({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 
            outline-primary-600 text-primary-600
            dark:outline-primary-300 dark:text-primary-100
            hover:outline-secondary-400 hover:text-secondary-400
            rounded-md font-semibold
            ${className} `} 

            onClick={onClick}
        >
                
        
           {children}
        </button>
    )
}





export function ButtonSecondaryOutlined({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 outline-secondary-400 text-secondary-400
            hover:outline-primary-400 hover:text-primary-400
            rounded-md font-medium
            ${className} `} 

            onClick={onClick}
        >
                
        
           {children}
        </button>
    )
}





export function ButtonPrimaryPlain({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 px-0
            border-none bg-transparent outline-none
            text-primary-800 hover:underline font-medium
            dark:text-primary-100
            ${className}`}

            onClick={onClick}
        >

            {children}

        </button>
    )
}





export function ButtonSecondaryPlain({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 px-0
            border-none bg-transparent outline-none
            text-secondary-500 hover:underline font-medium
            ${className}`}

            onClick={onClick}
        >

            {children}

        </button>
    )
}




export function ButtonPrimaryFilled({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 
            bg-primary-600 outline-primary-600 text-primary-100
            dark:bg-primary-300 dark:outline-primary-300 dark:text-primary-800
            hover:outline-secondary-400 hover:bg-secondary-400
            rounded-md font-semibold
            ${className} `} 

            onClick={onClick}
        >
                
        
           {children}
        </button>
    )
}




export function ButtonSecondaryFilled({className, children, onClick} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 
            bg-secondary-600 outline-secondary-600 text-secondary-100
            dark:bg-secondary-300 dark:outline-secondary-300 dark:text-secondary-800
            hover:outline-primary-400 hover:bg-primary-400
            rounded-md font-semibold
            ${className} `} 

            onClick={onClick}
        >
                
        
           {children}
        </button>
    )
}
