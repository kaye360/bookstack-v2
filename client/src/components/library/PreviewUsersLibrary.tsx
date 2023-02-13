import { useContext } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import Loader from "../layout/Loader";
import { useLibrary } from "../../utils/useLibrary";
import LibraryGrid from "./LibraryGrid";
import { UserContext } from "../app/UserContextWrapper";
import TextInline from "../elements/TextInline";
import { ButtonPrimaryOutlined, ButtonPrimaryPlain } from "../elements/buttons";
import Icon from "../elements/Icon";
import TextFlex from "../elements/TextFlex";

export default function PreviewUsersLibrary() {

    const { user } = useContext(UserContext)
    
    const {library, isLoading } = useLibrary( user.id )
    let previewUsersBooks = library.slice(0, 6)

    return(
        <section className="flex flex-col gap-4 p-8 bg-primary-200 dark:bg-primary-900 rounded-xl">

            <h2 className="text-3xl">
                <TextInline>
                    Your Library
                </TextInline>
            </h2>

            { isLoading && <Loader />}

            { previewUsersBooks.length === 0 && 
                <div className=" text-lg">
                    <TextFlex>
                        Your library is empty.
                        <Link to="/library/add"> 
                            <ButtonPrimaryPlain>
                                <Icon icon="control_point" />
                                Add some books
                            </ButtonPrimaryPlain>
                        </Link>
                    </TextFlex>
                </div>
            }

            <LibraryGrid>
                { previewUsersBooks && previewUsersBooks.map( book => {
                    return <Book 
                        id={book.id}
                        title={book.title} 
                        cover={book.coverUrl}
                        showInfo={true} 
                        commentCount={book.commentCount}
                        likes={book.likes.length}
                        isRead={book.isRead}
                        key={book.id} 
                    />
                })}
            </LibraryGrid>

            <Link to="/library">
                <ButtonPrimaryOutlined>
                    <Icon icon="library_books" />
                    View your library
                </ButtonPrimaryOutlined>
            </Link>

        </section>
    )
}