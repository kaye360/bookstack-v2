<?php


require_once './lib/database.php';
require_once './models/Community.php';
require_once './models/Notification.php';



class Book extends Database
{



	private const TABLE = 'books';
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
		
		if( !$this->is_valid_request($request, ['isbn', 'title', 'author', 'is_read', 'cover_url', 'user_id' ]) ) {
			return $this->error('isbn, title, author, is_read, cover_url, user_id are required in Book->create');
		}

		$create_new_book = $this->table('books')
			->cols('isbn, title, author, is_read, likes, cover_url, user_id')
			->values(" 
				'$request[isbn]', 
				'$request[title]',
				'$request[author]', 
				'$request[is_read]', 
				'[]', 
				'$request[cover_url]', 
				'$request[user_id]' ")
			->new();

		$community_feed_entry = $this->table('community')
			->cols('type, message, link, user_id, image_url, username')
			->values("
				'add',
				'$request[username] added a book to their library: $request[title]',
				'/book/$create_new_book[data]',
				'$request[user_id]',
				'$request[cover_url]',
				'$request[username]' ")
			->new();

		return $create_new_book;
	}




	/**
	 * @todo possbily make this into 1 sql query instead of 2
	 */
	public function get_single($book_id)
	{
		if( !$book_id ) {
			return $this->error('$book_id is required');
		}

		$book = $this->table('books')
			->where("id = '$book_id' ")
			->single();

		if( !$book['success'] ) {
			return $this->error('Book not found');
		}

		$comments = $this->table('comments')
			->where("book_id = '$book_id' ")
			->list();

		$book['data']['comments'] = $comments['data'];
		return $book;
		
	}



	public function toggle_like_status()
	{

		try {

			$request = $this->request();

			if ( !$this->is_valid_request($request, ['id', 'user_id', 'username']) ) {
				return $this->error('id, user_id, username are required in Book->like');
			}

			$book = $this->select('likes, title, user_id, id, cover_url')
				->table('books')
				->where(" id = $request[id] ")
				->single();

			if ( !$book['success'] ) {
				$this->error('Book not found');
			}

			$book['data']['likes'] = json_decode($book['data']['likes'], true);

			$is_book_liked = in_array($request['user_id'], $book['data']['likes']);

			if ( $is_book_liked ) { // Then Unlike

				$user_id_key = array_search($request['user_id'], $book['data']['likes']);
				unset($book['data']['likes'][$user_id_key]);

			} else { // Else Like

				array_push($book['data']['likes'], $request['user_id']);

				$message = $request['username'] . ' liked the book: ' . $book['data']['title'];
				$link = '/book/' . $request['id'];
				$cover = $book['data']['cover_url'];

				/**
				 * @todo Once Community class is refactored, change this to a new instance of Community->create(), just like how notifications are handled
				 */
				$new_community_feed_entry = $this->table('community')
					->cols('type, message, link, user_id, image_url, username')
					->values(" 
						'like',
						'$message',
						'$link',
						'$request[user_id]',
						'$cover',
						'$request[username]'
					")
					->new();

				$new_notification = (new Notification())->create(
					sending_user_id: $request['user_id'],
					recieving_user_id: $book['data']['user_id'],
					message: $message,
					url: $link,
					type: 'like',
				);
			}

			$updated_book_likes_json = json_encode($book['data']['likes']);

			$update_book_likes = $this->table('books')
				->set(" likes = '$updated_book_likes_json' ")
				->where(" id = '$request[id]' ")
				->update();

			return $update_book_likes;

		} catch(Exception $error) {
			return ['error' => $error->getMessage()];
		}
	}



	public function toggle_read_status()
	{
		$request = $this->request();

		if( !$this->is_valid_request($request, ['id', 'user_id']) ) {
			return $this->error('$id, $user_id is required in Book->toggle_read_status');
		}

		$book = $this->select('id, user_id, is_read')
			->table('books')
			->where(" id = $request[id] ")
			->single();

		if( !$book['success']) {
			return $this->error('No Book found');
		}

		if( $request['user_id'] !== $book['data']['user_id'] ) {
			return $this->error('Book ID must equal $request user_id');
		}

		$new_read_status = ($book['data']['is_read'] === 'true') ? 'false' : 'true';

		$update_book_read_status = $this->table('books')
			->set(" is_read = '$new_read_status' ")
			->where(" id = '$request[id]' ")
			->update();

		return $update_book_read_status;
	}

}
