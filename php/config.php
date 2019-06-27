<?php

session_start();
define ('DEV', true);
// define ('DEV', false);

if (DEV) {
    $config['site_url'] = 'http://blueshark.php.jumpinglion.com';
} else {
	$config['site_url'] = 'https://www.hungrylion.co.za/game/';
}

// Database details...
$config['db_port'] = '3306';
if (DEV) {
    $config['db_host'] = 'localhost';
    $config['db_user'] = 'root';
	$config['db_pass'] = '';
	$config['db_name'] = 'jumpinglion';
} else {
	$config['db_host'] = 'mysql.temp.hungrylion.co.za';
    $config['db_user'] = 'antonanton';
	$config['db_pass'] = 'RtC7cH3uHvB5Udm';
	$config['db_name'] = 'jumpinglion';
}

$db = get_db_conn();

function get_db_conn() {
	global $config;

	global $msg_str_6;

	$conn = mysqli_init();
	if (!$conn) {
		echo $msg_str_6."<BR>\n"; //die('mysqli_init failed');
	}
	if (!$conn->options(MYSQLI_INIT_COMMAND, 'SET AUTOCOMMIT = 1')) {
		echo $msg_str_6."<BR>\n"; //die('Setting MYSQLI_INIT_COMMAND failed');
	}
	if (!$conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5)) {
		echo $msg_str_6."<BR>\n"; //die('Setting MYSQLI_OPT_CONNECT_TIMEOUT failed');
	}
	if (!$conn->real_connect($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name'])) {
		echo $msg_str_6."<BR>\n".mysqli_connect_error(); //die('Connect Error (' . mysqli_connect_errno() . ') '. mysqli_connect_error());
	}

	return $conn;
}

?>