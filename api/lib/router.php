<?php



class Router
{

	private $url;
	private $class;
	private $class_file;
	private $method;
	private $param;
	private $routes;




	/**
	 * Get/set current URL without url params
	 */
	public function __construct()
	{
		if (!isset($_SERVER['REQUEST_URI'])) $url = '/';
		$url = trim($_SERVER['REQUEST_URI'], " \n\r\t\v\x00/");
		$url = filter_var($url, FILTER_SANITIZE_URL);
		$url = explode('?', $url);
		$this->url = $url[0];
	}




	/**
	 * Generate response based on current route
	 */
	public function response()
	{
		// Get defined methods associated with current request method type (GET, POST, PUT DELETE)
		$route_methods = $this->routes;
		// var_dump($route_methods);

		// Apply Params if GET Req
		if($_SERVER['REQUEST_METHOD'] === 'GET') {
			$route_methods = $this->apply_params($route_methods);
		}

		// Check if current route exists in routes
		if(!array_key_exists( $this->url, $route_methods  )) {
			return ['error' => 'This route doesn\'t exist'];
		}

		// Check/Set Classes and Methods
		$this->class = $route_methods[$this->url]['class'];
		$this->method = $route_methods[$this->url]['method'];
		$this->class_file = './models/' . ucwords($this->class) . '.php';

		if( !file_exists($this->class_file) ) {
			return $this->error("Class file $this->class_file not found");
		}

		require_once $this->class_file;

		if( !class_exists($this->class) ) {
			return $this->error("Class $this->class not found");
		}

		$this->class = new $this->class();

		if( !method_exists($this->class, $this->method) ) {
			return $this->error("Method $this->method not found");
		}

		// Everything is good, call function and return
		return call_user_func_array([$this->class, $this->method], [$this->param]);
	}





	/**
	 * Render response in JSON format
	 */
	public function json()
	{
		if ( $_SERVER['HTTP_HOST'] === 'bookstackapi.joshkaye.ca' ) {
			// ob_clean();
		}

		$json = json_encode( $this->response(), JSON_PRETTY_PRINT );
		$error = json_encode(['error' => 'Error encoding JSON']);
		http_response_code(200);

		if ( $json === false) {
			echo $error;
		} else { 
			echo $json;
		}
	}



	
	/**
	 * Render Error Message
	 */
	public function error($message) 
	{
		return ['error' => $message];
	}




	/**
	 * Register a Route
	 */
	private function register_route($req_method, $route, $method)
	{
		if($_SERVER['REQUEST_METHOD'] !== $req_method) return;
		$route = trim($route, '/');
		$this->routes[$route] = $method();
	}



	/**
	 * Register a Get request
	 */
	public function get($route, $method)
	{
		$this->register_route('GET', $route, $method);
	}
	



	/**
	 * Register a Post Request
	 */
	public function post($route, $method)
	{
		$this->register_route('POST', $route, $method);
	}
	


	/**
	 * Register a Delete Request
	 */
	public function delete($route, $method)
	{
		$this->register_route('DELETE', $route, $method);	
	}
	



	/**
	 * Register a Put Request
	 */
	public function put($route, $method)
	{
		$this->register_route('PUT', $route, $method);
	}




	/**
	 * Apply Params to $route_methods in $this->response
	 */
	private function apply_params($route_methods)
	{
		// Get current url and potential param
		$current_url_array = explode('/', $this->url);
		$potential_param = end($current_url_array);
		$this->param = $potential_param;

		// replace :param with with $this->param in all routes
		foreach($route_methods as $key => $value) {

			$new_key = str_replace(':param', $potential_param, $key);

			if( array_key_exists($new_key, $route_methods) ) continue;

			unset($route_methods[$key]);
			$route_methods[$new_key] = $value;
		}

		return $route_methods;
	}
	
}
