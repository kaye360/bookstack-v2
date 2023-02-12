import { ReactNode } from "react"

interface ITextFlexProps {
    children: ReactNode,
    className?: string
}

export default function TextFlex({className='', children} : ITextFlexProps) {

    return (
        <div 
            className={`
                inline-flex items-center gap-2 text-primary-800 dark:text-primary-100 ${className}
            `}>


            {children}


        </div>
    )

}