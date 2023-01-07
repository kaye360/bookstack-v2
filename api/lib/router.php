<?php
/**
 * 
 * BookStack Custom Router
 * 
 * To make a new Route in the app call it like this, in this order:
 * 1. $route = new Router();
 * 2. $route->baseURL = '/path/to/api'
 * 3. Set Routes
 * 4. $route->render();
 * 
 * To Set Routes
 * $route->{request method}('/path/:id', $func_array)
 * $func_array has 3 values:
 *  1. Required: Model class Name
 *  2. Required: Method to call
 *  3. Optional: Paramater name (ie: id)
 * 
 * Example Route:
 * $route->get( '/user/:id', [ 'User', getSingleById, ':id'] );
 * $route->delete( '/user/:id', [ 'User', deleteSingleById, ':id'] );
 * 
 */


class Router {

  public $baseURL;
  private $url;
  private $class;
  private $method; 
  private $params;
  private $get_req_routes = [];
  private $post_req_routes = [];
  private $put_req_routes = [];
  private $delete_req_routes = [];

  //
  // Get URL and split into array
  public function __construct() {
    
    if( !isset( $_SERVER['REQUEST_URI'] ) ) $url = '/';
    $url = trim($_SERVER['REQUEST_URI'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $this->url = $url;
  }
  
  // 
  // Determine which method to call based on req method
  public function render() {

    switch ($_SERVER['REQUEST_METHOD']) {
      case 'GET': 
        $route_methods = $this->get_req_routes;
        break;
        
      case 'POST':
        $route_methods = $this->post_req_routes;
        break;
        
      case 'PUT':
        $route_methods = $this->put_req_routes;
        break;
        
      case 'DELETE':
        $route_methods = $this->delete_req_routes;
        break;
        
      default:
        $route_methods = $this->get_req_routes;
        break;
    }

    $this->class = isset($route_methods[$this->url][0])
      ? new $route_methods[$this->url][0]
      : false;
    $this->method = isset($route_methods[$this->url][1])
      ? $route_methods[$this->url][1] 
      : false;
    $this->params = isset($route_methods[$this->url][2])
      ? $route_methods[$this->url][2]
      : false;

    if( !empty($this->class) && !empty($this->method)) {
      call_user_func_array([$this->class, $this->method],[$this->params]);
    } else {
      echo json_encode(['error' => 'No class or method specified']);
    }
  }
  
  // 
  // Set user defined REST routes
  // 

  // Set a Get request
  public function get($route, $func_array) {
    [
      'route' => $route,
      'func_array' => $func_array
    ] = $this->check_params($route, $func_array);
    $this->get_req_routes[$route] = $func_array;
  }

  // Set a Post Request
  public function post($route, $func_array) {
    [
      'route' => $route,
      'func_array' => $func_array
    ] = $this->check_params($route, $func_array);

    $this->post_req_routes[$route] = $func_array;
  }

  // Set a Delete Request
  public function delete($route, $func_array) {
    [
      'route' => $route,
      'func_array' => $func_array
    ] = $this->check_params($route, $func_array);
      
    $this->delete_req_routes[$route] = $func_array;
  }

  // Set a Put Request
  public function put($route, $func_array) {
    [
      'route' => $route,
      'func_array' => $func_array
    ] = $this->check_params($route, $func_array);
      
    $this->put_req_routes[$route] = $func_array;
  }


  // 
  // Parse Variables in URLs to be called in functions
  private function check_params($route, $func_array) {

    // Prepend App Base URL to current route
    $route = $this->baseURL . $route;

    // If a param is set on this route, replace :param with actual URL value
    if( isset($func_array[2]) ) {
      $param_value = explode('/', $this->url);
      $param_value = end($param_value);
      $func_array[2] = $param_value;

      $route = explode('/', $route);
      array_pop($route);
      array_push($route, $param_value);
      $route = implode('/', $route);
    } 

    // Return new values
    return [
      'route' => $route,
      'func_array' => $func_array
    ];
  }
}