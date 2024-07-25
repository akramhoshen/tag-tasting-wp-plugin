<?php
if (isset($_GET['adTagUrl'])) {
    $adTagUrl = $_GET['adTagUrl'];

    // Validate URL
    if (filter_var($adTagUrl, FILTER_VALIDATE_URL)) {
        // Fetch the ad tag content
        $adTagContent = file_get_contents($adTagUrl);

        if ($adTagContent !== false) {
            echo $adTagContent;
        } else {
            echo "Failed to fetch the ad tag content.";
        }
    } else {
        echo "Invalid URL.";
    }
} else {
    echo "No ad tag URL provided.";
}
?>
