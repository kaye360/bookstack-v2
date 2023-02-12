import { ReactNode } from "react";


interface IconProps {
    icon: string,
    className?: string
}

export default function Icon ({icon, className=''} : IconProps) {

    return <span className={`material-icons transition-all duration-100 ${className}`}>{icon}</span>
}