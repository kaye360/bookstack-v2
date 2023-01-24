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
- about page
- try/catch all httpReq methods
- refresh library on add book
- Make a kickass UI



## Bugs
- notification bubble doesnt show up right after login
- make sure users cant give themselves notifications
- book page 404 error handling
- from library page, logging out still shows user navbar. LS and DM tokens are gone



## Future Feature Ideas
- pagination or infinite scroll
- currently reading
- list view for library
- library pagination
- live search library with debouncing
- use proper response codes on api fails
- user auth on protected api routes
