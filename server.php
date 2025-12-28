<?php
// server.php
// Встановлюємо часовий пояс, щоб час сервера збігався з локальним (Пункт b)
date_default_timezone_set('Europe/Kiev'); 

header("Content-Type: application/json");

$file = 'logs.json';
$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $currentLogs = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    if (!is_array($currentLogs)) $currentLogs = [];

    // Фіксуємо серверний час з мілісекундами
    $t = microtime(true);
    $micro = sprintf("%03d", ($t - floor($t)) * 1000);
    $serverTime = date("H:i:s", $t) . "." . $micro;

    // ОБРОБКА СПОСОБУ 2 (Пакет з LocalStorage)
    if (isset($input['batch'])) {
        foreach ($input['batch'] as $item) {
            // Для пакету: час запису на сервер = поточний момент (коли прийшов пакет)
            // Це покаже, що всі події записалися одночасно
            $item['serverTimeSave'] = $serverTime; 
            $item['methodType'] = 'LocalStorage (Спосіб 2)';
            $currentLogs[] = $item;
        }
    } 
    // ОБРОБКА СПОСОБУ 1 (Миттєва відправка)
    else {
        $input['serverTimeSave'] = $serverTime;
        $input['methodType'] = 'AJAX/Instant (Спосіб 1)';
        $currentLogs[] = $input;
    }

    file_put_contents($file, json_encode($currentLogs));
    echo json_encode(["status" => "saved", "time" => $serverTime]);
} 
elseif ($method === 'GET') {
    if (isset($_GET['action']) && $_GET['action'] == 'clear') {
        file_put_contents($file, json_encode([]));
        echo json_encode(["status" => "cleared"]);
    } else {
        if (file_exists($file)) echo file_get_contents($file);
        else echo json_encode([]);
    }
}
?>