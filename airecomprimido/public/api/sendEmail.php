<?php

$allowedOrigins = [
  "https://airecomprimidoec.com",
  "https://www.airecomprimidoec.com",
  "http://localhost:3000"
];

if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowedOrigins)) {
  header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

$to = 'ventas-uio@airecomprimidoec.com';

$data = json_decode(file_get_contents('php://input'));

if (!empty($data->email) && !empty($data->subject) && !empty($data->message)) {

  $message = "Ha recibido un correo desde el sitio web de airecomprimidoec.com.\n\nEl correo es:\n {$data->email}.\n\nEl mensage es:\n {$data->message} \n\n Fecha: " . date('Y-m-d H:i:s');
  $headers = "From: no-reply@airecomprimidoec.com\r\n"; 

  if(mail($to, $data->subject, $message, $headers)) {
    echo json_encode([
      'status' => 'success',
      'message' => 'Email enviado correctamente'
    ]);
  } else {
    http_response_code(401);
    echo json_encode([
      'status' => 'error',
      'message' => 'Error al enviar email'
    ]);
  }
} else {
  http_response_code(400);
  echo json_encode([
    "status" => "error",
    "message" => "Complete todos los campos"
  ]);
}
?>