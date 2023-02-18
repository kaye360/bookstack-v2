<?php



require_once './lib/database.php';




class Community extends Database
{

	private const TABLE = 'community';


	function __construct()
	{
		parent::__construct();
	}




    public function get_user_feed(string $id) {

        if( !$id ) {
            return $this->error('Id required in Community->get_user_feed');
        }

        // Needed count for front end pagination
        $count = $this->table('community')
            ->where(" user_id = $id ")
            ->count();

        if( isset($_GET['page']) && isset($_GET['perpage']) ) {

            $page = $_GET['page'] - 1;
            $page = $page < 0 ? 0 : $page;
            $per_page = $_GET['perpage'];
            $start = $page * $per_page;
            $limit = "$start, $per_page";

        } else {

            $limit = '0, 10';

        }

        $rows = $this->table('community')
            ->where(" user_id = $id ")
            ->limit($limit)
            ->list();

        return [
            'count' => $count,
            'data' => $rows,
        ];
    }




    public function get_community_feed()
    {
        // Needed count for front end pagination
        $count = $this->table('community')->count();
        $per_page = 50;

        if( isset($_GET['page'])  ) {

            $page = $_GET['page'] - 1;
            $page = $page < 0 ? 0 : $page;
            $start = $page * $per_page;
            $limit = "$start, $per_page";

        } else {

            $limit = "0, $per_page";

        }

        $rows = $this->table('community')
            ->limit($limit)
            ->list();

        $rows_sliced = [];
        $offset = array_rand( range(0,4) );

        for($i = $offset; $i < $per_page; $i += 5) {
            if( isset($rows['data'][$i]) ) {
                $rows_sliced[] =  $rows['data'][$i];
            }
        }

        return [
            'count' => $count,
            'data' => $rows_sliced
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

        return $this->table('community')
            ->cols('type, message, link, user_id, image_url, comment, username')
            ->values("'$type', '$message', '$link', '$user_id', '$image_url', '$comment', '$username'")
            ->new();
    }

}
