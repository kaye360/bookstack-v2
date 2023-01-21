<?php


require_once './lib/database.php';




class Comment extends Database
{



	private const TABLE = 'comments';


	function __construct()
	{
		parent::__construct();
	}




	public function create()
	{
		$post_data = $this->request();

		// Validate empty fields
		if (
			empty($post_data['comment']) ||
			empty($post_data['user_id']) ||
			empty($post_data['book_id']) ||
			empty($post_data['username'])
		) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Missing fields. Comment is required.'
			];
		}

		// Validate comment length
		if ( $this->has_too_many_chars(
			string: $post_data['comment'],
			limit: 200
		)) {
			$comment_length = strlen($post_data['comment']);
			return [
				'success' => false,
				'message' => "Comment is too many characters. Maximum is 200, your comment has $comment_length"
			];
		}

		// Validate allowed chars
		if ( $this->has_forbidden_chars( 
			values: [$post_data['comment']],
			regex: '/^[a-zA-Z0-9_\-!@#$%&*{}()<>.,;:"\' ]+$/'
		)) {
			return [
				'success' => false,
				'message' => 'Comment has forbidden characters.'
			];
		}

		// Create Comment
		$new_comment = $this->create_row(
		  columns: [
			'username' => $post_data['username'],
			'user_id' => $post_data['user_id'],
			'book_id' => $post_data['book_id'],
			'comment' => $post_data['comment']
		  ],
		  return: ['comment', 'username'],
		  table: self::TABLE
		);

		// Get updated comment count of book after creating new comment
		$updated_comment_count = count( $this->get_all($post_data['book_id']) );

		// Update Comment count in table 'books'
		$this->update_row(
			id: $post_data['book_id'],
			table: 'books',
			columns: [ 'comment_count' => $updated_comment_count]
		);

		return $new_comment;
	}




	public function get_single($id)
	{
		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
		);
	}




	public function get_all($id)
	{
		return $this->get_all_rows(
			id: $id,
			id_col: 'book_id',
			table: self::TABLE,
		);
	}




	public function edit($id)
	{
		$put_data = $this->request();

		// Validate empty fields
		if ( empty($put_data['comment'])) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Comment text is required'
			];
		}

		// Validate characters
		if ($this->has_forbidden_chars(
			values: [
				$put_data['comment']
			],
			regex: '/^[a-zA-Z0-9_\-!@#$%&*{}()<>.,;:"\' ]+$/'
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
			table: self::TABLE,
			columns: [
				"comment" => $put_data['comment']
			],
		);
	}




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

		include_once('./fake-data/comments.php');

		$sql = "TRUNCATE TABLE comments";
		$this->stmt = $this->dbh->prepare($sql);
		$this->stmt->execute();

		foreach ($comments as $comment) {
			$this->create_row(
				columns: [
					'username' => $comment['username'],
					'comment' => $comment['comment'],
					'user_id' => $comment['user_id'],
					'book_id' => $comment['book_id'],
				],
				table: self::TABLE
			);
		}

		return 'Comments table reset';
	}
}
