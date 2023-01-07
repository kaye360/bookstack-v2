<?php


require_once './lib/database.php';




class User extends Database {

  function __construct() {
    parent::__construct();
  }

  public function create() {
    $post_data = json_decode( file_get_contents('php://input'), true);
    echo json_encode($this->createRow(
      columns: [
        'username' => $post_data['username'],
        'password' => password_hash( $post_data['password'], PASSWORD_DEFAULT )
      ], 
      return: ['username', 'id'],
      table : 'users'
    ));
  }

  public function getSingle($id) {
    echo json_encode($this->getRowById(
      id: $id,
      table : 'users'
    ));
  }

  public function getAll() {
    echo json_encode($this->getAllRows(
      table : 'users'
    ));
  }

  public function edit($id) {
    echo json_encode(['user' => 'edit user ' . $id]);
  }

  public function destroy($id) {
    echo json_encode(['user' => 'destroy user' . $id]);
  }

}

