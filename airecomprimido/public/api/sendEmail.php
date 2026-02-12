<?php

header("Access-Control-Allow-Origin: https://www.airecomprimidoec.com");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
  http_response_code(200);
  exit();
}

$to = 'ventas@airecomprimidoec.com';

$data = json_decode(file_get_contents('php://input'));

if (!empty($data->email) && !empty($data->subject) && !empty($data->message)) {

  $message = "Este es un email es fue enviado desde tu sitio web.\n\n Un visitante ha dejado el siguiente mensaje: Correo electrónico del autor: {$data->email}.\n Mensaje: {$data->message} \n\n Fecha: " . date('Y-m-d H:i:s');
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