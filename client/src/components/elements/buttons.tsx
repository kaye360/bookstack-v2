import { ReactNode } from "react";

interface ButtonProps {
    className?: string,
    children: ReactNode
}

export function ButtonPrimaryOutlined({className, children} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 outline-primary-300 text-primary-100
            hover:outline-secondary-400 hover:text-secondary-400
            rounded-md font-medium
            ${className} `} >
                
        
           {children}
        </button>
    )
}





export function ButtonSecondaryOutlined({className, children} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 
            border-none bg-transparent outline outline-1 outline-secondary-400 text-secondary-400
            hover:outline-primary-400 hover:text-primary-400
            rounded-md font-medium
            ${className} `} >
                
        
           {children}
        </button>
    )
}





export function ButtonPrimaryPlain({className, children} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 px-0
            border-none bg-transparent outline-none
            text-primary-100 hover:underline font-medium
            ${className}
        `}>

            {children}

        </button>
    )
}





export function ButtonSecondaryPlain({className, children} : ButtonProps) {

    return (
        <button className={`
            inline-flex items-center gap-2 px-0
            border-none bg-transparent outline-none
            text-secondary-500 hover:underline font-medium
            ${className}
        `}>

            {children}

        </button>
    )
}





