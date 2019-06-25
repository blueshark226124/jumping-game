<?php

include_once('config.php');
$action = (empty($_REQUEST['action'])) ? "" : $_REQUEST['action'];

if ($action == "create") {
	$username     = (empty($_POST['username'])) ? "" : $_POST['username'];
	$phone_number = (empty($_POST['phone_number'])) ? "" : $_POST['phone_number'];
	$score        = (empty($_POST['score'])) ? "" : $_POST['score'];
	$date         = (empty($_POST['date'])) ? "" : $_POST['date'];

	// check if it's the first try or not
	$sql = "SELECT * FROM result WHERE username = '".$username."' AND phone_number = '".$phone_number."' AND `date` = '".$date."'";
	$result = mysqli_query($db, $sql);
	$rowcount = mysqli_num_rows($result);

	if ($rowcount > 0) {
		// already exists
		$msg = "Thank you for playing! We see you already won today. Redeem your current coupon first to be able to win again.";
	} else {
		$msg = "Congratulations! You won! We will sms your prize shortly. If you have not received your coupon due to your network provider, please contact Talk To Us (https://www.hungrylion.co.za/talk-to-us) or Whatsapp 076 553 6337.";
	}

	$sql = "INSERT INTO result (username, phone_number, score, `date`) VALUES ('".$username."', '".$phone_number."', '".$score."', '".$date."')";
	$result = $db->query($sql);
	$response = array(
		'status' => true,
		'msg' => $msg
	);

	echo json_encode($response);
	exit;
}

?>