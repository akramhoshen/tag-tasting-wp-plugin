<?php
$server = "localhost";
$user = "root";
$password = "";
$database = "html_content_db";

// Create connection
$db = new mysqli($server, $user, $password, $database);

// Check connection
if ($db->connect_error) {
    die("Connection failed: " . $db->connect_error);
}
?>