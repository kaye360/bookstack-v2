# BookStack version 2

BookStack is a social media web app for avid book readers! I have created this as a portfolio project from scratch. No tutorials were used. Any code found on the internet is credited to the author of the code.

[View Project](https://bookstack.joshkaye.ca)



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


## What's New?
- Feb 18, 2023: Refactored and updated Backed Router and Database Class for more flexibility
- Feb 12, 2023: Add Dark/Light mode and Material UI icons
- Feb 08, 2023: Infinite Scroll on Community Feed


## TODO
- update API docs

## Bugs



## Future Feature Ideas
- add username to book DB. Show user affiliated with this book and link to profile
- currently reading
- sorting library in book view
- list view for library with sorting
- library pagination
- live search library with debouncing
- use proper response codes on api fails
- user auth on protected api routes. send user id and uuid front frontend on 
