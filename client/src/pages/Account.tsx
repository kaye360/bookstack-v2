import React from "react";
import AccountCard from "../components/layout/AccountCard";

export default function Account() {

    return(
    <>

        <h1 className="p-4 w-full max-w-xl mx-auto">Sign In or Register</h1>

        <AccountCard defaultComponent="login" />

    </>
    ) 
}