import React from "react";
import AccountCard from "./AccountCard";

export default function Hero() {

    let userNavlink: string = 'text-slate-200'

    return(
        <section className="
            md:h-96 bg-slate-200 
            md:grid md:grid-cols-2 md:grid-rows-1 items-stretch justify-items-stretch">

                <div className="text-2xl p-4 self-center">
                    Hero Content here
                </div>

                <div className="rounded-xl translate-y-8 -translate-x-8">
                    <AccountCard defaultComponent='register' />
                </div>
        </section>
    )
}