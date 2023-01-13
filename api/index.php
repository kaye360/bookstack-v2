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
 * Header
 */
header("Access-Control-Allow-Origin: " . ALLOW_ORIGIN);
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
 * Init Router
 */
$route = new Router();
$route->baseURL = BASE_URL;

/**
 * User Routes
 */
$route->get('/users', ['User', 'get_all']);
$route->get('/user/:id', ['User', 'get_single', 'id']);
$route->post('/user', ['User', 'create']);
$route->post('/user/login', ['User', 'login']);
$route->post('/user/logout', ['User', 'logout']);
$route->put('/user/:id', ['User', 'edit', ':id']);
$route->delete('/user/:id', ['User', 'destroy', 'id']);

/**
 * Book Routes
 */
$route->post('/book', ['Book', 'create']);
$route->get('/book/:id', ['Book', 'get_single', 'id']);
$route->get('/books/:id', ['Book', 'get_all', 'id']);
$route->put('/book/:id', ['Book', 'edit', ':id']);
$route->put('/book/like', ['Book', 'like']);
$route->put('/book/read', ['Book', 'toggle_read_status']);
$route->put('/book/unlike', ['Book', 'unlike']);
$route->delete('/book/:id', ['Book', 'destroy', 'id']);

/**
 * Comment Routes
 */
$route->post('/comment', ['Comment', 'create']);
$route->get('/comment/:id', ['Comment', 'get_single', 'id']);
$route->get('/comments/:id', ['Comment', 'get_all', 'id']);
$route->put('/comment/:id', ['Comment', 'edit', 'id']);
$route->delete('/comment/:id', ['Comment', 'destroy', ':id']);

/**
 * Dev Routes
 * For generating fake data for testing purposes.
 */
$route->get('/user-reset', ['User', 'reset']);
$route->get('/book-reset', ['Book', 'reset']);
$route->get('/comment-reset', ['Comment', 'reset']);

// Display route data as JSON
$route->json();
