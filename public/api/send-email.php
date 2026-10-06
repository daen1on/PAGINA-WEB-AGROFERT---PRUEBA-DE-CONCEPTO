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

$input = json_decode(file_get_contents('php://input'), true) ?: [];

// 1. TRAMPA HONEYPOT: Si el bot rellena empresa_website, descartar silenciosamente
if (!empty($input['empresa_website'])) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "¡Tu mensaje ha sido enviado correctamente!"]);
    exit();
}

// 2. TRAMPA TEMPORAL (Time-Trap): Descartar si el envío tomó menos de 2 segundos
if (!empty($input['_formStartTime'])) {
    $currentTimeMs = round(microtime(true) * 1000);
    $elapsedMs = $currentTimeMs - floatval($input['_formStartTime']);
    if ($elapsedMs > 0 && $elapsedMs < 2000) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "¡Tu mensaje ha sido enviado correctamente!"]);
        exit();
    }
}

$name = isset($input['name']) ? substr(trim($input['name']), 0, 100) : '';
$email = isset($input['email']) ? substr(trim($input['email']), 0, 150) : '';
$phone = isset($input['phone']) ? substr(trim($input['phone']), 0, 30) : '';
$subject = isset($input['subject']) ? substr(trim($input['subject']), 0, 150) : '';
$message = isset($input['message']) ? substr(trim($input['message']), 0, 3000) : '';

// Limpieza de saltos de línea para prevenir Email Header Injection
$cleanName = str_replace(["\r", "\n", "\t"], ' ', $name);
$cleanEmail = str_replace(["\r", "\n", "\t"], '', $email);
$cleanSubject = str_replace(["\r", "\n", "\t"], ' ', $subject);

if (empty($cleanName) || empty($cleanEmail) || empty($message)) {
    http_response_code(400);
    echo json_encode(["error" => "Por favor completa todos los campos obligatorios (nombre, correo y mensaje)."]);
    exit();
}

if (!filter_var($cleanEmail, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "El formato del correo electrónico ingresado no es válido."]);
    exit();
}

$to = !empty($env['MAIL_TO']) ? $env['MAIL_TO'] : (!empty($env['SMTP_USER']) ? $env['SMTP_USER'] : 'info@agrofert.com.co');
$fromUser = !empty($env['SMTP_USER']) ? $env['SMTP_USER'] : 'info@agrofert.com.co';
$fromName = !empty($env['MAIL_FROM_NAME']) ? $env['MAIL_FROM_NAME'] : 'Agrofert Web';

$emailSubject = !empty($cleanSubject) ? "[Contacto Web] {$cleanSubject} - {$cleanName}" : "[Contacto Web] Nuevo mensaje de {$cleanName}";

$body = "Has recibido un nuevo mensaje desde el sitio web de Agrofert:\n\n";
$body .= "Nombre: {$cleanName}\n";
$body .= "Correo: {$cleanEmail}\n";
$body .= "Teléfono: " . (!empty($phone) ? $phone : 'No especificado') . "\n";
$body .= "Asunto: " . (!empty($cleanSubject) ? $cleanSubject : 'No especificado') . "\n\n";
$body .= "Mensaje:\n{$message}\n\n";
$body .= "--------------------------------------------------\n";
$body .= "Puedes responder a este correo para escribir directamente a {$cleanEmail}.\n";

$headers = "From: {$fromName} <{$fromUser}>\r\n";
$headers .= "Reply-To: {$cleanName} <{$cleanEmail}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (@mail($to, $emailSubject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["success" => true, "message" => "¡Tu mensaje ha sido enviado correctamente!"]);
} else {
    http_response_code(500);
    echo json_encode(["error" => "No se pudo enviar el mensaje desde el servidor web."]);
}
