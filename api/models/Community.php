<?php



require_once './lib/database.php';




class Community extends Database
{

	private const TABLE = 'community';


	function __construct()
	{
		parent::__construct();
	}




    public function create(
        string $type,
        string $message,
        string $link,
        int $user_id
    ) {

        return $this->create_row(
            table: self::TABLE,
            columns: [
                'type' => $type,
                'message' => $message,
                'link' => $link,
                'user_id' => $user_id
            ]
        );
    }




    public function get_user_feed(

    ) {

    }




    public function get_community_feed(

    ) {
          
    }

}
