<?php



/**
 * 
 * User Routes
 * 
 */

// GET
$route->get('/users', function() 
{
    return (new User())->table('users')->list();
});


$route->get('/user/:param', function() use($route) 
{
    return (new User())->table('users')
        ->where("id = $route->param")->single();
});


$route->get('/username/:param', function() use($route) 
{
    return (new User())->table('users')
        ->where("username = '$route->param'")->single();
});


// POST
$route->post('/user', function() 
{
    return (new User())->create();
});


// PUT
$route->put('/login', function() 
{
    return (new User())->login();
});


$route->put('/logout', function() 
{
    return (new User())->logout();
});



/**
 * 
 * Session Routes
 * 
 */

//  GET
$route->get('/session/:param', function() use($route)
{
    return (new User())->select('id, username')
        ->table('users')->where("session = '$route->param' ")->single();
});



/**
 * 
 * Notification Routes
 * 
 */

// GET
$route->get('/new-notifications/:param', function() use($route)
{
    return (new Notification())->select('new_notifications')
        ->table('users')
        ->where("id = $route->param")
        ->single();
});


$route->get('/old-notifications/:param', function() use($route)
{
    return (new Notification())->select('old_notifications')
        ->table('users')
        ->where("id = $route->param")
        ->single();
});


// PUT
$route->put('/add-notifications', function() {
    return (new Notification())->create();
});


$route->put('/clear-new-notifications', function() {
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

