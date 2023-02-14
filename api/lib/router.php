<?php
/**
 * 
 * Custom API router by @author Josh Kaye
 * 
 * How it works:
 * 1. Get/Format current REQUEST_URI
 * 2. Define routes with callbacks
 * 3. If current REQUEST_METHOD = route request_method,
 *    format defined route and save route/method to an
 * 	  assoc array: ['route' => method]
 * 4. Call the method in the array associated with the 
 * 	  current route via json() which gets response() and
 * 	  renders JSON.
 * 
 */

class Router
{

	private $url;
	public $routes;

	/**
	 * Get/set current URL without url params
	 */
	public function __construct()
	{
		if (!isset($_SERVER['REQUEST_URI'])) $url = '/';
		$url = trim($_SERVER['REQUEST_URI'], " \n\r\t\v\x00/");
		$url = filter_var($url, FILTER_SANITIZE_URL);
		$url = explode('?', $url);
		$url = str_replace('/', 'SLASH', $url[0]);
		$this->url = $url;
	}




	/**
	 * Generate response based on current route
	 */
	public function response()
	{
		// Get defined methods associated with current request method type (GET, POST, PUT DELETE)
		$route_methods = $this->routes;

		// Apply Params if GET Req
		if($_SERVER['REQUEST_METHOD'] === 'GET') {
			$route_methods = $this->apply_params($route_methods);
		}

		// Check if current route exists in routes
		if(!array_key_exists( $this->url, $route_methods  )) {
			return ['error' => 'This route doesn\'t exist'];
		}

		// Everything is good, call function and return
		return $route_methods[$this->url]();
	}





	/**
	 * Render response in JSON format
	 */
	public function json()
	{
		if ( $_SERVER['HTTP_HOST'] === 'bookstackapi.joshkaye.ca' ) {
			ob_clean();
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
		$route = str_replace('/', 'SLASH', $route);
		$route = str_replace(':', '_', $route);

		$this->routes[$route] = $method;
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
		$current_url_array = explode('SLASH', $this->url);
		$potential_param = end($current_url_array);
		$this->param = $potential_param;

		// Every :param gets replaced with _param to be array key friendly
		// replace _param with with $this->param in all routes
		foreach($route_methods as $key => $value) {

			$new_key = str_replace('_param', $potential_param, $key);

			if( array_key_exists($new_key, $route_methods) ) continue;

			unset($route_methods[$key]);
			$route_methods[$new_key] = $value;
		}

		return $route_methods;
	}
	
}
