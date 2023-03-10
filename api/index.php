<?php
/**
 * 
 * BookStack App API with custom router
 * 
 * @author Josh Kaye
 * https://joshkaye.ca
 * 
 */
error_reporting(E_ALL);
/**
 * Config
 */
require_once './config.php';

/**
 * Headers
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
}

header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

/**
 * App Dependencies
 */
require_once './lib/router.php';

/**
 * Models
 */
spl_autoload_register( function($class) {
    if( !file_exists('./models/' . ucwords($class) . '.php')) exit(FATAL_ERROR);
    require_once './models/' . ucwords($class) . '.php';
});

/**
 * Routes
 */
$route = new Router();
require_once './routes/routes.php';
$route->json();

