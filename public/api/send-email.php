<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Método no permitido. Solo se acepta POST."]);
    exit();
}

// Leer variables de .env si existe en la raíz
$envPath = __DIR__ . '/../../.env';
$env = [];
if (file_exists($envPath)) {
    $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    foreach ($lines as $line) {
        if (strpos(trim($line), '#') === 0) continue;
        if (strpos($line, '=') !== false) {
            list($key, $value) = explode('=', $line, 2);
            $env[trim($key)] = trim(trim($value), '"\'');
        }
    }
}

$input = json_decode(file_get_contents('php://input'), true);

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$phone = isset($input['phone']) ? trim($input['phone']) : '';
$subject = isset($input['subject']) ? trim($input['subject']) : '';
$message = isset($input['message']) ? trim($input['message']) : '';

if (empty($name) || empty($email) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Por favor completa todos los campos obligatorios (nombre, correo y mensaje)."]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "El formato del correo electrónico ingresado no es válido."]);
    exit();
}

$to = !empty($env['MAIL_TO']) ? $env['MAIL_TO'] : (!empty($env['SMTP_USER']) ? $env['SMTP_USER'] : 'info@agrofert.com.co');
$fromUser = !empty($env['SMTP_USER']) ? $env['SMTP_USER'] : 'info@agrofert.com.co';
$fromName = !empty($env['MAIL_FROM_NAME']) ? $env['MAIL_FROM_NAME'] : 'Agrofert Web';

$emailSubject = !empty($subject) ? "[Contacto Web] {$subject} - {$name}" : "[Contacto Web] Nuevo mensaje de {$name}";

$body = "Has recibido un nuevo mensaje desde el sitio web de Agrofert:\n\n";
$body .= "Nombre: {$name}\n";
$body .= "Correo: {$email}\n";
$body .= "Teléfono: " . (!empty($phone) ? $phone : 'No especificado') . "\n";
$body .= "Asunto: " . (!empty($subject) ? $subject : 'No especificado') . "\n\n";
$body .= "Mensaje:\n{$message}\n\n";
$body .= "--------------------------------------------------\n";
$body .= "Puedes responder a este correo para escribir directamente a {$email}.\n";

$headers = "From: {$fromName} <{$fromUser}>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (@mail($to, $emailSubject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "¡Tu mensaje ha sido enviado correctamente!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo enviar el mensaje desde el servidor web."]);
}
