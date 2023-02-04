import AccountCard from "../components/layout/AccountCard";

export default function ProtectedPage() {

    return(
    <section className="grid justify-center mt-8">

        <div
            className="p-8 rounded-lg border border-primary-300"
        >
            <h1 className="ml-4 mb-8 text-xl">
                You must be logged in to view this page.
            </h1>

            <AccountCard defaultComponent="login" />

        </div>

    </section>)

}