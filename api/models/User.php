<?php


require_once './lib/database.php';




class User extends Database {

  function __construct() {
    parent::__construct();
  }

  public function create() {
    echo json_encode(['user' => 'create user']);
  }

  public function edit($id) {
    echo json_encode(['user' => 'edit user ' . $id]);
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

  public function destroy($id) {
    echo json_encode(['user' => 'destroy user' . $id]);
  }

}

