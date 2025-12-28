<?php
// get_tabs.php
header("Content-Type: application/json");

$file = 'tabs_data.json';

if (file_exists($file)) {
    echo file_get_contents($file);
} else {
    echo json_encode([]); // Якщо даних ще немає
}
?>