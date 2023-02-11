import { useQuery } from "react-query";
import { API_BASE_URL } from "../../config";
import httpReq from "../../utils/httpReq";
import Book from "./Book";
import Loader from "../layout/Loader"
import { Link } from "react-router-dom";
import LibraryGrid from "./LibraryGrid";
import { ButtonPrimaryOutlined, ButtonPrimaryPlain, ButtonSecondaryPlain } from "../elements/buttons";

interface Ibook {
    id: number,
    title: string,
    showInfo: boolean,
    cover_url: string,
}

export default function Explore() {
    
    async function getBooks() {
        const res = await httpReq.get(API_BASE_URL + '/books/explore')
        return res
    }

    const { data, isLoading, isError } = useQuery(
        'usersBooks', getBooks
    )
    let exploreBooks = data?.slice(-6).reverse()

    if ( isLoading ) {
        return <Loader />
    }

    if ( isError ) {
        return  <div>
            Error Loading Explore Component
        </div>
    }

    return(
        <section className="flex flex-col gap-8">
            <h2 className="text-4xl">Explore</h2>

            <LibraryGrid>
                { exploreBooks && exploreBooks.map( (book: Ibook) => {
                    return <Book 
                        id={book.id}
                        title={book.title} 
                        showInfo={false} 
                        cover={book.cover_url}
                        key={book.id} 
                    />
                })}
            </LibraryGrid>

            <Link to="/explore" className="mt-">
                <ButtonPrimaryOutlined>
                    See more books in the community
                </ButtonPrimaryOutlined>
            </Link>
        </section>
    )
}