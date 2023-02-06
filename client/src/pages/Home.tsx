
import Hero from "../components/layout/Hero";
import Explore from "../components/library/Explore";
import booksScattered from "../assets/img/books-scattered.png"
import booksAngled from "../assets/img/books-angled.png"

export default function Home() {

    
    return(
    <div className="flex flex-col gap-12">
        
        <Hero />

        <div className="grid md:grid-cols-2 gap-x-2 gap-y-12 items-center">

            <div className="">
                <img src={booksAngled} 
                    className="w-full max-h-80 object-cover 
                    md:max-h-screen md:w-4/5" 
                />
            </div>

            <div className="">

                <h2 className="text-3xl mb-8">
                    Stay Organized
                </h2>

                <p>
                    Whether you are an avid reader or just starting your collection, BookStack is the perfect tool to help you stay organized and keep your books in order. Start organizing your books today and enjoy an enhanced  reading experience.
                </p>

            </div>

            <div className="">

                <h2 className="text-3xl mb-8">
                    Share your collection
                </h2>

                <p>
                    With this app, you can share your book collection with friends, family, and other book enthusiasts from around the world. Whether you're looking to find new books to read, connect with others, or share your love for books, BookShare is the perfect app for you!
                </p>

            </div>

            <div className="">
                <img src={booksScattered} 
                    className="w-full max-h-80 object-cover 
                    md:max-h-screen md:w-4/5 md:ml-auto"
                /> 
            </div>

        </div>

        <Explore />

    </div>)

}