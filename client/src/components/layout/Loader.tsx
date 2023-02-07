
export default function Loader({size="full"}) {

    if(size === 'small') {
        return <span className='inline-block rounded px-2 py-1 my-1 bg-primary-500 bg-opacity-20 text-center animate-pulse'>
            Loading...
        </span>
    }

    return(
        <div className='rounded m-8 py-8 bg-primary-500 text-center text-xl animate-pulse'>
            Loading...
        </div>
    )
}