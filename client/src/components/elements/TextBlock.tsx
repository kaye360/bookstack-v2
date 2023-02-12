import { ReactNode } from "react"

interface ITextBlockProps {
    children: ReactNode,
    className?: string
}

export default function TextBlock({className='', children} : ITextBlockProps) {

    return (
        <div 
            className={`
                flex flex-col gap-6 text-primary-800 dark:text-primary-100 ${className}
            `}>


            {children}


        </div>
    )

}