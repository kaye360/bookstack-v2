import booksAngled from "../assets/img/books-angled.png"

export default function About() {

    return <div className="flex flex-col gap-12 my-8 text-primary-100">

        <Grid cols={2}>
            <Col>
                <h1 className="my-4 text-3xl my-8">BookStack version 2</h1>

                <p className="max-w-lg">
                    BookStack is a social media web app for avid book readers! I have created this as a portfolio project from scratch. No tutorials were used. Any code found on the internet is credited to the author of the code.
                </p>

                <h2 className="my-8 text-xl font-bold">Features</h2>
                <ul className="flex flex-col gap-4 list-disc pl-4">
                    <li>User creation and authentication via token system</li>
                    <li>Adding books to your personal library via the Google Books API</li>
                    <li>Liking and commenting on other user's books</li>
                    <li>Realtime user notifications on likes and comments</li>
                    <li>Community feed and exploration library to see what others are reading</li>
                </ul>        
            </Col>

            <Col>
                <img src={booksAngled} />
            </Col>
        </Grid>

        <Grid>

            <Col>
                <h2 className="my-8 text-xl font-bold">Backend</h2>

                <h3 className="font-bold my-4">PHP/MYSQL API</h3>
                <p>
                    PHP and MYSQL were used to create fully custom restfull API that renders JSON data from the database layer. The Database consists of 4 tables: books, comments, community, and users. All model classes extend the same database class to re-use code to query the DB.
                </p>

                <h3 className="font-bold my-4">Custom API Router</h3>
                <p>
                    The custom router allows the developer to define flexible endpoints with parameters in a RESTfull paradigm.
                </p>

            </Col>

            <Col>
                <h2 className="my-8 text-xl font-bold">The Frontend</h2>

                <h3 className="font-bold my-4">React UI</h3>
                <p>
                    The User Interface was made with React using modern data fetching techniques. useQuery was used instead of useEffect for this purpose. Custom hooks were used to clean up components and make reusing code easier.
                </p>

                <h3 className="font-bold my-4">TailwindCSS</h3>
                <p>Tailwind was used as the CSS framework for this project.</p>
            </Col>

        </Grid>

        <div>
            <h2 className="my-4 text-xl font-bold">Github and Code Documentation</h2>

            <p>
                <a href="https://github.com/kaye360/bookstack-v2" 
                    target="_blank"
                    className="inline-block my-4 px-4 py-2 bg-primary-200 text-primary-700 rounded-lg"
                >
                    View the github repo
                </a>
            </p>

            <p className="max-w-[50ch]">
                API documentation can be found in the /api_docs folder in the github repo. Crucial information for each class and method can be found here.
            </p>
        </div>

    </div>

}


function Grid({cols = 2, children}) {
    return <div className={`grid md:grid-cols-${cols} gap-4 w-full max-w-4xl`}>{children}</div>
}

function Col({span ="auto", children}) {
    return <div className={`col-${span}`}>{children}</div>
}