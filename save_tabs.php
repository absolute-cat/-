<?php
// save_tabs.php
header("Content-Type: application/json");

// Отримуємо дані від JS
$input = file_get_contents('php://input');

if ($input) {
    // Зберігаємо у файл 'tabs_data.json'
    file_put_contents('tabs_data.json', $input);
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}
?>