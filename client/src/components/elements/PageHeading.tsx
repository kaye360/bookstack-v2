import { ReactNode } from "react"

interface IPageHeadingProps {
    children: ReactNode
}

export default function PageHeading({children} : IPageHeadingProps) {

    return(
        <h1 className="text-4xl font-bold text-primary-700 dark:text-primary-200">
            {children}
        </h1>
    )
}