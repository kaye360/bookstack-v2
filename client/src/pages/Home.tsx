
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
                <img src={booksAngled} className="w-4/5" />
            </div>

            <div className="">

                <h2 className="text-3xl mb-8">
                    Stay Organized
                </h2>

                <p>
                    About the App. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores expedita sed repellat quas quae debitis unde corrupti aperiam nemo nesciunt?
                </p>

            </div>

            <div className="">

                <h2 className="text-3xl mb-8">
                    Share your collection
                </h2>

                <p>
                    About the App . Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, impedit! Voluptate, incidunt molestias iste amet consequatur dolore enim quibusdam. Minus perspiciatis labore fugiat deleniti provident, asperiores laboriosam repudiandae consequuntur incidunt!
                </p>

            </div>

            <div className="">
                <img src={booksScattered} className="w-4/5 ml-auto"  />
            </div>

        </div>

        <Explore />

    </div>)

}