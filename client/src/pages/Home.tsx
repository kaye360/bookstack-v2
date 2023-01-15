import React, { useEffect, useState } from "react";
import Hero from "../components/home/Hero";
import Explore from "../components/home/Explore";

export default function Home() {

    
    return(
    <div className="flex flex-col gap-12">
        <Hero></Hero>

        <div className="grid md:grid-cols-2 gap-4">

            <div className="rounded border border-slate-300 bg-slate-100 aspect-video">
                Screenshot
            </div>

            <div className="rounded border border-slate-300 aspect-video py-12">
                About the App. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores expedita sed repellat quas quae debitis unde corrupti aperiam nemo nesciunt?
            </div>

            <div className="rounded border border-slate-300 aspect-video">
                About the App . Lorem ipsum dolor sit amet consectetur, adipisicing elit. Doloremque, impedit! Voluptate, incidunt molestias iste amet consequatur dolore enim quibusdam. Minus perspiciatis labore fugiat deleniti provident, asperiores laboriosam repudiandae consequuntur incidunt!
            </div>

            <div className="rounded border border-slate-300 bg-slate-100 aspect-video">
                Screenshot
            </div>

        </div>

        <Explore />
        
    </div>)

}