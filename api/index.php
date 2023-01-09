<?php


header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: *");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");




require_once './config.php';
require_once './lib/router.php';
require_once './models/User.php';

$route = new Router();
$route->baseURL = BASE_URL;


//route->{request method}(route, [class, method, param] )
$route->get('/users', ['User', 'getAll']);

$route->get('/user/:id', ['User', 'getSingle', 'id']);

$route->post('/user', ['User', 'create']);
$route->post('/user/login', ['User', 'login']);
$route->post('/user/logout', ['User', 'logout']);

$route->put('/user/:id', ['User', 'edit', ':id']);
$route->delete('/user/:id', ['User', 'destroy', 'id']);

$route->get('/user-reset', ['User', 'reset']);

// $route->get('/post', [User::class, 'getPost']);
// $route->post('/post', [User::class, 'postPost']);
// $route->put('/post', [User::class, 'putPost']);
// $route->delete('/post', [User::class, 'deletePost']);

$route->json();
