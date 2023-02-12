import { useContext } from 'react'
import { Link } from 'react-router-dom'
import hero from '../../assets/img/hero.png'
import { UserContext } from '../app/UserContextWrapper'
import TextInline from '../elements/TextInline'
import Header from './Header'


export default function Hero() {

    const { isLoggedIn } = useContext(UserContext)

    return(
        <section className="rounded-2xl overflow-hidden relative grid items-center gap-12 min-h-[50vh] py-8 px-4 ">

            <Header />

            <div className="relative max-w-xl z-40 pl-4 md:pl-12 py-12 flex flex-col gap-6">
                <h1 className="text-3xl font-bold leading-tight tracking-wide">
                    <TextInline className="text-primary-700">
                        A Better Way to Manage Your Personal Book Collection
                    </TextInline>
                </h1>

                <p className='leading-loose tracking-wide font-bold max-w-[50ch]'>
                    <TextInline className="text-primary-600">
                        Organize and Track Your Personal Book Collection with Ease. Simply enter a book ISBN and go...
                    </TextInline>
                </p>

                { isLoggedIn ?
                    <div>
                        <Link to="/dashboard">
                            <button className="bg-secondary-400 text-primary-800 font-bold text-lg hover:bg-primary-400 border-0 outline-0">
                                Continue to Dashboard
                            </button>
                        </Link>
                    </div>
                :
                    <div>
                        <Link to="/account/register">
                            <button className="bg-secondary-400 text-primary-800 font-bold text-lg hover:bg-primary-400 border-0 outline-0">
                                Sign Up
                            </button>
                        </Link>
                        <Link to="/account/login">
                            <button className="bg-transparent text-secondary-400 text-lg hover:underline">
                                Login
                            </button>
                        </Link>
                    </div>
                }

                <div className="absolute top-[1rem] left-0 bottom-[0rem] z-[-1] w-[20vw] min-w-[200px] rounded-xl bg-primary-300 dark:bg-primary-700 bg-opacity-50"></div>

            </div>

            {/* Hero BG */}
            <div className="absolute inset-0 z-20 pl-[25vw] md:pl-56 overflow-hidden bg-primary-100 dark:bg-transparent">
                <img src={ hero } className="w-full h-full object-cover opacity-40 sm:opacity-60 md:opacity-100 mix-blend-overlay dark:mix-blend-normal" />
            </div>

        </section>
    )
}