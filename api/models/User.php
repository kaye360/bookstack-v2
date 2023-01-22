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
		$post_data = $this->request();

		// Validate inputs
		if(	
			empty($post_data['username']) || 
			empty($post_data['password']) ||
			empty($post_data['confirm_password']) 
		) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username, password and password confirmation are required.'
			];
		}

		// Validate confirmed password
		if($post_data['password'] !== $post_data['confirm_password'] ) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Password and confirmed do not match'
			];
		}

		// Validate unique username
		if( 
			$this->is_taken(
				column: 'username',
				value: $post_data['username'],
				table: self::TABLE
			)
		 ) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username is Taken'
			];
		}

		// Validate Characters
		if( $this->has_forbidden_chars($post_data) ) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username or password have forbidden characters.'
			];
		}

		// Create/return User
		return $this->create_row(
			columns: [
				'username' => $post_data['username'],
				'password' => password_hash($post_data['password'], PASSWORD_DEFAULT),
				'session' => $this->make_UUID()
			],
			return: ['username', 'id', 'session'],
			table: self::TABLE
		);
	}




	public function get_single($id)
	{
		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
			return: ['username, id', 'session']
		);
	}




	public function get_single_by_session($session)
	{
		return $this->get_row_by_column_name(
			column: 'session',
			value: $session,
			table: self::TABLE,
			return: ['username', 'id']
		);
	}




	public function get_single_by_username($username)
	{
		return $this->get_row_by_column_name(
			column: 'username',
			value: $username,
			table: self::TABLE,
			return: ['username', 'id']
		);
	}




	public function get_all()
	{
		return $this->get_all_rows(
			table: self::TABLE,
			return: ['username, id']
		);
	}




	public function edit($id)
	{
		$put_data = $this->request();

		// Validate empty fields
		if(	
			empty($put_data['username']) ||
			empty($put_data['password']) 
		 ) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username and password are required.'
			];
		}

		// Validate password
		if(
			!$this->validate_password(
				username: $put_data['username'],
				password: $put_data['password']
			)
		) {
			return[
				'success' => false,
				'message' => 'Invalid Credentials'
			];
		}

		// Validate characters
		if( $this->has_forbidden_chars($put_data) ) {
			http_response_code(400);
			return [
				'success' => false,
				'message' => 'Username or password have forbidden characters.'
			];
		}

		/**
		 * @todo check if unique
		 */

		// Update User
		return $this->update_row(
			id: $id,
			table: self::TABLE,
			columns: [
				'username' => $put_data['username'],
			],
			return: ['username']
		);
	}




	public function destroy($id)
	{
		return $this->destroy_row_by_id(
			id: $id,
			table: self::TABLE,
		);
	}




	public function login()
	{
		$post_data = $this->request();
		$uuid = $this->make_UUID();

		// Validate password
		if(
			!$this->validate_password(
				username: $post_data['username'],
				password: $post_data['password']
			)
		) {
			return[
				'success' => false,
				'message' => 'Invalid credentials'
			];
		}

		// Get user data
		$user = $this->get_row_by_column_name(
			column: 'username',
			value: $post_data['username'],
			table: self::TABLE,
			return: ['username', 'id', 'session']
		);

		// Update User Session
		$this->update_row(
			id: $user['id'],
			table: self::TABLE,
			columns: [
				'session' => $uuid
			]
		);

		// Return User Data
		return [
			'success' => true,
			'username' => $user['username'],
			'id' => $user['id'],
			'uuid' => $uuid
		];
	}




	public function logout()
	{
		$post_data = $this->request();
		
		return $this->update_row(
			id: $post_data['id'],
			table: self::TABLE,
			columns: [
				'session' => null
			],
			return: ['username']
		);

	}




	private function validate_password(
		string $username,
		string $password
	) {

		$user = $this->get_row_by_column_name(
			column: 'username',
			value: $username,
			table: self::TABLE,
			return: ['username', 'password', 'id']
		);

		/**
		 * @todo make this return a one liner
		 */
		if (
			$user['success'] && 
			password_verify($password, $user['password'])
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
	public function reset()
	{
		// Fake username data from https://www.mockaroo.com/
		$names = ['PietrekSmiths', 'MagdaleneLohan', 'NoreneSprionghall', 'AllieDeAmbrosi', 'MerriliDonneely', 'MindyClaricoates', 'LemmyGeockle', 'KisseeLabbe', 'KevonDouble', 'NikolaosDamrell', 'ChristineEsseby', 'UrbainJeckells', 'HillierEgentan', 'DesDotterill', 'RhianonGanny', 'UdallCastells', 'BarthEggerton', 'PerryCatterson', 'GussieHorsefield', 'ChickyGridley', 'LillaBascombe', 'MerlineSchulke', 'RoseneNorway', 'ErichaCassley', 'HalieGreenstead', 'PatricioConnors', 'RositaGindghill', 'MishaSaddleton', 'KelliBernardotte', 'EugenioGoodered', 'BennYarrell', 'LillyMartignoni', 'TimofeiDerycot', 'DanitGoricke', 'KielGyver', 'Diane-marieTivolier', 'NickolaCottee', 'DonavonIngle', 'BevinWand', 'SumnerFergyson', 'RafaelaDominik', 'CassandraChaim', 'GradeyGanderton', 'CatrinaScarbarrow', 'RafaeliaMorris', 'NoellaPennington', 'ScottyDolley', 'AnsticeTellenbroker', 'PieterPetrol', 'DeborRosenhaupt'];

		shuffle($names);
		$names = array_slice($names, 0, 20);

		$sql = "TRUNCATE TABLE users";
		$this->stmt = $this->dbh->prepare($sql);
		$this->stmt->execute();

		foreach ($names as $name) {
			$this->create_row(
				columns: [
					'username' => $name,
					'password' => password_hash('123456', PASSWORD_DEFAULT)
				],
				table: self::TABLE
			);
		}
		$this->create_row(
			columns: [
				'username' => 'josh',
				'password' => password_hash('123456', PASSWORD_DEFAULT)
			],
			table: self::TABLE
		);

		return 'Users table reset';
	}
}
