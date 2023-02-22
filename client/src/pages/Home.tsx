
import Hero from "../components/layout/Hero";
import Explore from "../components/library/Explore";
import booksScattered from "../assets/img/books-scattered.png"
import booksAngled from "../assets/img/books-angled.png"
import TextBlock from "../components/elements/TextBlock";
import logoFigma from "../assets/img/logo-figma.png"
import logoMysql from "../assets/img/logo-mysql.png"
import logoPhp from "../assets/img/logo-php.png"
import logoPostman from "../assets/img/logo-postman.png"
import logoReact from "../assets/img/logo-react.png"
import logoTailwind from "../assets/img/logo-tailwind.png"

export default function Home() {

    
    return(
    <div className="flex flex-col gap-16 pb-12">
        
        <Hero />
        
        <div>
            <h2 className="text-3xl text-primary-500"> 
                Made With
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-center justify-between gap-12 my-12 text-center">
                <img src={logoReact} alt="React Logo" />
                <img src={logoPhp} alt="PHP Logo" />
                <img src={logoMysql} alt="MYSQL Logo" />
                <img src={logoTailwind} alt="Tailwind Logo" />
                <img src={logoPostman} alt="Postman Logo" />
                <img src={logoFigma} alt="Figma Logo" />
            </div>
        </div>

        <div className="grid md:grid-cols-2 gap-x-2 gap-y-12 items-center">

            <img src={booksAngled} 
                className="w-full max-h-80 object-cover 
                md:max-h-screen md:w-4/5" 
            />

            <TextBlock>

                <h2 className="text-3xl">
                    Stay Organized
                </h2>

                <p>
                    Whether you are an avid reader or just starting your collection, BookStack is the perfect tool to help you stay organized and keep your books in order. Start organizing your books today and enjoy an enhanced  reading experience.
                </p>

            </TextBlock>

            <TextBlock>

                <h2 className="text-3xl">
                    Share your collection
                </h2>

                <p>
                    With this app, you can share your book collection with friends, family, and other book enthusiasts from around the world. Whether you're looking to find new books to read, connect with others, or share your love for books, BookShare is the perfect app for you!
                </p>

            </TextBlock>

            <img src={booksScattered} 
                className="w-full max-h-80 object-cover 
                md:max-h-screen md:w-4/5 md:ml-auto"
            /> 

        </div>

        <Explore />

    </div>)

}