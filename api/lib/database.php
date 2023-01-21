<?php



class Database
{

	/**
	 * 
	 * @var $dsn $dbh $stmt - db connection/PDO variables
	 * 
	 */
	private $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME;
	public $dbh;
	public $stmt;


	public function __construct()
	{
		// Set Connection Options
		$options = array(
			PDO::ATTR_PERSISTENT => true,
			PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
		);

		// Connect to DB
		try {
			$this->dbh = new PDO($this->dsn, DB_USER, DB_PASS, $options);
		} catch (PDOException $err) {
			// http_response_code(500);
			return [
				'success' => false,
				'message' => 'Failed PDO connection'
			];
		}
	}


	/**
	 * 
	 * @method return the current request body
	 * 
	 */
	public function request()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	/**
	 * 
	 * @method Create a new table row
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function create_row(
		array $columns,
		string $table,
		array $return = null
	) {

		try {

			// Initial prep
			foreach ($columns as &$column) {
				$column = trim($column);
			}
			unset($column);

			// Prep SQL
			$column_names = array_keys($columns);
			$column_names = implode(', ', $column_names);
			$column_placeholders = preg_filter('/^/', ':', array_keys($columns));
			$column_placeholders = implode(', ', $column_placeholders);

			// Add row query
			$sql = "INSERT INTO $table ($column_names) VALUES ($column_placeholders)";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute($columns);

			// Get Returned values of new Row based on $return []
			$new_id = $this->dbh->lastInsertId();
			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';
			$sql = "SELECT $returned_columns FROM $table WHERE id = $new_id";
			$this->stmt = $this->dbh->prepare($sql);

			// Execute and return success/fail response
			if ($this->stmt->execute()) {

				$new_row = $this->stmt->fetch(PDO::FETCH_ASSOC);
				$new_row['success'] = true;
				return $new_row;
			} else {
				// http_response_code(400);
				return [
					'success' => false,
					'message' => 'Failed to execute query'
				];
			}
		} catch (Exception $error) {
			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'Error with query'
			];
		}
	}

	/**
	 * 
	 * @method get one row by ID
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function get_row_by_id(
		int $id,
		string $table,
		array $return = null
	) {

		$id = trim($id);
		$id = filter_var($id);

		if (is_null($id)) {
			return [
				'success' => false,
				'message' => 'No ID specified'
			];
		}

		try {
			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';

			$sql = "SELECT $returned_columns FROM $table WHERE id = :id";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->bindValue(':id', $id);
			$this->stmt->execute();

			$single = $this->stmt->fetch(PDO::FETCH_ASSOC);
			if ($single) $single['success'] = true;
		} catch (Exception $error) {

			// http_response_code(400);

			return [
				'success' => false,
				'message' => 'Error with query'
			];
		}


		if (!empty($single)) {
			return $single;
		} else {
			// http_response_code(404);
			return [
				'success' => false,
				'message' => 'No entries found'
			];
		}
	}

	/**
	 * 
	 * @method get one row by any column
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function get_row_by_column_name(
		string $column,
		string $value,
		string $table,
		array $return = null
	) {

		$column = trim($column);
		$column = filter_var($column);

		try {
			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';
			$sql = "SELECT $returned_columns FROM $table WHERE $column = '$value'";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute();

			$single = $this->stmt->fetch(PDO::FETCH_ASSOC);
			if (!empty($single)) $single['success'] = true;
		} catch (Exception $error) {

			// http_response_code(400);

			return [
				'success' => false,
				'message' => 'Error with query'
			];
		}

		return !empty($single)
			? $single
			: [
				'success' => false,
				'message' => 'No entries found'
			];
	}

	/**
	 * 
	 * @method get all rows of a table
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function get_all_rows(
		string $table,
		array $return = null,
		int $id = null,
		string $id_col = null
	) {

		try {

			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';

			$where = $id && $id_col ? "WHERE $id_col = $id" : '';

			$sql = "SELECT $returned_columns FROM $table $where ORDER BY id DESC";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute();

			$all = $this->stmt->fetchAll(PDO::FETCH_ASSOC);
		} catch (Exception $error) {

			// http_response_code(400);

			return [
				'success' => false,
				'message' => 'Error with query'
			];
		}

		return !empty($all)
			? $all
			: [
				'success' => false,
				'message' => 'No entries found'
			];
	}

	/**
	 * 
	 * @method update a single row based on @var columns to update
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function update_row(
		int $id,
		string $table,
		array $columns,
		array $return = null
	) {

		try {

			$id = trim($id);
			$id = filter_var($id);

			// Generate SQL to select which columns to update
			$column_sql = '';
			foreach ($columns as $column => $col_title) {
				$column_sql = "$column_sql $column = :$column,";
			}
			$column_sql = rtrim($column_sql, ',');

			// PDO query
			$sql = "UPDATE $table SET $column_sql WHERE id = $id";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute($columns);

			// Return New Values
			$all = $this->get_row_by_id(
				id: $id,
				table: $table,
				return: $return
			);
			return $all;
		} catch (Exception $error) {

			// http_response_code(400);

			return [
				'success' => false,
				'message' => 'error with query' . $error
			];
		}
	}

	/**
	 * 
	 * @method delete one row based on id
	 * 
	 * @return assoc array with success element
	 * 
	 */
	public function destroy_row_by_id(
		int $id,
		string $table,
	) {

		try {

			$id = trim($id);
			$id = filter_var($id);

			$sql = "DELETE FROM $table WHERE id = $id";
			$this->stmt = $this->dbh->prepare($sql);

			if ($this->stmt->execute()) {
				return ['success' => true];
			} else {

				// http_response_code(400);
				return [
					'success' => false,
					'message' => 'Error with query'
				];
			}
		} catch (\Throwable $th) {

			// http_response_code(400);
			return [
				'success' => false,
				'message' => 'Error with query'
			];
		}
	}

	/**
	 * 
	 * @method is value of column already taken. For unique columns
	 * 
	 * @return bool
	 * 
	 */
	protected function is_taken(
		string $column,
		string $value,
		string $table
	) {

		$sql = "SELECT $column, id from $table WHERE $column = '$value'";
		$this->stmt = $this->dbh->prepare($sql);
		$this->stmt->execute();

		$result = $this->stmt->fetch(PDO::FETCH_ASSOC);

		return empty($result) ? false : true;
	}

	/** 
	 * 
	 * @method checks if array of strings has forbidden characters
	 * 
	 * @return bool
	 * 
	 */
	protected function has_forbidden_chars(
		array $values,
		string $regex = null
	) {

		$has_forbidden_chars = null;

		foreach ($values as $value) {
			$tester = $regex
				? preg_match($regex, $value)
				: preg_match('/^[a-zA-Z0-9_\-]+$/', $value);
			if (!(bool) $tester) $has_forbidden_chars = true;
		}

		return $has_forbidden_chars;
	}



	/**
	 * 
	 * @method checks if string too long
	 * 
	 * @return bool
	 * 
	 */
	protected function has_too_many_chars(string $string, int $limit)
	{
		return strlen($string) > $limit;
	}
}
