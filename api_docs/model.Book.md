# Book Class

On this page:
- Routes
- Public Book methods
- Private Book methods
- Dev Book methods


<br><br>


## Routes
format: /route -> method

### GET routes
- /book/:id -> `get_single()`
- /books/:id -> `get_all()`

### POST routes
- /book -> `create()`

### PUT routes
- /book/:id -> `edit()`
- /book/like -> `like()`
- /book/read -> `toggle_read_status()`

### DELETE routes
- /book/:id -> `destroy()`


<br><br>


## Public Methods

### `create()`
Creates a new book as a row.
- Arguments: none
- Post request inputs: 
    - string isbn
    - number user_id
    - string username
    - string title
    - string author
    - string is_read 
    - string cover_url
- Returns: 
    - string title
    - number id
    - bool success
    - string message (if success === false)

<br>

### `get_single()`
Get a single book row, with comments, by ID
- Arguments: 
    - number id (book_id)
- Request inputs: none
- Returns: 
    - All columns
    - array comments

<br>

### `get_all()`
Gets all a user's books
- Arguments: 
    - number id (user_id)
- Request inputs: none
- Returns: Array
    - all books cols

<br>

### `edit()`
Edit a single book entry
- Arguments: 
    - number id
- Put Request inputs: 
    - string isbn
    - number user_id
    - string title
    - string author
    - string is_read
- Returns: 
    - all books cols

<br>

### `like()`
Toggle whether a book is liked or not by user
- Arguments: none
- Put Request inputs:
    - number id (book_id)
    - string user_id
- Returns: 
    - JSON array likes 

<br>

### `toggle_read_status()`
Toggle whether a book is read or not by user
- Arguments: none
- Put Request inputs: 
    - number id (book_id)
- Returns: 
    - string is_read

<br>

### `destroy()`
Delete a book entry
- Arguments: 
    - number id (book_id)
- Request inputs: none
- Returns: 
    - bool success
    - string message (if success === false)


<br><br>


## Dev Methods

### `reset()`
Reset the books table with fake data
- Arguments: none
- Request inputs: none  
- Returns: 
    - string 'Books table reset'