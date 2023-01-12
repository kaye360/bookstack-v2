<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




require_once './config.php';
require_once './lib/router.php';
require_once './models/User.php';
require_once './models/Book.php';

$route = new Router();
$route->baseURL = BASE_URL;


// User Routes
$route->get('/users', ['User', 'get_all']);
$route->get('/user/:id', ['User', 'get_single', 'id']);
$route->post('/user', ['User', 'create']);
$route->post('/user/login', ['User', 'login']);
$route->post('/user/logout', ['User', 'logout']);
$route->put('/user/:id', ['User', 'edit', ':id']);
$route->delete('/user/:id', ['User', 'destroy', 'id']);

// Book Routes
$route->post('/book', ['Book', 'create']);
$route->get('/book/:id', ['Book', 'get_single', 'id']);
$route->get('/books/:id', ['Book', 'get_all', 'id']);
$route->put('/book/:id', ['Book', 'edit', ':id']);
$route->put('/book/like', ['Book', 'like']);
$route->put('/book/read', ['Book', 'toggle_read_status']);
$route->put('/book/unlike', ['Book', 'unlike']);
$route->delete('/book/:id', ['Book', 'destroy', 'id']);

// Dev Routes
$route->get('/user-reset', ['User', 'reset']);
$route->get('/book-reset', ['Book', 'reset']);


$route->json();
