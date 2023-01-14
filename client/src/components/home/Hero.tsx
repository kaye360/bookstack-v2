import React from "react";
import SignInUp from "../SignInUp"

export default function Hero() {

    let userNavlink: string = 'text-slate-200'

    return(
        <section className="
            md:h-96 bg-slate-200 
            md:grid md:grid-cols-2 md:grid-rows-1 items-stretch justify-items-stretch">

                <div className="text-2xl p-4">
                    Hero Content here
                </div>

                <SignInUp />
        </section>
    )
}