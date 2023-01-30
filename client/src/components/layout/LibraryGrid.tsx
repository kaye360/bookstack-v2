

export default function LibraryGrid({children}) {

    return <section className="grid gap-x-4 gap-y-6 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 ">        
        {children}
    </section>
}