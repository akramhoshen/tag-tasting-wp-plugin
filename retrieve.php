<?php
include 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $contentId = $db->real_escape_string($_GET['content']);

    $sql = "SELECT content FROM html_content WHERE id = '$contentId'";
    $result = $db->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode(['content' => $row['content']]);
    } else {
        http_response_code(404);
        echo json_encode(['error' => 'Content not found']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$db->close();
?>
