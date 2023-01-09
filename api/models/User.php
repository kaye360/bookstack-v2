<?php


require_once './lib/database.php';




class User extends Database
{

	private $table = 'users';




	function __construct()
	{
		parent::__construct();
	}




	public function create()
	{
		$post_data = $this->request();

		if(	empty($post_data['username']) || empty($post_data['password']) ) {
			return [
				'success' => false,
				'message' => 'Username and password are required.'
			];
		}

		$username_is_taken = $this->is_taken(
			column: 'username',
			value: $post_data['username'],
			table: 'users'
		);

		if( $username_is_taken ) return [
			'success' => false,
			'message' => 'Username is Taken'
		];

		if( $this->has_forbidden_chars($post_data) ) return [
			'success' => false,
			'message' => 'Username or password have forbidden characters.'
		];

		return $this->createRow(
			columns: [
				'username' => $post_data['username'],
				'password' => password_hash($post_data['password'], PASSWORD_DEFAULT),
				'session' => $this->makeUUID()
			],
			return: ['username', 'id', 'session'],
			table: $this->table
		);
	}




	public function getSingle($id)
	{
		return $this->getRowById(
			id: $id,
			table: $this->table,
			return: ['username, id']
		);
	}




	public function getAll()
	{
		return $this->getAllRows(
			table: $this->table,
			return: ['username, id']
		);
	}




	public function edit($id)
	{
		$put_data = $this->request();

		return $this->updateRow(
			id: $id,
			table: $this->table,
			columns: [
				'username' => $put_data['username'],
				'password' => $put_data['password']
			],
			return: ['username']
		);
	}




	public function destroy($id)
	{
		return $this->destroyRowById(
			id: $id,
			table: $this->table,
		);
	}




	public function login()
	{
		$post_data = $this->request();
		$uuid = $this->makeUUID();

		$user = $this->getRowByColumnName(
			column: 'username',
			value: $post_data['username'],
			table: 'users',
			return: ['username', 'password', 'id']
		);

		if ($user['success'] && password_verify($post_data['password'], $user['password'])) {

			$this->updateRow(
				id: $user['id'],
				table: $this->table,
				columns: [
					'session' => $uuid
				]
			);

			return [
				'success' => true,
				'username' => $user['username'],
				'id' => $user['id'],
				'uuid' => $uuid
			];
		} else {
			return ['success' => false, 'message' => 'Invalid credentials'];
		}
	}


	public function logout()
	{
		$post_data = $this->request();
		
		return $this->updateRow(
			id: $post_data['id'],
			table: $this->table,
			columns: [
				'session' => null
			],
			return: ['username']
		);

	}



	private function makeUUID()
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
			$this->createRow(
				columns: [
					'username' => $name,
					'password' => password_hash('123456', PASSWORD_DEFAULT)
				],
				table: 'users'
			);
		}
		$this->createRow(
			columns: [
				'username' => 'josh',
				'password' => password_hash('123456', PASSWORD_DEFAULT)
			],
			table: 'users'
		);

		return 'Users table reset';
	}
}
