<?php




require_once './lib/database.php';




class Notification extends Database
{

	function __construct()
	{
		parent::__construct();
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
			return $this->error('$sending_user_id, $recieving_user_id, $message, $url, $type are required');
		}

		if( $sending_user_id === $recieving_user_id ) return;

		try {

			$recieving_user = $this->select('new_notifications')
				->table('users')
				->where("id = '$recieving_user_id' ")
				->single();

			if( !$recieving_user['success'] ) {
				return $this->error('Error getting users notifications');
			}

			$current_new_notifications = json_decode(
				$recieving_user['data']['new_notifications'], true
			);
			
			$new_notification = ['message' => $message, 'url' => $url, 'type' => $type ];

			array_unshift($current_new_notifications, $new_notification);
			
			$updated_new_notifications_json = json_encode($current_new_notifications);

			return $this->set("new_notifications = '$updated_new_notifications_json' ")
				->where("id = '$recieving_user_id' ")
				->update();
			
		} catch(Exception $error) {
			return $this->error($error->getMessage());
		}
	}





	public function clear_new()
	{
		$request = $this->request();

			try {

			if( !$this->is_valid_request($request, ['user_id']) ) {
				return $this->error('$user_id required in Notification->clear_new');
			}

			$user = $this->select('new_notifications, old_notifications')
				->table('users')
				->where(" id = '$request[user_id]' ")
				->single();

			if( !$user['success'] ) {
				return $this->error('User not found');
			}

			$new_notifications = json_decode($user['data']['new_notifications'], true);
			$old_notifications = json_decode($user['data']['old_notifications'], true);

			$updated_old_notifications = array_merge($new_notifications, $old_notifications);
			$updated_old_notifications = array_slice($updated_old_notifications, 0, 20);
			$updated_old_notifications_json = json_encode($updated_old_notifications);

			return $this->table('users')
				->set(" new_notifications = '[]', old_notifications = '$updated_old_notifications_json' ")
				->where(" id = '$request[user_id]' ")
				->update();

		} catch (Exception $error) {
			return $this->error($error->getMessage());
		}
	}











}
