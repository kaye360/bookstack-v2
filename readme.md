# BookStack version 2

BookStack is a social media web app for avid book readers! I have created this as a portfolio project from scratch. No tutorials were used. Any code found on the internet is credited to the author of the code.



## Features
- User creation and authentication via token system
- Adding books to your personal library via the Google Books API
- Liking and commenting on other user's books
- Realtime user notifications on likes and comments
- Community feed and exploration library to see what others are reading



## The Backend

### PHP/MYSQL API
PHP and MYSQL were used to create fully custom restfull API that renders JSON data from the database layer. The Database consists of 4 tables: books, comments, community, and users. All model classes extend the same database class to re-use code to query the DB.

### Custom API Router
The custom router allows the developer to define flexible endpoints with parameters in a RESTfull paradigm.



## The Frontend

### React UI
The User Interface was made with React using modern data fetching techniques. useQuery was used instead of useEffect for this purpose. Custom hooks were used to clean up components and make reusing code easier.

### TailwindCSS
Tailwind was used as the CSS framework for this project.



## Code Documentation

### API Docs
Can be found in the /api_docs folder. Crucial information for each class and method can be found here. 



## TODO
- update router docs
- update apI docs where PUT POST DELETE requests had arguents

## Bugs
- problem with commenting sometimes

- update Dashboard library w/ no books
- update home page mobile images
- update profile page w/ no books
- explore the community not working on live
- update delete book UI
- book description has 'description' heading multiple times


## Future Feature Ideas
- Full Typescript integration
- add username to book DB. Show user affiliated with this book and link to profile
- pagination or infinite scroll
- currently reading
- book page 404 error handling
- sorting library in book view
- list view for library with sorting
- library pagination
- live search library with debouncing
- use proper response codes on api fails
- user auth on protected api routes
