<?php



class Database {

  private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
  public $dbh;
  public $stmt;



  public function __construct() {
    // Set Connection Options
    $options = array(
      PDO::ATTR_PERSISTENT => true,
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    );

    // Connect to DB
    try {
      $this->dbh = new PDO($this->dsn, DB_USER, DB_PASS, $options);
    } catch(PDOException $err ) {
      return $err->getMessage();
    }
  }



  public function getRowById( int $id, string $table) {

    $id = trim($id);
    $id = filter_var($id);

    try {
      $sql = 'SELECT * FROM ' . $table . ' WHERE id = :id';
      $this->stmt = $this->dbh->prepare($sql);
      $this->stmt->bindValue(':id', $id);
      $this->stmt->execute();
  
      $single = $this->stmt->fetch(PDO::FETCH_ASSOC);

    } catch (Exception $error) {
      return ['error' => 'error with query'];
    }

    return !empty($single) 
      ? $single 
      : ['error' => 'no entries found'];
  }



  public function getAllRows(string $table) {
    try {
      $sql = 'SELECT * FROM ' . $table;
      $this->stmt = $this->dbh->prepare($sql);
      $this->stmt->execute();
      
      $all = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

    } catch (Exception $error) {
      return ['error' => 'error with query'];
    }

    return !empty($all) 
      ? $all 
      : ['error' => 'no entries found'];
  }
}
