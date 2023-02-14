<?php




/**
 * 
 * User Routes
 * 
 */

// GET
$route->get('/users', function() {
    // return (new User())->get_all();
    // $test = (new User())->select('username')->table('users')->limit(5)->order('username DESC')->list();
    $test = (new User())->table('users')->where("id=1")->count();

    return $test;
});


$route->get('/user/:param', function() {
    return (new User())->get_single(30);
});


$route->get('/username/:param', function() {
    return (new User())->get_single_by_username();
});


// POST
$route->post('/user', function () {
    return (new User)()->create();
});


$route->post('/user/login', function() {
    return (new User())->login();
});


$route->post('/user/logout', function() {
    return (new User())->logout();
});


// PUT
$route->put('/user/:param', function () {
    return (new User)->edit();
});


// DELETE
$route->delete('/user/:param', function() {
    return (new User())->destroy();
});




/**
 * 
 * Session Routes
 * 
 */

//  GET
$route->get('/session/:param', function() {
    return (new User())->get_single_by_session();
});





/**
 * 
 * Notification Routes
 * 
 */

// GET
$route->get('/notifications/new/:param', function() {
    return (new Notification())->get_new();
});


$route->get('/notifications/old/:param', function() {
    return (new Notification())->get_old();
});


// PUT
$route->put('/notifications/add', function() {
    return (new Notification())->create();
});


$route->put('/notifications/clear_new', function() {
    return (new Notification())->clear_new();
});




/**
 * 
 * Book Routes
 * 
 */

// GET
$route->get('/book/:param', function() {
    return (new Book())->get_single();
});


$route->get('/books/:param', function() {
    return (new Book())->get_all();
});


$route->get('/books/explore', function() {
    return (new Book())->get_explore();
});


// POST
$route->post('/book', function() {
    return (new Book())->create();
});


// PUT
$route->put('/book/:param', function() {
    return (new Book())->edit();
});


$route->put('/book/like', function() {
    return (new Book())->like();
});


$route->put('/book/read', function() {
    return (new Book())->toggle_read_status();
});


// DELETE
$route->delete('/book', function() {
    return (new Book())->destroy();
});





/**
 * 
 * Comment Routes
 * 
 */

// GET
$route->get('/comment/:param', function() {
    return (new Comment())->get_single();
});


$route->get('/comments/:param', function() {
    return (new Comment())->get_all();
});


// POST
$route->post('/comment', function() {
    return (new Comment())->create();
});


// PUT
$route->put('/comment/:param', function() {
    return (new Comment())->edit();
});


// DELETE
$route->delete('/comment/:param', function() {
    return (new Comment())->destroy();
});





/**
 * 
 * Community Feed Routes
 * 
 */

// GET
$route->get('/community/:param', function() {
    return (new Community())->get_user_feed();
});

$route->get('/community', function() {
    return (new Community())->get_community_feed();
});

