# User Class

On this page:
- Routes
- Public User methods
- Private User methods
- Dev User methods


<br><br>


## Routes
format: /route -> method

### GET routes
- /users -> `get_all()`
- /users/:id -> `get_single()`
- /username/:username -> `get_single_by_username()`
- /session/:session -> `get_single_by_session()`

### POST routes
- /user -> `create()`
- /user/login -> `login()`
- /user/logout -> `logout()`

### PUT routes
- /user/:id -> `edit()`

### DELETE routes
- /user/:id -> `destroy()`




<br><br>

## Public Methods


### `create()`
Creates a new user as a row in table 'users'
- Arguments: none
- Post request inputs:
    - string username
    - string password
    - string confirm_password
- Returns:
    - string username
    - number id (user_id)
    - string session

<br>

### `get_single()`
Gets a single user row by user's ID
- Arguments:
    - number $id (user_id)
- Request inputs: none
- Returns:
    - string username
    - number id (user_id)
    - string session

<br>

### `get_single_by_session()`
Gets a single user row from table by session UUID
- Arguments:
    - string $session
- Request inputs: none
- Returns:
    - string username
    - number id

<br>

### `get_single_by_username()`
- Arguments:
    - string $username
- Request inputs: none
- Returns: 
    - string username
    - number id

<br>

### `get_all()`
Gets all users
- Arguments: none
- Request inputs: none
- Returns: Array of user objects
    - string username
    - number id (user_id)

<br>

### `edit()`
Edits a user's username
- Arguments: 
    - number id (user_id)
- Post request inputs: 
    - string username
    - string password
- Returns: 
    - string username (updated username)

<br>

### `destroy()`
Deletes user by ID
- Arguments: 
    - number id (user_id)
- Request inputs: none
- Returns: 
    - bool success
    - string message (if success === false)

<br>

### `login()`
Creates users session UUID and saves to DB
- Arguments: none
- Post Request inputs: 
    - string username
    - string password
- Returns: 
    - bool success
    - string username
    - number id (user_id)
    - string uuid
    - string message (if success === false)

<br>

### function `logout()`
Destroys a users UUID session
- Arguments: none
- Post Request inputs:
    - number id
- Returns: 
    - string username
    - bool success
    - string message (if success === false)

<br><br>


## Private Methods

### `validate_password()`
Check user's inputted password vs hashed password in DB
- Arguments:
    - string username
    - string password
- Request inputs: none
- Returns: 
    - bool 

<br>

### `make_UUID()`
Creates new, random UUID
- Arguments: none
- Request inputs: none
- Returns: string (UUID)

<br><br>


## Dev Methods

### `reset()`
Resets the users table with fake data
- Arguments: none
- Request inputs: none
- Returns: 'Users table reset'