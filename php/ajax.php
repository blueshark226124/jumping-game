<?PHP

include_once('config.php');
$action = (empty($_REQUEST['action'])) ? "" : $_REQUEST['action'];

if ($action == "create") {
	$username    = (empty($_POST['username'])) ? "" : $_POST['username'];
    $score = (empty($_POST['score'])) ? "" : $_POST['score'];

	$result = $db->query("SELECT * FROM result WHERE username='".$username."'");
	$err = $db->error;
	/* if (mysqli_num_rows($result) > 0) {
		$response = array(
			'status' => false,
			'msg' => 'Username is already existed.'
		);
	} else { */
		$sql = "INSERT INTO result (username, score) VALUES ('".$username."', '".$score."')";
		$result = $db->query($sql);
		$response = array(
			'status' => true,
			'msg' => 'Successfully recorded!'
		);
	// }

	echo json_encode($response);
	exit;
}

?>