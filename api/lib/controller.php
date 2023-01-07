<?php

//
// Class Controller
// Receive GET/POST REQUEST, Get Model Class, and Render JSON
//
// Methods:
// 
// construct
// render
// parseURL
//

class Controller {

  //
  // URL, class, method and params to run
  //
  private $url; 
  private $class;
  private $method;
  private $params;

  //
  // Constructor  
  // Determine what class/method/params to run based on REQUEST
  //   
  public function __construct() {

    $this->url = $this->parseURL();

    if( !file_exists('./models/' . $this->url[0] . '.php')) throw new Exception('File/Class doesn\'t exist');
    $this->class = new $this->url[0];

    if ( !isset($this->url[1])) throw new Exception('No method specified');
    $this->method = $this->url[1];

    if ( !method_exists($this->class, $this->method)) throw new Exception('Method doesn\'t exist');
    
    if( !isset($this->url[2]) && $_SERVER['REQUEST_METHOD'] == 'GET') {
      throw new Exception('No Params specified on Get Rquest');
    }

    $this->params = $_SERVER['REQUEST_METHOD'] == 'GET' ? $this->url[2] : false;
  
  }

  // 
  // Call method to return JSON to be rendered
  // 
  public function render() {

    // Call class method with params
    return call_user_func(array($this->class, $this->method), $this->params);

  }

  //
  // Get URL and split into array
  // Array
  //
  public function parseURL() {
    
    if( !isset($_GET['url']) ) throw new Exception('No Url Param');
    $url = rtrim($_GET['url'], " \n\r\t\v\x00/");
    $url = filter_var($url, FILTER_SANITIZE_URL);
    $url = explode('/', $url);
    $url[0] = ucwords($url[0]);
    var_dump($url);
    return $url;

  }

}