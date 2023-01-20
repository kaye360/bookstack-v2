# User Class

On this page:
- Routes
- User methods
[create](#create)




<br><br>

## Routes
format: /route -> method

### GET routes
- /users -> `get_all()`
- /users/:id -> `get_single()`
- /username/:username -> `get_single_by_username()`

### POST routes
- /user -> `create()`
- /user/login -> `login()`
- /user/logout -> `logout()`

### PUT routes
- /user/:id -> `edit()`

### DELETE routes
- /user/:id -> `destroy()`




<br><br>

## Methods


### public `create()` {#create}
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

### public `get_single()`
- Arguments:
    - number $id (user_id)
- Request inputs: none
- Returns:
    - string username
    - number id (user_id)
    - string session

<br>

### public `get_single_by_session()`
- Arguments:
    - string $session
- Request inputs: none
- Returns:
    - string username
    - number id

<br>

### public `get_single_by_username()`
- Arguments:
    - string $username
- Request inputs: none
- Returns: 
    - string username
    - number id

