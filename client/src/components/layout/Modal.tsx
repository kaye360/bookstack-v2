
export default function Modal(props: any) {

    return(
        <div className="fixed inset-0 grid items-center px-3 bg-primary-900 z-[1000] bg-opacity-75">
            <div className="relative z-[2000] rounded-xl flex flex-col gap-8 bg-primary-200 w-full max-w-xl mx-auto p-4 text-primary-800">
                {props.children}
            </div>
        </div>
    )
}