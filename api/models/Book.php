<?php


require_once './lib/database.php';
require_once './models/Community.php';




class Book extends Database
{



	private const TABLE = 'books';
	private $community_feed;


	function __construct()
	{
		parent::__construct();
		$this->community_feed = new Community();
	}




	public function create()
	{
		$post_data = $this->request();

		// Validate empty fields
		if (
			empty($post_data['isbn']) ||
			empty($post_data['user_id'])
		) {
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'ISBN and User Id are required'
			];
		}

		// Create Book
		$new_book = $this->create_row(
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
			table: self::TABLE
		);
		
		// Add entry to Community Feed
		$this->community_feed->create(
			type: 'upload',
			message: "$post_data[username] added a book to their library: $post_data[title]",
			link: '/book/' . $new_book['id'],
			user_id: $post_data['user_id']
		);

		return $new_book;
	}




	/**
	 * @todo possbily make this into 1 sql query instead of 2
	 */
	public function get_single($id)
	{
		$book = $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
		);
		
		$book['comments'] = $this->get_all_rows(
			id: $id,
			id_col : 'book_id',
			table: 'comments'
		);

		return $book;
		
	}




	public function get_all($id)
	{
		$id = $id === 'all' ? false : $id;
		return $this->get_all_rows(
			id: $id,
			id_col: 'user_id',
			table: self::TABLE,
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
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'ISBN and User Id are required'
			];
		}

		// Validate characters
		if ($this->has_forbidden_chars(
			values: [
				$put_data['isbn'],
				$put_data['title'],
				$put_data['author']
			],
			regex: '/^[a-zA-Z0-9_\- :]+$/'
		)) {
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username or password have forbidden characters.'
			];
		}

		// Update Book
		return $this->update_row(
			id: $id,
			table: self::TABLE,
			columns: [
				'isbn' => $put_data['isbn'],
				'title' => $put_data['title'],
				'author' => $put_data['author'],
				'is_read' => $put_data['is_read'],
			],
		);
	}



	/**
	 * @todo rename this to toggle_like_status
	 */
	public function like()
	{
		$put_data = $this->request();

		// Validate request
		if (
			empty($put_data['id']) ||
			empty($put_data['user_id'])
		) {
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'Book ID and user ID are required.'
			];
		}

		// Get current book likes
		$current_book = $this->get_row_by_id(
			id: $put_data['id'],
			table: self::TABLE,
			return: ['likes', 'title']
		);

		if (!array_key_exists('likes', $current_book)) {
			// http_response_code(404);
			return [
				'success' => false,
				'message' => 'This book doesn\'t exist'
			];
		}

		$current_book['likes'] = json_decode($current_book['likes'], true);

		// Toggle Like/Unlike
		if (in_array($put_data['user_id'], $current_book['likes'])) {

			// UnLike
			$user_id_key = array_search($put_data['user_id'], $current_book['likes']);
			unset($current_book['likes'][$user_id_key]);

			return $this->update_row(
				id: $put_data['id'],
				table: self::TABLE,
				columns: [
					'likes' => json_encode($current_book['likes'])
				],
				return: ['likes']
			);
		} else {

			// Like
			array_push($current_book['likes'], $put_data['user_id']);

			$this->community_feed->create(
				type: 'like',
				message: $put_data['username'] . ' liked the book: ' . $current_book['title'],
				link: '/book/' . $put_data['id'],
				user_id : $put_data['user_id']
			);

			return $this->update_row(
				id: $put_data['id'],
				table: self::TABLE,
				columns: [
					'likes' => json_encode($current_book['likes'])
				],
				return: ['likes']
			);
		}
	}




	/**
	 * @todo validate correct user ID
	 */
	public function toggle_read_status()
	{
		$put_data = $this->request();

		// Validate request
		if (empty($put_data['id'])) {
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'Book ID is required.'
			];
		}

		// Get current book read status
		$current_book = $this->get_row_by_id(
			id: $put_data['id'],
			table: self::TABLE,
			return: ['is_read']
		);

		// Get new read status
		$new_read_status = ($current_book['is_read'] === 'true') ? 'false' : 'true';

		// Update status
		return $this->update_row(
			id: $put_data['id'],
			table: self::TABLE,
			columns: [
				'is_read' => $new_read_status
			],
			return: ['is_read']
		);
	}




	/** 
	 * @todo validate user ID
	 */
	public function destroy($id)
	{
		return $this->destroy_row_by_id(
			id: $id,
			table: self::TABLE,
		);
	}




	/**
	 * 
	 * Dev Functions only
	 * 
	 */
	public function reset()
	{

		include_once('./fake-data/books.php');

		$sql = "TRUNCATE TABLE books";
		$this->stmt = $this->dbh->prepare($sql);
		$this->stmt->execute();

		foreach ($books as $book) {
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
				table: self::TABLE
			);
		}

		return 'Books table reset';
	}
}
