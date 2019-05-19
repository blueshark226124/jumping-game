<?php

session_start();
define ('DEV', true);

if (DEV) {
    $config['site_url'] = 'http://blueshark.php.jumpinglion.com';
} else {
}

// Database details...
$config['db_port'] = '3306';
if (DEV) {
    $config['db_host'] = 'localhost';
    $config['db_user'] = 'root';
	$config['db_pass'] = '';
	$config['db_name'] = 'jumpinglion';
} else {
}

$conn = mysqli_connect($config['db_host'], $config['db_user'], $config['db_pass'], $config['db_name']);

?>