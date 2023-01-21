# Comment Class

On this page:
- Routes
- Public Comment methods
- Private Comment methods
- Dev Comment methods


<br><br>


## Routes
format: /route -> method

### GET routes
- /comment/:id -> `get_single()`
- /comments/:id -> `get_all()`

### POST routes
- /comment -> `create()`

### PUT routes
- /comment/:id -> `edit()`

### DELETE routes
- /comment/:id -> `destroy()`


<br><br>


## Public Methods


### `create()`
- Create a comment entry
- Arguments: none
- Request inputs:
    - string comment
    - number user_id
    - number book_id
    - string username
- Returns: 
    - string comment
    - string username

<br>
 
### `get_single()`
Get a single comment entry
- Arguments: 
    - number id (comment_id)
- Request inputs: none
- Returns: 
    - all cols

<br>
 
### `get_all()`
Get all comment entries associated with a book
- Arguments: 
    - number id (book_id)
- Request inputs: none
- Returns: 
    - all cols

<br>
 
### `edit()`
Edit a comment entry
- Arguments: 
    - number id (book_id)
- Put Request inputs: 
    - string comment
- Returns: 
    - all cols

<br>
 
### `destroy()`
Delete a comment entry
- Arguments:
    - number id (comment_id)
- Request inputs: none
- Returns:
    - bool success
    - string message (if success === false)

<br><br>
 

## Dev Methods

<br>
 
### `reset()`
Reset the comments table with fake data
- Arguments: none
- Request inputs: none
- Returns:
    - string 'Comments table reset'
 
