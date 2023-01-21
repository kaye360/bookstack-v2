
# Database Class

Extend this class in a model class to get basic, reusable DB functions and queries.

All public methods return a bool 'success' key. If the value is false, a string 'message' key is also included in the returned array.

Note: User Input validation is not done here, do it in model classes.

On this page:
- Common function args
- Public methods
- Protected methods

<br><br>

## Common function args

### @var $columns
assoc array of database column title/value pairs sent in req.
ex: `['username' => 'bob', 'email' => 'bob@bob.com']`

### @var $table
the MYSQL table we are working with as a string

### @var $return
the columns to return in a SELECT or PDO fetch statement. 
ex: `['username', 'id', 'email']`


<br><br>


## Public methods

<br>

### `__construct()`
Creates DB connection and PDO instance

<br>

### `request()`
Returns the request body from `php://input` and an ASSOC Array

<br>

### `create_row()`
Creates a new row entry
- Arguments:
    - array columns
    - string table
    - array return (optional)
- Returns:
    - new row

<br>

### `get_row_by_id()`
Gets a single row by tables 'id' col
- Arguments:
    - number id
    - string table
    - array return (optional)
- Returns:
    - single row

<br>

### `get_row_by_column_name()`
Gets a single row by a specified column name
- Arguments:
    - string column
    - string value
    - string table
    - array return (optional)
- Returns:
    - single row

<br>

### `get_all_rows()`
Gets all rows from a table. If `$id` and `$id_col` are set, appends `WHERE $id_col = $id` to SQL statment
- Arguments:
    - string table,
    - array return (optional)
    - number id (optional)
    - string id_col (optional)
- Returns:
    - all rows

<br>

### `update_row()`
Updates a row entry
- Arguments:
    - number id
    - string table
    - array columns,
    - array return (optional)
- Returns:
    - row with updated values

<br>

### `destroy_row_by_id()`
Deletes a specified row
- Arguments:
    - number id
    - string table
- Returns:
    - bool success


<br><br>


## Protected methods

<br>

### `is_taken()`
Checks if a value in a column of a table is already taken. Used for checking unique values.
- Arguments: 
    - string column
    - string value
    - string table
- Returns: bool

<br>

### `has_forbidden_chars()`
Checks if a given string has forbidden characters. Can supply a custom regex expression if default isn't wanted
- Arguments:
    - array values
    - string regex (optional)
- Returns: bool

<br>

### `has_too_many_chars()`
Checks if a string has too many characters
- Arguments:
    - string string
    - int limit
- Returns: bool

<br>







