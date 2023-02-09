<?php



require_once './lib/database.php';




class Community extends Database
{

	private const TABLE = 'community';


	function __construct()
	{
		parent::__construct();
	}




    public function get_user_feed(
        string $id
    ) {
        $count = $this->get_row_count(table: self::TABLE, col: 'user_id', id: $id);

        $page = isset($_GET['page']) ? $_GET['page'] - 1 : 1;
        $per_page = isset($_GET['perpage']) ? $_GET['perpage'] : null;

        $rows = $this->get_all_rows(
            table: self::TABLE,
            id: $id,
            id_col: 'user_id',
            page:  $page,
            per_page: $per_page
        );

        return [
            'count' => $count,
            'data' => $rows,
        ];
    }




    public function get_community_feed()
    {
        $count = $this->get_row_count(table: self::TABLE);
        $page = isset($_GET['page']) ? $_GET['page'] - 1 : 1;
        $per_page = isset($_GET['perpage']) ? $_GET['perpage'] : null;

        $rows = $this->get_all_rows(
            table: self::TABLE,
            page: $page,
            per_page: $per_page
        );

        return [
            'count' => $count,
            'data' => $rows
        ];
    }




    public function create(
        string $type,
        string $message,
        string $link,
        int $user_id,
        string $image_url,
        string $username,
        string $comment = '',
    ) {

        return $this->create_row(
            table: self::TABLE,
            columns: [
                'type' => $type,
                'message' => $message,
                'link' => $link,
                'user_id' => $user_id,
                'image_url' => $image_url,
                'comment' => $comment,
                'username' => $username
            ]
        );
    }

}
