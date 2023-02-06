<?php
/**
 * 
 * BookStack App API
 * 
 * @author Josh Kaye
 * https://joshkaye.ca
 * 
 */

 error_reporting(E_ALL);

/**
 * Config Files
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
require_once './models/User.php';
require_once './models/Notification.php';
require_once './models/Book.php';
require_once './models/Comment.php';
require_once './models/Community.php';

/**
 * Routes
 */
$route = new Router();

require_once './routes/routes.php';

http_response_code(200);
$route->json();