<?php




/**
 * 
 * User Routes
 * 
 */

// GET
$route->get('/users', function() {
    return ['class' => 'User','method' => 'get_all'];
});


$route->get('/user/:param', function() {
    return ['class' => 'User', 'method' => 'get_single'];
});


$route->get('/username/:param', function() {
    return ['class' => 'User', 'method' => 'get_single_by_username'];
});


// POST
$route->post('/user', function () {
    return ['class' => 'User','method' => 'create'];
});


$route->post('/user/login', function() {
    return ['class' => 'User', 'method' => 'login'];
});


$route->post('/user/logout', function() {
    return ['class' => 'User', 'method' => 'logout'];
});


// PUT
$route->put('/user/:param', function () {
    return ['class' => 'User','method' => 'edit'];
});


// DELETE
$route->delete('/user/:param', function() {
    return ['class' => 'User', 'method' => 'destroy'];
});




/**
 * 
 * Session Routes
 * 
 */

//  GET
$route->get('/session/:param', function() {
    return ['class' => 'User', 'method' => 'get_single_by_session'];
});





/**
 * 
 * Notification Routes
 * 
 */

// GET
$route->get('/notifications/new/:param', function() {
    return ['class' => 'Notification', 'method' => 'get_new'];
});


$route->get('/notifications/old/:param', function() {
    return ['class' => 'Notification', 'method' => 'get_old'];
});


// PUT
$route->put('/notifications/add', function() {
    return ['class' => 'Notification', 'method' => 'create'];
});


$route->put('/notifications/clear_new', function() {
    return ['class' => 'Notification', 'method' => 'clear_new'];
});




/**
 * 
 * Book Routes
 * 
 */

// GET
$route->get('/book/:param', function() {
    return ['class' => 'Book', 'method' => 'get_single', 'id'];
});


$route->get('/books/:param', function() {
    return ['class' => 'Book', 'method' => 'get_all', 'id'];
});


$route->get('/books/explore', function() {
    return ['class' => 'Book', 'method' => 'get_explore'];
});


// POST
$route->post('/book', function() {
    return ['class' => 'Book', 'method' => 'create'];
});


// PUT
$route->put('/book/:param', function() {
    return ['class' => 'Book', 'method' => 'edit', 'id'];
});


$route->put('/book/like', function() {
    return ['class' => 'Book', 'method' => 'like'];
});


$route->put('/book/read', function() {
    return ['class' => 'Book', 'method' => 'toggle_read_status'];
});


// DELETE
$route->delete('/book', function() {
    return ['class' => 'Book', 'method' => 'destroy'];
});





/**
 * 
 * Comment Routes
 * 
 */

// GET
$route->get('/comment/:param', function() {
    return ['class' => 'Comment', 'method' => 'get_single', 'id'];
});


$route->get('/comments/:param', function() {
    return ['class' => 'Comment', 'method' => 'get_all', 'id'];
});


// POST
$route->post('/comment', function() {
    return ['class' => 'Comment', 'method' => 'create'];
});


// PUT
$route->put('/comment/:param', function() {
    return ['class' => 'Comment', 'method' => 'edit', 'id'];
});


// DELETE
$route->delete('/comment/:param', function() {
    return ['class' => 'Comment', 'method' => 'destroy', 'id'];
});





/**
 * 
 * Community Feed Routes
 * 
 */

// GET
$route->get('/community/:param', function() {
    return ['class' => 'Community', 'method' => 'get_user_feed'];
});

$route->get('/community', function() {
    return ['class' => 'Community', 'method' => 'get_community_feed'];
});

