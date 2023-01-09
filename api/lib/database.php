<?php

/**
 * 
 * Common function arguments
 * -------------------------
 * 
 * @var $columns
 * 		assoc array of column title/value pairs sent in req
 * 		ex: ['username' => 'bob', 'email' => 'bob@bob.com']
 * 
 * @var $table
 * 		the MYSQL table we are working with as a string
 * 
 * @var $return
 * 		the columns to return in a SELECT statement 
 * 		ex: ['username', 'id', 'email']
 * 
 * 
 *
 */


class Database
{

	/**
	 * 
	 * @var string db connection variables
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
	public function createRow(
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
				return [
					'success' => false,
					'message' => 'Failed to execute query'
				];
			}
		} catch (Exception $error) {
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
	public function getRowById(
		int $id,
		string $table,
		array $return = null
	) {

		$id = trim($id);
		$id = filter_var($id);

		try {
			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';

			$sql = "SELECT $returned_columns FROM $table WHERE id = :id";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->bindValue(':id', $id);
			$this->stmt->execute();

			$single = $this->stmt->fetch(PDO::FETCH_ASSOC);
			$single['success'] = true;

		} catch (Exception $error) {

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
	 * @method get one row by any column
	 * 
	 * @return array of columns specified. Default *
	 * 
	 */
	public function getRowByColumnName(
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
	public function getAllRows(
		string $table,
		array $return = null
	) {

		try {

			$returned_columns = isset($return)
				? implode(', ', $return)
				: '*';
			$sql = "SELECT $returned_columns FROM $table";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute();

			$all = $this->stmt->fetchAll(PDO::FETCH_ASSOC);

		} catch (Exception $error) {

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
	public function updateRow(
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
			$sql = "UPDATE $table set $column_sql WHERE id = $id";
			$this->stmt = $this->dbh->prepare($sql);
			$this->stmt->execute($columns);

			// Return New Values
			$all = $this->getRowById(
				id: $id,
				table: $table,
				return: $return
			);
			return $all;

		} catch (Exception $error) {

			return [
				'success' => false,
				'message' => 'error with query'
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
	public function destroyRowById(
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
				return [
					'success' => false,
					'message' => 'error with query'
				];
			}

		} catch (\Throwable $th) {

			return [
				'success' => false,
				'message' => 'error with query'
			];
		}
	}

	/**
	 * 
	 * @method is value of column already taken
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
	protected function has_forbidden_chars(array $values) {

		$has_forbidden_chars = null;

		foreach($values as $value) {
			$tester = preg_match('/^[a-zA-Z0-9_\-]+$/', $value);
			if( !(bool) $tester ) $has_forbidden_chars = true; 
		}

		return $has_forbidden_chars;
	}
}



