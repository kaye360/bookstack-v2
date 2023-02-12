import Icon from "../elements/Icon"
import TextFlex from "../elements/TextFlex"
import TextInline from "../elements/TextInline"
import Logo from "./Logo"

export default function Footer() {

    
    return(
        <nav className="
            flex items-center justify-between 
            mt-auto px-4 py-12 rounded-xl 
            bg-slate-300 text-slate-800
            dark:bg-slate-700 dark:text-slate-200
            ">

            <div className="flex flex-col gap-2">
                <p>
                    <TextInline>
                        <Logo/> by Josh Kaye
                    </TextInline>
                </p>
                <p>
                    <a href="https://joshkaye.ca" target="_blank">
                        <TextInline className="hover:text-secondary-400">
                            Portfolio
                        </TextInline>
                    </a>
                </p>
                <p>
                    <a href="https://github.com/kaye360/bookstack-v2" target="_blank">
                        <TextInline className="hover:text-secondary-400">
                            GitHub Repo
                        </TextInline>
                    </a> 
                </p>
            </div>

            <a href="#top">
                <TextFlex className="hover:text-secondary-500">
                    Top
                    <Icon icon="north" />
                </TextFlex>
            </a>

        </nav>
    )
}
