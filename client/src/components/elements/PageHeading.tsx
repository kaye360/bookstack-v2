import { ReactNode } from "react"

interface IPageHeadingProps {
    children: ReactNode,
    className?: string
}

export default function PageHeading({children, className=''} : IPageHeadingProps) {

    return(
        <h1 className={`text-4xl font-bold text-primary-700 dark:text-primary-200 ${className}`}>
            {children}
        </h1>
    )
}