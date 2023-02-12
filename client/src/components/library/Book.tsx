import { Link, useLocation } from "react-router-dom"
import Icon from "../elements/Icon"
import bookNoCover from "../../assets/img/book-no-cover.png"

type propTypes = {
    id: number
    title: string,
    username?: string,
    cover?: string,
    likes?: number,
    commentCount?: number,
    isRead?: boolean,
    showInfo?: boolean,
}

export default function Book({ 
    id,
    title = '', 
    username, 
    cover,
    likes,
    commentCount,
    isRead,
    showInfo = false
} : propTypes) {

    const location = useLocation()

    return (
        <Link to={`/book/${id}`} state={ {from : location.pathname } }>

            <BookWrapper>

                <img src={cover ? cover : bookNoCover} className={`absolute inset-0 z-10 object-cover w-full ${ !cover ? 'opacity-20' :  ''} `} />

                { showInfo && 
                    <div className="
                        relative z-20 flex justify-between p-1 
                        bg-primary-200 text-primary-900
                        dark:bg-primary-900 dark:text-primary-200
                        bg-opacity-75
                        text-sm text-opacity-50 hover:text-opacity-100
                    ">

                        <BookInfoItem>
                            <Icon icon="favorite" className="text-sm" />
                            {likes}
                        </BookInfoItem>

                        <BookInfoItem>
                            <Icon icon="chat_bubble" className="text-sm" />
                            {commentCount}
                        </BookInfoItem>

                        <BookInfoItem>
                            <Icon icon={isRead ? 'check_box' : 'check_box_outline_blank'} className="text-sm" />
                        </BookInfoItem> 
                    </div>
                }

                <div className="
                    relative z-20 px-2 py-1 text-center 
                    h-12 overflow-hidden
                    bg-primary-150 text-primary-900
                    dark:bg-primary-900 dark:text-primary-200 
                ">
                    {title}
                </div>
                 { username && <div>{username}</div>}
                 
            </BookWrapper>

        </Link>
    )
}




function BookWrapper({children}) {

    return(
        <div className="
            flex 
            flex-col 
            justify-end 
            relative 
            h-full 
            aspect-[1/1.7]
            overflow-hidden 
            rounded-xl 
            text-sm 
            hover:shadow-lg 
            hover:shadow-primary-300
            dark:hover:shadow-primary-600"
        >

            {children}

        </div>
    )
}




function BookInfoItem({children}) {

    return(
        <span className="
            flex 
            items-center 
            gap-1
        ">
            {children}
        </span>
    )
}