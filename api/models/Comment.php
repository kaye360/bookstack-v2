<?php


require_once './lib/database.php';
require_once './models/Community.php';
require_once './models/Notification.php';



class Comment extends Database
{


	private const TABLE = 'comments';
	private $community_feed;
	private $notifications;


	function __construct()
	{
		parent::__construct();
		$this->community_feed = new Community();
		$this->notifications = new Notification();
	}




	public function create()
	{
		$request = $this->request();

		if( !$this->is_valid_request($request, ['comment', 'user_id', 'book_id', 'username', 'image_url']) ) {
			return $this->error('Comment, user_id, book_id, username, image_url are required in Comment->create');
		}

		// Validate comment length
		if ( $this->has_too_many_chars($request['comment'], 200)) {
			$comment_length = strlen($request['comment']);
			return $this->error("Comment is too many characters. Maximum is 200, your comment has $comment_length");
		}

		// Validate allowed chars
		if ( $this->has_forbidden_chars( 
			[$request['comment']], 
			'/^[a-zA-Z0-9_\-!@#$%&*{}()<>.,;:"\' ]+$/')
		) {
			return $this->error('Comment has forbidden characters.');
		}

		$create_new_comment = $this->table('comments')
			->cols('username, user_id, book_id, comment')
			->values("
				'$request[username]', 
				'$request[user_id]', 
				'$request[book_id]', 
				'$request[comment]'
			")
			->new();

		if( !$create_new_comment['success'] ) {
			return $this->error('Failed to add comment');
		}

		// Get updated comment count of book after creating new comment
		$updated_comment_count = $this->table('comments')
			->where(" book_id = '$request[book_id]' ")
			->count();
		
		// Update Comment count in table 'books'
		$update_comment_count = $this->table('books')
			->set(" comment_count = '$updated_comment_count[data]' ")
			->where(" id = '$request[book_id]' ")
			->update();
		
		$book = $this->select('user_id, title')
			->table('books')
			->where(" id = $request[book_id] ")
			->single();

		if( !$book['success'] ) {
			return $this->error('Failed to get updated book information');
		}

		$title = $book['data']['title'];
		$message = "$request[username] commented on a book: $title";
		$link = '/book/' . $request['book_id'];
		$recieving_user_id = $book['data']['user_id'];

		$community_feed = new Community();
		$test = $community_feed->create(
			type: 'comment',
			message : $message,
			link: $link,
			user_id: $request['user_id'],
			image_url: $request['image_url'],
			username: $request['username'],
			comment: $request['comment']
		);
		var_dump($test);

		$new_notification = new Notification();
		$new_notification->create(
			sending_user_id: $request['user_id'],
			recieving_user_id: $recieving_user_id,
			message: $message,
			url: $link,
			type: 'comment'
		);

		return $book;
	}


}
