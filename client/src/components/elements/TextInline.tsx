import { ReactNode } from "react"

interface ITextInlineProps {
    children: ReactNode,
    className?: string
}

export default function TextInline({className='', children} : ITextInlineProps) {

    return (
        <span
            className={`
                text-primary-800 dark:text-primary-100 ${className}
            `}>


            {children}


        </span>
    )

}