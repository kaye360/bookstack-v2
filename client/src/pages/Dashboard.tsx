import React from "react";
import PreviewUsersLibrary from "../components/library/PreviewUsersLibrary";
import Explore from "../components/library/Explore";
import DashboardNotifications from "../components/notifications/DashboardNotifications";

export default function Dashboard() {

    
    return(
        <>
            <h1 className="text-4xl">Dashboard</h1>

            <section className="grid gap-4 md:grid-cols-2">

                <div className="h-56 rounded border border-slate-300">
                    Welcome User
                </div>

                <div className="h-56 rounded border border-slate-300">
                    <DashboardNotifications />
                </div>
            </section>

            <PreviewUsersLibrary />

            <Explore />

            <section className="my-4">
                <h2 className="text-4xl">Community Feed</h2>
                <ul>
                    <li>User123 added this book. Add this book to your library</li>
                    <li>User123 Liked this book. Add this book to your library</li>
                    <li>User123 commented book. Add this book to your library</li>
                    <li>User123 added this book. Add this book to your library</li>
                    <li>User123 added this book. Add this book to your library</li>
                    <li>User123 Liked this book. Add this book to your library</li>
                    <li>User123 commented book. Add this book to your library</li>
                    <li>User123 added this book. Add this book to your library</li>
                </ul>
            </section>
        </>
    )

}