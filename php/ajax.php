<?PHP

include_once('config.php');
$action = (empty($_REQUEST['action'])) ? "" : $_REQUEST['action'];

if ($action == "create") {
	$username     = (empty($_POST['username'])) ? "" : $_POST['username'];
	$phone_number = (empty($_POST['phone_number'])) ? "" : $_POST['phone_number'];
    $score        = (empty($_POST['score'])) ? "" : $_POST['score'];

	$sql = "INSERT INTO result (username, phone_number, score) VALUES ('".$username."', '".$phone_number."', '".$score."')";
	$result = $db->query($sql);
	$response = array(
		'status' => true,
		'msg' => "Thank you for playing Birthday Bucket Bash! See T's & C's"
	);

	echo json_encode($response);
	exit;
}

?>