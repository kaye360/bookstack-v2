
interface ISeparatorProps {
    className? : string
}

export default function Separator({className} : ISeparatorProps) {

    return <div className={`border border-primary-300 dark:border-primary-600 ${className}`}></div>
}