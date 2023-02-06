<?php




require_once './lib/database.php';




class Notification extends Database
{

	private const TABLE = 'users';




	function __construct()
	{
		parent::__construct();
	}



	
	public function get_new($id) 
	{
		if(empty($id)) return ['error' => 'No ID given']; 

		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
			return: ['new_notifications']
		);
	}




	public function get_old($id) 
	{
		if (empty($id)) return ['error' => 'No ID given'];

		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
			return: ['old_notifications']
		);
	}




	public function create(
		int $sending_user_id,
		int $recieving_user_id,
		string $message,
		string $url,
		string $type
	)	{

		if( 
			empty($sending_user_id) ||
			empty($recieving_user_id) ||
			empty($message) ||
			empty($url) ||
			empty($type) 
		) {
			return;
		}

		if($sending_user_id === $recieving_user_id) return;

		try {

			$user = $this->get_row_by_id(
				id: $recieving_user_id,
				table: self::TABLE,
				return: ['new_notifications']
			);

			$current_new_notifications = json_decode($user['new_notifications']);
			$new_notification = [
				'message' => $message,
				'url' => $url,
				'type' => $type
			];

			array_unshift($current_new_notifications, $new_notification);
			
			return $this->update_row(
				id: $recieving_user_id,
				table: self::TABLE,
				columns: [
					'new_notifications' => json_encode($current_new_notifications)
				]
			);
		} catch(Exception $error) {
			
		}
	}





	public function clear_new()
	{
		$put_data = $this->request();

		$user = $this->get_row_by_id(
			id: $put_data['user_id'],
			table: self::TABLE,
			return: ['new_notifications', 'old_notifications']
		);

		$new_notifications = json_decode($user['new_notifications'], true);
		$old_notifications = json_decode($user['old_notifications'], true);
		
		$updated_old_notifications = array_merge($new_notifications, $old_notifications);
		$updated_old_notifications = array_slice($updated_old_notifications, 0, 20);

		return $this->update_row(
			id: $put_data['user_id'],
			table: self::TABLE,
			columns: [
				'new_notifications' => '[]',
				'old_notifications' => json_encode($updated_old_notifications)
			],
			return: ['old_notifications']
		);

	}











}
