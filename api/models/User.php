<?php




require_once './lib/database.php';




class User extends Database
{

	private const TABLE = 'users';



	function __construct()
	{
		parent::__construct();
	}




	public function create()
	{
		$request = $this->request();

		if( !$this->validate_req($request, ['username', 'password', 'confirm_password']) ) {
			return $this->error('Username, password and password confirmation are required.');
		}

		if( $request['password'] !== $request['confirm_password'] ) {
			return $this->error('Password and confirmed do not match');
		}

		if( $this->is_taken( column: 'username', value: $request['username'], table: self::TABLE) ) {
			return $this->error('Username is Taken');
		}

		if( $this->has_forbidden_chars($request) ) {
			return $this->error('Username or password have forbidden characters.');
		}

		$password = password_hash($request['password'], PASSWORD_DEFAULT);
		$session = $this->make_UUID();

		$create_new_user = $this->table('users')
			->cols('username, password, session, new_notifications, old_notifications')
			->values(" '$request[username]', '$password', '$session', '[]', '[]'")
			->new();

		if( !$create_new_user ) {
			return $this->error('Failed to create new user');
		}
		
		$new_user = $this->table('users')
			->select('username, session')
			->where("username = '$request[username]' ")
			->single();

		return ['success' => true, 'data' => $new_user];
	}



	public function login()
	{
		$request = $this->request();
		$uuid = $this->make_UUID();

		if( !$this->validate_req($request, ['username', 'password']) ) {
			return $this->error('$username, $password are required in User->login');
		}

		if( !$this->validate_password(
			username: $request['username'],
			password: $request['password']
		)) {
			return $this->error('Invalid credentials');
		}

		$set_user_session = $this->table('users')
			->set("session = '$uuid'")
			->where("username = '$request[username]' ")
			->update();

		if( !$set_user_session['success']) {
			return $this->error('Failed to update session column');
		}

		$logged_in_user = $this->table('users')
			->select('id, username, session')
			->where("username = '$request[username]' ")
			->single();
		
		$data = [
			'username' => $logged_in_user['data']['username'],
			'id' => $logged_in_user['data']['id'],
			'uuid' => $uuid
		];

		return ['success' => true, 'data' => $data];
	}




	public function logout()
	{
		$request = $this->request();

		if( !$this->validate_req($request, ['id']) ) {
			return $this->error('$id is required for User->logout');
		}

		$destroy_user_session = $this->table('users')
			->set("session = null ")
			->where("id = '$request[id]' ")
			->update();

		return $destroy_user_session;
	}



	private function validate_password(
		string $username,
		string $password
	) {

		$user = $this->table('users')
			->select('username, password, id')
			->where("username = '$username'")
			->single();

		/**
		 * @todo make this return a one liner
		 */
		if (
			$user['success'] && 
			password_verify($password, $user['data']['password'])
		) {
			return true;
		} else {
			return false;
		}
	}




	private function make_UUID()
	{
		// Found Here: https://stackoverflow.com/questions/2040240/php-function-to-generate-v4-uuid
		return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
	}



	/**
	 * 
	 * Dev Functions only
	 * 
	 */
}
