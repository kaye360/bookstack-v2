<?php
/**
 * 
 * BookStack App API
 * 
 * @author Josh Kaye
 * https://joshkaye.ca
 * 
 */

/**
 * Config Files
 */
require_once './config.php';

/**
 * Headers
 */
header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

/**
 * App Dependencies
 */
require_once './lib/router.php';

/**
 * Models
 */
require_once './models/User.php';
require_once './models/Book.php';
require_once './models/Comment.php';

/**
 * Routes
 */
require_once './routes/routes.php';
http_response_code(200);
$route->json();
