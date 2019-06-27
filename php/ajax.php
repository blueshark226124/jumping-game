<?php

include_once('config.php');
$action = (empty($_REQUEST['action'])) ? "" : $_REQUEST['action'];

if ($action == "create") {
	$username     = (empty($_POST['username'])) ? "" : $_POST['username'];
	$phone_number = (empty($_POST['phone_number'])) ? "" : $_POST['phone_number'];
	$score        = (empty($_POST['score'])) ? "" : $_POST['score'];
	$date         = (empty($_POST['date'])) ? "" : $_POST['date'];
	$enemy_count  = (empty($_POST['enemy_count'])) ? "" : $_POST['enemy_count'];

	// create a new record
	$sql = "INSERT INTO result (username, phone_number, score, `date`) VALUES ('".$username."', '".$phone_number."', '".$score."', '".$date."')";
	$result = mysqli_query($db, $sql);
	$id = mysqli_insert_id($db);

	// check if it's the first try or not
	$sql = "SELECT * FROM result WHERE username = '".$username."' AND phone_number = '".$phone_number."' AND `date` = '".$date."' AND win = 1";
	$result = mysqli_query($db, $sql);
	$rowcount = mysqli_num_rows($result);

	if ($rowcount > 0) {
		// already exists
		$msg = "Thank you for playing! We see you already won today. Redeem your current Wicode first to be able to win again.";
	} else {
		if ($enemy_count > 3) {
			$sql = "UPDATE result SET win = 1 WHERE id='".$id."'";
			mysqli_query($db, $sql);

			$msg = "Woohoo! You won! We will sms your prize shortly. If you have not received your coupon due to your network provider, contact Talk To Us or Whatsapp 076 553 6337.";
		} else {
			$msg = "Not so lucky this time! Keep playing to WIN MORE & stand a chance to win a BIGGER prize!";
		}
	}

	$response = array(
		'status' => true,
		'msg' => $msg
	);

	echo json_encode($response);
	exit;
}

?>