<?php
header('Content-Type: application/json');

// Simulated response
echo json_encode([
    'status' => 'success',
    'message' => 'Backend connected successfully!'
]);
?>