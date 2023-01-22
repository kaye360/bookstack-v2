<?php



class Router
{

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
	public function __construct()
	{

		if (!isset($_SERVER['REQUEST_URI'])) $url = '/';
		$url = trim($_SERVER['REQUEST_URI'], " \n\r\t\v\x00/");
		$url = filter_var($url, FILTER_SANITIZE_URL);
		$this->url = $url;
	}

	// 
	// Determine which method to call based on req method
	public function response()
	{

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

		$class_name = $route_methods[$this->url][0];
		$method_name = $route_methods[$this->url][1];
		$param_name = isset ($route_methods[$this->url][2]) ? $route_methods[$this->url][2] : false;

		$this->class = isset($class_name) && class_exists($class_name)
			? new $class_name
			: false;

		$this->method = 
			isset($method_name) && 
			is_object($this->class) && 
			method_exists($this->class, $method_name)
			? $method_name
			: false;

		$this->params = isset($param_name)
			? $param_name
			: false;

		

		if (empty($this->class)) {
			// http_response_code(400);
			return ['error' => 'No class found'];
		}
		
		if (empty($this->method)) {
			// http_response_code(400);
			return ['error' => 'No method found'];
		}
		
		// http_response_code(200);
		return call_user_func_array([$this->class, $this->method], [$this->params]);
	}

	//
	// Render response in JSON format
	public function json()
	{
		echo json_encode($this->response());
	}

	// 
	// Set user defined REST routes
	// 

	// Set a Get request
	public function get($route, $func_array)
	{
		[
			'route' => $route,
			'func_array' => $func_array
		] = $this->check_params($route, $func_array);
		$this->get_req_routes[$route] = $func_array;
	}

	// Set a Post Request
	public function post($route, $func_array)
	{
		[
			'route' => $route,
			'func_array' => $func_array
		] = $this->check_params($route, $func_array);

		$this->post_req_routes[$route] = $func_array;
	}

	// Set a Delete Request
	public function delete($route, $func_array)
	{
		[
			'route' => $route,
			'func_array' => $func_array
		] = $this->check_params($route, $func_array);

		$this->delete_req_routes[$route] = $func_array;
	}

	// Set a Put Request
	public function put($route, $func_array)
	{
		[
			'route' => $route,
			'func_array' => $func_array
		] = $this->check_params($route, $func_array);

		$this->put_req_routes[$route] = $func_array;
	}


	// 
	// Get Param in dynamic URLs
	private function check_params($route, $func_array)
	{

		// Prepend App Base URL to current route
		$route = $this->baseURL . $route;

		// If a param is set on this route, replace :param with actual URL value
		if (isset($func_array[2])) {
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
