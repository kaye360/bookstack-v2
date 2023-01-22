<?php

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
$route->get('/username/:username', ['User', 'get_single_by_username', 'username']);
$route->post('/user', ['User', 'create']);
$route->post('/user/login', ['User', 'login']);
$route->post('/user/logout', ['User', 'logout']);
$route->put('/user/:id', ['User', 'edit', 'id']);
$route->delete('/user/:id', ['User', 'destroy', 'id']);

/**
 * Session Routes
 */
$route->get('/session/:session', ['User', 'get_single_by_session', 'session']);

/**
 * User Notification Routes
 */
$route->get('/notifications/new/:id', ['User', 'get_new_notifications', 'id']);
$route->get('/notifications/old/:id', ['User', 'get_old_notifications', 'id']);
$route->put('/notifications/add', ['User', 'add_new_notification']);
$route->put('/notifications/clear_new', ['User', 'clear_new_notifications']);

/**
 * Book Routes
 */
$route->post('/book', ['Book', 'create']);

$route->get('/book/:id', ['Book', 'get_single', 'id']);
$route->get('/books/:id', ['Book', 'get_all', 'id']);

$route->put('/book/:id', ['Book', 'edit', 'id']);
$route->put('/book/like', ['Book', 'like']);
$route->put('/book/read', ['Book', 'toggle_read_status']);

$route->delete('/book/:id', ['Book', 'destroy', 'id']);

/**
 * Comment Routes
 */
$route->post('/comment', ['Comment', 'create']);
$route->get('/comment/:id', ['Comment', 'get_single', 'id']);
$route->get('/comments/:id', ['Comment', 'get_all', 'id']);
$route->put('/comment/:id', ['Comment', 'edit', 'id']);
$route->delete('/comment/:id', ['Comment', 'destroy', 'id']);

/**
 * Community Feed Routes
 */
$route->get('/community/:id', ['Community', 'get_user_feed', 'id']);
$route->get('/community', ['Community', 'get_community_feed']);

/**
 * Dev Routes
 * For generating fake data for testing purposes.
 */
$route->get('/user-reset', ['User', 'reset']);
$route->get('/book-reset', ['Book', 'reset']);
$route->get('/comment-reset', ['Comment', 'reset']);