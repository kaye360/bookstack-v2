import React, { useContext } from "react";
import PreviewUsersLibrary from "../components/library/PreviewUsersLibrary";
import Explore from "../components/library/Explore";
import DashboardNotifications from "../components/notifications/DashboardNotifications";
import { UserContext } from "../App";

export default function Dashboard() {

    const { user } = useContext(UserContext)
    
    return(
        <>
            <h1 className="text-4xl">Dashboard</h1>

            <section className="grid gap-4 md:grid-cols-2">

                <div className="flex items-center text-xl">
                    Welcome back, {user.username}
                </div>

                <DashboardNotifications />
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