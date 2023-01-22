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
		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
			return: ['new_notifications']
		);
	}




	public function get_old($id) 
	{
		return $this->get_row_by_id(
			id: $id,
			table: self::TABLE,
			return: ['old_notifications']
		);
	}








	public function create() 
	{
		$put_data = $this->request();

		$user = $this->get_row_by_id(
			id: $put_data['user_id'],
			table: self::TABLE,
			return: ['new_notifications']
		);

		$current_new_notifications = json_decode($user['new_notifications']);
		$new_notification = [
			'message' => $put_data['notification_message'],
			'url' => $put_data['notification_url'],
			'type' => $put_data['notification_type']
		];

		array_unshift($current_new_notifications, $new_notification);

		return $this->update_row(
			id: $put_data['user_id'],
			table: self::TABLE,
			columns: [
				'new_notifications' => json_encode($current_new_notifications)
			]
		);
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
