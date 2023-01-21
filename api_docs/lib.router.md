
# BookStack Custom Router

On this page:
- How to use the Router
- Public Router methods
- Private Router methods


## How to use

### To make a new Route in the app call it like this, in this order:
1. `$route = new Router();`
2. `$route->baseURL = '/path/to/api'`
3. Set Routes
4. `$route->json();`

### To Set Routes
`$route->{request method}('/path/:id', $func_array)`
`$func_array` has 3 args:
 1. Required: Model class Name
 2. Required: Method to call
 3. Optional: Paramater name (ie: id)

### Example Route
`$route->get( '/user/:id', [ 'User', getSingleById, ':id'] );`
`$route->delete( '/user/:id', [ 'User', deleteSingleById, ':id'] );`


## Public Router Methods

### `__contruct()`
- Gets the request URI
- formats the URI
- assigns to `$this->url`

### `response()`
- determines current route and request method
- calls associated class and method with args
- returns the response as JSON

### `json()`
- renders the JSON from `$this->response`

### `get()`
- sets a get route

### `post()`
- sets a post route

### `delete()`
- sets a delete route

### `put()`
- sets a put route

### `check_params()`
- prepend `$this->baseURL` to current route
- return route and func_array with params if specified
