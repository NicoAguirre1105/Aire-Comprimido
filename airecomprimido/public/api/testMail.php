<?php
header('Content-Type: application/json');

$to = "nicofrancis2002@gmail.com";
$subject = "Prueba de Email desde cPanel";
$message = "Este es un email de prueba enviado desde PHP en cPanel.\n\nFecha: " . date('Y-m-d H:i:s');
$headers = "From: no-reply@airecomprimidoec.com\r\n"; 

if(mail($to, $subject, $message, $headers)) {
    echo json_encode([
        'success' => true,
        'message' => 'Email enviado correctamente'
    ]);
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Error al enviar email'
    ]);
}
?>