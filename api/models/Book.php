<?php

/**
 * 
 * Books Methods at a glance
 * -------------------------
 * 
 */

require_once './lib/database.php';




class Book extends Database {



  private $table = 'books';


  function __construct() 
  {
    parent::__construct();
  }




  public function create() 
  {
    $post_data = $this->request();

    // Validate empty fields
    if ( 
      empty($post_data['isbn']) ||
      empty($post_data['user_id'])
    ) {
      http_response_code(400);
      return [
        'success' => false,
        'message' => 'ISBN and User Id are required'
      ];
    }

    // Create Book
    return $this->create_row(
      columns: [
        'isbn' => $post_data['isbn'],
        'title' => $post_data['title'],
        'author' => $post_data['author'],
        'is_read' => $post_data['is_read'],
        'likes' => json_encode([]),
        'cover_url' => $post_data['cover_url'],
        'user_id' => $post_data['user_id']
      ],
      return: ['title', 'id'],
      table: $this->table
    );
  }




  public function get_single($id) 
  {
    return $this->get_row_by_id(
      id: $id,
      table: $this->table,
    );
  }




  public function get_all($id) 
  {
    return $this->get_all_rows(
      id: $id,
      id_col: 'user_id',
      table: $this->table,
    );
  }




  public function edit($id) 
  {
    $put_data = $this->request();

    // Validate empty fields
    if ( 
      empty($put_data['isbn']) ||
      empty($put_data['user_id'])
    ) {
      http_response_code(400);
      return [
        'success' => false,
        'message' => 'ISBN and User Id are required'
      ];
    }

    // Validate characters
		if( $this->has_forbidden_chars(
      values: [
        $put_data['isbn'],
        $put_data['title'],
        $put_data['author']
      ],
      regex: '/^[a-zA-Z0-9_\- :]+$/'   
    )) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username or password have forbidden characters.'
			];
		}

		// Update Book
		return $this->update_row(
			id: $id,
			table: $this->table,
			columns: [
        'isbn' => $put_data['isbn'],
        'title' => $put_data['title'],
        'author' => $put_data['author'],
        'is_read' => $put_data['is_read'],
			],
		);
  }




  public function destroy($id) 
  {
		return $this->destroy_row_by_id(
			id: $id,
			table: $this->table,
		);
  }




  /**
   * 
   * Dev Functions only
   * 
   */
  public function reset() {

    include_once('./fake-data/books.php');

    $sql = "TRUNCATE TABLE books";
		$this->stmt = $this->dbh->prepare($sql);
		$this->stmt->execute();

    foreach($books as $book) {
      $is_read = $book['is_read'] == 1 ? 'true' : 'false';
      $this->create_row(
        columns: [
          'isbn' => $book['isbn'],
          'title' => $book['title'],
          'author' => $book['author'],
          'is_read' => $is_read,
          'likes' => json_encode([]),
          'cover_url' => 'cover_url',
          'user_id' => $book['user_id']
        ],
        table: $this->table
      );
    }

    return 'Books table reset';
  }

}

