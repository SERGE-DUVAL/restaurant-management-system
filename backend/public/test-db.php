<?php
// Script de test pour vérifier la connexion à la base de données
header('Content-Type: application/json');

$result = [
    'pdo_mysql_loaded' => extension_loaded('pdo_mysql'),
    'pdo_drivers' => PDO::getAvailableDrivers(),
    'php_version' => PHP_VERSION,
    'php_ini_loaded' => php_ini_loaded_file(),
];

// Test de connexion
try {
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $database = getenv('DB_DATABASE') ?: 'laravel';
    $username = getenv('DB_USERNAME') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: '';
    
    $dsn = "mysql:host={$host};port={$port};dbname={$database}";
    $pdo = new PDO($dsn, $username, $password);
    $result['connection'] = 'success';
    $result['database'] = $database;
} catch (PDOException $e) {
    $result['connection'] = 'failed';
    $result['error'] = $e->getMessage();
    $result['error_code'] = $e->getCode();
}

echo json_encode($result, JSON_PRETTY_PRINT);



