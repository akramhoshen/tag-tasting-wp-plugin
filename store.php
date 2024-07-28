<?php
include 'config.php';
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $content = $db->real_escape_string($data['content']);
    $uniqueId = uniqid();

    $sql = "INSERT INTO html_content (id, content) VALUES ('$uniqueId', '$content')";

    if ($db->query($sql) === TRUE) {
        echo json_encode(['id' => $uniqueId]);
    } else {
        echo json_encode(['error' => 'Failed to store content: ' . $db->error]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
}

$db->close();
?>
